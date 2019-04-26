<template>
    <div class="login">
        <div class="top"></div>
        <div class="container">
            <Icon type="ios-arrow-back" @click="activeName='mobileLogin'" class="goBack" v-if="activeName=='register'"/>
            <el-tabs v-model="activeName" class="login-panel">
                <el-tab-pane label="手机登录" name="mobileLogin" v-if="activeName!='register' && apiKey">
                    <div style="position: relative">
                        <el-select v-model="areaCode" filterable placeholder="请选择" class="eye area">
                            <el-option v-for="(item,index) in phoneAreaCode"
                                       :key="index"
                                       :label="item.value+'  '+item.code"
                                       :value="item.code"
                            >
                            </el-option>
                        </el-select>
                        <input type="number" ref="username" class="login-input phone" placeholder="请输入手机号"
                               @click="$refs.phone1.close()" v-model="phone"
                               style="padding-left: 165px"
                        />
                        <cube-tip ref="phone1"
                                class="tip"
                                direction="top"
                        >
                            请输入手机号码
                        </cube-tip>
                    </div>
                    <div style="position: relative">
                        <input type="text" ref="checkcode" class="login-input code" placeholder="请输入验证码"
                               @click="$refs.phone2.close()" v-model="verifyCode" autocomplete="off"
                        />
                        <div class="bg-code" @click="getCode">获取验证码</div>
                        <cube-tip
                                ref="phone2"
                                class="tip"
                                direction="top"
                        >
                            请输入验证码
                        </cube-tip>
                    </div>

                    <div class="login-check">
                        <span class="link-b" @click="activeName='register'">立即注册</span>
                    </div>
                    <input type="button" class="btn-login" value="登录" @click="mPhoneLogin"/>

                </el-tab-pane>
                <el-tab-pane label="账号登录" name="login" v-if="activeName!='register'">
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
                    <div class="reg">
                        还没有帐号？
                        <span @click="activeName='register'" style="color:#0288d1">立即注册</span>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register" v-if="activeName=='register'">
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
    import types from '@/store/mutation-types';
    import message from '@/mixins/message';
    import {mapState} from 'vuex';

    let timer;
    export default {
        mixins: [message],
        data() {
            return {
                activeName: 'mobileLogin',
                vcodeurl: '',
                username: '',
                password: '',
                checkcode: '',
                phone: '',
                verifyCode: '',
                random: 0,
                savenp: false,
                getCodes: true,
                phoneAreaCode: [],
                areaCode: '+86',
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
            ...mapState({
                apiKey: state => state.common.systemSettings.apiKey,
            }),
            cgetCodeUrl() {
                return this.$store.getters.getBaseUrl + '/checkCode.json?t=' + this.random + '&token=' + this.$store.getters.getSessionToken
            },
        },
        mounted(){
            if(this.apiKey==''){
                this.activeName='login';
            }
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
                if (!this.vm.username.trim()) {
                    this.$refs.reg1.show(); //账号必须！
                    return;
                }
                if (this.vm.username.trim().length < 4 || this.vm.username.length > 12) {
                    this.$refs.reg2.show();//账号长度为4-12位
                    return;
                }
                if (!this.vm.password.trim()) {
                    this.$refs.reg3.show(); //密码必须！
                    return;
                }
                if (this.vm.password.trim().length < 6) {
                    this.$refs.reg4.show();//请输入6-12位密码！
                    return;
                }
                if (this.vm.password.trim() != this.vm.truePassword.trim()) {
                    this.$refs.reg5.show();//两次输入密码不一致！
                    return;
                }
                if (this.vm.mobile.trim() == "") {
                    this.$refs.reg6.show(); //手机号码不可为空！
                    return;
                }
                if (!this.vm.checkcode.trim()) {
                    this.$refs.reg7.show();  //验证码必须
                    this.vm.checkcode = "";
                    return;
                }
                this.isLogining = true;
                var params = {};
                params.sysId = this.vm.sysId.trim();
                params.username = this.vm.username.trim();
                params.password = this.vm.password.trim();
                params.checkcode = this.vm.checkcode.trim();
                params.mobile = this.vm.mobile.trim();
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
                if (!this.username.trim()) {
                    this.$refs.tip1.show(); //请输入用户名和密码！
                    return
                }
                if (!this.password.trim()) {
                    this.$refs.tip2.show(); //请输入用户名和密码！
                    return
                }
                if (!this.checkcode.trim()) {
                    this.$refs.tip3.show();//请输入验证码
                    return
                }
                //登陆中...
                this.mLoading(true, this.$t('login.alert4'))
                this.mmLogin(this.username.trim(), this.password.trim(), this.checkcode.trim())
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
            },
            mPhoneLogin(){
                if (this.phone.trim() == "") {
                    this.$refs.phone1.show(); //请输入手机号码
                    return;
                }
                if (this.verifyCode.trim() == "") {
                    this.$refs.phone2.show(); //请输入手机号码
                    return;
                }
                this.mLoading(true);
                this.$http.post("/memberUser/quickLogin.json", {phoneNo:this.phone,areaCode:this.areaCode,verifyCode:this.verifyCode}).then(result => {
                    this.mLoading(false);
                    if (result.code == 0) {
                        this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
                        this.mLoading(false);
                        this.mMessage(
                            "登陆成功！",
                            () => {
                                if(result.data.isNewMember==1){
                                    this.mConfirm('您的初始密码是123456, 是否前去修改?', () => {
                                        this.$router.push({name: 'LoginPassword'})
                                    })
                                }
                                this.$store.dispatch(types.COMMON_GONGGAO, this);
                                this.$router.push({ name: "Home" });
                            },
                            "success",
                            0.5
                        );
                    } else {
                        this.mVCode();
                        this.verifyCode='';
                        this.$Message.error(result.message);
                    }
                });
            },
            getCode() {
                if (this.getCodes) {
                    if (this.phone.trim() == "") {
                        this.$refs.phone1.show(); //请输入手机号码
                        return;
                    }
                    let time = 60;
                    this.getCodes = false;
                    timer = setInterval(() => {
                        if (time >= 1) {
                            time--;
                            $('.bg-code').text(time + ' 秒')
                        } else {
                            this.getCodes = true;
                            clearInterval(timer);
                            $('.bg-code').text('获取验证码');
                            console.log(1)
                        }
                    }, 1000)

                    this.$http.post("/memberUser/sendVerifyCode.json", {
                        mobile: this.phone,
                        areaCode: this.areaCode
                    }).then(result => {
                        if (result.code == 0) {
                            this.$Message.success('验证码已发送');
                            console.log(result);
                        } else {
                            this.$Message.error(result.message);
                        }
                    })
                }
            }
        },
        created() {
            this.mInit();
            this.$http.post("/phoneAreaCode.json").then(result => {
                if (result.code == 0) {
                    this.phoneAreaCode = result.data.codes;
                } else {
                    this.$Message.error(result.message);
                }
            })
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

    .login-panel >>> .el-input__inner {
        border: 0 !important;
    }
    .login-panel >>> .el-tabs__header{
        padding-left: 8px;
        padding-bottom: 10px;
    }
    .area {
        width: 120px;
        left: 30px;
    }

    .reg{
        /*position: fixed;*/
        /*bottom: 10px;*/
        height: 40px;
        margin-top: 20px;
        line-height: 40px;
        width: 100%;
        left: 0;
        color: #7f7f7f;
    }
</style>


