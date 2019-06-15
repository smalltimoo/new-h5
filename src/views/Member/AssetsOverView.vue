<template>
    <div class="assetsOverview">
        <!-- <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{$t('member.assetsOverView.ao2')}}
            </div>
            <div class="header-right" @click="transferAll">
                {{$t('member.assetsOverView.ao1')}}
            </div>
        </div> -->
        <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
        <div class="container">
            <div class="top">
                <div class="total-amount">
                    <span>{{$t('member.assetsOverView.ao3')}}</span>
                    <span v-if="totalCoins">{{$t('symbol.t1')}} {{ parseFloat(totalCoins/100).toFixed(2)  }}</span>
                    <i class="el-icon-loading" v-else></i>
                </div>
                <div class="total-panel">
                    <div>
                        <span>{{$t('member.assetsOverView.ao4')}}</span>
                        <span v-if="walletlist[0].coin">{{$t('symbol.t1')}}{{walletlist[0].coin / 100}}</span>
                        <i class="el-icon-loading" v-else></i>
                    </div>
                    <div>
                        <span>{{$t('member.assetsOverView.ao5')}}</span>
                        <span v-if="otherCoins">{{$t('symbol.t1')}}{{otherCoins}}</span>
                        <i class="el-icon-loading" v-else></i>
                    </div>
                </div>
            </div>
            <div class="wallet-panel">
                <div class="wallet">
                    <h3 class="title" >资产分布</h3>
                   <ve-ring :data="chartData" :loading="true" :settings="chartSettings" height="200px"></ve-ring>
                    <div v-for="item in walletlist"
                         :key="item.gameCompanyId"
                         class="wallet-line"
                    >
                        <div style="display: flex;align-items: center">
                            <img :src="item.logoUrl" width="36px" v-if="item.logoUrl"/>
                            <img :src="sysPicObj.mobileLogo" width="36px" v-else/>
                            <span v-text="item.gameCompanyName" style="padding-left: 15px;text-align: left; line-height: 20px;"></span>
                        </div>
                        <span style="color: #ccc;display: flex;align-items: center;"
                              @click="mGetError(item.gameCompanyId);"
                              v-if="item.coin=='-1'"
                        >
                            <i class="el-icon-loading" v-if="item.loading" style="margin-right: 20px"></i>
                            <span v-if="!item.loading" style="line-height: 20px">{{$t('member.assetsOverView.ao6')}}</span>
                            <img v-if="!item.loading"
                                 src="../../assets/images/refresh.png"
                                 style="width:18px;margin-top: -2px;margin-left: 5px"/>
                         </span>
                        <span v-else>{{$t('symbol.t1')}}{{parseFloat(item.coin / 100).toFixed(2)}}</span>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <span><router-link :to="{name:'OnlineDeposit'}">{{$t('member.assetsOverView.ao7')}}</router-link></span>
                <span style="background-color: grey"><router-link :to="{name:'Withdrawals'}">{{$t('member.assetsOverView.ao8')}}</router-link></span>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import headerComponent from "@/common/Header.vue";
    
    export default {
        name: "AssetsOverView",
        data() {
            this.chartSettings = {
                radius: [30, 50],
                offsetY: 100
            }
            return {
                logo: this.$t('member.assetsOverView.ao2'),
                chartData: {
                    columns: ['name', 'data'],
                   rows:[]
                    },
                walletlist: [
                    {
                        coin: ''
                    }
                ],
                totalCoins: '',
                otherCoins: ''
            };
        },
        components:{
            headerComponent
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
            getcoins(a){
                    if(a == 0){
                        return this.otherCoins
                    }else{
                   return this.walletlist[0].coin / 100 ||0.00
                    }
                },
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
                        this.chartData.rows =   [
                        { 'name': '游戏余额', 'data': this.otherCoins },
                        { 'name': '可用余额', 'data': this.walletlist[0].coin /100 }
                    ]
                        this.mLoading(false);
                    })
                    .catch(err => {
                        //获取余额失败
                        this.$Message.error(this.$t('member.assetsOverView.ao9'));
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
                                let coin=y.coin;
                                if(y.coin<0){
                                    coin=0
                                }
                                return parseFloat(x + coin || 0);
                            }, 0);
                            this.otherCoins = parseFloat((this.totalCoins - this.walletlist[0].coin) / 100).toFixed(2)
                            
                        }
                        else{
                            this.$Message.error(this.$t('member.assetsOverView.ao10'))
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
                    content: this.$t('member.assetsOverView.ao11'),
                    duration: 0
                });
                let index=0;
                if(this.walletlist.filter(item=>item.gameCompanyId!=0 && item.coin>0).length==0){
                    this.$Message.destroy();
                    this.$Message.warning({
                        content: this.$t('member.assetsOverView.ao12'),
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
<style lang="less" scoped>
    .wallet {
        .title {
            font-size: 17px;
            color: #111;
        }
    }
</style>

