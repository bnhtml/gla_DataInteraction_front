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
            <el-card shadow="always" class="dataAreaManagement-cont mt20 g-tableCard">
                <p class="titleLeftBorder">
                    {{activeTabTitle}}列表
                    <!-- <span class="right"><i class="icon iconfont icon-gantanhao"></i>共有数据接口XXX个</span> -->
                </p>
                <div>
                   <NomalTable :table-json="tableJson" :url="url" v-if='isShow' :axiosType="'post'"  :query="query"></NomalTable>
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
                activeTabTitle: '数据库',
                tableQuery: {
                    dataArea,
                    dataAreaFile
                },
                searchs: {},
                tableJson: {},
                url:'',
                isShow: false,
                query:{
                    depart:''
                }
            }
        },
        components: {
            NomalTable,
            TableSearch,
            cAdmin,
        },
        computed: {},
        beforeRouteUpdate(to, from, next) {
            const newUser = to.query.user;
            const oldUser = from.query.user;
            if (oldUser !== newUser) {
                this.init();
            }

            this.deptType = to.query.deptType - 0;
            next();
        },
        watch: {
            user: function() {
                this.init()
            }
        },
        mounted() {
            this.changeTab(this.tabList[0]);
            // this.getFirstdir();
        },
        methods: {
            handelClick(e) {
                console.log(e)
                 this.query.depart = e.depart;
                 this.init();
            },
            
            /* 更新表格数据信息 */
            init() {
                this.isShow = false;
                this.tableJson = this.tableQuery[this.activeTab].tableJson;
                this.searchs = this.tableQuery[this.activeTab].searchs;
                this.url = this.tableQuery[this.activeTab].url;
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
            getQueryDatabaseClass(){
                this.$api.query_databaseClass({
                    depart:this.query.depart
                    }).then(res=>{
                    console.log(res)
                })
            }
        },
    }
</script>

<style scoped lang="scss">

</style>


