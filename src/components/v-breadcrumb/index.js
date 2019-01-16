let MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('breadcrumb', function (el, binding, vnode) {
    let vm = vnode.context; //当前组件实例
    // console.log(binding, vm, 'breadcrumb')
    vm.$store.commit('breadcrumb', binding.value);
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
  })
}
export default MyPlugin