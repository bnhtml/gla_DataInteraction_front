// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import iView from 'iview';
import ElementUI from 'element-ui'
import echarts from 'echarts'; // 引入echarts
import appBase from '../static/common/app_base.js';
import appClient from '../static/common/app_client.js';
import breadcrumb from '@/components/v-breadcrumb';
import 'iview/dist/styles/iview.css';
// import '../static/common/app_base.js';
import '../static/common/animate.css';
import list from '@/server/getData.js';
import store from '@/store/store.js';
import './assets/style/base/reset.css';
import './assets/style/base/common.css';
import './assets/style/cover/cover.scss';
import './assets/style/common/style.scss';
import './assets/font/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';
import api from '@/server'
import { actionRequiresAuth } from '@/http/fetch'
import { httpApi } from '@/http/axios'
import axios from "axios";
import VueAxios from 'vue-axios';
import { debounce, getrandom, numberFormat } from './utils'
window.eventBus = new Vue();
window.onresize = debounce(function () {
  eventBus.$emit('RESIZE');
}, 200)
document.addEventListener('click', function(e){
  eventBus.$emit('CLICK', e);
})
Vue.use(breadcrumb);
Vue.use(VueAxios, axios)
// import '@/router/routerUtils.js';
Vue.config.productionTip = false;

Vue.use(ElementUI, 'small')
/* eslint-disable no-new */
Vue.use(iView);

Vue.prototype.$echarts = echarts;
Vue.prototype.$api = { ...list, ...api };
Vue.prototype.$appBase = appBase;
Vue.prototype.$appClient = appClient;

Vue.prototype.$getrandom = getrandom;

router.beforeEach((to, from, next) => {
  // to 和 from 都是 路由信息对象
  // console.log(to, from)
  window.apiFirst = true;
  next();
})
// 过滤器
Vue.filter('number_format', numberFormat)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})




