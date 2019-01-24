// businessBureau
<template>
    <div class="businessBureau">
        <el-row :gutter="20">
            <el-col :span="10">
                <el-card shadow="always">
                     <p class="titleLeftBorder">数据区概况</p>
                     <el-row :gutter="20">
                          <el-col :span="12"></el-col>
                          <el-col :span="12"></el-col>
                     </el-row>
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-card shadow="always">
                    <p class="titleLeftBorder">数据目录概况</p>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                
            }
        }
    }
</script>

<style>

</style>
