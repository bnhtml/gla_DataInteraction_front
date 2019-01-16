//  账户管理
<template>
    <div class="accountManagement">
        <Card>
            <dl>
                <dt class="card-title">账户管理</dt>
                <dd>
                    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
                        <FormItem label="账户名：" prop="name">
                            <Input v-model="form.name" placeholder="请输入账户名" :disabled='disabled'></Input>
                        </FormItem>
                        <FormItem label="密码：" prop="password">
                            <Input v-model="form.password" placeholder="请输入密码" :disabled='disabled'></Input>
                        </FormItem>
                        <FormItem label="邮箱：" prop="mail">
                            <Input v-model="form.mail" placeholder="请输入邮箱" :disabled='disabled'></Input>
                        </FormItem>
                        <FormItem label="手机：" prop="tel">
                            <Input v-model="form.tel" placeholder="请输入手机号" :disabled='disabled'></Input>
                        </FormItem>
                        <FormItem label="单位：" prop="company">
                            <Input v-model="form.company" placeholder="请输入您的单位" :disabled='disabled'></Input>
                        </FormItem>
                        <FormItem label="部门：" prop="dept">
                            <Input v-model="form.dept" placeholder="请输入您的部门" :disabled='disabled'></Input>
                        </FormItem>
                        <FormItem v-if='!disabled'>
                            <Button type="primary" @click="handleSubmit('form')" size='large' class="save">保存</Button>
                            <Button type="primary" @click="handleReset('form')" style="margin-left: 8px" size='large'>取消</Button>
                        </FormItem>
                        <FormItem v-if='disabled'>
                            <Button type="primary" @click="write" size='large' class="save">编辑</Button>
                        </FormItem>
                    </Form>
                </dd>
            </dl>
        </Card>
    </div>
</template>

<script>
    export default {
        name: 'accountManagement',
        data() {
            return {
                disabled:true,
                form: {
                    name: '',
                    password: '',
                    mail: '',
                    tel: '',
                    company: '',
                    dept: "",
                },
                ruleValidate: {
                    name: [{
                        required: true,
                        message: '账户名不能为空',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }],
                    mail: [{
                            required: true,
                            message: '邮箱不能为空',
                            trigger: 'blur'
                        },
                        {
                            type: 'email',
                            message: '请正确输入邮箱',
                            trigger: 'blur'
                        }
                    ],
                    tel: [{
                        required: true,
                        message: '手机号不能为空',
                        trigger: 'blur'
                    }],
                }
            }
        },
        mounted() {
            this.init();
            // deptName
        },
        methods: {
            init() {
                this.form.name = this.$store.state.userInfo.username;
                this.form.dept = this.$store.state.userInfo.deptName;
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('保存成功');
                        this.disabled=true;
                    } else {
                        this.$Message.error('保存失败');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
                this.init();
            },
            write(){
                this.disabled = false;
            }
        }
    }
</script>

<style scoped lang='scss'>
    .accountManagement {
        dd {
            width: 600px;
            margin: 50px auto;
        }
        .save {
            background-color: #2d8cf0;
            color: rgba(255, 255, 255, 0.85)
        }
        button {
            padding: 5px 50px;
        }
    }
</style>
