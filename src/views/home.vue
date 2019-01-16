 // 首页展示
<template>
    <div class="home">
        <Layout>
            <HeaderBar :bg='"#fff"'></HeaderBar>
            <Layout class="wrapper">
                <router-view></router-view>
            </Layout>
        </Layout>
    </div>
</template>

<script type="text/javascript">
import HeaderBar from '../views/header/headerBar.vue';
    export default {
        name: 'navBar',
        data() {
            return {
                isCollapsed: false,
                isMenuShow: false,
                routerInfo: [],
            }
        },
        components: {
            HeaderBar
        },
      
        mounted() {
            // document.body.addEventListener('click', this.searchHide)
        },
        methods: {
            // searchShow() {
            //     let className = this.$refs.headerSearch.className
            //     this.$refs.headerSearch.className = className + ' show'
            //     // 
            // },
            // searchHide() {
            //     let className = this.$refs.headerSearch.className
            //     this.$refs.headerSearch.className = className.replace(/ show/g, '');
            // },
            // goOut(){
            //     this.$router.push({
            //         path:'/login'
            //     })
            // }
        },
        beforeDestroy() {
            // document.body.removeEventListener('click', this.searchHide)
        }
    }
</script>

<style lang='scss' scoped>
    @import '@/assets/style/base/index.scss';
    .home {
        position: relative;
        overflow: hidden;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        background-image: radial-gradient(51% 150%, #04236C 44%, #000D24 100%)!important;
        .wrapper {
            position: relative;
            background-image: radial-gradient(51% 150%, #04236C 44%, #000D24 100%)!important;
            // padding: 0 30px;
            overflow-y: auto;
        }
    }
    // .layout-header-bar {
    //     background: #0F193D!important;
    //     height: 80px;
    //     &>img {
    //         padding: 17px 0 17px 30px;
    //         transform: scale(1.1);
    //         // line-height: 80px;

    //     }
    //     .userInfo-wrapper {
    //         float: right;
    //         margin-right: 24px;
    //         .ivu-dropdown {
    //             width: 100px;
    //             line-height: 80px;
    //             a {
    //                 font-size: 14px;
    //                 color: rgba(255, 255, 255, 0.85);
    //                 padding-left: 40px;
    //                 img {
    //                     @include nums($w: 25px, $h:25px);
    //                     border-radius: 50%;
    //                     position: absolute;
    //                     top: 20px;
    //                     left: 0;
    //                 }
    //                 b {
    //                     display: inline-block;
    //                     @include nums($w: 25px, $h:25px);
    //                     text-align: center;
    //                     line-height: 25px;
    //                     background: #fff;
    //                     border-radius: 50%;
    //                     position: absolute;
    //                     top: 20px;
    //                     left: 0;
    //                     i {
    //                         color: #0F193D;
    //                         z-index: 999;
    //                     }
    //                 }
    //             }
    //             .ivu-dropdown-item {
    //                 padding: 0;
    //                 p {
    //                     @include nums($w: 100%, $h:30px);
    //                     line-height: 30px;
    //                     text-align: center;
    //                 }
    //             }
    //         }
    //     }
    // }
    .ivu-select-dropdown {
        background: #1C2851!important;
    }
    .headerSearchInputBox {
        min-width: 18px;
        height: 18px;
        margin-right: 20px;
        position: relative;
        display: inline-block;
        .inputComp {
            transition: width 300ms ease-in-out;
            opacity: 0;
            width: 0;
        }
        i.iconfont {
            position: absolute;
            left: 10px;
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
    
</style>

