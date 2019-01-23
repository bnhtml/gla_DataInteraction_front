// 已发布
<template>
    <div class="published">
        <c-admin :deptType="deptType" v-on:checked="handelClick">
            <el-card shadow="always" class="published-header">
                <p class="titleLeftBorder">筛选查询</p>
                <TableSearch :searchs='searchs' v-if='isShow'></TableSearch>
            </el-card>
            <el-card shadow="always" class="published-cont mt20">
                <p class="titleLeftBorder">
                    已发布数据接口列表
                    <span class="right"><i class="icon iconfont icon-gantanhao"></i>共有数据接口XXX个</span>
                </p>
                <div>
                    <NomalTable :table-json="tableJson" :data="data" v-if='isShow'></NomalTable>
                </div>
            </el-card>
        </c-admin>
    </div>
</template>

<script>
    import NomalTable from '@/components/table/NomalTable.vue';
    import TableSearch from '@/components/table/TableSearch.vue';
    import cAdmin from '../admin.vue';
    import {published} from  './JSON/table.js'
    export default {
        data() {
            return {
                deptType: this.$route.query.deptType - 0,
                searchs: {}, // 搜索类型数据
                tableJson: {}, // 表头标题
                data: [], //表格数据
                tableQuery:published,
                isShow:false,
            }
        },
        components: {
            NomalTable,
            cAdmin,
            TableSearch,
        },
        beforeRouteUpdate(to, from, next) {
            const newDeptType = to.query.deptType;
            const oldDeptType = from.query.deptType;
            if (oldDeptType !== newDeptType) {
                this.init();
            }
            next();
        },
        watch: {
            deptType: function(e,b,c) {
                this.init()
            }
        },
        mounted() {
            this.init();
            this.getDoneInterface();
        },
        methods: {
            handelClick(name) {
                console.log(name);
            },
            init() {
                this.isShow = false;
                let tableJson = this.tableQuery.tableJson;
                let searchs = this.tableQuery.searchs;
                let data = this.tableQuery.data;
                this.searchs = searchs;
                this.tableJson = tableJson;
                this.data = data;
                this.$nextTick(() => {
                    this.isShow = true;
                })
            },
            /* 获得表格数据以及查询 */
            getDoneInterface() {
                this.$api.getDone_interface({
                    region: '', //区域
                    depaprt: '', //部门
                    // conditionPa:'',//查询方式（例按数据接口名称查询）
                    // conditionSo:'',//查询具体
                }).then(res => {
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
