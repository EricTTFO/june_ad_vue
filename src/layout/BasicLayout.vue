<template>
  <div :class="[`nav-theme-${NavTheme}`, `nav-layout-${NavLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="NavLayout === 'left'"
        v-model="collapsed"
        :theme="NavTheme"
        :trigger="null"
        collapsible
        width="256px"
      >
        <div class="nav-theme-dark logo">Backstage</div>
        <SiderMenu :theme="NavTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          />
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import SiderMenu from './SiderMenu'
import SettingDrawer from '../components/SettingDrawer'
export default {
  components: {
    Header,
    SiderMenu,
    Footer,
    SettingDrawer
  },
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    NavTheme() {
      return this.$route.query.NavTheme || 'dark'
    },
    NavLayout() {
      return this.$route.query.NavLayout || 'left'
    }
  }
}
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 65px;
  font-size: 20px;
}
.trigger:hover {
  background-color: #eee;
}
.logo {
  height: 64px;
  line-height: 64px;
}
.nav-theme-dark >>> .logo {
  color: #fff;
}
</style>
