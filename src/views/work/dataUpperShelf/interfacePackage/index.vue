<template>
   <div class="page">
       <p class="title" v-if='pageFlag=="stepOne"'>数据接口封装——第一步：基本信息维护</p>
       <p class="title" v-else>数据接口封装——第二步：生成sql语句</p>
       <el-form 
            v-if='pageFlag=="stepOne"'
            class='form-list' 
            label-position="right" 
            label-width="25%" size="mini" 
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
                <el-select v-model="formModels.firstAddress" placeholder="一级路径" @change="selectFirstDir">
                    <el-option
                        v-for="item in firstDir"
                        :key="item.firstdir_mapping"
                        :label="item.first_dir"
                        :value="item.first_dir">
                    </el-option>
                </el-select>
                <el-select v-model="formModels.secondAddress" placeholder="二级路径" @change="selectSecondtDir">
                    <el-option
                        v-for="item in secondDir"
                        :key="item.sedir_map"
                        :label="item.second_dir"
                        :value="item.second_dir">
                    </el-option>
                </el-select>
                <el-select v-model="formModels.thirdAddress" placeholder="三级路径">
                    <el-option
                        v-for="item in thirdDir"
                        :key="item.thdir_map"
                        :label="item.third_dir"
                        :value="item.third_dir">
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
                <el-input type="textarea" v-model="formModels.dataInterfaceDesc"></el-input>
            </el-form-item>
        </el-form>
        <stepTwo v-else @rebackUrlAddress="ReceiveUrl"/>
        <div v-if='pageFlag=="stepOne"' class="oneSub"> 
            <el-button v-if='dataType!="type1"' type="primary" @click="onSubmit">提交</el-button>
            <span v-else>
                <el-button v-if="nextFlag" type="primary" @click="nextStep">下一步</el-button>
                <el-button v-else type="info" >下一步</el-button>
            </span>
            <el-button @click="cancel">取消</el-button>
        </div>
        <div v-else class="twoSub">
            <div><el-button type="primary" @click="preStep">上一步</el-button></div>
            <div><el-button type="primary" @click="onSubmit">提交</el-button></div>
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
                firstAddress:'',
                secondAddress:'',
                thirdAddress:'',
                // interfaceAddress:'',  //接口路经
                dataInterfaceDesc:'',
            },
            potDataType:[
                {value: 'db', label: '数据库表'},
                {value: 'file', label: '文件'},
                {value: 'interface', label: '接口'},
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
            firstDir: [],
            secondDir: [],
            thirdDir: [],
            dataType: 1, //封装数据类型
            pageFlag: 'stepOne',
            nextFlag: true
        }
    },
    methods: {
        getData(){
            var queryParam = this.$route.query;
            if(this.$route.name=='interfacePackage'){
                //接口封装;  通过query携带数据过来
                this.formModels.resourceName = queryParam.resourceName; //资源名称
                this.formModels.resourceId = queryParam.resourceId;//资源id
                this.formModels.departName = queryParam.departName//部门名称
                this.formModels.departDomain = queryParam.departDomain; //单位域名
            
            }else if(this.$route.name=='interfaceUpdate'){
                //接口修改;  通过接口查询数据
                let id = queryParam.resourceId;
                this.formModels.departDomain = queryParam.departDomain; //单位域名
                this.$api.query_resources({resourceId: id}).then((res)=>{
                    console.log(res.data[0])
                    let requestData = res.data[0];
                        for(var key in requestData){
                            for(var list in this.formModels){
                                if(list==key){
                                    this.formModels[list]=requestData[key];
                                }
                            }
                        };
                        // 根据接口返回的封装数据类型，显示相应的表单
                        if(this.formModels.dataInterfaceType=='db'){
                            this.dataType = "type1";
                        }else if(this.formModels.dataInterfaceType=='file'){
                            this.dataType = "type2";
                        }else if(this.formModels.dataInterfaceType=='interface'){
                            this.dataType = "type3";
                        }
                        //获取一级目录
                        this.$api.get_firstdir({depart:requestData.departName}).then(res=>{
                            this.firstDir = res.data;
                        })
                        this.$api.get_seconddir({depart:requestData.departName,first_dir: requestData.firstAddress}).then(res=>{
                            this.secondDir = res.data;
                        })
                        this.$api.get_thirddir({depart:requestData.departName,second_dir: requestData.secondAddress}).then(res=>{
                            this.thirdDir = res.data;
                        })
                })
            };
        },
        //切换数据类型
        changeDataType(value){
            if(value == 'db'){
                //数据库类型：请求数据类型和响应数据类型固定为json
                this.dataType = "type1";
                this.formModels.requestInterType == 'JSON';
                this.formModels.responseInterType == 'JSON';
                //文件类型：请求方式固定为get请求数据类型和响应数据类型不显示
            }else if(value == 'file'){
                this.dataType = "type2";
                this.formModels.requestInterMode = "GET";
            }else if(value == 'interface'){
                this.dataType = "type3";
            }
        },
        //切换一级路经
        selectFirstDir(value){
            //获取二级目录
            this.$api.get_seconddir({depart:this.formModels.departName,first_dir: value}).then(res=>{
                this.secondDir = res.data;
                this.formModels.secondAddress='';
                this.formModels.thirdAddress='';
            })
        },
        //切换二级路经
        selectSecondtDir(value){
            //获取三级目录
            this.$api.get_thirddir({depart:this.formModels.departName,second_dir: value}).then(res=>{
                this.thirdDir = res.data;
                this.formModels.thirdAddress='';
            })
        },
        //下一步
        nextStep() {
            this.pageFlag='stepTwo';
        },
        // 接收子组件的urlAddress
        ReceiveUrl(data){
            this.formModels.urlAddress = data;
        },
        //提交
        onSubmit(){
            for(var key in this.formModels){
                if(this.formModels[key]==''){
                    this.$message.error('提交失败，请填写完整表单数据');
                }
            }
            this.$api.submit_interface(this.formModels).then(res=>{
                console.log(res);
                if(res.status=='200'){
                    this.$router.push({path:'api/info',query:{fromName: 'unpublished'}})
                }else{

                }
            })
        },
        //上一步
       preStep() {
           this.pageFlag='stepOne';
       },
       //取消
       cancel() {
           this.getData();
       }
   },
   mounted(){
       this.getData();
   },
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
