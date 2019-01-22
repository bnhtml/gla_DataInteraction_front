// 未发布
<template>
    <div class="published">
        <!-- <c-admin :deptType="deptType"> -->
            <el-card shadow="always" class="published-header">
                <p class="titleLeftBorder">筛选查询</p>
                <TableSearch :searchs='searchs'></TableSearch>
            </el-card>
            <el-card shadow="always" class="published-cont mt20">
                <p class="titleLeftBorder">
                    未发布数据接口列表
                    <span class="right"><i class="icon iconfont icon-gantanhao"></i>共有数据接口XXX个</span>
                </p>
                <div>
                    <NomalTable :table-json="tableJson" :data="data"></NomalTable>
                </div>
            </el-card>
        <!-- </c-admin> -->
    </div>
</template>

<script>
    import NomalTable from '@/components/table/NomalTable.vue';
    import TableSearch from '../../../components/table/TableSearch.vue';
    import cAdmin from '../admin.vue';
    import {
         unpublishedData,
    unpublishedTableJson,
    } from './JSON/default.js';
    export default {
        data() {
            return {
                // deptType: this.$route.query.deptType - 0,
                searchs: {
                    list: [{
                        "type": "input-select", //输入文本
                        label: "",
                        "name": "apiName",
                        "value": "",
                        "placeholder": "请选择",
                        options: [{
                            value: '全部',
                            label: '全部'
                        }, {
                            value: '已封装',
                            label: '已封装'
                        }, {
                            value: '未封装',
                            label: '未封装'
                        }, ]
                    },{
                        "type": "input-select", //输入文本
                        label: "",
                        "name": "apiName",
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
                        name:'name',
                        value:'',
                        "placeholder": "请输入",
                    }]
                },// 搜索类型数据
                tableJson: unpublishedTableJson, // 表头标题
                data: unpublishedData, //表格数据
            }
        },
        components: {
            NomalTable,
            cAdmin,
            TableSearch,
        },
        mounted() {},
        methods: {
            fileUpload(){
                const h = this.$createElement;
                this.$confirm(h('div', null, [
                    h('span', null, '接口说明文档：'),
                    h('fileUpload', null),
                    h('a', {
                        src: 'a.txt',
                        style: {
                            color: '#33ABFB'
                        }
                    }, '模板下载'),
                    h('p', {
                        style: {
                            color: '#999'
                        }
                    }, '支持扩展名：.rar .zip .doc .docx .pdf')
                ]), "数据接口文档上传", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton: true,
                    showConfirmButton:true,
                    showClose:false,
                    }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
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


