<template>
    <div class="user-member">
        <div class="header">
            <div class="header-left"></div>
            <div class="header-middle">
                个人中心
            </div>
            <div class="header-right">
                <Poptip trigger="click" placement="bottom-end">
                    <i class="icon-menu message"></i>
                    <ul slot="content">
                        <li class="icon-kefu" @click="mOpenCService">
                            在线客服
                        </li>
                        <li class="icon-qq">
                            <a v-if="cQQ1" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ1+'&version=1&src_type=web'">
                                {{cQQ1}}
                            </a>
                            <a v-if="cQQ2" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ2+'&version=1&src_type=web'">
                                {{cQQ2}}
                            </a>
                        </li>
                        <li class="icon-qq">
                            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'">{{agentQQ}}</a>
                        </li>
                    </ul>
                </Poptip>
            </div>
        </div>
        <div class="container">
            <div class="top">
                <div class="user-logo" v-if="cLoginUser.username"></div>
                <div class="user-logo" v-else>
                    <router-link :to="{name:'Login'}" class="need-login">
                        请登录
                    </router-link>
                </div>
                <div class="operate" v-if="cLoginUser.username">
                    <div><router-link :to="{name:'OnlineDeposit'}">充值</router-link></div>
                    <span v-text="cLoginUser.username" style="margin-top: 60px"></span>
                    <div><router-link :to="{name:'Withdrawals'}">提现</router-link></div>
                </div>
                <div class="user-name" v-if="cLoginUser.username">
                    <span class="level-ico level_img_vip0" v-if="memberLevel==0"></span>
                    <span class="level-ico level_img_vip1" v-else-if="memberLevel==1"></span>
                    <span class="level-ico level_img_vip2" v-else-if="memberLevel==2"></span>
                    <span class="level-ico level_img_vip3" v-else-if="memberLevel==3"></span>
                    <span class="level-ico level_img_vip4" v-else-if="memberLevel==4"></span>
                    <span class="level-ico level_img_vip5" v-else-if="memberLevel==5"></span>
                    <span class="level-ico level_img_vip6" v-else-if="memberLevel==6"></span>
                    <span class="level-ico level_img_vip7" v-else-if="memberLevel==7"></span>
                    <span class="level-ico level_img_vip8" v-else-if="memberLevel==8"></span>
                    <span v-text="cLoginUser.memberLevelName" class="level-name"></span>
                </div>
            </div>
            <div class="deposit">
                <div>
                    <router-link :to="{name:'Score'}">
                         <span>
                           用户积分
                        </span>
                        <span>
                             {{ cLoginUser.integral ? parseFloat(cLoginUser.integral/100).toFixed(2) :'0.00' }}
                            <span style="font-size: 12px">分</span>
                         </span>
                    </router-link>
                </div>
                <div>
                    <router-link :to="{name:'AssetsOverView'}">
                        <span>
                            账户余额
                        </span>
                        <span>{{ parseFloat(amount/100).toFixed(2) }} <span style="font-size: 12px">元</span></span>
                    </router-link>
                </div>
                <div>
                    <router-link :to="{name:'AssetsOverView'}">
                        <span>
                               总资产
                        </span>
                        <span>{{ parseFloat(totalCoins/100).toFixed(2) }} <span style="font-size: 12px">元</span></span>
                    </router-link>
                </div>
            </div>
            <div class="pst-top"></div>
            <div class="router-panel">
                <div class="title">我的钱包</div>
                <div class="my-pay">
                    <router-link :to="{name:'IndoorTransfer'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/eduzhuanhuan.png" width="30px"/>
                        </div>
                        <span>额度转换</span>
                    </router-link>
                    <router-link :to="{name:'CapitalRecord'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/recharge.png" width="28px"/>
                        </div>
                        <span>充值记录</span>
                    </router-link>
                    <router-link :to="{name:'RechargeRecord'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/liushui.png" width="29px"/>
                        </div>
                        <span>资金流水</span>
                    </router-link>
                    <router-link :to="{name:'TransferRecords'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/zhuanzhang.png" width="32px"/>
                        </div>
                        <span>转账记录</span>
                    </router-link>
                    <router-link :to="{name:'WithdrawRecord'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/tikuan.png" width="30px"/>
                        </div>
                        <span>提款记录</span>
                    </router-link>
                </div>
            </div>

            <div class="router-panel manager">
                <div class="title">管理中心</div>
                <div class="my-pay">
                    <router-link :to="{name :'BettingRecord'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/toubiao.png" width="30px"/>
                        </div>
                        <span>投注记录</span>
                    </router-link>
                    <router-link :to="{name:'Score',params: { type: 'record' }}">
                        <div>
                            <img src="../../assets/images/uesrCenter/duihuan@2x.png" width="28px"/>
                        </div>
                        <span>兑换记录</span>
                    </router-link>
                    <router-link :to="{name:'UserBankCard'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/yinhangka@2x.png" width="29px"/>
                        </div>
                        <span>银行卡</span>
                    </router-link>
                    <router-link :to="{name:'Receiving'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/shouhuodizhi.png" width="32px"/>
                        </div>
                        <span>收货地址</span>
                    </router-link>
                    <router-link :to="{name:'AgentMember'}" v-if="cLoginUser.agnetLevel>0">
                        <div>
                            <img src="../../assets/images/uesrCenter/daili.png" width="30px"/>
                        </div>
                        <span>代理中心</span>
                    </router-link>
                    <router-link :to="{name:'UserLimit'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/userinfo.png" width="30px"/>
                        </div>
                        <span>账户信息</span>
                    </router-link>
                    <router-link :to="{name:'MessageList'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/huiyuanxiaoxi.png" width="30px"/>
                        </div>
                        <span>会员消息</span>
                    </router-link>
                    <router-link :to="{name:'UserSettings'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/anquan.png" width="28px"/>
                        </div>
                        <span>安全中心</span>
                    </router-link>
                    <!--<router-link :to="{}" class="">-->
                        <!--<div>-->
                            <!--<img src="../../assets/images/uesrCenter/help.png" width="28px"/>-->
                        <!--</div>-->
                        <!--<span>帮助中心</span>-->
                    <!--</router-link>-->
                    <a :href="sysPicObj.appUrl" target="_blank">
                        <div>
                            <img src="../../assets/images/uesrCenter/app-download.png" width="32px"/>
                        </div>
                        <span>App下载</span>
                    </a>
                    <a @click="mLoginOut">
                        <div>
                            <img src="../../assets/images/uesrCenter/logout.png" width="31px"/>
                        </div>
                        <span>退出登录</span>
                    </a>
                </div>
            </div>
            <div style="height: 20px;"></div>
        </div>
    </div>
</template>
<script>
    import types from "@/store/mutation-types";
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                amount: 0,
                agnetLevel: "",
                isDraw: false,
                memberLevel: 0,
                walletlist: [
                    {coin: 0}
                ],
                totalCoins: 0
            };
        },
        mounted() {
            if(!this.toNeedLogin()){return;}
            this.mLoading(true);
            this.$http.get("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    this.agnetLevel = result.data.agnetLevel;
                    this.memberLevel = result.data.memberLevel;
                }
            });
            this.mMemberAmount();
            this.drawGame();
            this.mGetCoin();
        },
        computed: {
            ...mapState({
                sysPicObj: state => state.common.sysPicObj,
            }),
        },
        methods: {
            mGetCoin() {
                this.mLoading(true);
                this.$http
                    .post("/managerGame/getWalletCoins.json")
                    .then(result => {
                        this.walletlist = result.data.walletlist;
                        this.totalCoins = this.walletlist.reduce((x, y) => {
                            return parseFloat(x + y.coin || 0);
                        }, 0);

                        this.mLoading(false);
                    })
                    .catch(err => {
                        this.$Message.warning('获取总资产失败!'); //获取余额失败
                    });
            },
            drawGame() {
                this.$http.get('/integralDrawC/queryRouletteSettingSwitch.json').then(result => {
                    if (result.data) {
                        this.isDraw = result.data;
                    }
                })
            },
            mMemberAmount() {
                if (!this.toNeedLogin()) {return;}
                this.$http.post("/memberUser/memberamount.json").then(result => {
                    if (result.code == 0) {
                        this.amount = result.data;
                    }
                });

            },
            mLoginOut() {
                //确定要退出账号吗
                this.mConfirm("确定要退出账号吗", () => {
                    //请稍等...
                    this.mLoading(true, "请稍等...");
                    this.$http.post("/logout.json").then(result => {
                        if (result.code === 0) {
                            //退出成功！
                            this.mMessage("退出成功", "success", 0.5);
                            sessionStorage.removeItem(types.SESSION_TOKEN);
                            this.$store.commit(types.SESSION_TOKEN);
                            this.mLoading(false);
                            this.$router.push({name:'Home'});
                        }
                    });
                })
            },
        },
        created() {
            this.$store.commit('CHANGE_TAB','UserMember')
        }
    };
</script>
