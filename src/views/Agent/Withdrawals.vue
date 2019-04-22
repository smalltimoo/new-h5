<template>
    <div class="main-body">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{ $t('agent.withdrawals.withdrawals1')}}
            </div>
            <div class="header-right"></div>
        </div>
        <div class="bank-info">
            <router-link :to="{name:'UserBankCard'}" v-if="bindBank">
                <div style="display: flex;align-items: center">
                    <Icon type="md-add-circle" style="font-size: 20px;color: #9b9b9b;;font-weight: 300;margin-top: -2px"/>&nbsp;&nbsp;
                    <span>添加银行卡</span>
                </div>
                <Icon type="ios-arrow-forward" style="font-size: 16px;color: #9b9b9b;;font-weight: 300"/>
            </router-link>
            <router-link :to="{name:'UserBankCard'}" v-else>
                <div>
                    <span>{{ $t('member.withdrawals.wa4') }}:</span> <!-- 到账银行卡-->
                    <span>{{ vmCard.drawAccountName }}</span>
                    <span>{{ vmCard.bankTypeName }}</span>
                    <span>{{ vmCard.account.slice(0,4) }} **** **** {{ vmCard.account.slice(vmCard.account.length-5,vmCard.account.length-1) }}</span>
                </div>
                <Icon type="ios-arrow-forward" style="font-size: 16px;color: #9b9b9b;;font-weight: 300"/>
            </router-link>
        </div>
        <div class="bank-info" style="margin-top: 10px">
            <router-link :to="{name:'SafaPassword'}" v-if="setPwd" >
                <div style="display: flex;align-items: center">
                    <Icon type="md-add-circle" style="font-size: 20px;color: #9b9b9b;;font-weight: 300;margin-top: -2px"/>&nbsp;&nbsp;
                    <span>设置资金密码</span>
                </div>
                <Icon type="ios-arrow-forward" style="font-size: 16px;color: #9b9b9b;;font-weight: 300"/>
            </router-link>
        </div>
        <div class="main-panel" style="margin-top: 10px;flex-direction: column;align-items: flex-start;position: relative">
            <span style="position: absolute;top: 47px;left: 10px;font-size: 18px;">￥</span>
            <p style="padding:10px"> {{ $t('member.withdrawals.wa7')}}</p>
            <input v-model="vm.dealcoin"
                   autocomplete="off"
                   placeholder="请输入提款金额"
                   size="mini"
                   maxlength="8"
                   type="text"
                   validateevent="true"
                   class="el-input__inner"
                   oninput="value=value.replace(/[^\d]/g,'')"
                   style="width: 100%;border:0;border-bottom: solid 1px #f3f3f3;padding-left: 38px"
            >
            <div style="height: 40px;display: flex;justify-content: space-between;align-items: center;padding: 0 10px;font-size: 12px;width: 100%;">
                <span>
                    {{$t('member.withdrawals.wa6')}}: ￥{{cAgentCashBalance.toFixed(2)}}
                </span>
                <span style="color: #007bc9;" @click="vm.dealcoin=cAgentCashBalance.toFixed(2)">全部提现</span>
            </div>
        </div>
        <div style="margin-top: 10px;background-color: #fff;display: flex;justify-content: flex-start;align-items: center">
            <label class="el-form-item__label" style="margin-left: 10px">{{ $t('member.withdrawals.wa10') }}</label>
            <!--提款密码 -->
            <input v-model="vm.coinpwd"
                   autocomplete="off"
                   :placeholder="$t('member.withdrawals.wa10')"
                   size="mini"
                   type="password"
                   validateevent="true"
                   style="width: 240px;border:0;margin-bottom: 0;height: 40px"
            ><!-- 提款密码-->
        </div>
        <cube-button :active="true" @click="mSave" class="save-btn">
            <span>{{ $t('member.withdrawals.wa11') }}</span><!--下一步 -->
        </cube-button>
    </div>
</template>

<script>
    var _this;
    export default {
        data() {
            return {
                banktypes: [],
                amount: 0,
                bindBank:false,
                setPwd:false,
                vmCard: {
                    account: "",
                    agentCashBalance: 0
                },
                vm: {
                    dealcoin: "",
                    coinpwd: ""
                }
            };
        },
        computed: {
            cAgentCashBalance() {
                let cb = this.vmCard.agentCashBalance / 100;
                return cb ? cb : 0;
            }
        },
        mounted() {
            this.mInit();
            this.$http.get("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    if (!result.data.coinPassword){
                        this.setPwd=true;
                    }
                }
            });
        },
        methods: {
            mInit() {
                this.mLoading(true);
                this.$http.all([this.mGetAgentCashBalance(), this.mGetBindBank()]).then(
                    this.$http.spread((resAgentCashBalance, rbindbank) => {
                        if (resAgentCashBalance.data == -1) {

                        } else if (resAgentCashBalance.data == -2) {
                            this.bindBank=true;
                            this.$Message.warning(_this.$t('agent.withdrawals.withdrawals15')); //请先绑定银行卡
                        } else {
                            this.vmCard.agentCashBalance = resAgentCashBalance.data;
                        }
                        if (rbindbank.code == 0) {
                            this.vmCard = Object.assign(this.vmCard, rbindbank.data);
                        }
                        this.mLoading(false);
                    })
                );
            },
            mGetAgentCashBalance() {
                return this.$http.get("/agentUser/agentCashBalance.json");
            },
            mGetBindBank() {
                return this.$http.get("/memberUser/getbindbank.json");
            },
            mSave() {
                if (this.vm.dealcoin == "") {
                    this.$Message.warning(_this.$t('agent.withdrawals.withdrawals16'));  //取现金额不能为空
                    return;
                }
                if (this.vm.dealcoin < 1) {
                    this.$Message.warning(_this.$t('agent.withdrawals.withdrawals17')); //取现金额必须大于1元
                    return;
                }
                if (this.vm.coinpwd == "") {
                    this.$Message.warning(_this.$t('agent.withdrawals.withdrawals18'));  //请输入资金密码
                    return;
                }
                if (this.vm.dealcoin > this.cAgentCashBalance) {
                    this.$Message.warning(_this.$t('agent.withdrawals.withdrawals19'));  //余额不足
                    return;
                }
                this.mLoading(true);
                let params = Object.assign({}, this.vm);
                this.$http.post("/agentUser/agentcash.json", params).then(result => {
                    this.mLoading(false);
                    if (result.code == 0) {
                        if (result.data == 0) {
                            this.$Message.success(_this.$t('agent.withdrawals.withdrawals20'));  //提现成功
                            this.mInit();
                        } else if (result.data == 1) {
                            this.setPwd=true;
                            this.$Message.warning(_this.$t('agent.withdrawals.withdrawals14'));
                            this.mAlert(_this.$t('agent.withdrawals.withdrawals21'), () => {   //请先设置资金密码
                                this.$router.push({name: "SafaPassword"});
                            });
                        } else if (result.data == 2) {
                            this.bindBank=true;
                            this.$Message.warning(_this.$t('agent.withdrawals.withdrawals22')); //请先绑定银行卡
                        }
                    } else {
                        this.$Message.error(result.message);
                    }
                });
            }
        },
        created() {
            _this = this;
        }
    };
</script>

<style scoped>

    .Withdrawals .G-card-box {
        position: relative;
        margin-top: 15px;
        border: 1px solid #c8a675;
        width: 200px;
        height: 100px;
    }

    .Withdrawals .G-card-name {
        font-size: 20px;
        line-height: 50px;
        font-weight: 900;
        height: 50px;
    }

    .Withdrawals .line-w {
        height: 1px;
        width: 100%;
        border-bottom: 1px solid #3a3a3a;
    }

    .Withdrawals .G-card-num {
        line-height: 40px;
        font-size: 16px;
    }

    .Withdrawals .G-card-box i {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 20px;
        height: 20px;
    }

    .Withdrawals .G-card-right a {
        display: block;
        line-height: 20px;
        font-size: 15px;
        text-align: left;
        margin-top: 15px;
        color: #c8a675;
    }

    .Withdrawals .el-form-item__label {
        font-weight: 900;
    }

    .Withdrawals .el-form-item {
        background: #ffffff;
        height: 55px;
        padding-top: 7px;
        margin-bottom: 0;
    }

    .Withdrawals .el-input.is-disabled .el-input__inner {
        background-color: transparent;
    }

    .Withdrawals input {
        border: none;
        outline: none;
        font-size: 15px;
    }

    .Withdrawals .el-input__inner {
        background-color: #545478;
        color: #fff;
    }

    .Withdrawals span.Description {
        position: absolute;
        font-size: 14px;
        right: 0;
        top: 0;
        height: 50px;
        width: 100px;
        color: #c8a675;
    }

    .Withdrawals .el-button--primary {
        background-color: #ffb301;
        border-color: #ffc501;
    }

    .Withdrawals .G-Warm {
        margin: 30px 20px;
    }

    .Withdrawals .G-Warm p {
        line-height: 24px;
        font-size: 15px;
        text-align: left;
    }

    .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        font-size: 18px;
        background-color: #545478;
        height: 35px;
        line-height: 35px;
    }

    .ivu-select-single .ivu-select-selection {
        border: none;
        /*width: 165px;*/
    }

    .bank-info {
        /*height: 50px;*/
        background-color: #fff;
        margin-top: 44px;
        padding: 0px 10px;
        font-size: 13px;
    }

    .bank-info > a {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #4c4c4c;
    }

    .bank-info > a > div > span {
        margin-right: 5px;
    }
</style>
