 // 首页展示
<template>
    <div class="home">
        <el-container class="wrapper">
            <div style='background: #58CAFD;width:60px;position:absolute;left:0;top:0;height:100%;z-index: 99;'></div>
            <el-aside style='background: #316284;'>
                <el-menu class="el-menu-vertical-demo" :default-active='indexClass' :background-color='"#316284"' :text-color="'#fff'" @select='changeMenu'>
                    <div v-for="(menus, index) in leftMenu" :key="index" style='margin-left:60px;'>
                        <el-submenu :index="JSON.stringify(menus)" v-if="menus.children && menus.children.length" :class='indexClass==JSON.stringify(menus)?"is-active":""'>
                            <template slot="title"><span slot="title">{{menus.name}}</span>
</template>
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
                    </div>
                </el-menu>
                </el-aside>
      <el-main ref="containerLayout">
        <router-view></router-view>
      </el-main>
    </el-container>
       
    </div>
</template>

<script type="text/javascript">
    const leftMenus = [
        [{
                url: 'businessBureau',
                shorthref: 'businessBureau',
                name: '领导驾驶舱（业务局委）',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'leaderCockpit',
                shorthref: 'leaderCockpit',
                name: '领导驾驶舱（大数据局）',
                icon: 'icon-shouye',
                children: [{
                        url: 'adminIndex',
                        shorthref: 'adminIndex',
                        name: '数据区概况',
                        icon: '',
                        children: []
                    },
                    {
                        url: 'nationalInterface',
                        shorthref: 'nationalInterface',
                        name: '接口概况',
                        icon: '',
                        children: [{
                                url: {
                                    name: 'nationalInterface',
                                    query: {
                                        type: 0
                                    }
                                },
                                shorthref: 'nationalInterface',
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
                                shorthref: 'adminCity',
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
                                shorthref: 'adminCity',
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
                shorthref: 'datainteration',
                name: '数据库类',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'fileGuide',
                shorthref: 'fileGuide',
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
                shorthref: 'published',
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
                        shorthref: 'published',
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
                        shorthref: 'published',
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
                        shorthref: 'published',
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
                shorthref: 'published',
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
                shorthref: 'unpublished',
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
                shorthref: 'dataAreaManagement',
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
                shorthref: 'dataAreaManagement',
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
                shorthref: 'interfacePathManagement',
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
                shorthref: 'unitDomainNameManagement',
                name: '单位域名管理',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'configManagement',
                shorthref: 'configManagement',
                name: '配置管理',
                icon: 'icon-shouye',
                children: []
            },
            {
                url: 'stateManagement',
                shorthref: 'stateManagement',
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
                isCollapsed: false,
                isMenuShow: true,
                routerInfo: leftMenus[idx],
                indexClass: this.$route.name,
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
            MenuShow() {
                return this.isCollapsed ? this.isMenuShow == false : this.isMenuShow == true
            },
            leftMenu() {
                this.indexClass = JSON.stringify(this.routerInfo[0].url)
                console.log(this.routerInfo[0].url)
                return this.routerInfo
            },
            activeName() {
                let activeName = this.$route.path;
                return activeName;
            }
        },
        mounted() {
            console.log(this.leftMenu[0].url)
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
            // getPath(item, children0) {
            //     return item.path ? item.path : (children0 ? item.children[0].path : item.path);
            // },
            changeMenu(e) {
                this.indexClass = e
                e = JSON.parse(e)
                if (typeof e.url == 'string') {
                    this.$router.push({
                        name: e.url
                    })
                } else {
                    this.$router.push(e.url)
                }
            },
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
        }
    } // .menu-icon {
    //     transition: all .3s;
    // }
    .rotate-icon {
        transform: rotate(-90deg);
    }
    .collapsed-menu {
        display: none;
        transition: display .2s ease;
    }
    .is-active,
    .router-link-exact-active {
        background: #4D92BC!important;
        color: #fff;
    }
    .el-menu-vertical-demo,
    .el-menu {
        border-right: 0;
    }
</style>

