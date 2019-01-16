// 面包屑组件封装
<template>
    <div class="breadcrumb">
        <!-- <Card> -->
        <Breadcrumb separator=" <i class='iconfont icon-xiangyou ' style='font-size:8px; color:#FFF;opacity: 0.85;'></i> ">
            <span><i class=" iconfont icon-dingwei"></i></span>
            <BreadcrumbItem v-if='this.$store.state.bread.pathName' :to="{name:this.$store.state.bread.pathName}">
                <span @click='changeBread($store.state.bread.pathName)'>{{this.$store.state.bread.name}}</span>
            </BreadcrumbItem>
            <BreadcrumbItem v-if='this.$store.state.breadSon.pathName' :to="{name:this.$store.state.breadSon.pathName}">
                <span @click="changeBreadSon($store.state.breadSon.pathName)">{{this.$store.state.breadSon.name}}</span>
            </BreadcrumbItem>
            <BreadcrumbItem v-if='this.$store.state.breadGrandson.pathName' :to="{name:this.$store.state.breadGrandson.pathName,params:{pagename:this.$store.state.breadGrandson.pagename|| ''}, query:{type:this.$store.state.breadGrandson.type || ''}}">
                <span @click="changeBreadGrandSon($store.state.breadGrandson.pathName)">{{this.$store.state.breadGrandson.name}}</span>
            </BreadcrumbItem>
            <BreadcrumbItem v-if="this.$store.state.breadGreatGrandson.pathName" :to="{name:this.$store.state.breadGreatGrandson.pathName}">
                <span>{{this.$store.state.breadGreatGrandson.name}}</span>
            </BreadcrumbItem>
        </Breadcrumb>
        <span v-if='isShow' @click='goBack' class="back"> <i class="iconfont icon-fanhui"></i> </span>
        <!-- </Card> -->
    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {}
        },
        computed: {
            isShow() {
                if ((this.$route.path == '/home/index/leaderCockpit') ||
                    (this.$route.path == '/home/index/ITBasicResources') ||
                    (this.$route.path == '/home/index/businessIndex') ||
                    (this.$route.path == '/home/index/assetWarning')
                ) {
                    return false;
                } else if (this.$route.query && this.$route.query.from && this.$route.query.from == 'leaderCockpit') {
                    return false
                } else {
                    return true
                }
            }
        },
        mounted() {
        
        },
        methods: {
            goBack() {
                window.history.go(-1)
            },
            changeBread(path) {
                this.$store.commit('get_breadSon', '');
                this.$store.commit('get_breadGrandson', '');
                this.$store.commit('get_breadGreatGrandson', '');
            },
            changeBreadSon(path) {
                this.$store.commit('get_breadGrandson', '');
                this.$store.commit('get_breadGreatGrandson', '');
            },
            changeBreadGrandson(path) {
                this.$store.commit('get_breadGreatGrandson', '');
            }
            /* 
            get_bread
            get_breadSon
            get_breadGrandson
            get_breadGreatGrandson
             */
        }
    }
</script>

<style lang='scss' scoped>
    @import '@/assets/style/base/index.scss';
    .breadcrumb {
        margin: 20px 30px 15px 30px;
        position: relative;
    }
    .back {
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 0px;
        i {
            @include font($fz: 16px, $color:rgba(255, 255, 255, 0.65));
            position: relative;
            top: -2px;
        }
    }
    .back:hover {
        color: #00ffe7;
        i {
            color: #00ffe7;
        }
    }
</style>
