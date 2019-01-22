// 已发布
<template>
    <div class="published">
        <c-admin :deptType="deptType" v-on:checked="handelClick">
            <el-card shadow="always" class="published-header">
                <p class="titleLeftBorder">筛选查询</p>
                <TableSearch :searchs='searchs'></TableSearch>
            </el-card>
            <el-card shadow="always" class="published-cont mt20">
                <p class="titleLeftBorder">
                    已发布数据接口列表
                    <span class="right"><i class="icon iconfont icon-gantanhao"></i>共有数据接口XXX个</span>
                </p>
                <div>
                    <NomalTable :table-json="tableJson" :data="data"></NomalTable>
                </div>
            </el-card>
        </c-admin>
    </div>
</template>

<script>
    import NomalTable from '@/components/table/NomalTable.vue';
    import TableSearch from '@/components/table/TableSearch.vue';
    import cAdmin from '../admin.vue';
    import {
        data,
        tableJson
    } from './JSON/default.js';
    export default {
        data() {
            return {
                deptType: this.$route.query.deptType - 0,
                searchs: {
                    list: [{
                        "type": "input-select", //输入文本
                        label: "",
                        "name": "conditionPa",
                        "value": "",
                        "placeholder": "请选择",
                        options: [{
                            value: '数据接口名称',
                            label: '数据接口名称'
                        }, {
                            value: '数据接口地址',
                            label: '数据接口地址'
                        }, {
                            value: '资源名称',
                            label: '资源名称'
                        }, {
                            value: '资源ID',
                            label: '资源ID'
                        }, ]
                    },{
                        type:'input-text',
                        label:'',
                        name:'conditionSo',
                        value:'',
                        "placeholder": "请输入",
                    }]
                },// 搜索类型数据
                tableJson: tableJson, // 表头标题
                data: data, //表格数据
            }
        },
        components: {
            NomalTable,
            cAdmin,
            TableSearch,
        },
        mounted() {
            this.getDoneInterface();
        },
        methods: {
            handelClick(name){
                console.log(name);
            },
            /* 获得表格数据以及查询 */
            getDoneInterface(){
                this.$api.getDone_interface({
                    region:'',//区域
                    depaprt:'',//部门
                    // conditionPa:'',//查询方式（例按数据接口名称查询）
                    // conditionSo:'',//查询具体
                }).then(res=>{
                    console.log(res)
                })
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.deptType = to.query.deptType - 0;
            next();
        }
    }
</script>

<style scoped lang="scss">
    .published {
        .published-header {
            // margin-top: 20px;
        }
    }
</style>
