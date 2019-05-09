<template>
    <div class="onlineDeposit">
        <div class="header">
            <div class="header-left">
                <!--<Icon type="md-menu" class="icon-menu" @click="openDrawer"/>-->
            </div>
            <div class="header-middle">
                {{$t('member.onlineDeposit.od1')}}
            </div>
            <div class="header-right">
                <router-link :to="{name:'CapitalRecord'}" style="color:#fff">{{$t('member.onlineDeposit.od2')}}
                </router-link>
            </div>
        </div>
        <div class="container">
            <div class="top">
                <img src="../../assets/images/uesrCenter/admin.png" width="50px"/>
                <div class="user-info">
                    <div style="display: flex;justify-content: space-between">
                        <span>{{$t('member.onlineDeposit.od3')}}：{{cLoginUser.username}}</span>
                        <span style="color:#f0e2a1;display: flex;align-items: center;font-size: 12px">
                            <img src="../../assets/images/vip.png" width="11px"> &nbsp;
                            {{cLoginUser.memberLevelName}}
                        </span>
                    </div>
                    <div>{{$t('member.onlineDeposit.od4')}}：{{parseFloat(balance/100).toFixed(2)}}{{$t('yuan')}}</div>
                </div>
            </div>
            <div class="recharge" style="margin-top: 80px;">
                <div>
                    <span class="title">{{$t('member.onlineDeposit.od5')}}</span>
                    <span class="tmux">{{$t('member.onlineDeposit.od6')}}</span>
                </div>
                <div class="input-panel">
                    <span style="font-size: 16px"><b>￥</b></span>
                    <input type="number" v-model="amount" class="input-number"
                           :placeholder="$t('member.onlineDeposit.od7')"/>
                </div>
                <div class="recommend" v-if="moneys.length>0">
                    <span v-for="(item,index) in moneys"
                          v-if="index<5"
                          :key="index"
                          :class="{active: activeAmount==item}"
                          @click="amount=item;activeAmount=amount"
                    >
                        ￥{{ item }}
                    </span>
                </div>
            </div>
            <div class="recharge it" style="margin-top: 10px;">
                <div>
                    <span class="title">{{$t('member.onlineDeposit.od8')}}</span>
                    <span class="tmux">{{$t('member.onlineDeposit.od6')}}</span>
                </div>
                <div class="pay-way">
                    <div :class="{active: tab=='alpay'}"
                         v-if="rechargeTypes.filter(item=>item.rechargeTypeIcon.includes('alpay')).length>0"
                         @click="mSelectRechargeType('alpay',rechargeTypes.filter(item=>item.rechargeTypeIcon.includes('alpay'))[0].list)">
                        <img src="../../assets/images/alipay.png" width="24px"/>
                        <span>{{$t('member.onlineDeposit.od9')}}</span>
                    </div>
                    <div :class="{active: tab=='wechat'}"
                         v-if="rechargeTypes.filter(item=>item.rechargeTypeIcon.includes('wx')).length>0"
                         @click="mSelectRechargeType('wechat',rechargeTypes.filter(item=>item.rechargeTypeIcon.includes('wx'))[0].list)">
                        <img src="../../assets/images/wechat.png" width="23px"/>
                        <span>{{$t('member.onlineDeposit.od10')}}</span>
                    </div>
                    <div :class="{active: tab=='bank'}" @click="mSelectRechargeType('bank',companyAccounts)">
                        <img src="../../assets/images/bank.png" width="23px"/>
                        <span>{{$t('member.onlineDeposit.od11')}}</span>
                    </div>
                    <div :class="{active: tab=='scan'}" @click="mSelectRechargeType('scan',rechargeOther)"
                         v-if="rechargeOther.length>0"
                    >
                        <img src="../../assets/images/scan.png" width="22px"/>
                        <span>{{$t('member.onlineDeposit.od12')}}</span>
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
                                <span> {{$t('member.onlineDeposit.od9')}} </span>&nbsp;&nbsp;&nbsp;
                                <span> {{$t('member.onlineDeposit.od13')}}:{{ it.minMoney}} - {{it.maxMoney}} {{$t('member.onlineDeposit.od14')}} </span>
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
                                <span> {{$t('member.onlineDeposit.od10')}} </span>
                                <span> {{$t('member.onlineDeposit.od13')}}:&nbsp; {{ it.minMoney}} - {{it.maxMoney}} {{$t('member.onlineDeposit.od14')}} </span>
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
                                <span style="padding-right: 10px"> {{$t('member.onlineDeposit.od13')}}:&nbsp; {{ it.minMoney/100}} - {{it.maxMoney/100}} {{$t('member.onlineDeposit.od14')}} </span>
                            </Radio>
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <cube-button :active="true" @click="save" class="save-btn">
                {{$t('member.onlineDeposit.od15')}}
            </cube-button>

            <div class="tips">
                <div class="title">{{$t('member.onlineDeposit.od16')}}</div>
                <div>{{$t('member.onlineDeposit.od17')}}</div>
                <div>{{$t('member.onlineDeposit.od18')}}"
                    <span style="color:#c10005" @click="mOpenCService">{{$t('member.onlineDeposit.od41')}}</span>"
                    {{$t('member.onlineDeposit.od42')}}
                </div>
                <div>{{$t('member.onlineDeposit.od43')}}</div>
            </div>
        </div>
        <Drawer :closable="false" v-model="underlineDrawer" width="100" class="underline-drawer">
            <div class="header">
                <div class="header-left">
                    <Icon type="ios-arrow-back" class="icon-menu" @click="underlineDrawer=false"/>
                </div>
                <div class="header-middle" style="font-size: 14px; font-weight: bold">
                    {{selectData.drawAccountTypeStr ? selectData.drawAccountTypeStr :
                    this.$t('member.onlineDeposit.od11')}}
                </div>
                <div class="header-right"></div>
            </div>
            <div class="drawer-top">
                <span>{{$t('member.onlineDeposit.od44')}}</span>
                <span style="font-size: 20px;margin-top: 8px">
                    <span style="font-size:18px">￥</span>
                    <span>
                        <span v-text="amount"></span>
                        <span style="color: rgb(247, 246, 28)" v-if="minAmount">.{{minAmount}}</span>
                    </span>
                </span>
            </div>
            <div class="code-pay" v-if="selectData.accountType==1 || selectData.accountType==2">
                <div class="title">{{$t('member.onlineDeposit.od45')}}</div>
                <div>
                    <div><img :src="selectData.payAddress" width="125px"/></div>
                    <div style="margin-top: 10px">{{$t('member.onlineDeposit.od46')}}</div>
                    <div v-if="selectData.accountType==1">{{$t('member.onlineDeposit.od47')}}</div>
                    <div v-if="selectData.accountType==2">{{$t('member.onlineDeposit.od48')}}</div>
                    <div style="color: #cd0005">{{$t('member.onlineDeposit.od49')}}</div>
                </div>
            </div>
            <div class="panel" v-else>
                <div class="title">{{$t('member.onlineDeposit.od50')}}</div>
                <div>
                    <span>{{$t('member.onlineDeposit.od51')}}：{{selectData.drawAccountTypeStr}}</span>
                    <span class="clipboard" @click="copy" :data-clipboard-text="selectData.drawAccountTypeStr">复制</span>
                </div>
                <div>
                    <span>{{$t('member.onlineDeposit.od52')}}：{{selectData.account}}</span>
                    <span class="clipboard" @click="copy" :data-clipboard-text="selectData.account">复制</span>
                </div>
                <div>
                    <span>{{$t('member.onlineDeposit.od53')}}：{{selectData.bankAddress}}</span>
                    <span class="clipboard" @click="copy" :data-clipboard-text="selectData.bankAddress">复制</span>
                </div>
                <div>
                    <span>{{$t('member.onlineDeposit.od54')}}：{{selectData.bankAccountName}}</span>
                    <span class="clipboard" @click="copy" :data-clipboard-text="selectData.bankAccountName">复制</span>
                </div>
            </div>
            <div class="panel" style="margin-top: 10px">
                <div class="title">{{$t('member.onlineDeposit.od55')}}</div>
                <div class="deposit" style="justify-content: flex-start;padding: 0 10px">
                    <span style="margin-left: 10px;white-space: nowrap;min-width: 80px">{{$t('member.onlineDeposit.od57')}}</span>
                    <input type="text"
                           v-if="selectData.accountType==1 || selectData.accountType==2"
                           v-model="payName"
                           :placeholder="$t('member.onlineDeposit.od58')" readonly
                    />
                    <input type="text" v-model="underlineText" :placeholder="$t('member.onlineDeposit.od58')" readonly
                           v-else
                           @click="showPicker"/>
                    <Icon type="ios-arrow-forward" class="icon-menu"/>
                </div>
                <div class="deposit" style="justify-content: flex-start;padding: 0 10px">
                    <span style="margin-left: 10px;white-space: nowrap;min-width: 80px">{{$t('member.onlineDeposit.od59')}}</span>
                    <input type="text"
                           v-if="selectData.accountType==1 || selectData.accountType==2"
                           v-model="payBank"
                           :placeholder="$t('member.onlineDeposit.od59')"
                           readonly
                    />
                    <input type="text" v-model="underlineBank" :placeholder="$t('member.onlineDeposit.od59')" readonly
                           v-else
                           @click="showBankPicker"/>
                    <Icon type="ios-arrow-forward" class="icon-menu"/>
                </div>
                <div class="deposit" style="justify-content: flex-start;padding: 0 10px;border: 0">
                    <span style="margin-left: 10px;white-space: nowrap;min-width: 80px">{{$t('member.onlineDeposit.od60')}}</span>
                    <input type="text" :placeholder="$t('member.onlineDeposit.od61')"
                           v-model="vmunderline.underlineAccountName"/>
                </div>
            </div>
            <div class="panel" style="margin-top: 10px">
                <div class="title">{{$t('member.onlineDeposit.od62')}}</div>
                <div class="detail">
                    <span>{{$t('member.onlineDeposit.od63')}}</span>
                    <span>{{ now}}</span>
                </div>
                <div class="detail" style="border: 0">
                    <span>{{$t('member.onlineDeposit.od64')}}</span>
                    <span>{{selectData.bankAccountName}} : {{selectData.account}}</span>
                </div>
            </div>
            <cube-button :active="true" @click="saveUnderline" class="save-btn">
                {{$t('member.onlineDeposit.od65')}}
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
                minAmount: 0,
                nextLoading: false,
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
                        // this.mAlert(this.$t('member.onlineDeposit.od13'));
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
                this.$http.post("/banktypes.json", {lineCountry:this.sysInfo.lineCountry}).then(res => {
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
                            this.$t('member.onlineDeposit.od20') + this.selectData.minMoney  + "~" + this.selectData.maxMoney  + this.$t('member.onlineDeposit.od21')
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
                                    params: {aType: "cz", title:'在线支付', cUrl: openUrl,}
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
                                window.location.href = openUrl;
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
                        title: this.$t('member.onlineDeposit.od66'),
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
                        title: this.$t('member.onlineDeposit.od67'),
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
                if (this.nextLoading) {
                    this.$Message.warning(this.$t('member.onlineDeposit.od68'));   //请稍候再试！
                    return false;
                }
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
                this.nextLoading = true;
                let params = Object.assign({}, this.vmunderline);  //先检查是否给手续费
                this.$http.post("/recharge/underlineorder.json", params).then(result => {
                    this.mLoading(false);
                    if (result.code == 0) {
                        this.$Message.success({
                            content: this.$t('member.onlineDeposit.od69'),
                            duration: 4,
                            onClose: () => {
                                this.nextLoading = false;
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
                        params: {aType: "cz", title: this.$t('member.onlineDeposit.od70'), cUrl: url,type:2}
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
