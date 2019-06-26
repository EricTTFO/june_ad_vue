<template>
  <div class>
    <Chart :option="chartOption" style="height: 400px" />
  </div>
</template>

<script>
// import axios from "axios";
// import random from "lodash/random";
import request from '../../utils/request'
import Chart from '../../components/Chart'
export default {
  components: {
    Chart
  },
  data() {
    return {
      chartOption: {}
    }
  },
  mounted() {
    this.getChartData()
    // 深度监听 缺点非常消耗性能
    this.interval = setInterval(() => {
      this.getChartData()
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(
      //   () => random(100)
      // );
      // this.chartOption = { ...this.chartOption };
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    getChartData() {
      request({
        url: '/api/dashboard/chart1',
        method: 'get',
        params: { ID: 12345 }
      }).then(response => {
        this.chartOption = {
          title: {
            text: 'ECharts Dashboard'
          },
          tooltip: {},
          // xAxis: {
          //   data: ["视频广告", "联盟广告", "邮件营销", "直接访问", "搜索引擎", "seo"]
          // },
          // yAxis: {},
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              itemStyle: {
                // 阴影的大小
                // shadowBlur: 200,
                // 阴影水平方向上的偏移
                // shadowOffsetX: 0,
                // 阴影垂直方向上的偏移
                // shadowOffsetY: 0,
                // 阴影颜色
                // shadowColor: "rgba(0, 0, 0, 0.5)",
                emphasis: {
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 1)'
                }
              },
              backgroundColor: '#2c343c',
              data: [
                { value: response.data, name: '视频广告' },
                { value: response.data, name: '联盟广告' },
                { value: response.data, name: '邮件营销' },
                { value: response.data, name: '直接访问' },
                { value: response.data, name: '搜索引擎' }
              ]
              // data: response.data
            }
          ]
          // series: [
          //   {
          //     name: "销量",
          //     type: "bar",
          //     data: response.data
          //   }
          // ]
        }
      })
    }
  }
}
</script>

<style></style>
