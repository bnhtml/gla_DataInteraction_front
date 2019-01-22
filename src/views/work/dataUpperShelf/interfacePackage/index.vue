<template>
   <div class="page">
       <p class="title" v-if='pageFlag=="stepOne"'>数据接口封装——第一步：基本信息维护</p>
       <p class="title" v-else>数据接口封装——第二步：生成sql语句</p>
       <el-form 
            v-if='pageFlag=="stepOne"'
            class='form-list' 
            label-position="right" 
            label-width="25%" size="mini" 
            :rules="rules"
            :model="formModels">
            <el-form-item label="资源名称:">
                <el-input v-model="formModels.resourceName" disabled></el-input>
            </el-form-item>
            <el-form-item label="资源ID:">
                <el-input v-model="formModels.resourceId" disabled></el-input>
            </el-form-item>
            <el-form-item label="部门单位:">
                <el-input v-model="formModels.departName" disabled></el-input>
            </el-form-item>
            <el-form-item label="数据接口名称:">
                <el-input v-model="formModels.dataInterfaceName"></el-input>
            </el-form-item>
            <el-form-item label="封装数据类型:">
                <el-select v-model="formModels.dataInterfaceType" placeholder="请选择" @change='changeDataType'>
                    <el-option
                        v-for="item in potDataType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="dataType!='type1'" label="接口URL源地址:">
                <el-input v-model="formModels.urlAddress"></el-input>
            </el-form-item>
            <el-form-item v-if="dataType!='type2'" label="请求数据类型:">
                <el-input v-if='dataType=="type1"' value='JSON' disabled></el-input>
                <el-select v-else v-model="formModels.requestInterType" placeholder="请选择">
                    <el-option
                        v-for="item in requestType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="dataType!='type2'" label="响应数据类型:">
                <el-input v-if='dataType=="type1"' value='JSON' disabled></el-input>
                <el-select v-else v-model="formModels.responseInterType" placeholder="请选择">
                    <el-option
                        v-for="item in responseType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接口请求方式:">
                <el-input v-if='dataType=="type2"' value='GET' disabled></el-input>
                <el-select v-else v-model="formModels.requestInterMode" placeholder="请选择">
                    <el-option
                        v-for="item in requestWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设置接口路径:" class="interface-path">
                <el-select v-model="onePath" placeholder="一级路径">
                    <el-option
                        v-for="item in requestWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="twoPath" placeholder="二级路径">
                    <el-option
                        v-for="item in requestWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="threePath" placeholder="三级路径">
                    <el-option
                        v-for="item in requestWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位域名:">
                <el-input v-model="formModels.departDomain" disabled></el-input>
            </el-form-item>
            <el-form-item label="请求头:">
                <el-input v-model="formModels.requestHeader"></el-input>
            </el-form-item>
            <el-form-item label="描述/备注:">
                <el-input type="textarea" v-model="formModels.descRibe"></el-input>
            </el-form-item>
        </el-form>
        <stepTwo v-else/>
        <div v-if='pageFlag=="stepOne"' class="oneSub"> 
            <el-button v-if='dataType!="type1"' type="primary" @click="onSubmit">提交</el-button>
            <el-button v-else type="primary" @click="nextStep">下一步</el-button>
            <el-button>取消</el-button>
        </div>
        <div v-else class="twoSub">
            <div><el-button type="primary" @click="preStep">上一步</el-button></div>
            <div><el-button type="primary" @click="submit">提交</el-button></div>
            <div><el-button @click="cancel">取消</el-button></div>
        </div>
   </div>
</template>

<script>
import stepTwo from './stepTwo'
export default {
    components: {stepTwo},
    data() {
        return {
            formModels:{
                resourceName:'',
                resourceId:'',
                departName:'',
                urlAddress:'',
                dataInterfaceName:'',
                dataInterfaceType:'',
                requestInterType:'',
                responseInterType:'',
                requestInterMode:'',
                departDomain: '',
                requestHeader:'',
                interfaceAddress:'',
                descRibe:'',
            },
            onePath:'',
            twoPath:'',
            threePath:'',
            rules:{
            //     dataInterfaceName: [ { required: true, message: '请输入数据接口名称', trigger: 'blur' },],
            //     dataInterfaceType: [ { required: true, message: '请选择封装数据类型', trigger: 'change' },],
            //     urlAddress: [ { required: true, message: '请输入接口URL源地址', trigger: 'blur' },],
            //     requestInterType: [ { required: true, message: '请选择请求数据类型', trigger: 'blur' },],
            //     responseInterType: [ { required: true, message: '请选择响应数据类型', trigger: 'blur' },],
            //     requestInterMode: [ { required: true, message: '请选择接口请求方式', trigger: 'blur' },],
            //     requestHeader: [ { required: true, message: '请输入请求头', trigger: 'blur' },],
            //     descRibe: [ { required: true, message: '请输入描述/备注', trigger: 'blur' },],
            },
            potDataType:[
                {value: '数据库表', label: '数据库表'},
                {value: '文件', label: '文件'},
                {value: '接口', label: '接口'},
            ],
            requestType: [
                {value: 'XML', label: 'XML'},
                {value: 'JSON', label: 'JSON'},
            ],
            responseType: [
                {value: 'XML', label: 'XML'},
                {value: 'JSON', label: 'JSON'},
            ],
            requestWay: [
                {value: 'POST', label: 'POST'},
                {value: 'GET', label: 'GET'},
            ],
            dataType: 1, //封装数据类型
            pageFlag: 'stepOne',
            // pageFlag: 'stepTwo',

        }
    },
    methods: {
        //切换数据类型
        changeDataType(value){
        //    console.log(value)
            if(value == '数据库表'){
                //数据库类型：请求数据类型和响应数据类型固定为json
                this.dataType = "type1";
                this.formModels.requestInterType == 'JSON';
                this.formModels.responseInterType == 'JSON';
                //文件类型：请求方式固定为get请求数据类型和响应数据类型不显示
            }else if(value == '文件'){
                this.dataType = "type2";
                this.formModels.requestInterMode = "GET";
            }else if(value == '接口'){
                this.dataType = "type3";
            }
        },
        //下一步
        nextStep() {
            this.pageFlag='stepTwo';
        },
        //提交
        onSubmit(){
            console.log(this.formModels)
        },
        //上一步
       preStep() {
           this.pageFlag='stepOne';
       },
       //提交
       submit() {

       },
       //取消
       cancel() {

       }
   },
   mounted(){
       this.$api.query_resources().then((res)=>{
           console.log(res);
           for(var key in res.data){
               console.log(res.data[key])
               for(var list in this.formModels){
                   if(list==key){
                       this.formModels[list]=res.data[key]
                   }
               }
           }
           this.formModels.resourceName = res.data.resourceName;
           this.formModels.resourceId = res.data.resourceId;
           this.formModels.departName = res.data.departName;
           this.formModels.dataInterfaceName = res.data.dataInterfaceName;
           this.formModels.dataInterfaceType = res.data.dataInterfaceType;
       })
   }
}
</script>

<style lang="scss" scoped>
.page{
    min-width: 1096px;
    background: #fff;
    .title{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        margin-bottom: 35px;
        padding-top: 15px;
        &::before{
            content: ' ';
            width: 6px;
            display: inline-block;
            height: 12px;
            margin-right: 15px;
            background: #58CAFD;
        }
    }
    .form-list{
        .el-select,.el-input,.el-textarea{
            width: 470px;
        }
        .el-form-item{
            /deep/ .el-form-item__label{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333;
            }
        }
        .interface-path .el-select{
            width: 154px;
        }
    }
    .oneSub{
        width: 445px;
        text-align: right;
    }
    .twoSub{
        display: flex;
        padding: 20px 0 20px 153px;
        .el-button{
            margin-right: 15px;
        }
    }
    
}
</style>
