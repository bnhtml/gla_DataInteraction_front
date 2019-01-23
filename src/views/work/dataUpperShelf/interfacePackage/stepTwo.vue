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
               <el-select v-model="dataSource" placeholder="请选择" @change='selectDataSource'>
                    <el-option
                        v-for="item in tabMsg"
                        :key="item.tabName"
                        :label="item.tabName"
                        :value="item.tabName">
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
                    style="width: 100%"
                    v-if="tableShow"
                    ref="selectionTable"
                    @select	='selectList'
                    @select-all="selectAll">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="fieldName" label="字段" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="fieldDesc" label="字段描述" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="fieldTyep" label="字段类型" show-overflow-tooltip></el-table-column>
               </el-table>
           </div>
           <div class="tabel-right">
               <p>接口封装字段</p>
               <el-table
                    :data="interfaceData"
                    height="250"
                    border
                    style="width: 100%">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column 
                        v-for="item in tHeadDatas" 
                        :key="item.props"
                        :prop='item.props'
                        :label='item.label'
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="修饰符" width="120px">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.modifier" placeholder="请选择" size="mini">
                                <el-option
                                    v-for="item in modifierData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="值" width="120px">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.value" placeholder="请输入值" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="关系" width="120px">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.relation" placeholder="请选择" size="mini">
                                <el-option label="or" value="or"></el-option>
                                <el-option label="and" value="and"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <!-- <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData4)"
                                type="text"
                                size="small">
                                移除
                            </el-button> -->
                        </template>
                    </el-table-column>
               </el-table>
           </div>
       </div>
       <div class="flex-block sql-btn">
           <div class="sqlHead">SQL语句</div>
           <div >
               <el-button type="success" class="createSql" @click="createSql">生成sql语句</el-button>
               <el-button type="warning" class="testSql" @click="testSql">sql语句测试</el-button>
           </div>
       </div>
       <div class="flex-block">
           <el-input 
            
                type="textarea" 
                resize='none'
                :rows="4"
                placeholder="请输入sql语句"
                v-model="remarks"></el-input>
       </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
        dataArea:'Mysql',
        areaData: [
            {value: 'Mysql', label: 'Mysql'},
            {value: 'Oracle', label: 'Oracle'},
            {value: '易鲸捷', label: '易鲸捷'},
        ],
        dataSource:'',
        tabMsg:[],
        tableShow: true,
        sourceData: [],
        sourceDataFlag: true,
        interfaceData: [],
        tHeadDatas:[
            {props:'fieldName', label:'字段'},
            {props:'fieldDesc', label:'字段描述'},
            {props:'fieldTyep', label:'字段类型'},
            {props:'dabaName', label:'库名'},
            {props:'dabaDesc', label:'库名描述'},
            {props:'tabName', label:'表名'},
            {props:'tabDesc', label:'表描述'},
        ],
        modifier:'',
        modifierData:[
            {label:'-',value:'-'},
            {label:'=',value:'='},
            {label:'!=',value:'!='},
            {label:'>',value:'>'},
            {label:'<',value:'<'},
            {label:'>=',value:'>='},
            {label:'<=',value:'<='},
        ],
        tValue:'',
        relation:'',
        remarks:'',

      }
   },
   components: {},
   mounted(){
       this.selectDataArea(this.dataArea);
   },
   methods: {
       //选择数据区
       selectDataArea(value) {
           this.dataSource = '';
           this.$api.get_tabMsg({departName:'贵州省大数据局', dataArea: value}).then(res=>{
               this.tabMsg = res.data;
           })
       },
       setSelected(o){
        //    console.log(this.$refs, '====')
           this.$nextTick(() => this.$refs.selectionTable.toggleRowSelection(o, true));
       },
        //选择数据源
       selectDataSource(value){
            this.tableShow = false;
            this.$api.get_fieldMsg({departName:'贵州省大数据局',tabName: value}).then(res=>{
                this.sourceData = res.data.map(o => {
                    let idKey = this.dataArea + '_' + this.dataSource + '_' + o.fieldName;
                    
                    return {...o, idKey, modifier: '', value: '', relation: '' }
                });
                this.tableShow = true;
                this.sourceData.forEach(o => {
                    let idKey = o.idKey;

                    this.interfaceData.map(o => o.idKey).indexOf(idKey) > -1 && this.setSelected(o);
                })
           })
       },
       //更新数据源
       updateSource(){
           
       },
       selectAll(selection){
           this.sourceData.forEach(o => this.selectList(this.sourceData, o, !!selection.length));
       },
       // 选择表数据
       selectList(selection, row, isPush){
        //    在数组中的位置，为-1不再里面
           let inThisIdx = this.interfaceData.map(o => o.idKey).indexOf(row.idKey);
           if(isPush === undefined){
            if(inThisIdx > -1){
                this.interfaceData.splice(inThisIdx, 1);
            }else{
                    this.interfaceData.push(row);
            }
           }else{
               if(isPush && inThisIdx === -1){
                   this.interfaceData.push(row);
               }else if(!isPush && inThisIdx > -1){
                   this.interfaceData.splice(inThisIdx, 1);
               }
           }
       },
       // 删除数据
       deleteRow(index, rows){
           rows.splice(index, 1);
       },
       //生成sql语句
       createSql() {
           if(this.interfaceData.length === 0){
                this.$message({
                message: '请选择要封装的字段',
                type: 'warning'
                });
               return;
           }
           this.$api.make_sql({fieldData: JSON.stringify(this.interfaceData)}).then(res => {
               console.log(res);
               this.remarks = res.data.sqlVal;
           })
       },
       //sql语句测试
       testSql() {

       },
       //
       handleClick(value){
           console.log(value)
       },
   }
}
</script>

<style lang="scss" scoped>
.stepTwo{
    .flex-block{
        display: flex;
        padding: 10px 0 10px 20px;
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
            width: 30%;
        }
        .tabel-right{
            margin-right: 15px;
            width: 62%;
            .el-select,.el-input{
                width: 90px;
            }
        }
        .tabel-left,.tabel-right{
            p{
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #333333;
                margin-bottom: 10px;
            }
        }
        .el-textarea{
            width: 100%;
            margin-right: 15px;
        }
    }
    .sql-btn{
        justify-content: space-between;
        .sqlHead{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #333333;
        }
        .createSql,.testSql{
            margin-right: 15px;
        }
    }
}
</style>
