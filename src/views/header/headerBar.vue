<template>
    <div class="header-bar">
        <Header :style="{padding: 0,'background':bg}" class="layout-header-bar">
            <span class="left">{{time}}</span>
            <h1 class="title"><img src="../../assets/img/logo/logo_v2_text.png" alt="" srcset=""></h1>
            <div class="userInfo-wrapper">
                <i class="iconfont icon-xiaoxi mr20"></i>
                <Dropdown>
                    <a href="javascript:void(0)">
                        <span> <img src="../../assets/img/logo/user.png" alt=""> {{$store.state.userInfo && $store.state.userInfo.name || ''}} </span>
                    </a>
                    <DropdownMenu slot="list" trigger='click' v-if="$store.state.userInfo.name">
                        <DropdownItem v-if='this.$store.state.routerList&&this.$store.state.routerList.length'>
                            <p @click='consoleDesk'>后台管理</p>
                        </DropdownItem>
                        <DropdownItem>
                            <p @click='goMe'>个人中心</p>
                        </DropdownItem>
                        <DropdownItem>
                            <p @click='goOut'>退出登录</p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <!-- <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon> -->
        </Header>
        <!-- 横向菜单 -->
        <div class="g-menu" v-if="isWorkPage">
            <ul class="ul">
                <li class="li" v-for='(v,i) in menu' :key='i' @click.prevent='changeMenu(v,i)' :class="changeMenuIndex==i?'hover':''">
                    <!-- <span v-if='v.children&&v.children.length==0'>{{v.mdlname}}</span> -->
                    <Dropdown @on-click='changeMenuItem' >
                        <span :class="{'hover': v.isAct}"> {{v.mdlname}}</span>
                        <DropdownMenu slot="list" v-if="v.children.length">
                            <DropdownItem v-for='(val,ind) in v.children' :key='ind' :name='JSON.stringify(val)' :selected="activeName === val.mdlhref">
                                <p class="g-menu-down">{{val.mdlname}}</p>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </li>
            </ul>
        </div>
        <!-- 面包屑 -->
        <span v-if='isShowBack&&isWorkPage' @click='goBack' class="back"> <i class="iconfont icon-fanhui"></i> </span>
        <Breadcrumb v-if="isWorkPage"></Breadcrumb>
    </div>
</template>

<script type = 'text/javascript'>
    import Breadcrumb from '@/components/Breadcrumb';
    export default {
        name: 'headerBar',
        props: ['bg'],
        data() {
            return {
                isCascader: false,
                titleBg: require('@/assets/img/bg/special_title_bg.png'),
                routerInfo: [],
                show: false,
                indexClass: this.$route.name,
                isCollapsed: false,
                isMenuShow: false,
                changeMenuIndex: 0,
                time: new Date().pattern('yyyy年MM月dd日 HH:mm:ss'),
            }
        },
        components: {
            Breadcrumb
        },
        computed: {
            isWorkPage() {
                return /^\/home\/index\//.test(this.$route.path)
            },
            readable(){
                return this.$store.state.homeRouterList.map(o => ['', 'specialIndex', 'ITBasicResources', 'businessIndex', 'assetWarning'].indexOf(o.shorthref));
            },
            inside() {
                let routename = this.$route.name;
                return [
                    [],
                    ['specialTable','specialTablexz','specialTableDetail','specialMoneyUse','specialMoneyUsez'],
                    ['ITBasicResources', 'ITdepartment', 'pcRoom', 'department', 'resources', 'tablepage', 'jifangdefault','ITcityState'],
                    ['businessIndex', 'businessDepartment', 'businessTotal', 'businessMoney', 'provinceDetail', 'tableDetail', 'businessTable', 'businessdefault','businessCityState'],
                    ['assetWarning', 'warningDepartment', 'assetAnalysis', 'assetTotal', 'warningDeptDetali','warningCityState','completexz','assetTable','completeDetail']
                ].filter((o, i) => {
                    return i === 0 || this.readable.indexOf(i) > -1;
                }).map(o => {
                    return o.some(o => o === routename)
                });
            },
            menu() {
                return this.leftMenu.map((o, i) => ({ ...o,
                    isAct: this.inside[i]
                }))
            },
            leftMenu() {
                return [{
                    mdlhref: 'homepage',
                    mdlname: '首页',
                    children: [],
                    mdliconcss: 'icon-shouye',
                }, ...this.$store.state.homeRouterList];
            },
            activeName() {
                let routenames = [null, null, ['ITBasicResources', 'ITdepartment','ITcityState'],
                    ['businessIndex', 'businessDepartment','businessCityState'],
                    ['assetWarning', 'warningDepartment','warningCityState']
                ].filter((o, i) => {
                    return i === 0 || this.readable.indexOf(i) > -1;
                });
                let {query} = this.$route;
                let typeThree = '';
                if(typeof query.isCityState !== 'undefined'){
                    typeThree = (query.isCityState == 'true')||(query.isCityState == true) ? 2 : query.radioBtn == 1 ? 1 : 0;
                }
                else {
                    return this.$route.name;
                }
                let activeName = routenames.filter((o, i) => {
                    if (o && this.inside[i]) {
                        return true
                    } else {
                        return false;
                    }
                })[0][typeThree];
                return activeName || this.$route.name;
            },
            /* 返回按钮图标 */
            isShowBack() {
                let pathArr = ['ITBasicResources', 'businessIndex', 'assetWarning', 'businessDepartment', 'ITdepartment', 'warningDepartment','homepage','ITcityState','businessCityState','warningCityState', 'specialTable', 'specialMoneyUse']
                if (pathArr.indexOf(this.$route.name) != -1&&this.$route.path.indexOf('index')!=-1) {
                    return false;
                } else if (this.$route.query && this.$route.query.from && this.$route.query.from == 'leaderCockpit') {
                    return false
                } else {
                    return true
                }
            }
        },
        mounted() {
            this.updatedTime();
        },
        methods: {
            searchShow() {
                let className = this.$refs.headerSearch.className
                this.$refs.headerSearch.className = className + ' show'
                // 
            },
            searchHide() {
                let className = this.$refs.headerSearch.className
                this.$refs.headerSearch.className = className.replace(/ show/g, '');
            },
            goOut() {
                this.$router.push({
                    path: '/login'
                })
                // window.sessionStorage.removeItem('routerList')
                // window.sessionStorage.removeItem('USERINFO')
                this.$store.commit("get_token", '');
                this.$store.commit("get_userInfo", '');
                this.$store.commit("get_routerList", '');
                this.$store.commit("get_homeRouterList", '');
                // window.sessionStorage.removeItem('TOKEN')si
            },
            consoleDesk() {
                this.$router.push({
                    path: '/home/consoleDesk/userManagement'
                })
            },
            goMe() {
                this.$router.push({
                    path: "/home/userInfo/accountManagement"
                })
            },
            handleSelect(e) {
                e = JSON.parse(e);
                if (e.mdlname === '数据资产综合分析') {
                    this.indexClass = '';
                    let routeData = this.$router.resolve({
                        name: 'specialIndex'
                    });
                    window.sessionStorage.removeItem('openUrl');
                    window.open(routeData.href, "_blank");
                } else {
                    window.sessionStorage.removeItem('openUrl');
                    this.indexClass = e.shorthref;
                    this.$store.commit('get_bread', {
                        pathName: e.shorthref,
                        name: e.mdlname
                    });
                    this.$router.push({
                        name: e.shorthref
                    })
                }
            },
            changeMenu(e, i) {
                this.changeMenuIndex = i;
                if (e.children.length <= 0) {
                    if (e.mdlname === '数据资产综合分析') {
                        this.indexClass = '';
                        let routeData = this.$router.resolve({
                            name: 'specialIndex'
                        });
                        window.sessionStorage.removeItem('openUrl');
                        window.open(routeData.href, "_blank");
                    } else {
                        this.$router.push({
                            name: e.mdlhref
                        })
                        this.$store.commit('get_bread', {
                            pathName: e.shorthref,
                            name: e.mdlname
                        });
                    }
                } else if (e.children.length) {
                    if (e.mdlname === '数据资产综合分析') {
                        this.indexClass = '';
                        let routeData = this.$router.resolve({
                            name: 'specialIndex'
                        });
                        window.sessionStorage.removeItem('openUrl');
                        window.open(routeData.href, "_blank");
                    }
                    this.$store.commit('get_bread', {
                        pathName: e.shorthref,
                        name: e.mdlname
                    });
                }
            },
            changeMenuItem(e) {
                window.sessionStorage.removeItem('openUrl');
                let option = JSON.parse(e);
                this.$router.push({
                    name: option.mdlhref
                });
                this.$store.commit('get_breadSon', {
                    pathName: option.shorthref,
                    name: option.mdlname
                });
            },
            updatedTime() {
                setInterval(() => {
                    this.time = new Date().pattern('yyyy年MM月dd日 HH:mm:ss')
                }, 1000)
            },
            goBack() {
                window.history.go(-1)
            },
            
        },
        beforeDestroy() {
            document.body.removeEventListener('click', this.searchHide)
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../assets/style/base/index.scss';
    .header-bar {
        position: relative; // height: 61px;
    }
    .layout-header-bar {
        // background: #0F193D;
        height: 61px;
        position: relative;
        .title {
            @include nums($w: 461px, $h:61px);
            line-height: 61px;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -230.5px;
            img {
                @include nums($w: 100%, $h:100%);
            }
        }
        .left {
            position: absolute;
            left: 30px;
            top: 0;
            @include font($fz: 18px, $color:#fff);
            font-family: 'xiaobozhe';
            letter-spacing: 0px;
        }
        .userInfo-wrapper {
            float: right;
            margin-right: 24px;
            height: 61px;
            .ivu-dropdown {
                width: 150px;
                line-height: 61px;
                a {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.85);
                    padding-left: 40px;
                    img {
                        @include nums($w: 25px, $h:25px);
                        border-radius: 50%;
                        position: absolute;
                        top: 20px;
                        left: 0;
                    }
                    b {
                        display: inline-block;
                        @include nums($w: 25px, $h:25px);
                        text-align: center;
                        line-height: 25px;
                        background: #fff;
                        border-radius: 50%;
                        position: absolute;
                        top: 40px;
                        left: 0;
                        i {
                            color: #0F193D;
                            z-index: 999;
                        }
                    }
                }
                .ivu-dropdown-item {
                    padding: 0;
                    color: rgba(255, 255, 255, 0.85);
                    p {
                        @include nums($w: 100%, $h:30px);
                        line-height: 30px;
                        text-align: center;
                    }
                }
            }
        }
    }
    .ivu-select-dropdown {
        background: #1C2851!important;
    }
    .headerSearchInputBox {
        min-width: 18px;
        height: 18px;
        margin-right: 20px;
        position: relative;
        top: 26px;
        display: inline-block;
        .inputComp {
            transition: width 300ms ease-in-out;
            opacity: 0;
            width: 0;
            position: relative;
            top: -24px;
        }
        i.iconfont {
            position: absolute;
            left: 10px;
            top: -2px;
            z-index: 10000;
        }
    }
    .headerSearchInputBox.show {
        .inputComp {
            opacity: 1;
            width: 300px;
        }
        i.iconfont {
            color: #999;
        }
    }
    .ivu-input,
    .ivu-input-default {
        padding-left: 33px;
    }
    .g-menu {
        @include nums($w: 100%, $h:36px);
        margin-top: 27px;
        background-image: radial-gradient(51% 100%, rgba(34, 235, 251, 0.2) 20%, transparent 100%)!important;
        border-top: rgba(34, 235, 251, 0.4) solid 1px;
        .ul {
            @include flex($j: center);
            .li {
                line-height: 36px;
                padding: 0 40px;
                @include font($fz: 18px, $color:#e5e5e5);
                cursor: pointer;
                span.hover {
                    color: #00ffe7;
                }
                span:hover{
                    color: #00ffe7;
                }
            }
            .ivu-dropdown-item-selected {
                background: transparent;
                .g-menu-down {
                    color: #00ffe7;
                }
            }
            .g-menu-down {
                @include nums($w: 100%);
                @include font($fz: 18px, $color:#fff);
                &:hover {
                    color: #00ffe7;
                }
            }
        }
    }
    .back {
        position: absolute;
        right: 30px;
        bottom: 15px;
        z-index: 99;
        cursor: pointer;
        i{
            font-size: 20px;
        }
        &:hover {
            color: #00ffe7;
        }
    }
</style>
