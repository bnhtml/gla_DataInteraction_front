//  文件集成操作 fileOperation
<template>
    <div class="fileOperation">
        <el-card shadow="always" class="fileOperation-cont ">
            <p class="titleLeftBorder">文件集成<span class="right" @click='goOperation'>操作指南 <i class="icon iconfont icon-shuangjiantou"></i> </span></p>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods:{
            goOperation(){
                this.$router.push({
                    name:'fileOperation'
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '@/assets/style/base/index.scss';
    .fileOperation {
        .fileOperation-cont {
            .titleLeftBorder {
                .right {
                    @include font($fz: 16px, $color:#33ABFB);
                    cursor: pointer;
                    i {
                        @include font($fz: 12px, $color:#33ABFB);
                    }
                }
            }
           
        }
    }
</style>
