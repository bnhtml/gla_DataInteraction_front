 // 首页展示
<template>
    <div class="home">
        <el-container class="wrapper">
                 <div style='background: #58CAFD;width:60px;position:absolute;left:0;top:0;height:100%'></div>
           
            <el-aside style="width: 220px;background: #316284;margin-left:60px" v-if="isMenuShow">
                <!-- <div v-for="(menus, index) in leftMenu" :key="index">
                    <router-link :to="menus.url" class="g-bigmenu">{{menus.name}}</router-link>
                    <div v-if="menus.children && menus.children.length" v-for="(menu, idx) in menus.children" :key="idx">
                        <router-link :to="menu.url" class="g-centermenu">
                            {{menu.name}}
                        </router-link>
                        <router-link :to="o.url" v-if="menu.children && menu.children.length" v-for="(o, i) in menu.children" :key="i" class="g-smallmenu">{{o.name}}</router-link>
                    </div>
                </div> -->
                <!--  -->
                <el-menu class="el-menu-vertical-demo" :default-active='indexClass'  :collapse="isCollapse" :background-color='"#316284"' :text-color="'#fff'" v-for="(menus, index) in leftMenu" :key="index" @select='changeMenu'>
                    <el-submenu :index="JSON.stringify(menus)" v-if="menus.children && menus.children.length" :class='indexClass==JSON.stringify(menus)?"is-active":""'>
                        <template slot="title"><span slot="title">{{menus.name}}</span></template>
                        <el-menu-item-group v-for="(menu, idx) in menus.children" :key="idx" v-if="menu.children && menu.children.length==0">
                            <el-menu-item :index="JSON.stringify(menu)" :class='indexClass==JSON.stringify(menu)?"is-active":""'>{{menu.name}}</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu :index="JSON.stringify(menu)" v-for="(menu, idx) in menus.children" :key="idx" v-if="menu.children && menu.children.length" :class='indexClass==JSON.stringify(menu)?"is-active":""'>
                            <span slot="title">{{menu.name}}</span>
                            <el-menu-item :index="JSON.stringify(v)" v-for='(v,i) in menu.children' :key='i' :class='indexClass==JSON.stringify(v)?"is-active":""'>{{v.name}}</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item :index="JSON.stringify(menus)" v-else :class='indexClass==JSON.stringify(menus)?"is-active":""'>
                        <span slot="title">{{menus.name}}</span>
                    </el-menu-item>
                </el-menu>
        <!--  -->
      </el-aside>
      <el-main ref="containerLayout">
        <router-view></router-view>
      </el-main>
    </el-container>
        <!-- <Layout>
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
                <Content class="content">
                    <router-view v-if="show"></router-view>
                </Content>
            </layout>
        </Layout> -->
    </div>
</template>

<script type="text/javascript">
    const leftMenus = [
        [{
                url: 'businessBureau',
                name: '领导驾驶舱（业务局委）',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'leaderCockpit',
                name: '领导驾驶舱（大数据局）',
                icon: 'icon-shouye',
                children: [{
                        url: 'adminIndex',
                        name: '数据区概况',
                        icon: '',
                        children: []
                    },
                    {
                        url: 'nationalInterface',
                        name: '接口概况',
                        icon: '',
                        children: [{
                                url: {
                                    name: 'nationalInterface',
                                    query: {
                                        type: 0
                                    }
                                },
                                name: '国家接口',
                                icon: '',
                                children: []
                            },
                            {
                                url: {
                                    name: 'adminCity',
                                    query: {
                                        type: 0
                                    }
                                },
                                name: '省直接口',
                                icon: '',
                                children: []
                            },
                            {
                                url: {
                                    name: 'adminCity',
                                    query: {
                                        type: 1
                                    }
                                },
                                name: '市州接口',
                                icon: '',
                                children: []
                            }
                        ]
                    }
                ]
            }
        ],
        [{
                url: 'datainteration',
                name: '数据库类',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'fileGuide',
                name: '文件类',
                icon: 'icon-shouye',
                children: []
            },
        ],
        [{
                url: {
                    name: 'published',
                    query: {
                        user: 'admin',
                        deptType: 0
                    }
                },
                name: '已发布接口-大数据局',
                icon: 'icon-shouye',
                children: [{
                        url: {
                            name: 'published',
                            query: {
                                user: 'admin',
                                deptType: 0
                            }
                        },
                        name: '国家接口',
                        icon: '',
                        children: []
                    },
                    {
                        url: {
                            name: 'published',
                            query: {
                                user: 'admin',
                                deptType: 1
                            }
                        },
                        name: '省直接口',
                        icon: '',
                        children: []
                    },
                    {
                        url: {
                            name: 'published',
                            query: {
                                user: 'admin',
                                deptType: 2
                            }
                        },
                        name: '市州接口',
                        icon: '',
                        children: []
                    }
                ]
            },
            {
                url: {
                    name: 'published',
                    query: {
                        user: '贵州省大数据局'
                    }
                },
                name: '已发布接口-业务局委',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: {
                    name: 'unpublished',
                    query: {
                        user: 'admin'
                    }
                },
                name: '未发布接口',
                icon: 'icon-shouye',
                children: []
            }
        ],
        [{
                url: {
                    name: 'dataAreaManagement',
                    query: {
                        user: '贵州省大数据局',
                        deptType: 3
                    }
                },
                name: '数据区管理-业务局委',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: {
                    name: 'dataAreaManagement',
                    query: {
                        user: 'admin',
                        deptType: 3
                    }
                },
                name: '数据区管理-大数据局',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: {
                    name: 'interfacePathManagement',
                    query: {
                        user: 'admin',
                        deptType: 3
                    }
                },
                name: '接口路径管理',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: {
                    name: 'unitDomainNameManagement',
                    query: {
                        user: 'admin',
                        deptType: 3
                    }
                },
                name: '单位域名管理',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'configManagement',
                name: '配置管理',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'stateManagement',
                name: '状态管理',
                icon: 'icon-shouye',
                children: []
            }
        ],
    ]
    export default {
        name: 'navBar',
        data() {
            let routerNames = [
                ['leaderCockpit', 'businessBureau', 'nationalInterface', 'adminIndex', 'adminCity'],
                ['datainteration', 'fileGuide', 'fileOperation'],
                ['dataUpperShelf', 'dataUpperShelfAdmin', 'published', 'unpublished', 'info', 'params', 'usage', 'interfacePackage', 'interfaceUpdate'],
                ['systemManagement', 'dataAreaManagement', 'dataSheetDetails', 'configManagement', 'stateManagement', 'unitDomainNameManagement', 'interfacePathManagement']
            ]
            let idx = routerNames.map((o, i) => o.indexOf(this.$route.name) > -1).indexOf(true);
            return {

                routerNames,
                show: true,
                indexClass: this.$route.name,
                isCollapsed: false,
                isMenuShow: true,
                routerInfo: leftMenus[idx],
                isCollapse: false,
            }
        },
        components: {},
        beforeRouteUpdate(to, from, next) {
            let {
                fullPath
            } = to;
            if (fullPath !== from.fullPath) {
                let dom = this.$refs.containerLayout.$el;
                dom.scrollTop = 0;
            }
            next();
            if (fullPath !== from.fullPath) {
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
                // console.log(this.routerInfo, '====')
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
            // this.indexClass = JSON.stringify(this.leftMenus[0].url)
        },
        methods: {
            showMenu() {
                this.isMenuShow = false;
                let idx = this.routerNames.map((o, i) => o.indexOf(this.$route.name) > -1).indexOf(true);
                this.routerInfo = leftMenus[idx];
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
            },
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            changeMenu(e){
                this.indexClass = e
                e = JSON.parse(e)
                if(typeof e.url == 'string'){
                    
                    this.$router.push({
                        name:e.url
                    })
                }else{
                    this.$router.push(e.url)
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../assets/style/base/index.scss';
    .g-bigmenu {
        display: block; // background: #000;
        color: #fff;
        line-height: 40px;
        font-size: 16px;
        padding-left: 20px;
    }
    .g-centermenu {
        padding-left: 15px;
        display: block; // background: #333;
        color: #fff;
        line-height: 40px;
        font-size: 16px;
        padding-left: 20px;
    }
    .g-smallmenu {
        padding-left: 22px;
        display: block; // background: #444;
        color: #fff;
        line-height: 40px;
        font-size: 16px;
        padding-left: 20px;
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
            .menu {
                @include nums($w: 100%, $h:36px);
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
        background: #0B1539;
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
        height: auto; // background: #182142; 
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
    .is-active, // .router-link-active,
    .router-link-exact-active {
        background: #4D92BC!important;
        color: #fff;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        // width: 200px;
        // min-height: 400px;
    }
    .el-menu-vertical-demo ,.el-menu{

    }
    a{
        width: 100%;
        height:100%;
        // margin-left: -20px;
        // padding-left: 20px;
        display: inline-block;
        font-size: 16px;
        color: #fff;

    }
    /deep/ .el-submenu__title{
        font-size: 16px;
    }
    .el-menu{
        border: 0;
    }
</style>

