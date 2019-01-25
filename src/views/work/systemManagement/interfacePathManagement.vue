// interfacePathManagement
<template>
    <div class="interfacePathManagement">
        <c-admin :deptType="deptType" v-on:checked="deptChecked">
            <el-card shadow="always" class="interfacePathManagement-cont ">
                <p class="titleLeftBorder mt5">服务目录</p>
                <div class="cont-wrapper">
                    <div>
                        <p>一级路径</p>
                        <ul class='ul-header'>
                            <li><span>序号</span><span>一级目录</span><span>映射路径</span></li>
                        </ul>
                        <ul class="ul-cont" v-if='deptData.one&&deptData.one.length'>
                            <li v-for='(v,i) in deptData.one' :key='i' @click='getSeconddir(v)'><span>{{i+1}}</span><span>{{v.first_dir}}</span><span>{{v.firstdir_mapping}}</span></li>
                        </ul>
                        <div class="noData" v-else>暂无数据</div>
                    </div>
                    <div>
                        <p>二级路径</p>
                        <ul class='ul-header'>
                            <li><span>序号</span><span>二级目录</span><span>映射路径</span></li>
                        </ul>
                        <ul class="ul-cont" v-if='deptData.two&&deptData.two.length'>
                            <li v-for='(v,i) in deptData.two' :key='i' @click='getThirddir(v)'><span>{{i+1}}</span><span>{{v.second_dir}}</span><span>{{v.sedir_map}}</span></li>
                        </ul>
                        <div class="noData" v-else>暂无数据</div>
                    </div>
                    <div>
                        <p>三级路径</p>
                        <ul class='ul-header '>
                            <li><span>序号</span><span>三级目录</span><span>映射路径</span></li>
                        </ul>
                        <ul class="ul-cont ul-three" v-if='deptData.three&&deptData.three.length'>
                            <li v-for='(v,i) in deptData.three' :key='i'><span>{{i+1}}</span><span>{{v.third_dir}}</span><span>{{v.thdir_map}}</span></li>
                        </ul>
                        <div class="noData" v-else>暂无数据</div>
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
                query: {},
                deptData: {
                    one: [],
                    two: [],
                    three: [],
                    depart: '', // 部门名称
                    first_dir: '', //一级目录
                    second_dir: '', //二级目录
                }
            }
        },
        components: {
            cAdmin,
        },
        computed: {},
        mounted() {
            // if (this.$route.query.user == 'admin') {
            //     this.getFirstdir({
            //         depart: '贵州省大数据局'
            //     });
            // }
        },
        methods: {
            deptChecked(e) {
                if (e.depart) {
                    this.query = e;
                    this.deptData.two = [];
                    this.deptData.three = [];
                    this.deptData.second_dir = '';
                    this.getFirstdir(e);
                }
            },
            /* 一级目录 */
            getFirstdir(params) {
                this.$api.get_firstdir(params).then(res => {
                    this.deptData.one = res.data;
                })
            },
            /* 二级目录 */
            getSeconddir(e) {
                let params = {
                    ...this.query,
                    first_dir: e.first_dir
                }
                this.$api.get_seconddir(params).then(res => {
                    this.deptData.two = res.data;
                    this.deptData.second_dir = [];
                    this.deptData.three = [];
                })
            },
            /* 三级目录 */
            getThirddir(e) {
                let params = {
                    ...this.query,
                    second_dir: e.second_dir
                }
                this.$api.get_thirddir(params).then(res => {
                    this.deptData.three = res.data;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/style/base/index.scss';
    .interfacePathManagement {
        height: 100%;
        .interfacePathManagement-cont {
            height: 100%;
            /deep/ .el-card__body {
                height: 100%;
            }
            .cont-wrapper {
                display: flex;
                justify-content: space-between;
                margin: 0 -10px; // margin-bottom: 20px;
                height: 100%;
                div {
                    flex: 1;
                    padding: 0 10px;
                    p {
                        @include font($fz: 14px, $color:#333);
                        margin-top: 12px;
                        line-height: 30px;
                    }
                    ul {
                        border: 1px solid #dcdfe6;
                        border-top: 0; // width: call(100%-100px);
                        li {
                            // height: 30px;
                            line-height: 30px;
                            display: flex;
                            justify-content: space-between;
                            &:hover {
                                span {
                                    background: #f8f8f8;
                                }
                                cursor: pointer;
                            }
                            &:last-child {
                                span {
                                    // border-bottom: 0;
                                }
                            }
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
                        }
                        &.ul-header {
                            border-top: solid 1px #dcdfe6;
                            border-bottom: 0;
                            li {
                                &:first-child {
                                    background: #EFF2F5;
                                }
                            }
                        }
                        &.ul-cont {
                            height: -moz-calc(100% - 100px);
                            height: -webkit-calc(100% - 100px);
                            height: calc(100% - 100px);
                            overflow-y: auto;
                        }
                        &.ul-three {
                            li:hover {
                                cursor: default;
                            }
                        }
                    }
                    .noData {
                        border: solid 1px #dcdfe6;
                        border-top-color: #EBEEF5;
                        height: -moz-calc(100% - 100px);
                        height: -webkit-calc(100% - 100px);
                        height: calc(100% - 100px);
                        @include flex($j: center);
                        text-align: center;
                    }
                }
            }
        }
    }
</style>