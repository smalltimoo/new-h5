<template>
    <div class="main-body">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{ $t('member.loginPassword.lp1') }}
            </div>
            <div class="header-right">
            </div>
        </div>
        <div class="modifyloginpass" style="margin-top: 60px">
            <form class="el-form el-form--label-right">
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 80px;">
                        {{ $t('member.loginPassword.lp2')}}
                    </label><!--原密码 -->
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <div class="el-input">
                            <input autocomplete="off" :placeholder="$t('member.loginPassword.lp2')" maxlength="12"
                                   minlength="6" rows="2" validateevent="true" class="el-input__inner edit_pwd"
                                   v-model="vm.oldPass" ref="oldPass"/>

                        </div>
                    </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 80px;">{{ $t('member.loginPassword.lp3')}}</label><!--新密码 -->
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <div class="el-input">
                            <!---->
                            <input autocomplete="off" :placeholder="$t('member.loginPassword.lp4')" maxlength="12"
                                   minlength="6" rows="2" validateevent="true" class="el-input__inner edit_pwd"
                                   v-model="vm.newPass" ref="newPass"/><!--密码必须6～12位英文或数字 -->
                        </div>
                        <!---->
                    </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 80px;">{{ $t('member.loginPassword.lp5')
                        }}</label><!--确认密码 -->
                    <div class="el-form-item__content" style="margin-left: 80px;">
                        <div class="el-input">
                            <!---->
                            <input autocomplete="off" :placeholder="$t('member.loginPassword.lp6')" maxlength="12"
                                   minlength="6" rows="2" validateevent="true" class="el-input__inner edit_pwd"
                                   v-model="vm.truePass" ref="truePass"
                            /><!--请再次填写新密码 -->
                        </div>
                        <!---->
                    </div>
                </div>
            </form>
            <p class="A-text" style=""> <!--密码须为 --> <!--6～12位英文或数字  且符合a~z字元或0~9-->
                <Icon type="md-information-circle" style="font-size: 20px"/>&nbsp;
                {{ $t('member.loginPassword.lp7') }}{{ $t('member.loginPassword.lp8') }}{{$t('member.loginPassword.lp16') }}
            </p>

            <cube-button :active="true" @click="mSave" class="save-btn">
                {{ $t('member.loginPassword.lp9') }} <!--立即设置 -->
            </cube-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                vm: {
                    oldPass: "",
                    newPass: "",
                    truePass: ""
                }
            };
        },
        methods: {
            mSave() {
                if (this.vm.oldPass == "") {
                    //请输入原登陆密码
                    this.$Message.warning(this.$t('member.loginPassword.lp10'), null, "warning");
                    return;
                }
                if (this.vm.newPass == "") {
                    //请输入新的登陆密码
                    this.$Message.warning(this.$t('member.loginPassword.lp11'), null, "warning");
                    return;
                }
                if (this.vm.truePass == "") {
                    //确认密码不能为空
                    this.$Message.warning(this.$t('member.loginPassword.lp12'), null, "warning");
                    return;
                }
                if (this.vm.truePass != this.vm.newPass) {
                    //两次输入的密码不一致
                    this.$Message.warning(this.$t('member.loginPassword.lp13'), null, "warning");
                    return;
                }
                if (this.vm.newPass.length < 6) {
                    //密码不可少于6位数，请重新输入！
                    this.$Message.warning(this.$t('member.loginPassword.lp14'), null, "warning");
                    return;
                }
                this.mLoading(true);
                this.$http
                    .post("/memberUser/updateloginpass.json", this.vm)
                    .then(result => {
                        this.mLoading(false);
                        if (result.code == 0) {
                            this.$Message.success(
                                //修改成功！
                                this.$t('member.loginPassword.lp15'),
                                () => {
                                    this.vm = {};
                                    this.mReLogin();
                                    this.$router.push({name: "Login"});
                                },
                                "success"
                            );
                        } else {
                            this.$Message.error(result.message, () => {
                            }, "error");
                        }
                    });
            }
        }
    };
</script>

<style>
    .modifybankpass .el-form {
        margin-top: 5px;
        background: #ffffff;
        padding: 5px 15px;
    }

    .modifybankpass input {
        outline: none;
        border: none;
    }

    .modifybankpass .el-form-item__label {
        font-weight: 900;
        color: #fff;
    }


    .modifybankpass .el-form-item {
        height: 56px;
        padding-top: 7px;
        margin-bottom: 0;
    }

    .modifybankpass .el-input__inner {
        background-color: #545478;
        color: #fff;
    }

    .modifybankpass .G-submit span {
        font-weight: 900;
    }

    .modifyloginpass {
        width: 100%;
        font-size: 0;
    }

    .modifyloginpass .el-form {
        margin-top: 5px;
        background: #ffffff;
    }

    .modifyloginpass input {
        outline: none;
        border: none;
    }

    .modifyloginpass .el-form-item__label {
        font-weight: 900;
    }


    .modifyloginpass .el-button--primary {
        background-color: #ffb301;
        border-color: #ffc501;
    }

    .modifyloginpass .el-form-item {
        height: 56px;
        padding-top: 7px;
        border-bottom: solid 1px #f3f3f3;
        margin-bottom: 0;
    }

    .modifyloginpass .G-submit {
        font-size: 16px;
    }

    .modifyloginpass .G-submit span {
        font-weight: 900;
    }

    .modifyloginpass .A-text {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 10px;
        font-size: 13px;
        margin-top: 10px;
        text-align: left;
        line-height: 20px;
        color: #666;
        white-space: nowrap;
    }

    .edit_pwd {
        background-color: #fff !important;
    }
</style>
