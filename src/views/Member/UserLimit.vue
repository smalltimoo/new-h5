<template>
    <div id="app">
        <div class="publicpage">
            <div class="gameLimit publicpage_view">
                <div class="TopHeader">
                    <div id="return" style="position: absolute;">
                        <router-link :to="{name:'UserMember'}">
                            <Icon type="ios-arrow-back"/>
                        </router-link>
                    </div>
                    {{ $t('member.userLimit.ul1') }}
                </div><!-- 账户信息-->
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content">
                            {{ $t('member.userLimit.ul2') }}
                        </div><!-- 个人基本信息-->
                    </div>
                </div>
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content bg-purple-dark" style="height: 63px; line-height: 63px;">
                            {{ $t('member.userLimit.ul3') }}
                            <span class="info"><!--头像 -->
         <i class="x-icon-game-logo avatar" :style="{background:'url('+ info.avatar+')'}"></i>
         <span style="padding-left: 15px;" name=""></span>
        </span>
                        </div>
                    </div>
                </div>
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content bg-purple-dark"><!--用户名 -->
                            {{ $t('member.userLimit.ul4') }}
                            <span class="info" name="">&nbsp; {{info.username}}<span style="padding-left: 15px;"
                                                                                     name=""></span></span>
                        </div>
                    </div>
                </div>
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content bg-purple-dark"><!--用户ID -->
                            {{ $t('member.userLimit.ul5') }}
                            <span class="info" name="">&nbsp; {{info.id}}<span style="padding-left: 15px;"
                                                                               name=""></span></span>
                        </div>
                    </div>
                </div>
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content bg-purple-dark">
                            <div to="/modify" class="bg-purple-dark"><!--真实姓名 -->
                                {{ $t('member.userLimit.ul6') }}
                                <span class="info"> {{info.realName}} <span style="padding-left: 15px;"></span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content bg-purple-dark"><!-- 手机号-->
                            {{ $t('member.userLimit.ul7') }} <span class="info"> {{info.mobile}} <span style="padding-left: 15px;"></span></span>
                        </div>
                    </div>
                </div>
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content bg-purple-dark"><!--微信 -->
                            {{ $t('member.userLimit.ul8') }} <span class="info"> {{info.weixin}} <span style="padding-left: 15px;"></span></span>
                        </div>
                    </div>
                </div>
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content bg-purple-dark"><!--QQ -->
                            {{ $t('member.userLimit.ul9') }} <span class="info"> {{info.qq}} <span style="padding-left: 15px;"></span></span>
                        </div>
                    </div>
                </div>
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content"><!--账号信息 -->
                            {{ $t('member.userLimit.ul10') }}
                        </div>
                    </div>
                </div>
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content bg-purple-dark"><!--注册时间 -->
                            {{ $t('member.userLimit.ul11') }}
                            <span class="info">{{info.createTimeStr}}<span style="padding-left: 15px;"></span></span>
                        </div>
                    </div>
                </div>
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content bg-purple-dark"><!-- 最后登录时间-->
                            {{ $t('member.userLimit.ul12') }}
                            <span class="info">{{info.lastLoginStr}}<span style="padding-left: 15px;"></span></span>
                        </div>
                    </div>
                </div>
                <button type="button" class="el-button G-submit el-button--primary" @click="mLoginOut">
                    <!---->
                    <!----><span>{{ $t('member.userLimit.ul13') }}</span></button><!--退出登录 -->
            </div>
        </div>
    </div>
</template>

<script>
    import types from "@/store/mutation-types";
    import message from "@/mixins/message";

    export default {
        mixins: [message],
        data() {
            return {
                info: {
                    username: "",
                    realName: "",
                    mobile: "",
                    qq: "",
                    weixin: "",
                    createTimeStr: "",
                    lastLoginStr: "",
                    id: 0,
                    avatar: '',
                }
            };
        },
        mounted() {
            this.mLoading(true);
            this.$http.get("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    this.info.username = result.data.username;
                    this.info.realName = result.data.realName;
                    this.info.mobile = result.data.mobile;
                    this.info.qq = result.data.qq;
                    this.info.weixin = result.data.weixin;
                    this.info.createTimeStr = result.data.createTimeStr;
                    this.info.lastLoginStr = result.data.lastLoginStr;
                    this.info.id = result.data.id;
                }
            });
            let sysobj = this.$store.getters.getSysPicObj;
            if(sysobj.mobileLogo != undefined){
                this.info.avatar=sysobj.mobileLogo;
            }
        },
        methods: {
            mLoginOut() {
                //确定要退出账号吗
                this.mConfirm(this.$t('member.userLimit.ul14'), () => {
                    //请稍等...
                    this.mLoading(true, this.$t('member.userLimit.ul15'));
                    this.$http.post("/logout.json").then(result => {
                        if (result.code === 0) {
                            //退出成功
                            this.mMessage(this.$t('member.userLimit.ul16'), "success", 0.5);
                            this.$store.dispatch(types.LOGINOUT_USER);
                            this.mLoading(false);
                            this.$router.push({name: "Home"});
                        }
                    });
                });
            }
        }
    };
</script>

<style>
    .publicpage {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: #33334e;
        z-index: 10;
    }
    .avatar{
        margin-right: 0;
        border-radius: 30px;
        background-position: 50% 50%!important;
        background-repeat: no-repeat !important;
        background-size: 100% auto !important;
        /*background-color: white!important;*/
    }

    .gameLimit {
        font-size: 0;
        width: 100%;
    }

    .TopHeader {
        background-color: #545478;
        border-bottom: 1px solid #3a3a3a;
        color: #fff;
    }

    .gameLimit .grid-content {
        height: 35px;
        line-height: 35px;
        text-align: left;
        padding-left: 16px;
        font-size: 14px;
    }

    .gameLimit .bg-purple-dark {
        display: block;
        position: relative;
        background: #545478;
        height: 44px;
        line-height: 44px;
        color: #fff;
        font-weight: 700;
        border-bottom: 1px solid #33334e;
    }

    .gameLimit .el-button--primary {
        background-color: #ffb301;
        border-color: #ffc501;
    }

    .gameLimit .info {
        position: absolute;
        right: 16px;
        top: 0;
        text-align: right;
        min-width: 90px;
    }

    .x-icon-game-logo {
        width: 58px;
        height: 58px;
        background-position: -336px -388px;
    }
</style>
