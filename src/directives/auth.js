import { check } from '../utils/auth'
// 指令式的弊端  第一次才会控制 remove掉就不会加上来
// 组件式的指令比较灵活  唯一的弊端就是写的比较不方便
// 设置好的权限一般都不会变动 所以俩者都可用
function install(Vue, options = {}) {
  Vue.directive(options.name || 'auth', {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  })
}
export default { install }
