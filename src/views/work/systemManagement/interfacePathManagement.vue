// interfacePathManagement.vue
<template>
    <div class="interfacePathManagement">
        <c-admin :deptType="deptType">
            <el-card shadow="always" class="interfacePathManagement-cont mt20">
                <p class="titleLeftBorder mt5">服务目录</p>
                <div class="cont-wrapper">
                    <div>
                        <p>一级路径</p>
                        <ul class='ul-header'>
                            <li><span>序号</span><span>一级目录</span><span>映射路径</span></li>
                        </ul>
                        <ul class="ul-cont">
                            <li v-for='(v,i) in data.one' :key='i'><span>{{i+1}}</span><span>{{v.catalog}}</span><span>{{v.path}}</span></li>
                        </ul>
                    </div>
                    <div>
                        <p>二级路径</p>
                        <ul class='ul-header'>
                            <li><span>序号</span><span>二级目录</span><span>映射路径</span></li>
                        </ul>
                        <ul class="ul-cont">
                            <li v-for='(v,i) in data.two' :key='i'><span>{{i+1}}</span><span>{{v.catalog}}</span><span>{{v.path}}</span></li>
                        </ul>
                    </div>
                    <div>
                        <p>三级路径</p>
                        <ul class='ul-header'>
                            <li><span>序号</span><span>三级目录</span><span>映射路径</span></li>
                        </ul>
                        <ul class="ul-cont">
                            <li v-for='(v,i) in data.three' :key='i'><span>{{i+1}}</span><span>{{v.catalog}}</span><span>{{v.path}}</span></li>
                        </ul>
                    </div>
                </div>
            </el-card>
        </c-admin>
    </div>
</template>

<script>
    import cAdmin from '../admin.vue';
    export default {
        data() {
            return {
                deptType: this.$route.query.deptType - 0,
                tabList: [{
                    label: '数据库',
                    name: 'dataArea'
                }, {
                    label: '文件类',
                    name: 'dataAreaFile'
                }],
                activeTab: 'dataArea',
                activeTabTitle: '数据库',
                data: {
                    one: [{
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, ],
                    two: [{
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, ],
                    three: [{
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, {
                        catalog: '工商局',
                        path: '路径'
                    }, ],
                }
            }
        },
        components: {
            cAdmin,
        },
        computed: {},
        mounted() {},
        methods: {}
    }
</script>

<style scoped lang="scss">
    @import '@/assets/style/base/index.scss';
    .interfacePathManagement {
        .interfacePathManagement-cont {
            .cont-wrapper {
                display: flex;
                justify-content: space-between;
                margin: 0 -10px;
                margin-bottom: 20px;
                div {
                    flex: 1;
                    padding: 0 10px;
                    p {
                        @include font($fz: 14px, $color:#333);
                        margin-top: 12px;
                        line-height: 30px;
                    }
                    ul {
                        border: 1px solid #CCC;
                        border-top: 0;
                        &.ul-header {
                            border-top: solid 1px #ccc;
                            border-bottom: 0;
                            li {
                                &:first-child {
                                    background: #EFF2F5;
                                }
                            }
                        }
                        &.ul-cont{
                            max-height: 600px;
                            overflow-y: auto;
                        }
                        li {
                            height: 30px;
                            line-height: 30px;
                            display: flex;
                            justify-content: space-between;
                            span {
                                border-right: solid 1px #EBEEF5;
                                border-bottom: solid 1px #EBEEF5;
                                box-sizing: border-box;
                                text-align: center;
                                &:nth-child(2),
                                &:nth-child(3) {
                                    flex: 1
                                }
                                &:nth-child(3) {
                                    border-right: none;
                                }
                                &:first-child {
                                    width: 50px;
                                    text-align: center;
                                }
                            }
                            // &:last-child {
                            //     span {
                            //         border-bottom: 0;
                            //     }
                            // }
                        }
                    }
                }
            }
        }
    }
</style>