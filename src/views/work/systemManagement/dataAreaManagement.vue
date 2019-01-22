//数据区管理
<template>
    <div class="dataAreaManagement">
        <c-admin :deptType="deptType" v-on:checked="handelClick">
            <el-card shadow="always" class="dataAreaManagement-header ">
                <el-tabs v-model="activeTab" @tab-click="changeTab">
                    <el-tab-pane v-for='(v,i) in tabList' :key='i' :label="v.label" :name="v.name"></el-tab-pane>
                </el-tabs>
                <p class="titleLeftBorder mt5">筛选查询</p>
                <TableSearch :searchs='searchs' v-if='isShow'></TableSearch>
            </el-card>
            <el-card shadow="always" class="dataAreaManagement-cont mt20">
                <p class="titleLeftBorder">
                    {{activeTabTitle}}列表
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
    import {
        dataArea,
        dataAreaFile,
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
                tableQuery: {
                    dataArea,
                    dataAreaFile
                },
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
            // this.getFirstdir();
        },
        methods: {
            handelClick(e){
                console.log(e)
            },
            /* 更新表格数据信息 */
            init() {
                this.isShow = false;
                let tableJson = this.tableQuery[this.activeTab].tableJson;
                let searchs = this.tableQuery[this.activeTab].searchs;
                let data = this.tableQuery[this.activeTab].data;
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
            },
            
            
        }
    }
</script>

<style scoped lang="scss">

</style>


