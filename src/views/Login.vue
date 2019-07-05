<template>
    <div class="login">
        <div class=" login_top" >
            <!-- <img src="../assets/images/login/Home.png" width="25px"/> -->
            <span><van-icon name="close"  @click="$router.push({name:'Home'})" /></span>
            <span @click="showVan = true">账号密码登录 <van-icon name="arrow" /></span>
        </div>
        <!-- <div class="top"></div> -->
        <div class="container">
            <section class="login_main">
                <div class="logo"> <img src="../assets/images/reglogin/logo.png" alt=""></div>
                <p class="welcome">欢迎来到<font>{{name}}</font></p>
                <p class="text">赶快登陆挣钱吧</p>
                
                <div style="position: relative;margin-top:25px;">
                    <h3 class="title">手机号码</h3>
                        <el-select v-model="areaCode" filterable placeholder="请选择" class="eye area">
                            <el-option v-for="(item,index) in phoneAreaCode"
                                       :key="index"
                                       :label="item.value+'  '+item.code"
                                       :value="item.code"
                            >
                            </el-option>
                        </el-select>
                        <input type="number" ref="username" class="login-input" :placeholder="$t('login.enterPhoneNumber')"
                               @click="$refs.phone1.close()" v-model="phone"
                        />
                        <cube-tip ref="phone1"
                                class="tip"
                                direction="top"
                        >
                            {{$t('login.enterTruePhoneNumber')}}
                        </cube-tip>
                    </div>
                    <div style="position: relative">
                         <h3 class="title">验证码</h3>
                        <input type="text" ref="checkcode" maxlength="4" style="width:100%" class="login-input" :placeholder="$t('login.enterVerifyCode')"
                               @click="$refs.phone2.close()" v-model="verifyCode" autocomplete="off"
                        />
                        <div class="bg-code" @click="getCode">{{$t('login.getVerifyCode')}}</div>
                        <cube-tip
                                ref="phone2"
                                class="tip"
                                direction="top"
                        >
                            {{$t('login.enterVerifyCode')}}
                        </cube-tip>
                        
                    </div>
                    <div style="position: relative">
                         <h3 class="title">邀请码</h3>
                       <input type="number" class="login-input invit" maxlength="6"  :placeholder="$t('login.enterInvitCode')" v-model="vm.invitationCode"/>
                        <cube-tip
                                ref="reg9"
                                class="tip"
                                direction="top"
                        >
                            {{ this.$t('login.enterTrueInvitCode') }}
                        </cube-tip>
                    </div>

                    <!-- <div class="login-check">
                        <span class="link-b" @click="activeName='register'">{{$t('login.register')}}</span>
                    </div> -->
                    <input type="button" class="btn-login" :value="'注册登录'" @click="mPhoneLogin"/>
                    <input type="button" class="btn-login" style="background-color:#fff;color:#3d7eff;font-size:13px;margin-top:5px;" :value="'选择线路'" @click.stop="isshowLines =true"/>
            </section>
            <van-popup v-model="showVan" position="right" style="width:100%;height:100%">
      <section class="el-container is-vertical">
          
          <div class=" login_top" >
           <van-icon name="arrow-left" class="icon-menu" @click="showVan = false"/>
            <!-- <Icon type="ios-arrow-back" class="icon-menu" @click="back"/> -->
        </div>
         <section class="login_main">
                <div class="logo"><img src="../assets/images/reglogin/logo.png" alt=""></div>
                <p class="welcome">欢迎来到<font>{{name}}</font></p>
                <p class="text">赶快登陆挣钱吧</p>
                   <div style="margin-top:25px;">
                       <h3 class="title">账号/手机号</h3>
                        <input type="text" ref="username" class="login-input" :placeholder="$t('login.enterUserName')"
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
                        <h3 class="title">密码</h3>
                        <input type="password" ref="password" class="login-input" :placeholder="$t('login.mustPwd620')"
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
                        <h3 class="title">验证码</h3>
                        <input type="text" ref="checkcode" class="login-input" :placeholder="$t('login.alert7')"
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
                        <Checkbox v-model="savenp" style="float:left;">&nbsp;{{$t('login.rememberAccount')}}</Checkbox><!-- 记住密码-->
                        <span style="font-size: 12px">{{$t('login.losePwd')}}?</span>
                    </div>
                    <input type="button" class="btn-login" :value="$t('login.login')" @click="mLogin"/>
                    <!-- <div class="reg">
                        {{$t('login.noAccount')}}？
                        <span @click="activeName='register'" style="color:#0288d1">{{$t('login.register')}}</span>
                    </div> -->
                   
                   
                    <input type="button" class="btn-login" style="background-color:#fff;color:#3d7eff;font-size:13px;margin-top:5px;" :value="'选择线路'" @click.stop="isshowLines = true"/>
            </section>
      </section>
    </van-popup>
          
        </div>
        <line-selectdlg :is-show="isshowLines" @close="CB_dialog"></line-selectdlg>
    </div>
</template>
<script>
    import types from '@/store/mutation-types';
    import message from '@/mixins/message';
    import {mapState} from 'vuex';
    import LineSelectdlg from '@/common/LineSelectdlg.vue'
    let timer;
    export default {
        mixins: [message],
        data() {
            return {
                name:'万豪娱乐',
                showVan:false,
                isshowLines:false,
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
                    invitationCode:'',
                    checkcode: "",
                    mobile: ""
                },
            }
        },
        components:{
            LineSelectdlg,
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
            this.areaCode=this.$i18n.locale=='th' ? '+66' : '+86';
            if(this.$route.params.type=='register'){
                this.activeName='register';
            }
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
                params.invitationCode = this.vm.checkcode.trim();
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
                            this.$t('login.alert11'),
                            () => {
                                if(result.data.isNewMember==1){
                                    this.mConfirm(this.$t('login.alert12'), () => {
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
            
                CB_dialog (val){
                this.isshowLines = false;
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
                            $('.bg-code').text(time +  this.$t('login.alert9'))
                        } else {
                            this.getCodes = true;
                            clearInterval(timer);
                            $('.bg-code').text(this.$t('login.alert8'));
                            console.log(1)
                        }
                    }, 1000)

                    this.$http.post("/memberUser/sendVerifyCode.json", {
                        mobile: this.phone,
                        areaCode: this.areaCode
                    }).then(result => {
                        if (result.code == 0) {
                            this.$Message.success(this.$t('login.alert10'));
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
        width: 35%;
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

    .login >>> .el-input__inner {
        border: 0;
        height: inherit;
        line-height: inherit;
        padding-left: 0px;
    }
    .login >>> .el-input__icon {
        line-height: inherit;
    }
    .icon-menu {
        font-size: 0.72rem;
    }
</style>


