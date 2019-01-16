// 分页封装
<template>
<div class='my-page'>
    <Row>
        <i-col :span='24'>
            <Page  placement="top"
                :total='totalCount'
                @on-change="getPageIndexs" 
                @on-page-size-change="getPageSizes">
            </Page>
        </i-col>
    </Row>
    <!--调用       父向子：总条数          子向父： 一页显示几条                         第几页-->
    <!-- <myPage :totalCount="totalCount" v-on:getPageIndexs='getPageIndexs' v-on:getPageSizes='getPageSize'></myPage>-->
</div>
</template>
<script>
export default {
    name:'myPage',
    props: ['totalCount'],
    data(){
        return{
            pageInfo:{
                pageNum:1,
                pageSize: 10
            }
        }
    },
    created(){
    },
    methods:{
        getPageIndexs(index){
            this.$emit('getPageIndexs',index);
        },
        getPageSizes(size){
            this.$emit('getPageSizes',size);
        }
    }
}
</script>
<style lang="" scoped>
.my-page{
    text-align: right;
    margin: 24px 0;
}
</style>