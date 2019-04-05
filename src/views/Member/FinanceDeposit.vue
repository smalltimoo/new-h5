<template>
    <div id="app">
        <div class="LotteryWrapper">
            <div class="TopHeader">
                <div id="return" style="position: absolute;">
                    <router-link :to="{name:'OnlineDeposit'}">
                        <Icon type="ios-arrow-back"/>
                    </router-link>
                </div>
                {{ $t('member.financeDeposit.fd1') }}
                <div class="filter" @click="showSearch=true"><!--线下充值 -->
                    <router-link :to="{name:'CapitalRecord'}">{{ $t('member.financeDeposit.fd2') }}</router-link><!--存款记录 -->
                </div>
            </div>
            <div style="margin-top:15px;">

                <div v-if="active==0">
                    <div class="all-title">
                        <strong style="margin-left:30px;color: #ffff009e;">{{ $t('member.financeDeposit.fd3') }}</strong><!--1、请勾选充值银行 -->
                    </div>
                    <div v-for="(item,i) in companyAccounts" :key="i"
                         :class="['bank-info-list',{'bank-info-list-bord':item.isActive}]" @click="mSelected(item)">
                        <dl>
                            <dd class="banks">
                                <img :src="item.logo" alt="">
                            </dd>
                            <dd style="float: right;">
                                <input name="bankInfoId" type="radio" value="" style="display: none;">
                            </dd>
                        </dl>
                        <div :class="{'bank-info-list-sel-badage':item.isActive}"></div>
                    </div>
                </div>

                <div v-if="active==1">
                    <div class="all-title" style="margin-top:15px;">
                        <strong style="margin-left:30px;color: #ffff009e;">{{ $t('member.financeDeposit.fd4') }}</strong><!--2、提交转账信息 -->
                    </div>
                    <div class="input-info-group" style="margin-top: 40px">
                        <span class="input-title">{{ $t('member.financeDeposit.fd5') }}</span><!-- 转账人姓名：-->
                        <Input :placeholder="$t('member.financeDeposit.fd6')" class="input-trans" v-model="vmunderline.underlineAccountName"/><!-- 请输入转账人姓名-->
                    </div>
                    <div class="input-info-group">
                        <span class="input-title">{{ $t('member.financeDeposit.fd7') }}</span><!--转账方式： -->
                        <!--<span class="input-title" >转账方式：</span>-->
                        <span v-if="selectedBank.accountType==1 || selectedBank.accountType==2"
                              class="input-title"
                              style="text-align: left"
                              v-text="payName"
                        >
                        </span>
                        <div class="input-trans" v-else>
                            <div class="el-form-item__content">
                                <div class="el-input" style="width:160px;">
                                    <input @tap="mShowWalletPicker" :placeholder="$t('member.financeDeposit.fd7')" readonly :value="clineTypest"
                                           type="text"><!-- 转账方式-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input-info-group">
                        <span class="input-title">{{ $t('member.financeDeposit.fd8') }}</span><!--附 言： -->
                        <Input :placeholder="$t('member.financeDeposit.fd27')" class="input-trans" v-model="vmunderline.remark"/><!--请输入内容 -->
                    </div>

                    <div class="input-info-group">
                        <span class="input-title">{{ $t('member.financeDeposit.fd9') }}</span><!--转账人银行： -->
                        <div class="input-trans">
                            <span v-if="selectedBank.accountType==1 || selectedBank.accountType==2"
                                  class="input-title"
                                  style="text-align: left"
                                  v-text="banktypes.filter(item=>item.id==selectedBank.drawAccountType)[0].bankName"
                            >
                            </span>
                            <div class="el-form-item__content" v-else>
                                <div class="el-input" style="width:160px;">
                                    <input @tap="mBanks" :placeholder="$t('member.financeDeposit.fd9')" readonly :value="BankType" type="text"><!--转账人银行 -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input-info-group">
                        <span class="input-title">{{ $t('member.financeDeposit.fd10') }}</span><!-- 充值金额：-->
                        <Input :placeholder="$t('member.financeDeposit.fd11')+selectedBank.minMoney/100+' ~ '+ selectedBank.maxMoney/100+$t('member.financeDeposit.fd12')"
                               class="input-trans" v-model="vmunderline.orderAmount"/><!--额度： --> <!-- 元-->
                    </div>

                    <div class="info-submit-container">
                        <el-button type="primary" @click="checkFrom">{{ $t('member.financeDeposit.fd13') }}</el-button><!-- 下一步-->
                    </div>
                </div>

                <div v-if="active==2" style="position: relative">
                    <div class="all-title">
                        <strong style="margin-left:30px;color: #ffff009e;">{{ $t('member.financeDeposit.fd14') }}</strong><!-- 3、线下充值打款-->
                    </div>
                    <div class="">
                        <div class="pay-info">
                            <span>{{ $t('member.financeDeposit.fd15') }}</span><!-- 收款人姓名:-->
                            <span v-text="selectedBank.bankAccountName"></span>
                            <el-button class="clipboard"
                                       type="info"
                                       size="mini"
                                       icon="el-icon-edit-outline"
                                       @click="copy"
                                       :data-clipboard-text="selectedBank.bankAccountName"
                            >
                                {{ $t('member.financeDeposit.fd16') }}
                            </el-button><!--复制 -->

                        </div>
                        <div class="pay-info">
                            <span>{{ $t('member.financeDeposit.fd17') }}</span><!--收款人卡号: -->
                            <span v-text="selectedBank.account" style="font-weight: bold"></span>
                            <el-button class="clipboard"
                                       type="info"
                                       size="mini"
                                       icon="el-icon-edit-outline"
                                       @click="copy"
                                       :data-clipboard-text="selectedBank.account"
                            >
                                {{ $t('member.financeDeposit.fd16') }}
                            </el-button><!--复制 -->
                        </div>
                        <div class="pay-info">
                            <span>{{ $t('member.financeDeposit.fd28') }}</span><!-- 账户类型:-->
                            <span v-text="selectedBank.drawAccountTypeStr"></span>
                        </div>
                        <div class="pay-info">
                            <span>{{ $t('member.financeDeposit.fd18') }}</span><!--开户行网点: -->
                            <span v-text="selectedBank.bankAddress"></span>
                            <el-button class="clipboard"
                                       type="info"
                                       size="mini"
                                       icon="el-icon-edit-outline"
                                       @click="copy"
                                       :data-clipboard-text="selectedBank.bankAddress"
                            >
                                {{ $t('member.financeDeposit.fd16') }}
                            </el-button><!-- 复制-->
                        </div>
                        <div class="pay-info">
                            <span>{{ $t('member.financeDeposit.fd19') }}</span><!-- 转账方式:-->
                            <span>{{ vmunderline.underlineType | payWay }}</span>
                        </div>
                        <div class="pay-info">
                            <span>{{ $t('member.financeDeposit.fd20') }}</span><!--附言: -->
                            <span v-text="vmunderline.remark"></span>
                        </div>
                        <div class="pay-info">
                            <span>{{ $t('member.financeDeposit.fd21') }}</span><!--充值金额: -->
                            <span v-text="vmunderline.orderAmount" style="font-weight: bold"></span>
                        </div>
                        <div class="pay-info" v-if="selectedBank.accountType==1 || selectedBank.accountType==2"
                             style="display: flex;flex-direction: column;margin-top: 20px">
                            <div v-if="selectedBank.accountType==1">{{ $t('member.financeDeposit.fd22') }}</div><!--请用支付宝扫描下方二维码完成支付 -->
                            <div v-if="selectedBank.accountType==2">{{ $t('member.financeDeposit.fd23') }}</div><!--请用微信扫描下方二维码完成支付 -->
                            <img :src="selectedBank.payAddress" style="width:180px;height:180px;margin-top: 25px;"/>
                        </div>
                    </div>

                    <div class="info-submit-container" style="padding-top: 35px">
                        <el-button type="success" icon="el-icon-success" @click="infoSubmit">{{ $t('member.financeDeposit.fd24') }}</el-button><!--我已打款 -->
                    </div>
                </div>

                <div v-if="active==3" style="position: relative">
                    <div class="all-title">
                        <strong style="margin-left:30px;color: #ffff009e;">{{ $t('member.financeDeposit.fd25') }}</strong><!--3、审核通过到账 -->
                    </div>
                    <div class="checkout">
                        {{ $t('member.financeDeposit.fd26') }}
                    </div><!--订单已提交, 请您耐心等待！如出现到账问题,请及时联系客服！ -->
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import Clipboard from 'clipboard';

    var _this;
    export default {
        data: () => ({
            active: 0,
            agnetLevel: "",
            amount: "",
            checkedApiType: [],
            rechargeTypes: [],
            rechargeOther: [],
            companyAccounts: [],
            underlineTypes: [],
            bankPayOnlines: [], //网银在线支付集合
            banktypes: [],
            isShowTip: false,
            vmunderline: {
                minMoney:'',
                orderAmount: "",
                underlineType: "",
                underlineBankType: "",
                underlineAccountName: "",
                companyAccountId: "",
                remark: ""
            },
            selectedBank: {},
            selectedBankPayOnlinePath: "", //选择的网银支付渠道对应的VUE组件路径
            bankPayOnlineParam: {}, //网银支付渠道 动态组件 要传到子组件的参数
            walletPicker: {},
            sltwallet: {},
            wallet: "",
            payName: "",
            banklist: {},
            sltBanks: {}
        }),
        props: {
            paramData: Object,
            defult: {}
        },
        filters: {
            payWay(v) {
                if (v) {
                    return _this.underlineTypes.filter(item => item.id == v)[0].text;
                }
            },
        },
        watch: {
            selectedBank() {
                if (this.selectedBank.accountType == 1) {
                    this.vmunderline.underlineType = '-104'
                    this.payName = this.underlineTypes.filter(item => item.id == '-104')[0].text;
                    this.vmunderline.underlineBankType = this.selectedBank.drawAccountType;
                }
                if (this.selectedBank.accountType == 2) {
                    this.vmunderline.underlineType = '-105'
                    this.payName = this.underlineTypes.filter(item => item.id == '-105')[0].text;
                    this.vmunderline.underlineBankType = this.selectedBank.drawAccountType;
                }
            },
        },
        computed: {
            clineTypest() {
                return this.sltwallet.text ? this.sltwallet.text : "";
            },
            BankType() {
                return this.sltBanks.text ? this.sltBanks.text : "";
            }
        },
        mounted() {
            this.mLoading(true);
            this.$http.get("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    this.agnetLevel = result.data.agnetLevel;
                }
            });
        },
        methods: {
            //线下充值方式
            mUnderlineTypes() {
                return this.$http.post("/recharge/underline.json");
            },
            //获取充值银行信息
            mCompanyAccount() {
                return this.$http.post("/recharge/companyAccount.json");
            },
            //银行大分类信息
            mBanktypes() {
                return this.$http.get("/banktypes.json");
            },
            mInit() {
                this.$http
                    .all([
                        this.mUnderlineTypes(),
                        this.mCompanyAccount(),
                        this.mBanktypes()
                    ])
                    .then(
                        this.$http.spread((rUnderlineTypes, rCompanyAccount, rBanktypes) => {
                            if (rUnderlineTypes.code == 0) {
                                let list = rUnderlineTypes.data.typelist
                                    ? rUnderlineTypes.data.typelist
                                    : [];
                                list.forEach(ele => {
                                    ele.text = ele.value;
                                    ele.value = ele.id;
                                });
                                this.typelist = list;
                                this.underlineTypes = rUnderlineTypes.data.typelist;
                                this.mInitWalletPicker();
                            } else {
                                this.mAlert(rUnderlineTypes.message, () => {
                                }, "error");
                            }
                            if (rBanktypes.code == 0) {
                                //   this.banktypes = rBanktypes.data.list;
                                let banktypes = rBanktypes.data.list ? rBanktypes.data.list : [];
                                banktypes.forEach(ele => {
                                    ele.text = ele.bankName;
                                    ele.value = ele.id;
                                });
                                this.banktypes = banktypes;
                                this.mInitBanks();
                            } else {
                                this.mAlert(rBanktypes.message, () => {
                                }, "error");
                            }
                            if (rCompanyAccount.code == 0) {
                                rCompanyAccount.data.forEach(ele => {
                                    ele.isActive = false;
                                });
                                this.companyAccounts = rCompanyAccount.data;
                            }
                        })
                    );
            },
            //充值银行选择
            mSelected(item) {
                this.companyAccounts.forEach(ele => {
                    ele.isActive = false;
                    if (ele.id == item.id) {
                        ele.isActive = true;
                        _this.selectedBank = ele;
                    }
                });
                this.vmunderline.companyAccountId = item.id;
                this.vmunderline.minMoney = item.minMoney;
                this.active = 1;
            },
            //复制功能
            copy() {
                var clipboard = new Clipboard('.clipboard');
                clipboard.on('success', function (e) {
                    _this.$message({
                        //内容已复制到剪贴板
                        message: _this.$t('member.financeDeposit.fd30'),
                        type: 'success'
                    });
                })
                clipboard.on('error', function (e) {
                })
            },
            checkFrom() {
                console.log("this.vmunderline", this.vmunderline);
                if (this.vmunderline.underlineAccountName == "") {
                    //请输入打款人姓名
                    this.mAlert(_this.$t('member.financeDeposit.fd31'));
                    return;
                }
                if (this.vmunderline.underlineType == "") {
                    //请选择打款方式
                    this.mAlert(_this.$t('member.financeDeposit.fd32'));
                    return;
                }
                this.vmunderline.underlineType = parseInt(this.vmunderline.underlineType);

                if (isNaN(this.vmunderline.underlineType)) {
                    //请选择打款方式
                    this.mAlert(_this.$t('member.financeDeposit.fd32'));
                    return;
                }
                if (this.vmunderline.underlineBankType == "") {
                    //请选择打款所在银行
                    this.mAlert(_this.$t('member.financeDeposit.fd33'));
                    return;
                }
                if (this.vmunderline.underlineBankType < 1) {
                    //请选择打款所在银行
                    this.mAlert(_this.$t('member.financeDeposit.fd33'));
                    return;
                }
                if (this.vmunderline.orderAmount == "") {
                    //充值金额不能为空
                    this.mAlert(_this.$t('member.financeDeposit.fd34'));
                    return;
                }
                if (this.vmunderline.orderAmount < this.vmunderline.minMoney/100) {
                    //充值金额必须大于    元
                    this.mAlert(_this.$t('member.financeDeposit.fd35')+this.vmunderline.minMoney/100+_this.$t('member.financeDeposit.fd12'));
                    return;
                }
                this.active = 2;
            },
            infoSubmit() {
                this.mLoading(true);

                //先检查是否给手续费
                let params = Object.assign({}, this.vmunderline);
                this.$http.post("/recharge/underlineorder.json", params).then(result => {
                    this.mLoading(false);
                    if (result.code == 0) {
                        this.active = 3;
                    } else {
                        this.mAlert(result.message, () => {
                        }, "error");
                    }
                });
            },
            mInitWalletPicker() {
                this.walletPicker = new mui.PopPicker();
                this.walletPicker.setData(this.typelist);
            },
            mShowWalletPicker() {
                this.walletPicker.show(function (sltItem) {
                    _this.sltwallet = sltItem[0];
                    _this.vmunderline.underlineType = sltItem[0].value;
                });
            },
            mInitBanks() {
                this.banklist = new mui.PopPicker();
                this.banklist.setData(this.banktypes);
            },
            mBanks() {
                this.banklist.show(function (sltBank) {
                    _this.sltBanks = sltBank[0];
                    _this.vmunderline.underlineBankType = sltBank[0].value;
                });
            }

        },
        created() {
            _this = this;
            this.mInit();

        }
    }
</script>
<style scoped>
    .bank-info-list {
        margin-top: 20px;
        /*margin-left: 50px;*/
        width: 300px;
        /*height: 170px;*/
        position: relative;
        display: inline-grid;
    }

    /*银行信息显示内容父布局*/
    .bank-info-list dl {
        /* cursor: pointer;
        background: #fff;
        padding: 10px; */
        width: 300px;
        padding: 15px 0;
        border: 1px solid #dcdcdc;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.12);
        margin-right: 1%;
        border-radius: 8px;
        position: relative;
        float: left;
        /*height: 170px;*/
        background: #fff;
    }

    /*银行图标logo父级布局*/
    .bank-info-list dd.banks {
        display: inline-block;
        width: 139px;
        height: 58px;
    }

    /*银行图标logo布局*/
    .bank-info-list dd.banks img {
        width: 100%;
        height: 100%;
    }

    /*银行卡信息列表标题*/
    .bank-info-list dd {
        /*margin-left: 20px;*/
        font-size: 14px;
        width: auto;
        line-height: 20px;
        text-align: left;
    }

    /*银行卡信心列表内容*/
    .bank-info-list dd em {
        font-family: "Microsoft YaHei,微软雅黑";
        font-style: normal;
    }

    /*银行卡信息选中状态变更边框改变*/
    .bank-info-list-bord {
        background: #fffaf8;
        box-shadow: 0 0 5px #ff7469;
        border-color: #ff7469;
        border-radius: 8px;
    }

    /*银行卡信息选中主观题变更图片改变*/
    .bank-info-list-sel-badage {
        width: 21px;
        height: 21px;
        position: absolute;
        background: url(/static/images/sel_badage.png);
        border-bottom-right-radius: 8px;
        bottom: 0;
        right: 0;
    }

    /*输入容器样式*/
    .input-info-group {
        margin-left: 30px;
        margin-top: 20px;
        height: 50px;
    }

    /*输入框标题样式*/
    .input-title {
        font-size: 14px;
        color: #fff;
        margin-right: 15px;
        padding-top: 5px;
    }

    /*输入框输入样式*/
    .input-content {
        color: #989898;
        background-color: rgb(240, 240, 240);
        border: 1px grey;
        border-radius: 5px;
        padding-left: 10px;
    }

    /*提交按钮容器*/
    .info-submit-container {
        width: 100%;
        height: auto;
        text-align: center;
        padding-top: 15px;
    }

    /*在线输入金额立即支付按钮*/
    .info-submit {
        color: #ffffff;
        background-color: #dc4d74;
        font-size: 30px;
        width: 200px;
        height: 60px;
    }

    strong {
        font-size: 18px;
    }

    .filter {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 14px;
        z-index: 15;
        color: #fff;
        padding:0!important;
    }

    .filter a {
        font-size: 14px;
        font-weight: 800;
    }

    .all-title {
        text-align: left;
        margin-bottom: 20px;
        /*border-bottom: 1px dashed;*/
    }

    input[type="text"] {
        height: 30px;
    }

    .account_save {
        width: 128px;
        height: 40px;
        border-radius: 4px;
        text-align: center;
        line-height: 38px;
        background: #ff3a2b;
        color: #fff;
        font-size: 12px;
        display: inline-block;
        border: none;
        cursor: pointer;
    }

    .btn-copy {
        cursor: pointer;
        height: 23px;
        font-size: 13px;
        line-height: 14px;
    }

    .input-title {
        display: block;
        float: left;
        width: 100px;
        text-align: right;
    }

    .input-trans {
        display: block;
        float: left;
        width: auto;
    }

    .pay-info {
        margin-left: 28px;
        font-size: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .pay-info span {
        height: 35px;
        line-height: 35px;
        display: inline-block;
        text-align: left;
        font-size: 14px;
    }

    .pay-info span:first-child {
        width: 100px;
        font-weight: bold;
    }

    .pay-info span:nth-child(2) {
        min-width: 150px;
        margin-right: 14px;
    }

    .checkout {
        text-align: center;
        font-size: 16px;
        width: 280px;
        margin: 0 auto;
        margin-top: 30px;
    }

    strong {
        margin-top: 28px;
        display: block;
        font-size: 18px;
    }
</style>

<style>
    .input-trans .ivu-input {
        height: 30px;
        padding: 10px 10px;
        width: 160px;
        color: #333;
    }

    .input-trans input[type="text"] {
        height: 30px;
        color: #333;
    }
</style>
