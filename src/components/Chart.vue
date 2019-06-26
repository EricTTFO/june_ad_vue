<template>
  <div ref="chartDom" />
</template>

<script>
import echarts from 'echarts'
import debounce from 'lodash/debounce'
import { addListener, removeListener } from 'resize-detector'
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option(val) {
      this.chart.setOption(val)
    }
  },
  created() {
    this.resize = debounce(this.resize, 300)
  },
  mounted() {
    this.renderChart()
    // 基于准备好的dom，初始化echarts实例//refs写法//取ID写法
    // this.chart = echarts.init(this.$refs.chartDom);
    // this.chart = echarts.init(this.$id.chartDom1);
    addListener(this.$refs.chartDom, this.resize)
  },
  // 封装第三方库的时候 需要销毁监听 并且关闭chart实例 防止内存泄漏
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resize() {
      console.log(1111)
      this.chart.resize()
    },
    renderChart() {
      // 基于准备好dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom)
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style>
</style>
