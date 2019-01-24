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
                    <span class="right"><i class="icon iconfont icon-gantanhao"></i>共有数据接口{{totalCount}}个</span>
                </p>
                <div>
                    <NomalTable :table-json="tableJson" :url="url" v-if='isShow' :axiosType="'post'" @receive="receive" :query="query"></NomalTable>
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
        published
    } from './table.js';
    export default {
        data() {
            return {
                deptType: this.$route.query.deptType - 0,
                searchs: {}, // 搜索类型数据
                tableJson: {}, // 表头标题
                data: [], //表格数据
                url: '',
                totalCount: 0,
                tableQuery: published,
                isShow: false,
                query: {}
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
            deptType: function(e, b, c) {
                this.init()
            }
        },
        mounted() {
            if (this.$route.query.user == 0) {
                this.query.depart = '国家工信部'
            } else {
                this.query.depart = '贵州省工商局'
            }
            this.handelClick({
                depart: this.query.depart
            })
        },
        methods: {
            receive(res){
                this.totalCount = res.page.totalCount;
            },
            handelClick(e) {
                this.query = e;
                this.init();
            },
            init() {
                this.isShow = false;
                let tableJson = this.tableQuery.tableJson;
                let searchs = this.tableQuery.searchs;
                let data = this.tableQuery.data;
                this.searchs = searchs;
                this.tableJson = tableJson;
                this.url = `${this.$SERVER_BASE_URL}/new_interface/getDone_interface`;
                this.data = data;
                this.$nextTick(() => {
                    this.isShow = true;
                })
            },
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
