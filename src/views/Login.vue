<template>
    <div class="login">
        <div class="top"></div>
        <div class="container">
            <el-tabs v-model="activeName" class="login-panel">
                <el-tab-pane label="登录" name="login" style="display: flex;flex-direction: column">
                    <div>
                        <input type="text" ref="username" class="login-input user" placeholder="请输入用户名"
                               @click="$refs.tip1.close()" v-model="username"/>
                        <cube-tip
                                ref="tip1"
                                class="tip"
                                direction="top"
                        >
                            {{ this.$t('login.alert1') }}
                        </cube-tip>
                    </div>
                    <div>
                        <input type="password" ref="password" class="login-input pwd" placeholder="6-20位登录密码"
                               @click="$refs.tip2.close()" v-model="password"/>
                        <cube-tip
                                ref="tip2"
                                class="tip"
                                direction="top"
                        >
                            {{ this.$t('login.alert1') }}
                        </cube-tip>
                    </div>
                    <div style="position: relative">
                        <input type="text" ref="checkcode" class="login-input code" placeholder="请输入验证码"
                               @click="$refs.tip3.close()" v-model="checkcode"/>
                        <span class="eye"><img :src="cgetCodeUrl" @click="mVCode()"></span>
                        <cube-tip
                                ref="tip3"
                                class="tip"
                                direction="top"
                        >
                            {{ this.$t('login.alert3') }}
                        </cube-tip>
                    </div>

                    <div class="login-check">
                        <Checkbox v-model="savenp" style="float:left;">&nbsp;记住密码</Checkbox><!-- 记住密码-->
                        <span style="font-size: 12px">忘记密码?</span>
                    </div>
                    <input type="button" class="btn-login" value="登录" @click="mLogin"/>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">
                    <div>
                        <input type="text" class="login-input user" placeholder="请输入用户名"
                               @click="$refs.reg1.close();$refs.reg2.close();" v-model="vm.username"/>
                        <cube-tip
                                ref="reg1"
                                class="tip"
                                direction="top"
                        >
                            {{ this.$t('reg.mustAccount') }}
                        </cube-tip>
                        <cube-tip
                                ref="reg2"
                                class="tip"
                                direction="top"
                        >
                            {{ this.$t('reg.must412') }}
                        </cube-tip>
                    </div>
                    <div>
                        <input type="password" class="login-input pwd" placeholder="6-20位登录密码"
                               @click="$refs.reg3.close();$refs.reg4.close()" v-model="vm.password"/>
                        <cube-tip
                                ref="reg3"
                                class="tip"
                                direction="top"
                        >
                            {{ this.$t('reg.mustpwd') }}
                        </cube-tip>
                        <cube-tip
                                ref="reg4"
                                class="tip"
                                direction="top"
                        >
                            {{ this.$t('reg.must612') }}
                        </cube-tip>
                    </div>
                    <div>
                        <input type="password" class="login-input pwd" placeholder="再次确认密码"
                               @click="$refs.reg5.close()" v-model="vm.truePassword"/>
                        <cube-tip
                                ref="reg5"
                                class="tip"
                                direction="top"
                        >
                            {{ this.$t('reg.mustSame') }}
                        </cube-tip>
                    </div>
                    <div>
                        <input type="number" class="login-input phone" placeholder="请输入您的手机号码"
                               @click="$refs.reg6.close()" v-model="vm.mobile"/>
                        <cube-tip
                                ref="reg6"
                                class="tip"
                                direction="top"
                        >
                            {{ this.$t('reg.phonenoempty') }}
                        </cube-tip>
                    </div>

                    <div style="position: relative">
                        <input type="text" class="login-input code" placeholder="请输入验证码" @click="$refs.reg7.close()"
                               v-model="vm.checkcode"/>
                        <span class="eye"><img :src="cgetCodeUrl" @click="mVCode()"></span>
                        <cube-tip
                                ref="reg7"
                                class="tip"
                                direction="top"
                        >
                            {{ this.$t('reg.mustcode') }}
                        </cube-tip>
                    </div>
                    <input type="button" class="btn-login" value="立即注册" @click="mSave"/>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import types from '@/store/mutation-types'
    import message from '@/mixins/message'

    export default {
        mixins: [message],
        data() {
            return {
                activeName: 'login',
                vcodeurl: '',
                username: '',
                password: '',
                checkcode: '',
                random: 0,
                savenp: false,
                vm: {
                    sysId: "",
                    username: "",
                    password: "",
                    truePassword: "",
                    checkcode: "",
                    mobile: ""
                },
            }
        },
        computed: {
            cgetCodeUrl() {
                return this.$store.getters.getBaseUrl + '/checkCode.json?t=' + this.random + '&token=' + this.$store.getters.getSessionToken
            },
        },
        methods: {
            mInit() {
                this.mVCode()
                let saveuser = JSON.parse(localStorage.getItem('s') || '{}')
                if (saveuser.s) {
                    this.savenp = true
                    this.username = saveuser.u
                    this.password = saveuser.p
                } else {
                    this.savenp = false
                }
            },
            mVCode() {
                this.checkcode = ''
                this.random = Math.random();
            },
            mSave() {
                if (this.isLogining) return;
                if (!this.vm.username) {
                    this.$refs.reg1.show(); //账号必须！
                    return;
                }
                if (this.vm.username.length < 4 || this.vm.username.length > 12) {
                    this.$refs.reg2.show();//账号长度为4-12位
                    return;
                }
                if (!this.vm.password) {
                    this.$refs.reg3.show(); //密码必须！
                    return;
                }
                if (this.vm.password.length < 6) {
                    this.$refs.reg4.show();//请输入6-12位密码！
                    return;
                }
                if (this.vm.password != this.vm.truePassword) {
                    this.$refs.reg5.show();//两次输入密码不一致！
                    return;
                }
                if (this.vm.mobile == "") {
                    this.$refs.reg6.show(); //手机号码不可为空！
                    return;
                }
                if (!this.vm.checkcode) {
                    this.$refs.reg7.show();  //验证码必须
                    this.vm.checkcode = "";
                    return;
                }
                this.isLogining = true;
                var params = {};
                params.sysId = this.vm.sysId;
                params.username = this.vm.username;
                params.password = this.vm.password;
                params.checkcode = this.vm.checkcode;
                params.mobile = this.vm.mobile;
                if (this.$route.query && this.$route.query.registerCode) {
                    params.registerCode = this.$route.query.registerCode;
                    sessionStorage.setItem("registerCode", params.registerCode);
                } else {
                    let rc = sessionStorage.getItem("registerCode");
                    if (rc) {
                        params.registerCode = rc;
                    }
                }
                if (this.$route.query && this.$route.query.lid) {
                    params.lid = this.$route.query.lid;
                    sessionStorage.setItem("lid", params.lid);
                } else {
                    let rc = sessionStorage.getItem("lid");
                    if (rc) {
                        params.lid = rc;
                    }
                }
                this.mLoading(true);
                this.$http.post("/memberUser/registerUser.json", params).then(result => {
                    this.isLogining = false;
                    this.mLoading(false);
                    if (result.code == 0) {
                        this.mmLogin(params.username, params.password, params.checkcode)
                            .then(result => {
                            })
                            .catch(result => {
                                this.$router.push({
                                    name: "Login"
                                });
                            });
                    } else {
                        this.mVCode();
                        this.$Message.error(result.message);
                    }
                });
            },
            mLogin() {
                if (!this.username) {
                    this.$refs.tip1.show(); //请输入用户名和密码！
                    return
                }
                if (!this.password) {
                    this.$refs.tip2.show(); //请输入用户名和密码！
                    return
                }
                if (!this.checkcode) {
                    this.$refs.tip3.show();//请输入验证码
                    return
                }
                //登陆中...
                this.mLoading(true, this.$t('login.alert4'))
                this.mmLogin(this.username, this.password, this.checkcode)
                    .then(res => {
                        if (this.savenp) {
                            let a = {
                                s: true,
                                u: this.username,
                                p: this.password
                            }
                            localStorage.setItem('s', JSON.stringify(a))
                        } else {
                            localStorage.removeItem('s')
                        }
                        this.mLoading(false)
                    })
                    .catch(result => {
                        this.mLoading(false)
                        this.$Message.error(result.message);
                        this.isLogining = false
                        this.mVCode()
                    })
            }
        },
        created() {
            this.mInit()
        }
    }
</script>

<style scoped>
    .tip {
        /*margin-top: 50px;*/
        margin-left: 70px
    }

    .LogIn #G-Login-return {
        margin-top: 25px;
        color: #fff;
    }

    .LogIn .el-button--primary {
        margin-top: 30px;
    }
</style>


