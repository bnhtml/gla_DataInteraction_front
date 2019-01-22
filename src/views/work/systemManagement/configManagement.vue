// 配置管理
<template>
    <div class="configManagement">
        <el-card shadow="always" class="configManagement-cont mt20">
            <p class="titleLeftBorder">
                配置日志
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
        configManagement
    } from './table.js'
    export default {
        data() {
            return {
                isShow: false, //表格开关
                tableQuery: configManagement,
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
                    name: 'configManagement',
                    query: {}
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '@/assets/style/base/index.scss';
    .configManagement {
        .configManagement-header {
            // h6 {
            //     @include font($fz: 18px, $color:#333);
            //     border-bottom: solid 1px #EBEEF5;
            //     margin: 0 -20px 10px -20px;
            //     padding: 0 0 5px 20px;
            //     span {
            //         position: absolute;
            //         right: 40px;
            //         @include font($fz: 16px, $color:#33ABFB);
            //         cursor: pointer;
            //         i {
            //             font-size: 12px;
            //         }
            //     }
            // }
        }
    }
</style>

