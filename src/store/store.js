import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        routerList:window.localStorage.getItem('routerList')&&JSON.parse(window.localStorage.getItem('routerList'))||[], // 权限管理路由
        homeRouterList:window.localStorage.getItem('homeRouterList')&&JSON.parse(window.localStorage.getItem('homeRouterList'))||[], // 首页 菜单路由
        books: [],
        index: window.sessionStorage.getItem('index') || 0, // 主页导航
        fixedIndex: window.sessionStorage.getItem('fixedIndex') || 0, // index页面
        bread: window.sessionStorage.getItem('bread')&&JSON.parse(window.sessionStorage.getItem('bread')) || {}, // 二级面包屑
        breadSon: window.sessionStorage.getItem('breadSon')&&JSON.parse(window.sessionStorage.getItem('breadSon')) || {}, // 三级面包屑
        breadGrandson: window.sessionStorage.getItem('breadGrandson')&&JSON.parse(window.sessionStorage.getItem('breadGrandson')) || {}, // 四级面包屑,
        breadGreatGrandson:window.sessionStorage.getItem('breadGreatGrandson')&&JSON.parse(window.sessionStorage.getItem('breadGreatGrandson')) || {}, // 五级面包屑
        token: JSON.parse(window.localStorage.getItem('TOKEN')), 
        userInfo: JSON.parse(window.localStorage.getItem('USERINFO')),
        network:window.sessionStorage.getItem('network'),
        deptInfo: JSON.parse(window.sessionStorage.getItem('deptInfo')),
        breadcrumb: [{icon: 'dingwei', name: '首页', url: '/'}]
        
    },
    mutations: {
        //所有mutations中的方法的第一个参数一定是state变量，用来进行对state中的状态的操作
        //第二个参数是可选参数，用于调用该 mutations 方法的时候传参
        /* 权限管理页面路由 */
        get_routerList: (state, data) => {
            if (data) {

                window.localStorage.setItem('routerList', JSON.stringify(data));
            } else {
                window.localStorage.removeItem('routerList');

            }
            state.routerList = JSON.parse(window.localStorage.getItem('routerList')) || [];
        },
        /* 首页路由信息 */
        get_homeRouterList: (state, data) => {
            if (data) {

                window.localStorage.setItem('homeRouterList', JSON.stringify(data));
            } else {
                window.localStorage.removeItem('homeRouterList');

            }
            state.homeRouterList = JSON.parse(window.localStorage.getItem('homeRouterList')) || [];
        },
        /* 主页导航路由选择 */
        get_index: (state, data) => {
            window.sessionStorage.setItem('index', data);
            state.index = data;
        },
        /* 二级面包屑 */
        get_bread: (state, data) => {
            window.sessionStorage.setItem('bread', JSON.stringify(data));
            state.bread = data;
            state.breadSon = '';
            state.breadGrandson = '';
            state.breadGreatGrandson = '';
            window.sessionStorage.setItem('breadSon', '');
            window.sessionStorage.setItem('breadGrandson', '');
            window.sessionStorage.setItem('breadGreatGrandson', '');
        },
        /* 三级面包屑 */
        get_breadSon: (state, data) => {
            window.sessionStorage.setItem('breadSon', JSON.stringify(data));
            state.breadSon = data;
            state.breadGrandson = '';
            state.breadGreatGrandson = '';
            window.sessionStorage.setItem('breadGrandson', '');
            window.sessionStorage.setItem('breadGreatGrandson', '');
        },
        // 四级面包屑
        get_breadGrandson:(state,data)=>{
            window.sessionStorage.setItem('breadGrandson', JSON.stringify(data));
            state.breadGrandson = data;
            state.breadGreatGrandson = '';
            window.sessionStorage.setItem('breadGreatGrandson', '');
        },
        // 五级面包屑
        get_breadGreatGrandson:(state, data) => {
           window.sessionStorage.setItem('breadGreatGrandson', JSON.stringify(data));
           state.breadGreatGrandson = data;
        },
        // 获取登录信息
        get_token:(state,data)=>{
            if(data){

                window.localStorage.setItem('TOKEN', JSON.stringify(data));
            } else {
                window.localStorage.removeItem('TOKEN');

            }
            state.token = JSON.parse(window.localStorage.getItem('TOKEN'))
        },
        get_userInfo: (state, data) => {
            if (data) {

                window.localStorage.setItem('USERINFO', JSON.stringify(data));
            } else {
                window.localStorage.removeItem('USERINFO');

            }
            state.userInfo = JSON.parse(window.localStorage.getItem('USERINFO'))
        },
        get_fixedIndex: (state, data) => {
            window.sessionStorage.setItem('fixedIndex', data);
            state.fixedIndex = data;
        },
        get_deptInfo:(state,data)=>{
            window.sessionStorage.setItem('deptInfo', JSON.stringify(data));
            state.deptInfo = JSON.parse(window.sessionStorage.getItem('deptInfo'));
        },
        breadcrumb:(state, data) => {
            state.breadcrumb = data || [];
        }
        
    },
    actions: {
        //{ commit }是参数解构的写法，详见ES6语法
        // fetchData({ commit }) {
        //     axios.get('http://127.0.0.1:8081/api/books')
        //         .then(function (response) {
        //             commit('initBooks', response.data)
        //         })
        //         .catch(function (error) {

        //         })
        // },
    },
    getters: {

    }
})

export default store