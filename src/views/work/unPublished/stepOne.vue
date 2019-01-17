<template>
   <div class="page">
       <p class="title">数据接口封装——第一步：基本信息维护</p>
       <el-form class='form-list' label-position="right" label-width="25%" size="mini" :model="formModels">
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
                <el-select v-model="formModels.name" placeholder="请选择">
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
            <el-form-item label="设置接口路径:">
                <el-select v-model="formModels.name" placeholder="请选择">
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
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-upload='beforeUpload'>
                    <el-button size="small"><i class="el-icon-upload2"></i>上传文件</el-button>
                    <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf</div>
                </el-upload>
                <!-- <a href="">模版下载</a> -->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
   </div>
</template>

<script>
export default {
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
          ]

      }
   },
   components: {},
   methods: {
        // 上传文件之前   
       beforeUpload(fileinfo){
           console.log(fileinfo.name)
       },
        //提交
       onSubmit(){
           
       }
   },
}
</script>

<style lang="scss" scoped>
.page{
    width: 1096px;
    height: 100%;
    background: #fff;
    .title{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        margin-bottom: 43px;
    }
    .form-list{
        .el-select,.el-input,.el-textarea{
            width: 486px;
        }
        .el-form-item{
            /deep/ .el-form-item__label{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333;
            }
        }
    }
    
}
</style>
