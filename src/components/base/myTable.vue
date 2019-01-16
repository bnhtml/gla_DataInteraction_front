// table组件封装
<template>
    <div class='my-table'>
        <Table stripe :columns="columns" :data="data" @on-selection-change="getSelectColumn" @on-select-cancel="cancelItem" @on-select="selectItem" @on-select-all="selectItemAll"></Table>
        <!--调用      @on-select='selectlongAndnow' 父向子：表头        数据             子向父： 子函数           父函数-->
        <!-- <myTable :columns='columns' :data="userList"  v-on:getSelectColumn='getSelectColumns'></myTable>-->
    </div>
</template>
<script>
    export default {
        name: 'my-table',
        props: ['columns', 'data'],
        data() {
            return {}
        },
        created() {},
        methods: {
            //获取表格中所选中的行 传给父组件
            getSelectColumn(selection) {
                this.$emit('getSelectColumn', selection);
            },
            selectItemAll(selection) {
                this.$emit('selectItemAll', selection);
            },
            selectItem(selection, row) {
                this.$emit('selectItem', row)
            },
            cancelItem(selection, row) {
                this.$emit('cancelItem', row)
            }
            // selectlongAndnow(long,now){
            //     let longArr=[];
            //     let nowArr = [];
            //     long.forEach((v,i)=>{
            //         longArr.push(v.pkId)
            //     });
            //     // now.forEach((v,i)=>{
            //     //     nowArr.push(v.pkId)
            //     // })
            //     // let data={
            //     //     long: longArr,
            //     //     now: nowArr
            //     // }
            // } 
        }
    }
</script>
<style lang="scss" scoped>
    .my-table {
        .ivu-table-wrapper {
            border: none;
            position: initial!important;
        }
    }
</style>