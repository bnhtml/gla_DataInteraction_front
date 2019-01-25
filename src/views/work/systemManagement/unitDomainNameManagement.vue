//单位域名管理unitDomainNameManagement
<template>
    <div class="unitDomainNameManagement">
        <c-admin :deptType="deptType">
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
                data:[],
                isShow: false,
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
            this.changeTab(this.tabList[0]);
        },
        methods: {
            /* 更新表格数据信息 */
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
