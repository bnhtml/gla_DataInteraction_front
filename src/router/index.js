import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import home from '@/views/home'; // 
import index from '../views/work/index.vue'; // 


import leaderCockpit from '../views/work/leaderCockpit/leaderCockpit.vue';
import datainteration from '../views/work/datainteration';
import dataUpperShelf from '../views/work/dataUpperShelf';
import systemManagement from '../views/work/systemManagement';
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
                        },
                        {
                            path: 'datainteration',
                            name: 'datainteration',
                            component: datainteration,
                            meta: {
                                keepAlive: true,
                                title: '数据集成'
                            }
                        },
                        {
                            path: 'dataUpperShelf',
                            name: 'dataUpperShelf',
                            component: dataUpperShelf,
                            meta: {
                                keepAlive: true,
                                title: '数据上架'
                            }
                        },
                        {
                            path: 'systemManagement',
                            name: 'systemManagement',
                            component: systemManagement,
                            meta: {
                                keepAlive: true,
                                title: '系统管理'
                            }
                        }

                    ]
                },
            ]
        }]
})



