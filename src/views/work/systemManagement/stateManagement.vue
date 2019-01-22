// 状态管理
<template>
    <div class="stateManagement">
        <el-card shadow="always" class="stateManagement-cont ">
            <p class="titleLeftBorder">
                状态日志
                <span class="right"><i class="icon iconfont icon-gantanhao"></i>共有数据接口XXX个</span>
            </p>
            <div>
                <NomalTable :table-json="tableJson" :data="data" v-if='isShow'></NomalTable>
            </div>
        </el-card>
    </div>
</template>

<script>
    import NomalTable from '@/components/table/NomalTable.vue';
    import TableSearch from '@/components/table/TableSearch.vue';
    import {
        stateManagement
    } from './table.js'
    export default {
        data() {
            return {
                isShow: false, //表格开关
                tableQuery: stateManagement,
                searchs: {},
                tableJson: {},
                data: [],
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
            /* 返回上一页 */
            back() {
                this.$router.push({
                    name: 'stateManagement',
                    query: {}
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '@/assets/style/base/index.scss';
    .stateManagement {
        .stateManagement-header {
        }
    }
</style>

