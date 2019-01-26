// 配置管理
<template>
    <div class="configManagement">
        <el-card shadow="always" class="configManagement-cont g-tableCard">
            <p class="titleLeftBorder">配置日志</p>
            <div>
                <NomalTable :table-json="tableJson" :url="url" v-if='isShow' :axiosType="'post'" ></NomalTable>
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
                url: '',
                query: {}
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
                this.url = `${this.$SERVER_BASE_URL}/new_interface/get_confLog`;
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
            
        }
    }
</style>

