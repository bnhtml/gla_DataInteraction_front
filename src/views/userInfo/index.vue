// 个人中心
<template>
    <div class="userInfo">
        <Layout class="wrapper">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu v-show='!MenuShow' :active-name="activeName" width='auto' theme="dark" @on-select="handleSelect">
                    <!--ivu-menu-item-active  -->
                    <div v-for="(item,index) in leftMenu" :key="index">
                        <Submenu :name="index" v-if="item.children && item.children.length>0 && !item.hidden">
                            <template slot="title"><i v-if='item.icon' :class="'iconfont '+ item.icon"></i>{{item.name}}
</template>
                            <Menu-item :name="JSON.stringify(sub)" v-for="(sub,i) in item.children" :key="i" v-if="!sub.hidden" >
                                <i v-if='sub.icon' :class="'iconfont '+ sub.icon"></i>{{sub.name}}
                            </Menu-item>
                        </Submenu>
                        <div>
                            <Menu-item :class='indexClass==item.path?"ivu-menu-item-active ivu-menu-item ivu-menu-item-selected":"ivu-menu-item"' :name="JSON.stringify(item)" :key="index" v-if="item.children&&item.children.length==0 && !item.hidden && item.level!=0 " >
                                <i v-if='item.icon' :class="'iconfont '+ item.icon"></i>{{item.name}}
                            </Menu-item>
                        </div>
                    </div>
                </Menu>
                <div v-show='MenuShow'>
                    <div v-for='(v,i) in leftMenu'  :key='i'><i v-if='v.icon' :class="'iconfont '+ v.icon"></i>{{v.name}}</div>
                </div>
            </Sider>
               <layout style='paddding: 20px' class="container-layout">
                    <!-- <breadcrumb></breadcrumb> -->
                    <Content class="content" >
                        <router-view></router-view>
                    </Content>
            </layout>
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
                routerInfo: [{
                        path: '/homepage',
                        name: '首页',
                        icon: 'icon-shouye',
                        children: []
                    },
                    {
                        path: '/home/userInfo/accountManagement',
                        name: '账户管理',
                        icon: 'icon-zhanghuguanli',
                        children: []
                    },
                    {
                        path: '/home/userInfo/personalCollection',
                        name: '个人收藏',
                        icon: 'icon-zhanghushoucang',
                        children: []
                    },
                    {
                        path: '/home/userInfo/messageReminding',
                        name: '消息提醒',
                        icon: 'icon-zhanghutixing',
                        children: []
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
                // this.routerInfo = window.sessionStorage.getItem('routerList') && JSON.parse(window.sessionStorage.getItem('routerList'));
                return this.routerInfo
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
    .userInfo {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        .wrapper {
            background-color: #182142!important;
            position: relative;
            i {
                font-size: 18px;
            }
        }
    }
    .layout-header-bar {
        background: #0F193D!important;
        img {
            padding: 17px 0 17px 8px;
        }
    }
    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon {
        transition: all .3s;
    }
    .rotate-icon {
        transform: rotate(-90deg);
    }
    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 110px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
        display: inline-block;
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
