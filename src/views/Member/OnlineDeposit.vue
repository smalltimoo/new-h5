<template>
    <div class="onlineDeposit">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                充值
            </div>
            <div class="header-right">
                <router-link :to="{name:'CapitalRecord'}" style="color:#fff">存款记录</router-link>
            </div>
        </div>
        <div class="container">
            <div class="top">
                <img src="../../assets/images/uesrCenter/admin.png" width="50px"/>
                <div class="user-info">
                    <div style="display: flex;justify-content: space-between">
                        <span>账户：{{cLoginUser.username}}</span>
                        <span style="color:#f0e2a1;display: flex;align-items: center;font-size: 12px">
                            <img src="../../assets/images/vip.png" width="11px"> &nbsp;
                            {{cLoginUser.memberLevelName}}
                        </span>
                    </div>
                    <div>余额：{{parseFloat(balance/100).toFixed(2)}}元</div>
                </div>
            </div>
            <div class="recharge" style="margin-top: 80px;">
                <div>
                    <span class="title">充值金额</span>
                    <span class="tmux">(极速到账)</span>
                </div>
                <div class="input-panel">
                    <span style="font-size: 16px"><b>￥</b></span>
                    <input type="number" v-model="amount" class="input-number" placeholder="请输入存款金额"/>
                </div>
                <div class="recommend" v-if="moneys.length>0">
                    <span v-for="(item,index) in moneys"
                          :key="index"
                          :class="{active: activeAmount==item}"
                          @click="amount=item;activeAmount=amount"
                    >
                        ￥{{ item }}
                    </span>
                </div>
            </div>
            <div class="recharge" style="margin-top: 10px;">
                <div>
                    <span class="title">充值方式</span>
                    <span class="tmux">(极速到账)</span>
                </div>
                <div class="pay-way">
                    <div :class="{active: tab=='alpay'}"
                         @click="mSelectRechargeType('alpay',rechargeTypes.filter(item=>item.rechargeTypeIcon.includes('alpay'))[0].list)">
                        <img src="../../assets/images/alipay.png" width="24px"/>
                        <span>支付宝</span>
                    </div>
                    <div :class="{active: tab=='wechat'}"
                         @click="mSelectRechargeType('wechat',rechargeTypes.filter(item=>item.rechargeTypeIcon.includes('wx'))[0].list)">
                        <img src="../../assets/images/wechat.png" width="23px"/>
                        <span>微信</span>
                    </div>
                    <div :class="{active: tab=='bank'}" @click="mSelectRechargeType('bank',companyAccounts)">
                        <img src="../../assets/images/bank.png" width="23px"/>
                        <span>线下充值</span>
                    </div>
                    <div :class="{active: tab=='scan'}" @click="mSelectRechargeType('scan',rechargeOther)">
                        <img src="../../assets/images/scan.png" width="22px"/>
                        <span>其他</span>
                    </div>
                </div>
                <div class="pay-account">
                    <RadioGroup v-model="id"
                                vertical
                                class="pay-info"
                                v-for="(item,index) in rechargeTypes"
                                :key="index"
                                v-if="tab=='alpay' || tab=='wechat'"
                    >
                        <div style="width: 100%;"
                             v-for="it in item.list" :key="it.id"
                             v-if="item.rechargeTypeIcon.includes('alpay') && tab=='alpay'"
                             @click="mUpdateMoneys(it)"
                        >
                            <Radio :label="it.id">
                                <img src="../../assets/images/alipay.png" width="20px"
                                     style="margin-left: 8px;margin-right: 8px"
                                />
                                <span> 支付宝 </span>&nbsp;
                                <span> 范围：&nbsp; {{ it.minMoney}} - {{it.maxMoney}} 之间 </span>
                                <span class="radio-id">{{ it.apiid}}</span>
                            </Radio>
                        </div>
                        <div style="width: 100%;"
                             v-for="it in item.list" :key="it.id"
                             v-if="item.rechargeTypeIcon.includes('wx') && tab=='wechat'"
                             @click="mUpdateMoneys(it)"
                        >
                            <Radio :label="it.id">
                                <img src="../../assets/images/wechat.png" width="20px"
                                     style="margin-left: 8px;margin-right: 8px"/>
                                <span> 微信 </span>
                                <span> 范围:&nbsp; {{ it.minMoney}} - {{it.maxMoney}} 之间 </span>
                                <span class="radio-id">{{ it.apiid}}</span>
                            </Radio>
                        </div>
                    </RadioGroup>
                    <RadioGroup v-model="id"
                                vertical
                                class="pay-info"
                                v-for="it in rechargeOther"
                                :key="it.id"
                                v-if="tab=='scan'"
                    >
                        <div style="width: 100%;" @click="mUpdateMoneys(it)">
                            <Radio :label="it.id">
                                <img src="../../assets/images/scan.png" width="20px"
                                     style="margin-left: 8px;margin-right: 8px"/>
                                <span v-text="it.tile"> </span>
                            </Radio>
                        </div>
                    </RadioGroup>
                    <RadioGroup v-model="id"
                                vertical
                                class="pay-info"
                                v-for="it in companyAccounts"
                                :key="it.id"
                                v-if="tab=='bank'"
                    >
                        <div style="width: 100%;" @click="mUpdateMoneys(it)">
                            <Radio :label="it.id">
                                <img :src="it.logo" height="28px" style="margin-left: 3px;margin-right: 5px"/>
                                <span style="color: #000">{{ it.drawAccountTypeStr }}</span>&ensp;
                                <span style="color: #aaa">({{ it.bankAccountName }}) </span>&emsp;
                                <span> 范围:&nbsp; {{ it.minMoney/100}} - {{it.maxMoney/100}} 之间 </span>
                            </Radio>
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <cube-button :active="true" @click="save" class="save-btn">
                下一步
            </cube-button>

            <div class="tips">
                <div class="title">温馨提示</div>
                <div>为确保您的款项及时到账，请您留意以下几点；</div>
                <div>1. 支付遇到困难？ 联系 "<span style="color:#c10005" @click="mOpenCService">在线客服</span>" 获得帮助</div>
                <div>2. 若您支付过程中遇到问题未完成支付， 请重新下单</div>
            </div>
        </div>
        <Drawer :closable="false" v-model="underlineDrawer" width="100" class="underline-drawer">
            <div class="header">
                <div class="header-left">
                    <Icon type="ios-arrow-back" class="icon-menu" @click="underlineDrawer=false"/>
                </div>
                <div class="header-middle" style="font-size: 14px; font-weight: bold">
                    {{selectData.drawAccountTypeStr ? selectData.drawAccountTypeStr : '线下充值'}}
                </div>
                <div class="header-right"></div>
            </div>
            <div class="drawer-top">
                <span>转账金额（元）</span>
                <span style="font-size: 20px;margin-top: 8px">
                    <span style="font-size:18px">￥</span>
                    <span>
                        <span v-text="amount"></span>
                        <span style="color: rgb(247, 246, 28)">.{{minAmount}}</span>
                    </span>
                </span>
            </div>
            <div class="code-pay" v-if="selectData.accountType==1 || selectData.accountType==2">
                <div class="title">扫码支付</div>
                <div>
                    <div><img :src="selectData.payAddress" width="125px"/></div>
                    <div style="margin-top: 10px">长按保存上方二维码</div>
                    <div v-if="selectData.accountType==1">打开支付宝扫描二维码完成支付</div>
                    <div v-if="selectData.accountType==2">打开微信扫一扫完成支付</div>
                    <div style="color: #cd0005">转账金额 (须包含小数位)</div>
                </div>
            </div>
            <div class="panel" v-else>
                <div class="title">银行信息</div>
                <div>
                    <span>银行名称：{{selectData.drawAccountTypeStr}}</span>
                    <span class="clipboard" @click="copy" :data-clipboard-text="selectData.drawAccountTypeStr">复制</span>
                </div>
                <div>
                    <span>银行卡号：{{selectData.account}}</span>
                    <span class="clipboard" @click="copy" :data-clipboard-text="selectData.account">复制</span>
                </div>
                <div>
                    <span>开户网点：{{selectData.bankAddress}}</span>
                    <span class="clipboard" @click="copy" :data-clipboard-text="selectData.bankAddress">复制</span>
                </div>
                <div>
                    <span>开户人名：{{selectData.bankAccountName}}</span>
                    <span class="clipboard" @click="copy" :data-clipboard-text="selectData.bankAccountName">复制</span>
                </div>
            </div>
            <div class="panel" style="margin-top: 10px">
                <div class="title">存款信息</div>
                <div class="deposit" style="justify-content: flex-start;padding: 0 10px">
                    <span style="margin-left: 10px;width: 75px;">存款方式</span>
                    <input type="text"
                           v-if="selectData.accountType==1 || selectData.accountType==2"
                           v-model="payName"
                           placeholder="请选择支付通道" readonly
                    />
                    <input type="text" v-model="underlineText" placeholder="请选择支付通道" readonly v-else
                           @click="showPicker"/>
                    <Icon type="ios-arrow-forward" class="icon-menu"/>
                </div>
                <div class="deposit" style="justify-content: flex-start;padding: 0 10px">
                    <span style="margin-left: 10px;width: 75px;">转账人银行</span>
                    <input type="text"
                           v-if="selectData.accountType==1 || selectData.accountType==2"
                           v-model="payBank"
                           placeholder="转账人银行"
                           readonly
                    />
                    <input type="text" v-model="underlineBank" placeholder="转账人银行" readonly v-else
                           @click="showBankPicker"/>
                    <Icon type="ios-arrow-forward" class="icon-menu"/>
                </div>
                <div class="deposit" style="justify-content: flex-start;padding: 0 10px;border: 0">
                    <span style="margin-left: 10px;width: 75px;">真实姓名</span>
                    <input type="text" placeholder="请填写真实的姓名" v-model="vmunderline.underlineAccountName"/>
                </div>
            </div>
            <div class="panel" style="margin-top: 10px">
                <div class="title">订单详情</div>
                <div class="detail">
                    <span>下单时间</span>
                    <span>{{ now}}</span>
                </div>
                <div class="detail" style="border: 0">
                    <span>收款账户</span>
                    <span>{{selectData.bankAccountName}} : {{selectData.account}}</span>
                </div>
            </div>
            <cube-button :active="true" @click="saveUnderline" class="save-btn">
                提交订单
            </cube-button>
        </Drawer>
    </div>
</template>
<script>
    import win from "@/mixins/window";

    const moment = require('moment');

    export default {
        mixins: [win],
        data() {
            return {
                rechargeTypes: [],
                rechargeOther: [],
                moneys: [],
                amount: '',
                activeAmount: 0,
                balance: 0,
                tab: 'alpay',
                id: '',
                underlineTypes: [],
                companyAccounts: [],
                banktypes: [],
                selectData: {},
                underlineDrawer: false,
                now: "",
                payName: '',
                payBank: '',
                underlineText: '',
                underlineBank: '',
                minAmount: '',
                vmunderline: {
                    minMoney: '',
                    orderAmount: "",
                    underlineType: "",
                    underlineBankType: "",
                    underlineAccountName: "",
                    companyAccountId: "",
                    remark: ""
                }
            };
        },
        watch: {
            selectData() {
                if (this.selectData.accountType == 1) {
                    this.vmunderline.underlineType = '-104'
                    this.payName = this.underlineTypes.filter(item => item.id == '-104')[0].value;
                    this.payBank = this.banktypes.filter(item => item.id == this.selectData.drawAccountType)[0].bankName;
                    this.vmunderline.underlineBankType = this.selectData.drawAccountType;
                }
                if (this.selectData.accountType == 2) {
                    this.vmunderline.underlineType = '-105'
                    this.payName = this.underlineTypes.filter(item => item.id == '-105')[0].value;
                    this.payBank = this.banktypes.filter(item => item.id == this.selectData.drawAccountType)[0].bankName
                    this.vmunderline.underlineBankType = this.selectData.drawAccountType;
                }
            },
        },
        mounted() {
        },
        methods: {
            mInit() {
                //线上支付方式  isAjax=1显示二维码   2本页面打开链接    3新窗口打开链接
                this.$http
                    .post("/recharge/rechargeType.json?showType=2")
                    .then(result => {
                        if (result.code == 0) {
                            result.data.apis.forEach((ele, i) => {
                                ele.selected = i === 0;
                                ele.list.forEach(item => (item.checked = false));
                            });
                            this.rechargeTypes = result.data.apis;
                            this.rechargeOther = result.data.others;

                            this.mSelectRechargeType('alpay', this.rechargeTypes.filter(item => item.rechargeTypeIcon.includes('alpay'))[0].list)
                        } else {
                            this.$Message.error(result.message);
                        }
                    })
                    .catch(error => {
                        //请求出错
                        this.mAlert(this.$t('member.onlineDeposit.od13'));
                    });
            },
            //可用余额
            mMemberAmount() {
                if (!this.toNeedLogin()) {
                    return;
                }
                this.$http.post("/memberUser/memberamount.json").then(result => {
                    if (result.code == 0) {
                        this.balance = result.data;
                    }
                });
            },
            //线下充值方式
            mUnderlineTypes() {
                this.$http.post("/recharge/underline.json")
                    .then(res => {
                        if (res.code == 0) {
                            this.underlineTypes = res.data.typelist;
                        } else {
                            this.$Message.error(res.message);
                        }
                    })
            },
            //获取充值银行信息
            mCompanyAccount() {
                this.$http.post("/recharge/companyAccount.json")
                    .then(res => {
                        if (res.code == 0) {
                            this.companyAccounts = res.data;
                        } else {
                            this.$Message.error(res.message);
                        }
                    })
            },
            //银行大分类信息
            mBanktypes() {
                this.$http.get("/banktypes.json").then(res => {
                    if (res.code == 0) {
                        this.banktypes = res.data.list;
                    } else {
                        this.$Message.error(res.message);
                    }
                })
            },
            // 存款方式 选择
            mSelectRechargeType(tab, dataAccount) {
                this.tab = tab;
                this.id = dataAccount[0].id ? dataAccount[0].id : '';
                this.moneys = dataAccount[0].verificationMoney ? dataAccount[0].verificationMoney.split(',') : [];
                this.activeAmount = this.moneys[0];
                this.selectData = dataAccount[0];
            },

            //切换推荐金额
            mUpdateMoneys(item) {
                this.moneys = item.verificationMoney ? item.verificationMoney.split(',') : [];
                this.activeAmount = this.moneys.length > 0 ? this.moneys[0] : '';
                this.selectData = item;
            },

            save() {
                let amount = parseFloat(this.amount);
                let over = amount >= this.selectData.minMoney && amount <= this.selectData.maxMoney;
                if (this.tab == 'bank') {
                    over = amount >= this.selectData.minMoney / 100 && amount <= this.selectData.maxMoney / 100;
                }
                let isAjax = this.selectData.isAjax;
                let dopage = this.selectData.doPage;
                let params = {
                    apiid: this.selectData.apiid,
                    serviceType: this.selectData.serviceType,
                    apitypeid: this.selectData.id,
                    orderAmount: this.amount,
                    s: Math.random()
                };
                if (isNaN(amount)) {
                    this.$Message.warning(this.$t('member.onlineDeposit.od19')); //您输入的充值金额不正确
                    return;
                }
                if (this.tab != 'scan' && !over) {
                    if (this.tab == 'bank') {
                        this.$Message.warning(  //充值金额必须在xxx元内
                            this.$t('member.onlineDeposit.od20') + this.selectData.minMoney / 100 + "~" + this.selectData.maxMoney / 100 + this.$t('member.onlineDeposit.od21')
                        );
                    } else {
                        this.$Message.warning(  //充值金额必须在xxx元内
                            this.$t('member.onlineDeposit.od20') + this.selectData.minMoney / 100 + "~" + this.selectData.maxMoney / 100 + this.$t('member.onlineDeposit.od21')
                        );
                    }

                    return;
                }
                if (this.tab == 'bank') {
                    this.now = moment().format('YYYY-MM-DD HH:mm:ss');
                    this.vmunderline.companyAccountId = this.selectData.id;
                    this.vmunderline.minMoney = this.selectData.minMoney;
                    if (this.selectData.accountType == 1 || this.selectData.accountType == 2) {
                        this.minAmount = parseInt(Math.random() * (99 - 10 + 1) + 10, 10);
                        this.vmunderline.orderAmount = parseFloat(this.amount) + parseFloat(this.minAmount) / 100;
                    } else {
                        this.vmunderline.orderAmount = this.amount;
                    }

                    this.underlineDrawer = true;
                    return;
                }
                if (isAjax == 1) {
                    this.mWinOpen(
                        this.$t('member.onlineDeposit.od26'), //二维码扫描
                        () => import("./CreateQrCode"), Object.assign({url: dopage}, params), '280',
                        null,
                        () => {
                            this.mWinClose();
                        }
                    );
                } else if (isAjax == 2) {
                    this.mLoading(true);
                    this.$http
                        .post(dopage, params)
                        .then(result => {
                            this.mLoading(false);
                            if (result.code == "0") {
                                let openUrl = decodeURIComponent(result.data.qrcoDepath);
                                this.$router.push({
                                    name: "CustomerService",
                                    params: {aType: "cz", cUrl: openUrl}
                                });
                            } else {
                                //请求付款地址失败1
                                this.$Message.error(this.$t('member.onlineDeposit.od27'));
                            }
                        })
                        .catch(error => {
                            //请求付款地址失败2
                            this.$Message.error(this.$t('member.onlineDeposit.od28'));
                        });
                } else if (isAjax == 3) {
                    this.mLoading(true);
                    this.$http
                        .post(dopage, params)
                        .then(result => {
                            this.mLoading(false);
                            if (result.code == "0") {
                                let openUrl = decodeURIComponent(result.data.qrcoDepath);
                                window.open(openUrl);
                            } else {
                                this.$Message.error(this.$t('member.onlineDeposit.od29')); //请求付款地址失败1
                            }
                        })
                        .catch(error => {
                            this.$Message.error(this.$t('member.onlineDeposit.od30')); //请求付款地址失败2
                        });
                } else {
                    this.mOtherCZ(this.selectData.url + '?u=' + (!!this.cLoginUser.username ? this.cLoginUser.username : ''))
                }
            },
            showPicker() {
                if (!this.aliasPicker) {
                    this.aliasPicker = this.$createPicker({
                        title: '请选择支付方式',
                        data: [this.underlineTypes],
                        alias: {
                            value: 'id',
                            text: 'value'
                        },
                        onSelect: (selectedVal, selectedIndex, selectedText) => {
                            this.vmunderline.underlineType = selectedVal[0];
                            this.underlineText = selectedText[0];
                        },
                    })
                }
                this.aliasPicker.show()
            },
            showBankPicker() {
                if (!this.bankPicker) {
                    this.bankPicker = this.$createPicker({
                        title: '请选择转账人银行',
                        data: [this.banktypes],
                        alias: {
                            value: 'id',
                            text: 'bankName'
                        },
                        onSelect: (selectedVal, selectedIndex, selectedText) => {
                            this.vmunderline.underlineBankType = selectedVal[0];
                            this.underlineBank = selectedText[0];
                        },
                    })
                }
                this.bankPicker.show()
            },
            saveUnderline() {
                if (this.vmunderline.underlineType == "" || isNaN(this.vmunderline.underlineType)) {
                    this.$Message.warning(this.$t('member.financeDeposit.fd32'));   //请选择打款方式
                    return;
                }
                if (this.vmunderline.underlineBankType == "" || this.vmunderline.underlineBankType < 1) {
                    this.$Message.warning(this.$t('member.financeDeposit.fd33'));   //请选择打款所在银行
                    return;
                }
                if (this.vmunderline.underlineAccountName == "") {
                    this.$Message.warning(this.$t('member.financeDeposit.fd31'));  //请输入打款人姓名
                    return;
                }
                this.mLoading(true);
                let params = Object.assign({}, this.vmunderline);  //先检查是否给手续费
                this.$http.post("/recharge/underlineorder.json", params).then(result => {
                    this.mLoading(false);
                    if (result.code == 0) {
                        this.$Message.success({
                            content: '存款信息已提交,请等待工作人员审核！',
                            duration: 4,
                            onClose: () => {
                                this.$router.push({name: 'CapitalRecord'})
                            }
                        })

                    } else {
                        this.$Message.error(result.message, () => {
                        }, "error");
                    }
                });
            },
            mOtherCZ(url) {
                if (url) {
                    this.$router.push({
                        name: "CustomerService",
                        params: {aType: "cz", title: '在线充值', cUrl: url}
                    });
                } else {
                    //存款渠道暂不可用
                    this.$Message.error(this.$t('member.onlineDeposit.od31'));
                }
            },

        },
        created() {
            this.$store.commit('CHANGE_TAB', 'OnlineDeposit');
            if (this.cNeedLogin) {
                this.$router.push({name: 'Login'})
            } else {
                this.mMemberAmount();
                this.mInit();
                this.mUnderlineTypes();
                this.mCompanyAccount();
                this.mBanktypes();
            }
        }
    };
</script>
