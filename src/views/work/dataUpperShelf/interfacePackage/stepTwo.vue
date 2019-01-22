<template>
   <div class="stepTwo">
       <div class="flex-block">
           <div class="label-name">选择数据区:</div>
           <div>
                <el-select v-model="dataArea" placeholder="请选择" @change='selectDataArea'>
                    <el-option
                        v-for="item in areaData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
       </div>
       <div class="flex-block">
           <div class="label-name">选择数据源:</div>
           <div>
               <el-select v-model="dataArea" placeholder="请选择" @change='selectDataArea'>
                    <el-option
                        v-for="item in areaData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
           </div>
           <div><el-button type="primary" @click="updateSource">更新数据源</el-button></div>
       </div>
       <div class="flex-block">
           <div class="tabel-left">
               <p>源数据资字段</p>
               <el-table
                    :data="sourceData"
                    height="250"
                    border
                    style="width: 261px">
                    <el-table-column prop="1" label="选择" width="50"></el-table-column>
                    <el-table-column prop="1" label="字段" width="50"></el-table-column>
                    <el-table-column prop="1" label="字段描述" width="80"></el-table-column>
                    <el-table-column prop="1" label="字段类型" width="80"></el-table-column>

               </el-table>
           </div>
           <div class="tabel-right">
               <p>接口封装字段</p>
               <el-table
                    :data="interfaceData"
                    height="250"
                    border
                    style="width: 600px">
                    <el-table-column 
                        v-for="item in tHeadDatas" 
                        :key="item.props"
                        :prop='item.props'
                        :label='item.label'
                        :width="item.width">
                    </el-table-column>
               </el-table>
           </div>
       </div>
       <div class="flex-block">
           <div class="sqlHead">SQL语句</div>
           <div class="createSql">
               <el-button type="success" @click="createSql">生成sql语句</el-button>
           </div>
           <div class="testSql">
               <el-button type="warning" @click="testSql">sql语句测试</el-button>
           </div>
       </div>
       <div class="flex-block">
           <el-input 
                type="textarea" 
                resize='none'
                :rows="4"
                placeholder="请输入备注"
                v-model="remarks"></el-input>
       </div>
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
        sourceData: [],
        interfaceData: [],
        dataArea:'',
        tHeadDatas:[
            {props:'a', label:'序号', width:''},
            {props:'a1', label:'字段', width:''},
            {props:'a2', label:'字段描述', width:''},
            {props:'a3', label:'字段类型', width:''},
            {props:'a4', label:'库名', width:''},
            {props:'a5', label:'库名描述', width:''},
            {props:'a6', label:'表名', width:''},
            {props:'a7', label:'表描述', width:''},
            {props:'a8', label:'值', width:''},
            {props:'a9', label:'关系', width:''},
            {props:'a0', label:'操作', width:''},
        ],
        remarks:'',

      }
   },
   components: {},
   methods: {
       selectDataArea(value) {

       },
       //更新数据源
       updateSource(){

       },
       //生成sql语句
       createSql() {

       },
       //sql语句测试
       testSql() {

       },

   },
}
</script>

<style lang="scss" scoped>
.stepTwo{
    .flex-block{
        display: flex;
        padding: 10px 0 10px 153px;
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
            margin-right: 10px;
        }
        .tabel-left{
            margin-right: 70px;
        }
        .tabel-left,.tabel-right{
            p{
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #333333;
                margin-bottom: 10px;
            }
        }
        .sqlHead{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #333333;
            margin-bottom: 10px;
            margin-right: 640px;
        }
        .createSql{
            margin-right: 10px;
        }
        .el-textarea{
            width: 930px;
        }
    }
}
</style>
