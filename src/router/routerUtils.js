import { routerInfo } from '@/server/getData.js';
import Message from 'iview';
import store from '@/store/store.js';
import router from '@/router/index.js';
// console.log(router);
/* 数据不能为空 */
export const isNotNullORBlank = (...args) => {
    for (var i = 0; i < args.length; i++) {
        var argument = args[i];
        if (argument == null || argument == '' || argument == undefined) {
            Message.warning({ message: '数据不能为空!' })
            return false;
        }
    }
    return true;
}
/* 注入路由 */
export const initMenu = () => {
    // if (window.sessionStorage.getItem('initMenu') && JSON.parse(window.sessionStorage.getItem('initMenu'))) {
    //     return;
    // }
    // if (store.state.routerList.length) {
    // return;
    // }

    routerInfo({ appId: 2 }).then(resp => {
        if (resp) {
            resp.data.forEach((v,i)=>{
                if(v&&v.mdlhref=='/consoleDesk/consoleDesk'){
                    var fmtRoutes = formatRoutes(v&&v.children); // 权限管理页面路由
                    store.commit('get_routerList', fmtRoutes);
                    /*权限管理页面路由 */
                    if (store.state.routerList.length) {
                        store.commit('get_routerList', store.state.routerList);
                        router.options.routes.forEach((v,i)=>{
                            if(v.path=='/homepage' || v.name=='homepage'){
                                v.children&&v.children.length&&v.children.forEach((val,ind)=>{
                                   if(val.name=='consoleDesk'||val.path=='consoleDesk'){
                                        val.children.push(...fmtRoutes);
                                        router.addRoutes(val.children);
                                   } 
                                })
                            }
                        })
                        // router.options.routes[6].children[2].children.push(...fmtRoutes)
                        // router.addRoutes(router.options.routes[6].children[2].children);
                    }
                }else if(v.mdlhref=='/home/index'){
                    /* 首页路由信息 */
                    if (!store.state.homeRouterList || store.state.homeRouterList.length === 0){
                        store.commit('get_homeRouterList', v&&v.children);
                    }
                }else {
                    console.log(v,'不合符')
                }
            })
            // var fmtRoutes = formatRoutes(resp.data[0]&&resp.data[0].children); // 权限管理页面路由
            // store.commit('get_routerList', fmtRoutes);
            // /*权限管理页面路由 */
            // if (store.state.routerList.length) {
            //     store.commit('get_routerList', store.state.routerList);
            //     router.options.routes[6].children[2].children.push(...fmtRoutes)
            //     router.addRoutes(router.options.routes[6].children[2].children);
            // }
        //    /* 首页路由信息 */
        //     if(!store.state.homeRouterList.length){
                
        //         store.commit('get_homeRouterList', resp.data[1]&&resp.data[1].children);
        //     }

        }
    })
}
// initMenu();
// if (store.state.loginInfo.isLogin) {
//     initMenu(router);
// }
/* 路由封装 */
export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            shorthref,
            mdlhref,
            mdlname,
            children,
            mdliconcss,

        } = router;
        if (children && children instanceof Array && children.length > 0) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: shorthref,
            component(resolve) {
                require([`@/views` + mdlhref + '.vue'], resolve);
            },
            name: shorthref,
            children: children,
            meta: {
                title: mdlname,
                icon: mdliconcss
            }
        };
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}