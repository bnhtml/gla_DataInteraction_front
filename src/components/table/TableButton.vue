<template>
    <!-- 按钮 -->
    <div class="nomaltable">
        <div class="right-button nomaltable">
            <el-button 
                v-for="(btn, btnIndex) in buttons.list" 
                :key="btnIndex" 
                :size="btn.size" 
                :class="btn.iconClass" 
                plain
                @click="buttonsClick(btn, btnIndex)">
                {{btn.buttonName}}
            </el-button>
        </div>
    </div> 
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props:{
            buttons: Object
        },
        methods: {
            buttonsClick(btn,index) { 
                if(btn.url){
                    this.$router && this.$router.push({ path: btn.url})
                }else{
                    this.$emit('btn-click',index);
                }
            },
        },
        computed: {
        },
        watch:{
        },
        created(){
        }
    }

</script>


<style scoped>

</style>
