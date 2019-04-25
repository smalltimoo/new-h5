<template>
    <div class="assetsOverview">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                资产明细
            </div>
            <div class="header-right" @click="transferAll">
                一键回收
            </div>
        </div>
        <div class="container">
            <div class="top">
                <div class="total-amount">
                    <span>总资产</span>
                    <span>￥ {{ parseFloat(totalCoins/100).toFixed(2)  }}</span>
                </div>
                <div class="total-panel">
                    <div>
                        <span>可用余额</span>
                        <span>￥{{walletlist[0].coin / 100}}</span>
                    </div>
                    <div>
                        <span>游戏余额</span>
                        <span>￥{{otherCoins}}</span>
                    </div>
                </div>
            </div>
            <div class="wallet-panel">
                <div class="wallet">
                    <div v-for="item in walletlist"
                         :key="item.gameCompanyId"
                         class="wallet-line"
                    >
                        <div style="display: flex;align-items: center">
                            <img :src="item.logoUrl" width="36px" v-if="item.logoUrl"/>
                            <img :src="sysPicObj.mobileLogo" width="36px" v-else/>
                            <span v-text="item.gameCompanyName" style="padding-left: 15px"></span>
                        </div>
                        <span style="color: #ccc;display: flex;align-items: center;"
                              @click="mGetError(item.gameCompanyId);"
                              v-if="item.coin=='-1'"
                        >
                            <i class="el-icon-loading" v-if="item.loading"></i>
                            <span v-if="!item.loading">获取异常</span>
                            <img v-if="!item.loading"
                                 src="../../assets/images/refresh.png"
                                 style="width:18px;margin-top: -2px;margin-left: 5px"/>
                         </span>
                        <span v-else>￥{{parseFloat(item.coin / 100).toFixed(2)}}</span>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <span><router-link :to="{name:'OnlineDeposit'}">存款</router-link></span>
                <span style="background-color: grey"><router-link :to="{name:'Withdrawals'}">提款</router-link></span>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: "AssetsOverView",
        data() {
            return {
                walletlist: [
                    {
                        coin: 0
                    }
                ],
                totalCoins: 0,
                otherCoins: 0
            };
        },
        mounted() {
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
                            let coin=y.coin;
                            if(y.coin<0){
                                coin=0
                            }
                            return parseFloat(x + coin || 0);
                        }, 0);
                        this.otherCoins = parseFloat((this.totalCoins - this.walletlist[0].coin) / 100).toFixed(2)

                        this.mLoading(false);
                    })
                    .catch(err => {
                        //获取余额失败
                        this.mAlert(this.$t('member.assetsOverView.ao7'));
                    });
            },
            mGetError(gameCompanyId) {
                this.walletlist.map(item => {
                    if (item.gameCompanyId == gameCompanyId) {
                        item.loading = true;
                    }
                })

                this.walletlist=[...[],...this.walletlist];
                this.$http
                    .post("/managerGame/getMemberGameBlance.json", {gameCompanyId: gameCompanyId})
                    .then(result => {
                        if(result.data){
                            this.walletlist.map(item => {
                                if (item.gameCompanyId == gameCompanyId) {
                                    item.coin = result.data.blance;
                                    item.loading = false;
                                }
                            })
                            this.walletlist = [...[], ...this.walletlist];
                            this.totalCoins = this.walletlist.reduce((x, y) => {
                                return parseFloat(x + y.coin || 0);
                            }, 0);
                            this.otherCoins = parseFloat((this.totalCoins - this.walletlist[0].coin) / 100).toFixed(2)
                        }
                        else{
                            this.$Message.error('暂未获得该游戏厅数据!')
                            this.walletlist.map(item => {
                                if (item.gameCompanyId == gameCompanyId) {
                                    item.loading = false;
                                }
                            })

                            this.walletlist=[...[],...this.walletlist];
                        }
                    })
            },
            transferAll() {
                this.$Message.loading({
                    content: '请稍后...',
                    duration: 0
                });
                let index=0;
                if(this.walletlist.filter(item=>item.gameCompanyId!=0 && item.coin>0).length==0){
                    this.$Message.destroy();
                    this.$Message.warning({
                        content: '暂无可回收场馆...',
                        duration: 3
                    })
                    return;
                }
                this.walletlist.map(item => {
                    index++;
                    if(item.gameCompanyId!=0 && item.coin>0){
                        this.$http
                            .post("/managerGame/wallettransfer.json",
                                {
                                    walletIn: 0,
                                    walletOut: item.gameCompanyId,
                                    dealCoin:item.coin/100
                                })
                            .then(result=>{
                                console.log(result)
                                if(index==this.walletlist.length){
                                    this.mGetCoin();
                                    this.$Message.destroy();
                                }
                            })
                    }
                })
            },
            mCallBack() {
                this.$emit("callback");
            },
            mOnResize() {
                let w = window.innerWidth;
                let h = window.innerHeight;
                h = h - this.$refs.TopHeader.clientHeight;
                this.width = w;
                this.height = h;
            }
        }
    };
</script>
