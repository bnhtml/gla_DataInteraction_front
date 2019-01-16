<template>
    <div class="consoleDesk">
        <Layout class="wrapper">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu v-show='!MenuShow' :active-name="activeName" width='auto' theme="dark" @on-select="handleSelect">
                    <!--ivu-menu-item-active  -->
                    <div v-for="(item,index) in leftMenu" :key="index">
                        <Submenu :name="index" v-if="item.children && item.children.length>0 && !item.hidden">
                            <template slot="title"><i v-if='item.meta.icon' :class="'iconfont '+ item.meta.icon"></i>{{item.meta.title}}
</template>
                            <Menu-item :name="JSON.stringify(sub)" v-for="(sub,i) in item.children" :key="i" v-if="!sub.hidden" >
                                <i v-if='sub.meta.icon' :class="'iconfont '+ sub.meta.icon"></i>{{sub.meta.title}}
                            </Menu-item>
                        </Submenu>
                        <div>
                            <!-- 目前 -->
                            <Menu-item :class='indexClass==item.path?"ivu-menu-item-active ivu-menu-item ivu-menu-item-selected":"ivu-menu-item"' :name="JSON.stringify(item)" :key="index" v-if="item.children&&item.children.length==0 && !item.hidden && item.level!=0 " >
                                <i v-if='item.meta.icon' :class="'iconfont '+ item.meta.icon"></i>{{item.meta.title}}
                            </Menu-item>
                        </div>
                    </div>
                </Menu>
                <div v-show='MenuShow'>
                    <div v-for='(v,i) in leftMenu'  :key='i'><i v-if='v.meta.icon' :class="'iconfont '+ v.meta.icon"></i>{{v.name}}</div>
                </div>
            </Sider>
                <Layout :style="{padding: '24px'}">
                    <Content >
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
    </div>
</template>

<script>
    export default {
        name: 'navBar',
        data() {
            return {
                indexClass: this.$route.path,
                isCollapsed: false,
                isMenuShow: false,
                routerInfo: [/* {
                        path: '/homepage',
                        name: '首页',
                        children: [],
                        meta: {
                            title: "首页",
                            icon: 'icon-shouye',
                        }
                    }, */
                    {
                        path: '/home/consoleDesk/userManagement',
                        name: '用户管理',
                        children: [],
                        meta: {
                            icon: 'icon-yonghuguanli',
                            title: "用户管理"
                        }
                    },
                    {
                        path: '/home/consoleDesk/roleManagement',
                        name: '角色管理',
                        children: [],
                        meta: {
                            icon: 'icon-jiaoseguanli',
                            title: "角色管理"
                        }
                    },
                    {
                        path: '/home/consoleDesk/menuManagement',
                        name: '菜单管理',
                        children: [],
                        meta: {
                            icon: 'icon-caidanguanli',
                            title: "菜单管理"
                        }
                    },
                    {
                        path: '/home/consoleDesk/impower',
                        name: '授权管理',
                        children: [],
                        meta: {
                            icon: 'icon-shouquanguanli',
                            title: "授权管理"
                        }
                    },
                ],
            }
        },
        components: {},
        computed: {
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : '',
                ]
            },
            MenuShow() {
                return this.isCollapsed ? this.isMenuShow == false : this.isMenuShow == true
            },
            leftMenu() {
                return [{
                        path: '/homepage',
                        name: '首页',
                        children: [],
                        meta: {
                            title: "首页",
                            icon: 'icon-shouye',
                        }
                    }, ...this.$store.state.routerList]
            },
            activeName() {
                let activeName = this.$route.path;
                // if (this.leftMenu && this.leftMenu.children) {
                //     activeName = this.leftMenu[1].children[0].path
                // } else {
                //     activeName = this.leftMenu[1].path
                // }
                return activeName;
            }
        },
        mounted() {},
        methods: {
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },
            getPath(item, children0) {
                return item.path ? item.path : (children0 ? item.children[0].path : item.path);
            },
            handleSelect(e) {
                e = JSON.parse(e);
                this.indexClass = e.path;
                this.$store.commit('get_bread', {
                    path: e.path,
                    name: e.name
                });
                this.$router.push({
                    path: e.path
                })
            },
            getSize() {
                this.fit();
                window.addEventListener('resize', this.fit);
            },
            fit() {
                let W = window.innerWidth - 200;
                let H = window.innerHeight - 65;
                let width = (1920 - 200);
                let height = (1080 - 65);
                let R = W / width;
                let l = '0';
                let t = '0';
                let target = document.querySelector('.container-layout'); //querySelector
                let cssText = `left:${l};top:${t};width:${width}px;height:${height}px;transform:scale(${R},${R});transform-origin:left top;`;
                target.style.cssText = cssText;
            }
        },
        destroyed() {
            window.resize = null;
        }
    }
</script>

<style lang='scss' scoped>
    @import '@/assets/style/base/index.scss';
    .consoleDesk {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        .wrapper{
            position: relative;
        }
    }
    .collapsed-menu {
        display: none;
        transition: display .2s ease;
    }
    .ivu-layout-has-sider {
        min-height: 100%;
        &>.ivu-layout {
            position: relative; // min-height: 100%;
        }
    }
    .ivu-layout-sider,
    .ivu-menu-dark,
    .ivu-menu,
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
        background: #0B1539!important;
    }
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
        background: #131F45;
    }
    .ivu-menu-vertical .ivu-menu-item,
    .ivu-menu-vertical .ivu-menu-submenu-title {
        padding: 0;
        @include nums($w: 100%, $h:50px);
        line-height: 50px;
        padding-left: 16px; // border-left:solid 2px #182142;
        box-sizing: border-box;
    }
    .ivu-menu-item-active,
    .ivu-menu-item-selected {
        color: #fff!important;
        box-sizing: border-box;
    }
    .ivu-menu-item-selected::before {
        position: absolute;
        height: 100%;
        left: 0;
        bottom: 0;
        display: block;
        border: 1px solid #2d8cf0;
        content: ' ';
    }
    .content {
        height: auto; // background: #182142; 
        // background: #1C2851;
        // border-radius: 8px;
        // box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.40);
        margin: 20px;
        div {
            margin-bottom: 20px; // border-radius: 8px;
            // box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.40);
        }
    }
    .container-layout {
        overflow-y: scroll;
    }
</style>
