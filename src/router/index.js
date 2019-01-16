import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import home from '@/views/home'; // 
import index from '../views/work/index.vue'; // 


import leaderCockpit from '../views/work/leaderCockpit/leaderCockpit.vue';
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home/index/leaderCockpit',
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            meta: {
                keepAlive: false,
            },
            children: [

                {
                    path: 'index',
                    name: 'index',
                    component: index,
                    meta: {
                        keepAlive: false,
                    },
                    children: [
                        {
                            path: 'leaderCockpit',
                            name: 'leaderCockpit',
                            component: leaderCockpit,
                            meta: {
                                keepAlive: true,
                                title: '领导驾驶舱'
                            }
                        }

                    ]
                },
            ]
        }]
})



