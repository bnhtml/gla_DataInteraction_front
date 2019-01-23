//文件指南
<template>
    <div class="fileGuide">
        <el-card shadow="always" class="fileGuide-cont ">
            <p class="titleLeftBorder">文件集成操作指南<span class="right" @click='goOperation'>跳转至操作页面 <i class="icon iconfont icon-shuangjiantou"></i> </span></p>
            <div>
                <dl v-for='(v,i) in fileGuide' :key='i'>
                    <dt>{{i+1}}. {{v.title}}</dt>
                    <dd v-if='v.cont'>{{v.cont}}</dd>
                    <dd v-for='(val,ind) in v.img' :key='ind'><img :src="val" alt="" > </dd>
                </dl>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fileGuide: [{
                    title: '登录',
                    cont: '点击“登录”按钮，输入要操作的委办厅局的用户名和密码，用户名为拼音首字母小写，例如：卫计委 =>  wjw ，密码：1qaz2wsX',
                    img: [require('@/assets/images/documentGuide_1.png')]
                }, {
                    title: '文件集成页面各个功能',
                    cont: '',
                    img: [require('@/assets/images/documentGuide_2.png')]
                }, {
                    title: '点击“fileupload”按钮打开各个委办厅局的文件，选择要操作的委办厅局的文件夹，第一步登录过的委办厅局不需要再次登录，其他委办厅局的需要登录验证夹，进入文件夹下，红框内提供功能操作。',
                    cont: '',
                    img: [require('@/assets/images/documentGuide_3_1.png'), require('@/assets/images/documentGuide_3_2.png'), require('@/assets/images/documentGuide_3_3.png'), ]
                }, ]
            }
        },
        methods:{
            goOperation(){
                this.$router.push({
                    name:'fileOperation'
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '@/assets/style/base/index.scss';
    .fileGuide {
        .fileGuide-cont {
            .titleLeftBorder {
                .right {
                    @include font($fz: 16px, $color:#33ABFB);
                    cursor: pointer;
                    i {
                        @include font($fz: 12px, $color:#33ABFB);
                    }
                }
            }
            div {
                border: solid 1px #ccc;
                margin-top: 25px;
                    padding: 20px;

                dl {
                    dt {
                        @include font($fz: 16px, $color:#333);
                    }
                    dd{
                        padding: 8px 0;
                        @include font($fz: 12px, $color:#666);
                        img{
                            width: 100%;
                            height: auto;
                            max-width: 1200px;
                        }

                    }
                }
            }
        }
    }
</style>
