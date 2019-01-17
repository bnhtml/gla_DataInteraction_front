 // 首页展示
<template>
    <div class="home">
        <Layout class="wrapper">
            <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
            <layout style='paddding: 20px' class="container-layout" ref="containerLayout">
                <Content class="content" >
                    <router-view v-if="show"></router-view>
                </Content>
            </layout>
        </Layout>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'navBar',
        data() {
            return {
                show: true,
                indexClass: this.$route.name,
                isCollapsed: false,
                isMenuShow: false,
                routerInfo: [/* {
                        shorthref: 'homepage',
                        mdlname: '首页',
                        mdliconcss: 'icon-shouye',
                        children: []
                    },
                    {
                        shorthref: '/specialIndex',
                        mdlname: '数据资产综合分析',
                        mdliconcss: 'icon-zhuanti',
                        children: []
                    },
                    {
                        shorthref: 'ITBasicResources',
                        mdlname: 'IT基础资源分析',
                        mdliconcss: 'icon-xinxixitongfenxi',
                        children: []
                    },
                    {
                        shorthref: 'businessIndex',
                        mdlname: '业务系统分析',
                        mdliconcss: 'icon-zhuantifenxi',
                        children: []
                    },
                    {
                        shorthref: 'assetWarning',
                        mdlname: '资产填报预警',
                        mdliconcss: 'icon-zichantianbaoyujing',
                        children: []
                    }, */
                ],
            }
        },
        components: {
        },
        beforeRouteUpdate(to, from, next){
            let {fullPath} = to;
            if(fullPath !== from.fullPath){
                let dom = this.$refs.containerLayout.$el;
                dom.scrollTop = 0;
            }
            next();
        },
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
                this.routerInfo = window.sessionStorage.getItem('homeRouterList') && JSON.parse(window.sessionStorage.getItem('homeRouterList'));
                 this.routerInfo && this.routerInfo.unshift({
                        shorthref: 'homepage',
                        mdlname: '首页',
                        children:[],
                        mdliconcss: 'icon-shouye',
                    })
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
        mounted() {
        },
        methods: {
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },
            getPath(item, children0) {
                return item.path ? item.path : (children0 ? item.children[0].path : item.path);
            },
            handleSelect(e) {
                e = JSON.parse(e);
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../assets/style/base/index.scss';
    .home {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        .wrapper {
            position: relative;
            i {
                font-size: 18px;
            }
            .menu{
                @include nums($w:100%,$h:36px);
                margin-top: 27px;
            }
        }
    }
    .layout-header-bar {
        background: #0F193D;
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
    .ivu-menu-vertical .ivu-menu-submenu-title,
    {
        padding: 0;
        @include nums($w: 100%, $h:50px);
        line-height: 50px;
        padding-left: 16px;
        box-sizing: border-box;
    }
    .ivu-menu-item-active,
    .ivu-menu-item-selected {
        color: #fff;
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
        height: auto; 
        // background: #182142; 
        // background: #1C2851;
        // border-radius: 8px;
        // box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.40);
        padding: 0 20px;
        div {
            margin-bottom: 20px; // border-radius: 8px;
            // box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.40);
        }
    }
    .container-layout {
        overflow-y: scroll;
    }
</style>

