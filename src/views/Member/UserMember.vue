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
                            {{$t('customservice')}}
                        </li>
                        <li class="icon-qq">
                            <a v-if="cQQ1" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ1+'&version=1&src_type=web'">
                                {{cQQ1}}
                            </a>
                            <a v-if="cQQ2" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ2+'&version=1&src_type=web'">
                                {{cQQ2}}
                            </a>
                        </li>
                        <li class="icon-agent" v-if="agentQQ">
                            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'">{{agentQQ}}</a>
                        </li>
                        <li class="icon-line" v-if="sysInfo.lineCountry">
                            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'">{{sysInfo.lineUrl}}</a>
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
                        {{this.$t('member.userMember.um1')}}
                    </router-link>
                </div>
                <div class="operate" v-if="cLoginUser.username">
                    <div>
                        <router-link :to="{name:'OnlineDeposit'}">{{this.$t('member.userMember.um2')}}</router-link>
                    </div>
                    <span v-text="cLoginUser.username" style="margin-top: 60px"></span>
                    <div>
                        <router-link :to="{name:'Withdrawals'}">{{this.$t('member.userMember.um3')}}</router-link>
                    </div>
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
                           {{this.$t('member.userMember.um4')}}
                        </span>
                        <span v-if="cLoginUser.integral">
                             {{ cLoginUser.integral ? parseFloat(cLoginUser.integral/100).toFixed(2) :'0.00' }}
                            <span style="font-size: 12px">{{$t('fen')}}</span>
                        </span>
                        <i class="el-icon-loading" v-else></i>
                    </router-link>
                </div>
                <div>
                    <router-link :to="{name:'AssetsOverView'}">
                        <span>
                            {{this.$t('member.userMember.um5')}}
                        </span>
                        <span v-if="amount">
                            {{ parseFloat(amount/100).toFixed(2) }}
                            <span style="font-size: 12px">{{$t('yuan')}}</span>
                        </span>
                        <i class="el-icon-loading" v-else></i>
                    </router-link>
                </div>
                <div>
                    <router-link :to="{name:'AssetsOverView'}">
                        <span>{{this.$t('member.userMember.um6')}}</span>
                        <span  v-if="totalCoins">
                            {{ parseFloat(totalCoins/100).toFixed(2) }}
                            <span style="font-size: 12px">{{$t('yuan')}}</span>
                        </span>
                        <i class="el-icon-loading" v-else></i>
                    </router-link>
                </div>
            </div>
            <div class="pst-top"></div>
            <div class="router-panel">
                <div class="title">{{this.$t('member.userMember.um7')}}</div>
                <div class="my-pay">
                    <router-link :to="{name:'IndoorTransfer'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/eduzhuanhuan.png" width="30px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um8')}}</span>
                    </router-link>
                    <router-link :to="{name:'CapitalRecord'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/recharge.png" width="28px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um9')}}</span>
                    </router-link>
                    <router-link :to="{name:'RechargeRecord'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/liushui.png" width="29px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um10')}}</span>
                    </router-link>
                    <router-link :to="{name:'TransferRecords'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/zhuanzhang.png" width="32px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um11')}}</span>
                    </router-link>
                    <router-link :to="{name:'WithdrawRecord'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/tikuan.png" width="30px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um12')}}</span>
                    </router-link>
                </div>
            </div>

            <div class="router-panel manager">
                <div class="title">{{this.$t('member.userMember.um13')}}</div>
                <div class="my-pay">
                    <router-link :to="{name :'BettingRecord'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/toubiao.png" width="30px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um14')}}</span>
                    </router-link>
                    <router-link :to="{name:'Score',params: { type: 'record' }}">
                        <div>
                            <img src="../../assets/images/uesrCenter/duihuan@2x.png" width="28px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um15')}}</span>
                    </router-link>
                    <router-link :to="{name:'UserBankCard'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/yinhangka@2x.png" width="29px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um16')}}</span>
                    </router-link>
                    <router-link :to="{name:'Receiving'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/shouhuodizhi.png" width="32px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um17')}}</span>
                    </router-link>
                    <router-link :to="{name:'AgentMember'}" v-if="cLoginUser.agnetLevel>0">
                        <div>
                            <img src="../../assets/images/uesrCenter/daili.png" width="30px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um18')}}</span>
                    </router-link>
                    <router-link :to="{name:'UserLimit'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/userinfo.png" width="30px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um19')}}</span>
                    </router-link>
                    <router-link :to="{name:'MessageList'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/huiyuanxiaoxi.png" width="30px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um20')}}</span>
                    </router-link>
                    <router-link :to="{name:'UserSettings'}">
                        <div>
                            <img src="../../assets/images/uesrCenter/anquan.png" width="28px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um21')}}</span>
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
                        <span>{{this.$t('member.userMember.um22')}}</span>
                    </a>
                    <a @click="mLoginOut">
                        <div>
                            <img src="../../assets/images/uesrCenter/logout.png" width="31px"/>
                        </div>
                        <span>{{this.$t('member.userMember.um23')}}</span>
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
                amount: '',
                agnetLevel: "",
                isDraw: false,
                memberLevel: 0,
                walletlist: [
                    {coin: 0}
                ],
                totalCoins: ''
            };
        },
        mounted() {
            if (!this.toNeedLogin()) {
                return;
            }
            this.mLoading(true);
            this.$http.get("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    this.agnetLevel = result.data.agnetLevel;
                    this.memberLevel = result.data.memberLevel;
                    this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
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
                            let coin = y.coin;
                            if (y.coin < 0) {
                                coin = 0
                            }
                            return parseFloat(x + coin || 0);
                        }, 0);

                        this.mLoading(false);
                    })
                    .catch(err => {
                        this.$Message.warning(this.$t('member.userMember.um24')); //获取余额失败
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
                if (!this.toNeedLogin()) {
                    return;
                }
                this.$http.post("/memberUser/memberamount.json").then(result => {
                    if (result.code == 0) {
                        this.amount = result.data;
                    }
                });

            },
            mLoginOut() {
                //确定要退出账号吗
                this.mConfirm(this.$t('member.userMember.um25'), () => {
                    //请稍等...
                    this.mLoading(true, this.$t('member.userMember.um26'));
                    this.$http.post("/logout.json").then(result => {
                        if (result.code === 0) {
                            //退出成功！
                            this.mMessage(this.$t('member.userMember.um27'), "success", 0.5);
                            sessionStorage.removeItem(types.SESSION_TOKEN);
                            this.$store.commit(types.SESSION_TOKEN);
                            this.mLoading(false);
                            this.$router.push({name: 'Home'});
                        }
                    });
                })
            },
        },
        created() {
            this.$store.commit('CHANGE_TAB', 'UserMember')
        }
    };
</script>
