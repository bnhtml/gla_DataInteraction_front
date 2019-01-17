// 已发布
<template>
    <div class="published">
        <el-card shadow="always" class="published-header">
            <p class="titleLeftBorder">筛选条件</p>
            <div class="search">
                <el-select v-model="selectValue" placeholder="请选择" class='mr8'>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="searchValue" placeholder="请输入内容" style='width:300px' class='mr8'></el-input>
                <el-button type="primary">查询</el-button>
            </div>
        </el-card>
        <el-card shadow="always" class="published-header">
            <p class="titleLeftBorder">
                已发布数据接口列表
                <span class="right">共有数据接口XXX个</span>
            </p>
            <div>
                <NomalTable :table-json="tableJson" :data="data"></NomalTable>
            </div>
        </el-card>
    </div>
</template>

<script>
    import NomalTable from '@/components/table/NomalTable.vue';
    import {data,tableJson} from './JSON/default.js';
    export default {
        data() {
            return {
                options: [{
                    value: '数据接口名称',
                    label: '数据接口名称'
                }, {
                    value: '数据接口地址',
                    label: '数据接口地址'
                }, {
                    value: '资源名称',
                    label: '资源名称'
                }, {
                    value: '资源ID',
                    label: '资源ID'
                }, ],
                selectValue: '', // 下拉框内容
                searchValue: '', // 搜索条件
                tableJson: tableJson,
                data:data,
            }
        },
        components: {
            NomalTable
        },
        mounted() {
            console.log(this.tableJson,this.data)
        },
        methods: {
        }
    }
</script>

<style scoped lang="scss">
    .published {
        .published-header {
            margin-top: 20px;
            .search {
                margin-top: 7px;
                span {}
            }
        }
    }
</style>
