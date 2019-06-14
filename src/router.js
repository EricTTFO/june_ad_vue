import Vue from "vue";
import Router from "vue-router";
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import NPrgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "./views/404.vue";
import Forbidden from "./views/403.vue";
import { check, isLogin } from "./utils/auth";
// import RenderRouterView from './components/RenderRouterView.vue'

Vue.use(Router);
//路由守卫  必须经过设置项
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      hideInMenu: true, //加入这个标记  后面生成初始化数据的时候 通过这个标记就会过滤掉
      //使用render方法如此简洁
      // component: RenderRouterView,
      // component: { render: h => h('router-view') },
      component: () => import("./layout/UserLayout.vue"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () => import("./views/User/Login")
        },
        {
          path: "/user/register",
          name: "register",
          component: () => import("./views/User/Register")
        }
      ]
    },
    {
      path: "/",
      meta: {
        authority: ["user", "admin"]
      },
      component: () => import("./layout/BasicLayout"),
      children: [
        //dashboard
        {
          path: "/",
          redirect: "dashboard/analysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: {
            icon: "dashboard",
            title: "仪表盘"
          },
          component: {
            render: h => h("router-view")
          },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: {
                title: "分析页"
              },
              component: () => import("./views/Dashboard/Analysis")
            }
          ]
        },
        //form
        {
          path: "form",
          name: "form",
          component: {
            render: h => h("router-view")
          },
          meta: {
            icon: "form",
            title: "表单",
            authority: ["admin"]
          },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              meta: {
                title: "基础表单"
              },
              component: () => import("./views/Forms/BasicForm")
            },
            {
              path: "/form/step-form",
              name: "stepform",
              hideChildrenInMenu: true,
              meta: {
                title: "分布表单"
              },
              component: () => import("./views/Forms/StepForm/"),
              children: [
                {
                  path: "form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "form/step-form/info",
                  name: "info",
                  component: () => import("./views/Forms/StepForm/Step1")
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () => import("./views/Forms/StepForm/Step2")
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () => import("./views/Forms/StepForm/Step3")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: Forbidden
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: NotFound
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("./views/About.vue")
    // }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NPrgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "您无权限访问，请联系管理员！"
      });
      next({
        path: "/403"
      });
    }
    NPrgress.done();
  }
  next();
});
router.afterEach(() => {
  NPrgress.done();
});
export default router;
