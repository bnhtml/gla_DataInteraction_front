//单位域名管理unitDomainNameManagement
<template>
    <div class="unitDomainNameManagement">
        <c-admin :deptType="deptType" v-on:checked="handelClick">
            <el-card shadow="always" class="unitDomainNameManagement-header ">
                <p class="titleLeftBorder mt5">筛选查询</p>
                <TableSearch :searchs='searchs' v-if='isShow'></TableSearch>
            </el-card>
            <el-card shadow="always" class="unitDomainNameManagement-cont mt20 g-tableCard">
                <p class="titleLeftBorder">
                    单位域名管理列表
                    <!-- <span class="right">共有数据接口XXX个</span> -->
                </p>
                <div>
                    <NomalTable :table-json="tableJson" :url="url" axiosType="post" v-if='isShow' :query="query"></NomalTable>
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
        unitDomainNameManagement
    } from './table.js'
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
                activeTabTitle:'数据库',
                tableQuery: unitDomainNameManagement,
                searchs:{},
                tableJson:{},
                isShow: false,
                url: '',
                query: {}
            }
        },
        components: {
            NomalTable,
            TableSearch,
            cAdmin,
        },
        computed: {
           
        },
        mounted() {
            // this.changeTab(this.tabList[0]);
        },
        methods: {
            /* 更新表格数据信息 */
            init() {
                let tableJson = this.tableQuery.tableJson;
                let searchs = this.tableQuery.searchs;
                let data = this.tableQuery.data;
                this.searchs = searchs;
                this.tableJson = tableJson;
                this.url = `${this.$SERVER_BASE_URL}/new_interface/get_departDomain`;
                this.$nextTick(() => {
                    this.isShow = true;
                })
            },
            handelClick(query){
                this.isShow = false;
                this.query = query;
                this.init();
            },
            /* tab切换 */
            changeTab(tab) {
                this.activeTab = tab.name;
                this.activeTabTitle = tab.label;
                this.init();
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
