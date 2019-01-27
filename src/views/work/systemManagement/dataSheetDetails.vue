// 数据表详情
<template>
    <div class="dataSheetDetails">
        <el-card shadow="always" class="dataSheetDetails-header ">
            <h6>数据表详情 <span @click='back'>返回 <i class="icon iconfont icon-shuangjiantou"></i> </span> </h6>
            <p class="titleLeftBorder mt5">筛选查询</p>
            <TableSearch :searchs='searchs' v-if='isShow'></TableSearch>
        </el-card>
        <el-card shadow="always" class="dataSheetDetails-cont mt20">
            <p class="titleLeftBorder">
                数据表列表
                <!-- <span class="right"><i class="icon iconfont icon-gantanhao"></i>共有数据接口XXX个</span> -->
            </p>
            <div>
               <NomalTable :table-json="tableJson" :url="url" v-if='isShow' :axiosType="'post'"  :query="query"></NomalTable>
            </div>
        </el-card>
    </div>
</template>

<script>
    import NomalTable from '@/components/table/NomalTable.vue';
    import TableSearch from '@/components/table/TableSearch.vue';
    import {
        dataSheetDetails
    } from './table.js'
    export default {
        data() {
            return {
                isShow: false, //表格开关
                tableQuery: dataSheetDetails,
                searchs: {},
                tableJson: {},
                data: [],
                query:{}
            }
        },
        
        components: {
            NomalTable,
            TableSearch,
        },
        mounted() {
            this.init();
        },
        methods: {
            /* 更新表格数据信息 */
            init() {
                this.isShow = false;
                this.tableJson = this.tableQuery.tableJson;
                this.searchs = this.tableQuery.searchs;
                this.url = this.tableQuery.url;
                this.$nextTick(() => {
                    this.isShow = true;
                })
            },
            /* 返回上一页 */
            back() {
                this.$router.push({
                    name: 'dataAreaManagement',
                    query: JSON.parse(this.$route.query.backQuery)
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '@/assets/style/base/index.scss';
    .dataSheetDetails {
        .dataSheetDetails-header {
            position: relative;
            h6 {
                @include font($fz: 18px, $color:#333);
                border-bottom: solid 1px #EBEEF5;
                margin: 0 -20px 10px -20px;
                padding:0 0 5px 20px;
                span {
                    position: absolute;
                    right: 40px;
                    @include font($fz: 16px, $color:#33ABFB);
                    cursor: pointer;
                    i{
                    font-size: 12px;
                    }
                }
            }
        }
    }
</style>
