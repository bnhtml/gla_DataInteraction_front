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
                <el-input v-model="formModels.name"></el-input>
            </el-form-item>
            <el-form-item label="资源ID:">
                <el-input v-model="formModels.name"></el-input>
            </el-form-item>
            <el-form-item label="部门单位:">
                <el-input v-model="formModels.name"></el-input>
            </el-form-item>
            <el-form-item label="数据接口名称:">
                <el-input v-model="formModels.name"></el-input>
            </el-form-item>
            <el-form-item label="封装数据类型:">
                <el-select v-model="formModels.name" placeholder="请选择" @change='changeDataType'>
                    <el-option
                        v-for="item in potDataType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接口URL源地址:">
                <el-input v-model="formModels.name"></el-input>
            </el-form-item>
            <el-form-item label="请求数据类型:">
                <el-select v-model="formModels.name" placeholder="请选择">
                    <el-option
                        v-for="item in requestType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="响应数据类型:">
                <el-select v-model="formModels.name" placeholder="请选择">
                    <el-option
                        v-for="item in responseType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接口请求方式:">
                <el-select v-model="formModels.name" placeholder="请选择">
                    <el-option
                        v-for="item in requestWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设置接口路径:" class="interface-path">
                <el-select v-model="formModels.name" placeholder="一级路径">
                    <el-option
                        v-for="item in requestWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="formModels.name" placeholder="二级路径">
                    <el-option
                        v-for="item in requestWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="formModels.name" placeholder="三级路径">
                    <el-option
                        v-for="item in requestWay"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位域名:">
                <el-input v-model="formModels.name"></el-input>
            </el-form-item>
            <el-form-item label="请求头:">
                <el-input v-model="formModels.name"></el-input>
            </el-form-item>
            <el-form-item label="描述/备注:">
                <el-input type="textarea" v-model="formModels.name"></el-input>
            </el-form-item>
            <el-form-item label="接口说明文档:">
                <!-- <el-input v-model="formModels.name"></el-input> -->
                <el-upload
                    class="upload-file"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-upload='beforeUpload'>
                    <el-button size="small"><i class="el-icon-upload2"></i>上传文件</el-button>
                    <span slot="tip">
                        <a href="#" class="download-model">模版下载</a>
                        <div class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf</div>
                    </span>
                    
                </el-upload>
                <!-- <a href="">模版下载</a> -->
            </el-form-item>
            <el-form-item>
                <el-button v-if='dataType' type="primary" @click="onSubmit">提交</el-button>
                <el-button v-else type="primary" @click="nextStep">下一步</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        <stepTwo v-else/>
   </div>
</template>

<script>
import stepTwo from './stepTwo'
export default {
    components: {stepTwo},
    data() {
        return {
            formModels:{
                name:""
            },
            potDataType:[
                {value: '0', label: '数据库表'},
                {value: '1', label: '文件'},
                {value: '2', label: '接口'},
            ],
            requestType: [
                {value: '0', label: 'XML'},
                {value: '1', label: 'JSON'},
                {value: '2', label: 'form-data'},
            ],
            responseType: [
                {value: '0', label: 'XML'},
                {value: '1', label: 'JSON'},
            ],
            requestWay: [
                {value: '0', label: 'POST'},
                {value: '1', label: 'GET'},
            ],
            dataType: 1, //封装数据类型
            pageFlag: 'stepOne',
            // pageFlag: 'stepTwo',

        }
    },
    methods: {
        // 上传文件之前   
        beforeUpload(fileinfo){
            console.log(fileinfo)
            var str = fileinfo.name;
            var index = fileinfo.name.lastIndexOf(".");
            var suffix = str.substring(index+1, str.length);
            console.log(suffix)
            if(suffix=='rar'||suffix=='zip'||suffix=='doc'||suffix=='docx'||suffix=='pdf'){
                this.$message.success('文件类型对了');                
            }else{
                this.$message.error('文件类型错误');
            }
            return false;
        },
        //切换数据类型
        changeDataType(value){
        //    console.log(value)
            if(value=='0'){
                this.dataType = 0;
            }else{
                this.dataType = 1;
            }
        },
        //下一步
        nextStep() {
            this.pageFlag='stepTwo';
        },
        //提交
        onSubmit(){
           
        }
   },
}
</script>

<style lang="scss" scoped>
.page{
    background: #fff;
    .title{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        margin-bottom: 43px;
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
            .upload-file{
                .download-model{
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #33ABFB;
                    line-height: 22px;
                    margin-left: 10px;
                }
                .el-upload__tip{
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #999999;
                    line-height: 22px;
                }
            }
        }
        .interface-path .el-select{
            width: 154px;
        }
    }
    
}
</style>
