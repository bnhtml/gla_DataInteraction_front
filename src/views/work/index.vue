 // 首页展示
<template>
    <div class="home">
        <Layout class="wrapper">
            <Sider hide-trigger :style="{background: '#fff'}" v-if="isMenuShow">
                <div v-for="(menus, index) in leftMenu" :key="index">
                    <router-link :to="menus.url" class="g-bigmenu">{{menus.name}}</router-link>
                    <Menu v-if="menus.children && menus.children.length" v-for="(menu, idx) in menus.children" :key="idx" active-name="" theme="light" width="auto" :open-names="['1']">
                        
                            <router-link :to="menu.url" class="g-centermenu">
                                {{menu.name}}
                            </router-link>
                            <MenuItem :to="o.url" v-if="menu.children && menu.children.length" v-for="(o, i) in menu.children" :key="i" :name="o.name">{{o.name}}</MenuItem>
                        
                    </Menu>
                </div>
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

    const leftMenus = {
        'leaderCockpit': [
            {
                url: 'leaderCockpit',
                name: '领导驾驶舱（业务局委）',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'leaderCockpit',
                name: '领导驾驶舱（大数据局）',
                icon: 'icon-shouye',
                children: [
                    {
                        url: 'leaderCockpit',
                        name: '数据区概况',
                        icon: '',
                        children: []
                    },
                    {
                        url: 'leaderCockpit',
                        name: '接口概况',
                        icon: '',
                        children: [
                            {
                                url: 'leaderCockpit',
                                name: '国家接口',
                                icon: '',
                                children: []
                            },
                            {
                                url: 'leaderCockpit',
                                name: '省直接口',
                                icon: '',
                                children: []
                            },
                            {
                                url: 'leaderCockpit',
                                name: '市州接口',
                                icon: '',
                                children: []
                            }
                        ]
                    }
                ]
            }
        ],
        'datainteration': [
            {
                url: 'datainteration',
                name: '数据库类',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'datainteration',
                name: '文件类',
                icon: 'icon-shouye',
                children: []
            },],
        'dataUpperShelf': [
            {
                url: 'dataUpperShelf',
                name: '已发布接口-大数据局',
                icon: 'icon-shouye',
                children: [
                {
                    url: 'dataUpperShelf',
                    name: '国家接口',
                    icon: '',
                    children: []
                },
                {
                    url: 'dataUpperShelf',
                    name: '省直接口',
                    icon: '',
                    children: []
                },
                {
                    url: 'dataUpperShelf',
                    name: '市州接口',
                    icon: '',
                    children: []
                }]
            },
            {
                url: 'dataUpperShelf',
                name: '已发布接口-业务局委',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'dataUpperShelf',
                name: '未发布接口',
                icon: 'icon-shouye',
                children: []
            }],
        'systemManagement': [
            {
                url: 'systemManagement',
                name: '数据区管理-业务局委',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'systemManagement',
                name: '数据区管理-大数据局',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'systemManagement',
                name: '接口路径管理',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'systemManagement',
                name: '单位域名管理',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'systemManagement',
                name: '配置管理',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'systemManagement',
                name: '状态管理',
                icon: 'icon-shouye',
                children: []
            }],
    }
    export default {
        name: 'navBar',
        data() {
            return {
                show: true,
                indexClass: this.$route.name,
                isCollapsed: false,
                isMenuShow: true,
                routerInfo: leftMenus[this.$route.name],
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
            if(fullPath !== from.fullPath){
                this.showMenu();

            }
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
            leftMenu() {
                // this.routerInfo = window.sessionStorage.getItem('homeRouterList') && JSON.parse(window.sessionStorage.getItem('homeRouterList'));
                //  this.routerInfo && this.routerInfo.unshift({
                //         shorthref: 'homepage',
                //         mdlname: '首页',
                //         children:[],
                //         mdliconcss: 'icon-shouye',
                //     })
                console.log(this.routerInfo, '====')
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
            showMenu(){
                this.isMenuShow = false;
                this.routerInfo = leftMenus[this.$route.name];
                this.$nextTick(() => this.isMenuShow = true);
            },
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
    .g-bigmenu{
        display: block;
        background: #000;
        color: #fff;
        line-height: 40px;
        font-size: 16px;
        padding-left: 5px;
    }
    .g-centermenu{
        padding-left: 15px;
        display: block;
        background: #333;
        color: #fff;
        line-height: 40px;
        font-size: 14px;
    }
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

