<template>
   <div class="page">
       <el-row>
           <el-col :span="4" class="label-name">选择数据区:</el-col>
           <el-col :span="12">
                <el-select v-model="dataArea" placeholder="请选择" @change='selectDataArea'>
                    <el-option
                        v-for="item in areaData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
       </el-row>
       <el-row>
           <el-col :span="4" class="label-name">选择数据源:</el-col>
           <el-col :span="11">
               <el-select v-model="dataArea" placeholder="请选择" @change='selectDataArea'>
                    <el-option
                        v-for="item in areaData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
           </el-col>
           <el-col :span="6"><el-button type="primary" @click="updateSource">更新数据源</el-button></el-col>
       </el-row>
       <el-row>
           <el-col :span="6" class="">
               <p>源数据资字段</p>
               <el-table
                    :data="tableData3"
                    height="250"
                    border
                    style="width: 261px">
                    <el-table-column prop="1" label="选择" width="50"></el-table-column>
                    <el-table-column prop="1" label="字段" width="50"></el-table-column>
                    <el-table-column prop="1" label="字段描述" width="80"></el-table-column>
                    <el-table-column prop="1" label="字段类型" width="80"></el-table-column>

               </el-table>
           </el-col>
           <el-col :span="18" class="">
               <p>接口封装字段</p>
           </el-col>
       </el-row>
   </div>
</template>

<script>
export default {
   data() {
      return {
          areaData: [
            {value: '0', label: 'Mysql'},
            {value: '1', label: 'Oracle'},
            {value: '2', label: '易鲸捷'},
        ],
          dataArea:'',

      }
   },
   components: {},
   methods: {
       selectDataArea(value) {

       },
       //更新数据源
       updateSource(){

       }

   },
}
</script>

<style lang="scss" scoped>
.page{
    .el-row{
        padding: 10px 0;
        .label-name{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            text-align: right;
            line-height: 32px;
            margin-right: 10px;
        }
        .el-select{
            width: 468px;
        }
    }
}
</style>
