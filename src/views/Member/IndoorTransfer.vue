<template>
    <div class="main-body">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{ $t('member.indoorTransfer.it0') }}<!--额度转换 -->
            </div>
            <div class="header-right">
                <router-link :to="{name:'OnlineDeposit'}">
                    {{ $t('member.indoorTransfer.it1') }} <!--先去存款 -->
                </router-link>
            </div>
        </div>

        <div class="interchange" style="margin-top: 60px">
            <form class="el-form el-form--label-right" style="margin-top: 10px;">
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 50px;">
                        {{ $t('member.indoorTransfer.it5')}}
                    </label><!--平台 -->
                    <div class="el-form-item__content" style="margin-left: 50px;">
                        <div class="el-input">
                            <input @tap="mShowWalletPicker"
                                    :placeholder="$t('member.indoorTransfer.it6')"
                                    readonly
                                    :value="cBankText"
                                    type="text"
                                    style="width: 80%;"
                                    class="el-input__inner"
                            ><!--请选择钱包 -->
                        </div>
                        <!-- <span class="All">全部转入</span> -->
                    </div>
                </div>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 50px;">
                        {{ $t('member.indoorTransfer.it2') }}
                    </label><!--模式 -->
                    <Select style="width: 60%;" class="el-form-item__content" v-model="transferType">
                        <Option value="0">{{ $t('member.indoorTransfer.it3') }}</Option><!--转入 -->
                        <Option value="1">{{ $t('member.indoorTransfer.it4') }}</Option><!--转出 -->
                    </Select>
                </div>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 50px;">{{ $t('member.indoorTransfer.it7')}}</label>
                    <!--金额-->
                    <div class="el-form-item__content" style="margin-left: 50px;">
                        <div class="el-input">
                            <input v-model="vm.dealCoin"
                                    :placeholder="$t('member.indoorTransfer.it7')"
                                    maxlength="8"
                                    type="number"
                                    step="1"
                                    min="1"
                                    class="el-input__inner"
                                    style="width: 80%;"
                            ><!-- 金额-->
                        </div>
                        <!-- <span class="All">全部转入</span> -->
                    </div>
                </div>
            </form>
            <cube-button :active="true" @click="mSave" class="save-btn">
                {{ $t('member.indoorTransfer.it8') }} <!--确定转账 -->
            </cube-button>
        </div>
    </div>
</template>
<script>
    var vue
    require('../../style/mui/index.less')
    export default {
        data() {
            return {
                walletlist: [],
                transferType: '',
                wallet: '',
                vm: {
                    walletIn: '',
                    walletOut: '',
                    dealCoin: ''
                },
                walletPicker: {},
                sltwallet: {},
                coin: {}
            }
        },
        computed: {
            cBankText() {
                return this.sltwallet.text ? this.sltwallet.text : ''
            }
        },
        mounted() {
            this.$nextTick(this.mInit)
        },
        methods: {
            mInit() {
                this.mLoading(true)
                this.mGetBanks().then(rbanks => {
                    console.log('00000')
                    if (rbanks.code == 0) {
                        let list = rbanks.data.walletlist ? rbanks.data.walletlist : []
                        list.forEach(ele => {
                            ele.value = ele.gameCompanyId
                            ele.text = ele.gameCompanyName + '(' + ele.coin / 100 + ')'
                        })
                        this.walletlist = [...[],...list]
                        this.mInitWalletPicker()
                        this.mLoading(false)
                    } else {
                        this.mLoading(false)
                        this.mAlert(rbanks.message, () => {
                        }, 'error')
                    }
                })
            },
            mGetBanks() {
                return this.$http.post('/managerGame/getWalletCoins.json')
            },
            mSave() {
                if (this.transferType == '') {
                    //请选择操作方式
                    this.$Message.warning(this.$t('member.indoorTransfer.it9'))
                    return
                }
                if (this.wallet == '' || this.wallet <= 0) {
                    //请选择要操作的钱包
                    this.$Message.warning(this.$t('member.indoorTransfer.it10'))
                    return
                }
                if (this.vm.dealCoin % 1 != 0) {
                    //请输入整数
                    this.$Message.warning(this.$t("member.indoorTransfer.inputNumber"));
                    return;
                }
                if (this.vm.dealCoin < 1) {
                    //转账金额必须大于1元
                    this.$Message.warning(this.$t('member.indoorTransfer.it11'))
                    return
                }
                if (this.transferType == 0) {
                    this.vm.walletIn = this.wallet
                    this.vm.walletOut = 0
                } else if (this.transferType == 1) {
                    this.vm.walletIn = 0
                    this.vm.walletOut = this.wallet
                }
                this.mLoading(true)
                this.$http
                    .post('/managerGame/wallettransfer.json', this.vm)
                    .then(result => {
                        this.mLoading(false)
                        if (result.code == 0) {
                            this.mRefreshAccountInfo()
                            this.$Message.success(this.$t('member.indoorTransfer.it12'))  //操作成功
                            this.mInit();
                            this.vm.dealCoin=0;
                            if (result.data < 0) {
                                this.$Message.warning(this.$t('member.indoorTransfer.it13')) //记录转账记录失败
                            } else if (result.data == 2) {
                                this.$Message.warning(this.$t('member.indoorTransfer.it14'))  //操作中心账户失败
                            } else if (result.data == 3) {
                                this.$Message.warning(this.$t('member.indoorTransfer.it15'))  //游戏厅操作失败
                            } else if (result.data == 4) {
                                this.$Message.warning(this.$t('member.indoorTransfer.it16')) //游戏厅未返回，请联系客服
                            }
                        } else {
                            this.$Message.warning(result.message)
                        }
                    })
            },
            mInitWalletPicker() {
                this.walletPicker = new mui.PopPicker()
                this.walletPicker.setData(this.walletlist)
            },
            mShowWalletPicker() {
                this.walletPicker.show(function (sltItem) {
                    vue.coin = sltItem[0]
                    vue.sltwallet = sltItem[0]
                    vue.wallet = sltItem[0].value
                })
            }
        },
        created() {
            vue = this
        }
    }
</script>

<style>
    .interchange {
        position: relative;
        width: 100%;
        font-size: 0;
        padding-bottom: 80px;
    }

    .interchange .el-form-item {
        position: relative;
        background: #fff;
        height: 50px;
        padding: 0 15px;
        margin-bottom: 0;
        line-height: 50px;
        border-bottom: solid 1px #f3f3f3;
    }

    .interchange .el-form-item__label {
        font-weight: 500;
        text-align: left;
    }

    .interchange .el-form-item__content .error {
        position: absolute;
        right: 15px;
        top: 15px;
    }
    .interchange .el-input__inner{
        margin-bottom: 0;
        height: 48px;
        line-height: 48px;
    }
    .interchange input {
        outline: none;
        border: none;
    }

    .interchange .All {
        position: absolute;
        top: 0;
        right: 15px;
        /*color: #a5a5a5;*/
    }

    .interchange .el-button--primary {
        background-color: #ffb301;
        border-color: #ffc501;
    }

    .interchange .ivu-select {
        width: 200px;
        /*margin-top: 6px;*/
    }

    .interchange .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        float: left;
        font-size: 15px;
        height: 48px;
        line-height: 48px;
        padding-left: 0;
        background-color: inherit !important;
    }

    .interchange .ivu-select-single .ivu-select-selection {
        border: none;
        height: 48px;
    }

    .interchange .ivu-select-visible .ivu-select-selection{
        box-shadow:inherit;
    }
    .interchange .ivu-select-arrow {
        font-size: 26px;
        color: #fff;
    }

    .interchange .ivu-select-item {
        font-size: 15px !important;
    }
</style>
