// 注册模块
<template>
  <div class="register">
      <Layout class="myLayout">
        <Content class="myContent">
             <Tabs :animated="true" class="myTab">
                 <!-- 个人注册 -->
                <TabPane label="个人注册" class="personalRegistr">
                    <Form :label-width="300" class="Form" :model="personalForm" :rules="rulePersonal">
                       <Card class="personalInfo">
                            <p slot="title" class="personal-card-title">账号信息</p>
                            <FormItem label="用户名">
                              <Input type="text" v-model="personalForm.username" placeholder="请输入用户名"/>
                            </FormItem>
                            <FormItem label="手机号">
                              <Input type="text" v-model="personalForm.phone" placeholder="请输入手机号"/>
                            </FormItem>
                             <FormItem label="验证码" class="yzmItem">
                              <Input type="text" v-model="personalForm.verificationCode" placeholder="请输入验证码" style="width:320px;"/>
                              <Button type="primary" class="yzmBtn">获取短信验证码</Button>
                            </FormItem>
                            <FormItem label="密码">
                              <Input type="password" v-model="personalForm.password" placeholder="请输入密码"/>
                            </FormItem>
                             <FormItem label="密码确认">
                              <Input type="password" v-model="personalForm.isSurePassword" placeholder="请输入确认密码"/>
                            </FormItem>
                       </Card>
                       <Card class="personalInfo realAuthentication">
                            <p slot="title" class="personal-card-title">实名认证</p>
                            <FormItem label="证件类型" class="typeItem">
                              <Select v-model="personalForm.docType" clearable placeholder='请选择证件类型'>
                                  <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                            </FormItem>
                            <FormItem label="证件号码">
                              <Input type="text" v-model="personalForm.certificates" placeholder="请输入证件号码"/>
                            </FormItem>
                             <FormItem label="姓名" class="yzmItem">
                              <Input type="text" v-model="personalForm.fullName" placeholder="请输入姓名"/>
                            </FormItem>
                            <FormItem label="性别" class="typeItem">
                               <Select v-model="personalForm.sex" clearable placeholder="请选择性别">
                                  <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                               </Select>
                            </FormItem>
                             <FormItem label="民族" class="typeItem">
                               <Select v-model="personalForm.nation" clearable placeholder="请选择民族">
                                  <Option v-for="item in nationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                               </Select>
                            </FormItem>
                       </Card>
                       <Card class="personalInfo certify">
                            <p slot="title" class="personal-card-title">本人认证</p>
                            <FormItem label="自拍上传" class="uploadItem">
                                <div class="uploadBox">
                                        <p class="upload-p">请您手持身份证，身份证正面朝外，与本人合照，并保证照片清晰</p>
                                        <!-- <div class="demo-upload-list" v-for="(item,k) in uploadList" :key="k">
                                            <template v-if="item.status === 'finished'">
                                                <img :src="item.url">
                                                <div class="demo-upload-list-cover">
                                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                            </template>
                                        </div> -->
                                        <Upload
                                            ref="upload"
                                            :show-upload-list="false"
                                            :default-file-list="defaultList"
                                            :on-success="handleSuccess"
                                            :format="['jpg','jpeg','png']"
                                            :max-size="2048"
                                            :on-format-error="handleFormatError"
                                            :on-exceeded-size="handleMaxSize"
                                            :before-upload="handleBeforeUpload"
                                            multiple
                                            type="drag"
                                            action="//jsonplaceholder.typicode.com/posts/"
                                            style="display: inline-block;width:58px;">
                                            <div style="width: 58px;height:58px;line-height: 58px;">
                                                <Icon type="ios-camera" size="20"></Icon>
                                            </div>
                                        </Upload>
                                        <Modal title="View Image" v-model="visible">
                                            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                                        </Modal>
                                </div>
                            </FormItem>
                            <FormItem class="enterItem">
                               <Checkbox v-model="check">我个人同意国路安数据科技网络协议</Checkbox>
                            </FormItem>
                            <FormItem class="enterItem">
                              <Button type="primary" class="registerBtn" @click="personalRegister">注册</Button>
                            </FormItem>
                       </Card>
                    </Form>
                </TabPane>
                <!-- 法人注册 -->
                <TabPane label="法人注册" class="legalRegister">
                   <Form :label-width="300" class="Form" :model="legalForm" :rules="rulePersonal">
                       <Card class="personalInfo">
                            <p slot="title" class="personal-card-title">账号信息</p>
                            <FormItem label="用户名">
                              <Input type="text" v-model="legalForm.legalUsername" placeholder="请输入用户名"/>
                            </FormItem>
                            <FormItem label="手机号">
                              <Input type="text" v-model="legalForm.legalPhone" placeholder="请输入手机号"/>
                            </FormItem>
                             <FormItem label="验证码" class="yzmItem">
                              <Input type="text" v-model="personalForm.legalVerificationCode" placeholder="请输入验证码" style="width:320px;"/>
                              <Button type="primary" class="yzmBtn">获取短信验证码</Button>
                            </FormItem>
                            <FormItem label="密码">
                              <Input type="password" v-model="personalForm.legalPassword" placeholder="请输密码"/>
                            </FormItem>
                             <FormItem label="密码确认">
                              <Input type="password" v-model="personalForm.isSureLegalPassword" placeholder="请输入确认密码"/>
                            </FormItem>
                       </Card>
                       <Card class="personalInfo realAuthentication">
                            <p slot="title" class="personal-card-title">实名认证</p>
                            <FormItem label="证件类型" class="typeItem">
                              <Select v-model="personalForm.docType" clearable placeholder='请选择证件类型'>
                                  <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                            </FormItem>
                            <FormItem label="证件号码">
                              <Input type="text" v-model="personalForm.phone" placeholder="请输入证件号码"/>
                            </FormItem>
                             <FormItem label="姓名" class="yzmItem">
                              <Input type="text" v-model="personalForm.username" placeholder="请输入姓名"/>
                            </FormItem>
                            <FormItem label="性别" class="typeItem">
                               <Select v-model="personalForm.sex" clearable placeholder="请选择性别">
                                  <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                               </Select>
                            </FormItem>
                             <FormItem label="民族" class="typeItem">
                               <Select v-model="personalForm.nation" clearable placeholder="请选择民族">
                                  <Option v-for="item in nationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                               </Select>
                            </FormItem>
                       </Card>
                       <Card class="personalInfo certify">
                            <p slot="title" class="personal-card-title">本人认证</p>
                            <FormItem label="自拍上传" class="uploadItem">
                                <div class="uploadBox">
                                        <p class="upload-p">请您手持身份证，身份证正面朝外，与本人合照，并保证照片清晰</p>
                                        <!-- <div class="demo-upload-list" v-for="(item,k) in uploadList" :key="k">
                                            <template v-if="item.status === 'finished'">
                                                <img :src="item.url">
                                                <div class="demo-upload-list-cover">
                                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                            </template>
                                        </div> -->
                                        <Upload
                                            ref="upload"
                                            :show-upload-list="false"
                                            :default-file-list="defaultList"
                                            :on-success="handleSuccess"
                                            :format="['jpg','jpeg','png']"
                                            :max-size="2048"
                                            :on-format-error="handleFormatError"
                                            :on-exceeded-size="handleMaxSize"
                                            :before-upload="handleBeforeUpload"
                                            multiple
                                            type="drag"
                                            action="//jsonplaceholder.typicode.com/posts/"
                                            style="display: inline-block;width:58px;">
                                            <div style="width: 58px;height:58px;line-height: 58px;">
                                                <Icon type="ios-camera" size="20"></Icon>
                                            </div>
                                        </Upload>
                                        <Modal title="View Image" v-model="visible">
                                            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                                        </Modal>
                                </div>
                            </FormItem>
                       </Card>
                       <Card class="personalInfo legalInfo">
                            <p slot="title" class="personal-card-title">法人信息</p>
                            <FormItem label="社会统一信用代码">
                              <Input type="text" v-model="personalForm.legalCreditCode" placeholder="请输入社会统一信用代码"/>
                            </FormItem>
                            <FormItem label="单位名称">
                              <Input type="text" v-model="personalForm.legalUnitName" placeholder="请输入单位名称"/>
                            </FormItem>
                            <FormItem label="营业执照附件" class="uploadItem">
                                <div class="uploadBox">
                                        <p class="upload-p">请上传营业执照附件</p>
                                        <!-- <div class="demo-upload-list" v-for="(item,k) in uploadList" :key="k">
                                            <template v-if="item.status === 'finished'">
                                                <img :src="item.url">
                                                <div class="demo-upload-list-cover">
                                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                            </template>
                                        </div> -->
                                        <Upload
                                            ref="upload"
                                            :show-upload-list="false"
                                            :default-file-list="defaultList"
                                            :on-success="handleSuccess"
                                            :format="['jpg','jpeg','png']"
                                            :max-size="2048"
                                            :on-format-error="handleFormatError"
                                            :on-exceeded-size="handleMaxSize"
                                            :before-upload="handleBeforeUpload"
                                            multiple
                                            type="drag"
                                            action="//jsonplaceholder.typicode.com/posts/"
                                            style="display: inline-block;width:58px;">
                                            <div style="width: 58px;height:58px;line-height: 58px;">
                                                <Icon type="ios-camera" size="20"></Icon>
                                            </div>
                                        </Upload>
                                        <Modal title="View Image" v-model="visible">
                                            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                                        </Modal>
                                </div>
                            </FormItem>
                            <FormItem class="enterItem">
                               <Checkbox v-model="check">我个人同意国路安数据科技网络协议</Checkbox>
                            </FormItem>
                            <FormItem class="enterItem">
                              <Button type="primary" class="registerBtn"  @click="legalRegister">注册</Button>
                            </FormItem>
                       </Card>
                   </Form>
                </TabPane>
            </Tabs>
        </Content>    
      </Layout>
  </div>
</template>
<script type='text/javascript'>
    export default {
      name: 'register',
      data () {
        return {
          //   个人注册信息
          personalForm:{
             username: '',  // 用户名
             phone: '', // 手机号
             verificationCode: '', // 验证码
             password:'',  // 密码
             isSurePassword: '', // 确认密码
             docType: '',  //证件类型
             certificates:'', // 证件号
             fullName: '',  // 姓名
             sex: '', // 性别
             nation: '',  // 民族
          },
          //   法人注册信息
          legalForm:{
            legalUsername: '',  // 用户名 
            legalPhone:'',  //手机号
            legalVerificationCode: '',   //验证码
            legalPassword: '', // 密码
            isSureLegalPassword: '',  // 确认密码
            legalDocType: '',  // 证件类型
            legalCertificates: '',  // 证件号
            legalFullName: '',  //姓名
            legalSex: '',  // 性别
            legalNation: '',  // 民族
            legalCreditCode: '',  //社会统一信用代码
            legalUnitName: '',    // 单位名称
          },
          check: '',
          rulePersonal:{},
          typeList:[{label:'身份证',value:0},{label:'护照', value:1},{label:'港澳通行证',value:2}],
          nationList:[{value: 0,label:'汉族'}],
          sexList:[{value:0, label:'男'},{value:1, label:'女'}],
          defaultList: [
            {
                'name': 'a42bdcc1178e62b4694c830f028db5c0',
                'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
            },
            {
                'name': 'bc7521e033abdd1e92222d733590f104',
                'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
            }
          ],
          imgName: '',
          visible: false,
          uploadList: []
        }
      },
      mounted (){},
      methods:{
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        },
        /*---------------------个人注册--------------------*/
        personalRegister() {
          this.$Message.success('个人注册成功！');
          this.$router.push({
            path: '/signIn'
          })
        },
        /*--------------------法人注册----------------------*/
        legalRegister() {
          this.$Message.success('法人注册成功！');
          this.$router.push({
            path: '/signIn'
          }) 
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/base/index.scss';
  .register{
     @extend %baseW;
     margin: 10px auto 30px auto;
     .myLayout{
        .myContent{
            .myTab{
               // 个人注册
              .personalRegistr,
              .legalRegister{
                  .Form{
                    .personalInfo {
                        padding: 0 23px;
                        position: relative;
                        .personal-card-title {
                                font-size: 16px;
                                color: #333333;
                                letter-spacing: 0;
                        }
                        .personal-card-title:before{
                            content:"";
                            width:6px;
                            height:20px;
                            background: #F72D4D;
                            position: absolute;
                            toP:15px;
                            left:23px;
                        }
                        .ivu-form-item{
                          margin-bottom: 20px;
                          .ivu-input-wrapper{
                            width: 468px;
                            height:32px;
                          }
                        }
                        .yzmItem{
                          .yzmBtn {
                            background: #F72D4D;
                            border-radius: 4px;
                            color: #FFF;
                            border:0;
                          }
                          .yzmBtn:active, .yzmBtn:focus{
                           border-color: 1px solid #F72D4D;
                          }
                        }
                    }
                    .realAuthentication{
                      margin: 20px 0;
                      .ivu-select{
                         width:468px;
                      }
                    }
                    .certify,
                    .legalInfo{
                      .uploadItem{
                          .uploadBox {
                            border:1px dashed #2d8cf0;
                            padding:8px 16px 4px 1%;
                            box-sizing: border-box;
                            margin-top:10px;
                            min-height:100px;
                           }
                            .upload-p{
                                font-size: 14px;
                                color: #666666;
                                // height:22px;
                                line-height: 22px;
                                cursor: pointer;
                            }
                            .demo-upload-list{
                                display: inline-block;
                                width: 60px;
                                height: 60px;
                                text-align: center;
                                line-height: 60px;
                                border: 1px solid transparent;
                                border-radius: 4px;
                                overflow: hidden;
                                background: #fff;
                                position: relative;
                                box-shadow: 0 1px 1px rgba(0,0,0,.2);
                                margin-right: 4px;
                            }
                            .demo-upload-list img{
                                width: 100%;
                                height: 100%;
                            }
                            .demo-upload-list-cover{
                                display: none;
                                position: absolute;
                                top: 0;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                background: rgba(0,0,0,.6);
                            }
                            .demo-upload-list:hover .demo-upload-list-cover{
                                display: block;
                            }
                            .demo-upload-list-cover i{
                                color: #fff;
                                font-size: 20px;
                                cursor: pointer;
                                margin: 0 2px;
                            }

                      }
                      .enterItem{
                        .registerBtn{
                          width:130px;
                          height:32px;
                          background: #F72D4D;
                          border-radius: 4px;
                          border:1px solid #F72D4D;
                          padding: 0;
                        }
                      }
                    }
                    // 法人信息
                    .legalInfo{
                      margin-top: 20px;
                    }
                  }
              }
            }
        }
     }
  }

</style>

