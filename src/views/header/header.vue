<template>
    <div class="header-bar">
        <Header :style="{padding: 0,'background':bg}" class="layout-header-bar">
             
            <img src="../../assets/img/logo/logo_big.png" alt="">
            <div class="userInfo-wrapper">
                <div @click.stop="searchShow" class="headerSearchInputBox" ref='headerSearch'>
                    <i class="iconfont icon-sousuo mr20"></i>
                    <Input placeholder="请输入搜索内容" class="inputComp" @on-focus = "focusEvent"/>
                </div>
                <i class="iconfont icon-xiaoxi mr20"></i>
                <Dropdown>
                    <a href="javascript:void(0)">
                        <span> <img src="../../assets/img/logo/user.png" alt=""> {{$store.state.userInfo && $store.state.userInfo.name || '国路安'}} </span>
                    </a>
                    <DropdownMenu slot="list">
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
    </div>
</template>

<script type = 'text/javascript'>
    export default {
        name: 'headerBar',
        props: ['bg'],
        data() {
            return {
              isCascader:false,
                // isCollapsed: false,
                // isMenuShow: false,
                // routerInfo: [],
            }
        },
        components:{
        //   mCascader
        },
        computed: {},
        mounted() {
            document.body.addEventListener('click', this.searchHide);
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
                this.$store.commit("get_routerList", []);
                 this.$store.commit("get_homeRouterList", []);
                // window.sessionStorage.removeItem('TOKEN')
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
            focusEvent () {
            //   this.isCascader = true;
            }
        },
        beforeDestroy() {
            document.body.removeEventListener('click', this.searchHide)
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../assets/style/base/index.scss';
    .header-bar {
        position: relative;
        height: 80px; // background: #0F193D;
        // border:2px solid red;
    }
    .layout-header-bar {
        background: #0F193D;
        height: 80px;
        &>img {
            padding: 23px 0 23px 40px;
            transform: scale(.6);
            margin-top: -12px;
            margin-left: -100px;
        }
        .userInfo-wrapper {
            float: right;
            margin-right: 24px;
            height: 80px;
            .ivu-dropdown {
                width: 150px;
                line-height: 80px;
                a {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.85);
                    padding-left: 40px;
                    img {
                        @include nums($w: 25px, $h:25px);
                        border-radius: 50%;
                        position: absolute;
                        top: 30px;
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
                .ivu-dropdown-item:hover {
                    background: rgba(0, 0, 0, 0.15)!important;
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
        // position: absolute;
        // top: 35px;
        // right: 12%;
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
            top:-2px;
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
</style>
