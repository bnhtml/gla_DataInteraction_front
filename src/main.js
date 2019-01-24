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
import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';

// import '../static/common/app_base.js';
import '../static/common/animate.css';
import store from '@/store/store.js';
import './assets/style/base/reset.css';
import './assets/style/base/common.css';
import './assets/style/cover/cover.scss';
import './assets/style/common/style.scss';
import './assets/font/iconfont.css';
import * as list from '@/server/getData.js';
import axios from "axios";
import VueAxios from 'vue-axios';
import { debounce, getrandom, numberFormat } from './utils';
import {SERVER_BASE_URL} from '@/http/conf.js';
window.eventBus = new Vue();
window.onresize = debounce(function () {
  eventBus.$emit('RESIZE');
}, 200)
document.addEventListener('click', function(e){
  eventBus.$emit('CLICK', e);
})
Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

Vue.use(ElementUI, 'small')
/* eslint-disable no-new */
Vue.use(iView);

Vue.prototype.$echarts = echarts;
Vue.prototype.$api = list;
Vue.prototype.$appBase = appBase;
Vue.prototype.$appClient = appClient;

Vue.prototype.$getrandom = getrandom;
Vue.prototype.$SERVER_BASE_URL = SERVER_BASE_URL

// 过滤器
Vue.filter('number_format', numberFormat)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})




