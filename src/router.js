import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// import RenderRouterView from './components/RenderRouterView.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
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
          component: {
            render: h => h("router-view")
          },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
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
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              component: () => import("./views/Forms/BasicForm")
            },
            {
              path: "/form/step-form",
              name: "stepform",
              component: () => import("./views/Forms/StepForm/StepForm.vue"),
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
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
