// 登录模块
<template>
    <div class="signIn" id='signIn' :style="{background:'url('+loginBg+') no-repeat center center','backgroundSize':'cover'}">
        <!--  -->
        <div class="login-wrapper animated zoomIn" id='loginWrapper'>
            <div class="logo">
                <img src="../../assets/img/logo/login_logo_1010.png" alt="">
            </div>
            <div class="login-text">
                <ul>
                    <li>
                        <label><i class="iconfont icon-tuceng"></i></label>
                        <span>
                                    <line-animate :animate="animateState">
                                        <Input v-model="formItem.user" placeholder="请输入用户名" />
                                    </line-animate>
                                </span>
                    </li>
                    <li>
                        <label><i class="iconfont icon-tuceng2"></i></label>
                        <span> 
                                    <line-animate :animate="animateState1">
                                        <Input type='password' v-model="formItem.password" placeholder="请输入密码" @keyup.native.enter="signIn"/>
                                    </line-animate>
                                </span>
                    </li>
                </ul>
                <p>
                    <i :class="'iconfont '+ passClass" @click='changePass'></i> 记住密码
                </p>
                <Button type="primary" shape="circle" long :loading='modal_loading' @click='signIn'>登录</Button>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import lineAnimate from "@/components/gla-ui/input";
    import {
        initMenu
    } from '@/router/routerUtils.js';
    export default {
        name: "signIn",
        data() {
            return {
                isShow: false,
                passClass: 'icon-duoxuan1',
                loginBg: require("../../assets/img/bg/login_bg_0928.jpg"),
                choose: 0,
                modal_loading: false,
                formItem: {
                    user: "", // 用户名
                    password: "" // 密码
                },
                userInfo: {
                    user: "1",
                    password: "1"
                },
                animateState: 0,
                animateState1: 0
            };
        },
        components: {
            lineAnimate
        },
        mounted() {
            this.bgCanvas();
            this.clearForm();
        },
        methods: {
            selectLog(idx) {
                this.choose = idx;
                if (idx == 1) {
                    this.$Message.info("暂不支持法人登录 !");
                }
            },
            // 登陆
            signIn() {
                this.modal_loading = true;
                if (this.formItem.user == "" || this.formItem.password == "") {
                    this.$Message.warning("用户名、密码不能为空");
                    this.modal_loading = false;
                } else {
                    let params = {
                        username: this.formItem.user,
                        clientpwd: this.$appClient.getActionUserPassword(this.formItem.password),
                        // isLogin: true
                    }
                    this.$api.login(params).then(res => {
                        this.$store.commit("get_token", res.token);
                        this.$store.commit("get_userInfo", res.userInfo);
                        /* 登录过后 --- 动态路由 */
                        initMenu();
                        this.isSignIn = false;
                        this.$Message.success('登录成功！')
                        this.$router.push({
                            path: "/homepage"
                        });
                        this.modal_loading = false;
                    }).catch(err => {
                        this.modal_loading = false;
                        this.$Message.error("登录失败");
                    });
                }
            },
            clearForm() {
                this.formItem.user = "";
                this.formItem.password = "";
            },
            /* 注册 */
            goRegister() {
                this.$router.push({
                    path: "/register"
                });
                this.$store.commit("get_bread", {
                    path: "/register",
                    name: "注册"
                });
            },
            // 忘记密码
            goPassword() {
                this.$Message.info("此业务暂时未开发!");
            },
            changePass() {
                this.isShow = !this.isShow;
                if (this.isShow) {
                    this.passClass = 'icon-duoxuan'
                } else {
                    this.passClass = 'icon-duoxuan1'
                }
            },
            bgCanvas() {
                var SEPARATION = 100,
                    AMOUNTX = 50,
                    AMOUNTY = 50;
                var container, stats;
                var camera, scene, renderer;
                var particles, particle, count = 0;
                var mouseX = 0,
                    mouseY = 0;
                var windowHalfX = window.innerWidth / 2;
                var windowHalfY = window.innerHeight / 2;
                init();
                animate();
                function init() {
                    container = document.createElement('div');
                    let signIn = document.getElementById('signIn');
                    signIn&&signIn.appendChild(container);
                    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
                    camera.position.z = 1000;
                    scene = new THREE.Scene();
                    particles = new Array();
                    var PI2 = Math.PI * 2;
                    var material = new THREE.SpriteCanvasMaterial({
                        color: 0x1087d7, // 点点color
                        program: function(context) {
                            context.beginPath();
                            context.arc(0, 0, 0.5, 0, PI2, true);
                            context.fill();
                        }
                    });
                    var i = 0;
                    for (var ix = 0; ix < AMOUNTX; ix++) {
                        for (var iy = 0; iy < AMOUNTY; iy++) {
                            particle = particles[i++] = new THREE.Sprite(material);
                            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                            scene.add(particle);
                        }
                    }
                    renderer = new THREE.CanvasRenderer({
                        alpha: true // 背景透明
                    });
                    renderer.setPixelRatio(window.devicePixelRatio);
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    container.appendChild(renderer.domElement);
                    stats = new Stats();
                    container.appendChild(stats.dom);
                    document.addEventListener('mousemove', onDocumentMouseMove, false);
                    document.addEventListener('touchstart', onDocumentTouchStart, false);
                    document.addEventListener('touchmove', onDocumentTouchMove, false);
                    //
                    window.addEventListener('resize', onWindowResize, false);
                }
                function onWindowResize() {
                    windowHalfX = window.innerWidth / 2;
                    windowHalfY = window.innerHeight / 2;
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                }
                //
                function onDocumentMouseMove(event) {
                    mouseX = event.clientX - windowHalfX;
                    mouseY = event.clientY - windowHalfY;
                }
                function onDocumentTouchStart(event) {
                    if (event.touches.length === 1) {
                        event.preventDefault();
                        mouseX = event.touches[0].pageX - windowHalfX;
                        mouseY = event.touches[0].pageY - windowHalfY;
                    }
                }
                function onDocumentTouchMove(event) {
                    if (event.touches.length === 1) {
                        event.preventDefault();
                        mouseX = event.touches[0].pageX - windowHalfX;
                        mouseY = event.touches[0].pageY - windowHalfY;
                    }
                }
                //
                function animate() {
                    requestAnimationFrame(animate);
                    render();
                    stats.update();
                }
                function render() {
                    camera.position.x += (mouseX - camera.position.x) * .05;
                    camera.position.y = 364;
                    // camera.position.y += ( - mouseY - camera.position.y ) * .05;
                    camera.lookAt(scene.position);
                    var i = 0;
                    for (var ix = 0; ix < AMOUNTX; ix++) {
                        for (var iy = 0; iy < AMOUNTY; iy++) {
                            particle = particles[i++];
                            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) +
                                (Math.sin((iy + count) * 0.5) * 50);
                            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 +
                                (Math.sin((iy + count) * 0.5) + 1) * 4;
                        }
                    }
                    renderer.render(scene, camera);
                    count += 0.1;
                }
                let bg = document.getElementsByTagName('canvas')[1];
                bg.style.display = 'none';
            },
        },
    };
</script>

<style lang='scss'>
    @import "../../assets/style/base/index.scss";
    @media screen and (max-width: 1600px) {
        .signIn .login-wrapper {
            margin: 80px auto 0 auto !important;
            transform: scale(0.8) !important;
        }
    }
    @media screen and (max-width: 1280px) {
        .signIn .login-wrapper {
            margin-top: 5px !important;
            transform: scale(0.7) !important;
        }
    }
    .signIn {
        position: relative;
        width: 100%;
        height: 100%;
        background-size: cover;
        box-sizing: border-box;
        overflow: hidden;
        .login-wrapper {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 10% auto 0 auto;
            .logo {
                text-align: center;
            }
            @include nums($w: 500px);
            .login-text {
                @include nums($w: 500px, $h: 420px);
                margin-top: 55px;
                background-color: rgba(15, 25, 61, 0.5);
                box-shadow: 0px 10px 46px 0px rgba(13, 18, 35, 0.69);
                border-radius: 10px;
                padding: 50px;
                ul {
                    li {
                        position: relative;
                        border-bottom: solid 1px #313c61; // border-bottom: solid 1px #2d8cf0;
                        label {
                            position: absolute;
                            left: 5px;
                            top: 5px;
                            z-index: 1;
                            i {
                                color: #2d8cf0;
                                font-size: 22px;
                                position: relative;
                                top: 0px;
                            }
                        }
                        span {
                            input {
                                border: none;
                                display: inline-block;
                                @include nums($w: 400px, $h: 37px);
                                line-height: 37px;
                                padding-left: 47px;
                                font-size: 16px;
                                color: #fff;
                                background-color: rgba(15, 25, 61, 0) !important;
                            }
                        }
                        &:last-child {
                            margin-top: 40px;
                        }
                        &:first-child {
                            margin-top: 20px;
                        }
                    }
                }
                p {
                    text-align: right;
                    color: #fff;
                    margin-top: 30px;
                    font-size: 16px;
                    i {
                        color: #2d8cf0;
                        font-size: 18px;
                        cursor: pointer;
                    }
                }
                .ivu-btn-primary {
                    margin-top: 68px;
                    background-color: #2d8cf0;
                    border-color: #2d8cf0;
                    color: rgba(255, 255, 255, .85)
                }
                .ivu-btn {
                    font-size: 22px;
                }
            }
        }
    }
    .ivu-input:hover,
    .ivu-input:active,
    .ivu-input:focus {
        border-color: transparent;
        box-shadow: none;
    } //  .li:hover {
    //  border-bottom: solid 1px #2d8cf0;
    //  }
</style>


