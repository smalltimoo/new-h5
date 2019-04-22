<template>
    <div class="main-body">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{ $t('member.safePassword.sp1') }}
            </div>
            <div class="header-right">
            </div>
        </div>

        <div class="modifybankpass" v-if="coinPassword == ''">
            <form class="el-form el-form--label-right">
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 80px;">{{ $t('member.safePassword.sp2') }}</label><!--新密码 -->
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <div class="el-input">
                            <input v-model="vm.password" autocomplete="off" :placeholder="$t('member.safePassword.sp3')"
                                   maxlength="6" minlength="6" type="password" rows="2" validateevent="true"
                                   class="ipt"
                            /><!--密码必须为6位数字的组合 -->
                        </div>
                    </div>
                </div>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 80px;">{{ $t('member.safePassword.sp4') }}</label>
                    <!--确认密码 -->
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <div class="el-input">
                            <!---->
                            <input v-model="vm.truePassword" autocomplete="off"
                                   :placeholder="$t('member.safePassword.sp5')" maxlength="6" minlength="6"
                                   type="password" rows="2" validateevent="true" class="ipt"
                            />
                            <!-- 请再次填写新密码-->
                        </div>
                        <!---->
                    </div>
                </div>
            </form>
            <p class="A-text" style="">
                <Icon type="md-information-circle" style="font-size: 20px"/>&nbsp;
                <span>{{ $t('member.safePassword.sp6') }}{{ $t('member.safePassword.sp7') }} {{ $t('member.safePassword.sp8') }}</span>
            </p>
            <cube-button :active="true" @click="mNewPswSave" class="save-btn">
                {{ $t('member.safePassword.sp9') }} <!--立即设置 -->
            </cube-button>
        </div>

        <div class="modifybankpass" v-else>
            <form class="el-form el-form--label-right">
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 80px;">{{ $t('member.safePassword.sp11') }}</label>
                    <!--原密码 -->
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <div class="el-input">
                            <!---->
                            <input v-model="vm.oldPass" ref="oldPass"
                                   autocomplete="off"
                                   maxlength="6"
                                   minlength="6"
                                   placeholder="请输入原密码"
                                   type="password" rows="2" validateevent="true" class="ipt"
                            />
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 80px;">{{ $t('member.safePassword.sp12') }}</label>
                    <!--新密码 -->
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <div class="el-input">
                            <!---->
                            <input v-model="vm.newPass" ref="newPass" autocomplete="off"
                                   :placeholder="$t('member.safePassword.sp3') " maxlength="6" minlength="6"
                                   type="password" rows="2" validateevent="true" class="ipt"
                            />
                            <!-- 密码必须为6位数字的组合-->
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 80px;">{{ $t('member.safePassword.sp4') }}</label>
                    <!--确认密码 -->
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <div class="el-input">
                            <!---->
                            <input v-model="vm.truePass" ref="truePass" autocomplete="off"
                                   :placeholder="$t('member.safePassword.sp5')" maxlength="6" minlength="6"
                                   type="password" rows="2" validateevent="true" class="ipt"/>
                            <!-- 请再次填写新密码-->
                        </div>
                    </div>
                </div>
            </form>
            <p class="A-text" style="">
                <Icon type="md-information-circle" style="font-size: 20px"/>&nbsp;
                <span>{{ $t('member.safePassword.sp6') }}{{ $t('member.safePassword.sp7') }} {{ $t('member.safePassword.sp8') }}</span>
            </p>
            <cube-button :active="true" @click="mSave" class="save-btn">
                {{ $t('member.safePassword.sp9') }} <!--立即设置 -->
            </cube-button>
        </div>


    </div>

</template>
<script>
    export default {
        name: "SafePassword",
        data() {
            return {
                data: "",
                vm: {
                    password: "",
                    truePassword: ""
                },
                edit: {
                    oldPass: "",
                    newPass: "",
                    truePass: ""
                },
                coinPassword: ""
            };
        },
        mounted() {
            this.mLoading(true);
            this.$http.get("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    this.coinPassword = result.data.coinPassword;
                }
            });
            this.mInit();
        },
        methods: {
            mInit() {
                this.mLoading(true);
                this.$http.get("/memberUser/membercoin.json").then(result => {
                    console.log(result.data);
                    if (result.data == -1) {
                        this.data = result.data;
                        //请先设置资金密码
                        this.mAlert(this.$t('member.safePassword.sp14'), () => {
                        });
                    }
                });
            },
            mNewPswSave() {
                if (this.vm.password == "") {
                    //请输入资金密码！
                    this.mAlert(this.$t('member.safePassword.sp15'));
                    return;
                }
                if (this.vm.truePassword == "") {
                    //请再次输入资金密码！
                    this.mAlert(this.$t('member.safePassword.sp16'));
                    return;
                }
                if (this.vm.truePassword != this.vm.password) {
                    //两次输入的密码不一致！
                    this.mAlert(this.$t('member.safePassword.sp17'));
                    return;
                }
                if (this.vm.password.length != 6) {
                    //请输入正确的6位数字资金密码！
                    this.mAlert(this.$t('member.safePassword.sp18'));
                    return;
                }
                this.mLoading(true);
                this.$http
                    .post("/memberUser/setcoinpass.json", {newPass: this.vm.password})
                    .then(result => {
                        this.mLoading(false);
                        console.log(result);
                        if (result.code == 0) {
                            //操作成功
                            this.mAlert(this.$t('member.safePassword.sp19'), () => {
                            });
                            this.mInit();
                        }
                    });
            },
            mSave() {
                if (this.vm.oldPass == "") {
                    //请输入原资金密码
                    this.mAlert(this.$t('member.safePassword.sp20'), null, "warning");
                    return;
                }
                if (this.vm.newPass == "") {
                    //请输入新的资金密码
                    this.mAlert(this.$t('member.safePassword.sp21'), null, "warning");
                    return;
                }
                if (this.vm.truePass != this.vm.newPass) {
                    //两次输入的密码不一致
                    this.mAlert(this.$t('member.safePassword.sp22'), null, "warning");
                    return;
                }
                if (this.vm.newPass.length != 6) {
                    //请输入正确的6位数资金密码
                    this.mAlert(this.$t('member.safePassword.sp23'));
                    return;
                }
                this.mLoading(true);
                this.$http
                    .post("/memberUser/updatecoinpass.json", this.vm)
                    .then(result => {
                        this.mLoading(false);
                        if (result.code == 0) {
                            this.mAlert(
                                //修改成功
                                this.$t('member.safePassword.sp24'),
                                () => {
                                    this.vm = {};
                                },
                                "success"
                            );
                        } else {
                            this.mAlert(result.message, () => {
                            }, "error");
                        }
                    });
            }
        }
    };
</script>
<style>

    .modifybankpass {
        width: 100%;
        font-size: 0;
        margin-top: 60px;
    }

    .modifybankpass .el-form-item__label {
        text-align: left;
    }

    .modifybankpass .el-form {
        margin-top: 5px;
        background: #fff;
        color: #4c4c4c;
    }

    .modifybankpass .el-form-item {
        text-align: left;
        border-bottom: solid 1px #f3f3f3;
        padding: 0 15px;
    }

    .modifybankpass input {
        outline: none;
        border: none;
    }

    .modifybankpass .el-form-item {
        height: 56px;
        padding-top: 7px;
        margin-bottom: 0;
    }

    .modifybankpass .el-input__inner {
        /*background-color: #545478;*/
        border: 0;
    }

    .modifybankpass .G-submit {
        font-size: 16px;
    }
    .modifybankpass .A-text {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 10px;
        font-size: 13px;
        margin-top: 10px;
        text-align: left;
        line-height: 20px;
        color: #666;
    }
</style>

