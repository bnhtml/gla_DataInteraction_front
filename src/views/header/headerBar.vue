<template>
    <div class="header-bar">
        <Header :style="{'background':bg}" class="layout-header-bar">
            <img src="../../assets/img/logo/logo.png" alt=""> 贵州省数据共享交换平台 数据上架系统(技术支持)
        </Header>
        <!-- 横向菜单 -->
        <div class="g-menu" v-if="isWorkPage">
            <ul class="ul">
                <i class="iconfont icon-zhankai"></i>
                <li class="li" v-for='(v,i) in menu' :key='i' @click.prevent='changeMenu(v,i)' :class="changeMenuIndex==i?'hover':''">
                    <!-- <span v-if='v.children&&v.children.length==0'>{{v.mdlname}}</span> -->
                    <!-- <Dropdown @on-click='changeMenuItem' >
                        <span :class="{'hover': v.isAct}"> <i :class="'iconfont '+v.mdliconcss"></i>{{v.mdlname}}</span>
                        <DropdownMenu slot="list" v-if="v.children.length">
                            <DropdownItem v-for='(val,ind) in v.children' :key='ind' :name='JSON.stringify(val)' :selected="activeName === val.mdlhref">
                                <p class="g-menu-down">  {{val.mdlname}}</p>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown> -->
                </li>
            </ul>
        </div>
        <div class="userInfo">
            <img src="../../assets/img/logo/default.jpeg" alt="">
            <span>用户名</span>
        </div>
    </div>
</template>

<script type = 'text/javascript'>
    export default {
        name: 'headerBar',
        props: ['bg'],
        data() {
            return {
                isCascader: false,
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
                    mdlhref: 'leaderCockpit',
                    mdlname: '领导驾驶舱',
                    children: [],
                    mdliconcss: 'icon-lingdaojiashicang',
                },{
                    mdlhref: 'datainteration',
                    mdlname: '数据集成',
                    children: [],
                    mdliconcss: 'icon-shujujicheng',
                },{
                    mdlhref: 'published',
                    mdlname: '数据上架',
                    children: [],
                    mdliconcss: 'icon-shujushangjia',
                },{
                    mdlhref: 'dataAreaManagement',
                    mdlname: '系统管理',
                    children: [],
                    mdliconcss: 'icon-xitongguanli',
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
        background: #fff;
    }
    .layout-header-bar {
        height: 61px;
        position: relative;
        padding: 0 20px;
        font-size: 28px;
        font-size: 36px;
            color: #275B80;
        img{
            position: relative;
            bottom: -10px;
            
        }
    }
    .ivu-se
    lect-dropdown {
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
        @include nums($w: 100%, $h:50px);
        // background-image: radial-gradient(51% 100%, rgba(34, 235, 251, 0.2) 20%, transparent 100%)!important;
        // border-top: rgba(34, 235, 251, 0.4) solid 1px;
        .ul {
            @include flex($j: start);
            i{
                font-size: 22px;
                padding-left: 25px;
            }
            .li {
                height: 50px;
                line-height: 50px;
                margin: 0 40px;
                @include font($fz: 20px, $color:#333);
                cursor: pointer;
                border-bottom: transparent solid 1px;
                i{
                    font-size: 22px;
                    padding-right: 5px;
                }
                span.hover {
                    color: #111;
                }
                span:hover{
                    color: #111;
                }
                &.hover{
                    border-bottom:solid 2px #33ABFB;
                }
            }
            .ivu-dropdown-item-selected {
                background: transparent;
                .g-menu-down {
                    color: #111;
                }
            }
            .g-menu-down {
                @include nums($w: 100%);
                @include font($fz: 18px, $color:#333);
                &:hover {
                    color: #111;
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
    .userInfo{
        position: absolute;
        right: 30px;
        top: 65px;
        @include flex($j:space-between);
        font-size: 14px;
        color: #33ABFB;
        cursor: pointer;
        img{
            width: 35px;
            height: 35px;
            border-radius: 100%;
            margin-right: 10px;
        }
    }
</style>
