<template>
  <div>
    <a-drawer
      title="风格切换"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="300px"
    >
      <!-- 影响未显示 待解决 -->
      <!-- :placement="placement" -->
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <template>
        <div class>
          <a-radio-group
            :value="$route.query.NavTheme || 'dark'"
            @change="e => handleSettingChange('NavTheme', e.target.value)"
          >
            <a-radio value="dark">黑色</a-radio>
            <!-- 此组色值不能随意输入 -->
            <a-radio value="light">白色</a-radio>
          </a-radio-group>
          <h2>整体风格定制</h2>
          <a-radio-group
            :value="$route.query.NavLayout || 'left'"
            @change="e => handleSettingChange('NavLayout', e.target.value)"
          >
            <a-radio value="left">左侧</a-radio>
            <a-radio value="top">顶部</a-radio>
          </a-radio-group>
        </div>
      </template>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      NavTheme: "dark",
      NavLayout: "left"
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    }
  }
};
</script>
<style scoped>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background-color: #1890ff;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>
