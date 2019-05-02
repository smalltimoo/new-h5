<template>
    <div class="score">
        <div class="header">
            <div class="header-left"></div>
            <div class="header-middle">
                {{$t('score.score')}}
            </div>
            <div class="header-right"></div>
        </div>
        <div class="container">
            <div class="top">
                <router-link :to="{name:'Login'}" v-if="cNeedLogin">
                    <div class="login-color">
                        <div class="needLogin">
                            {{$t('score.pleaseLogin')}}
                        </div>
                    </div>
                </router-link>
                <div class="integer" v-else>
                    <img src="../../assets/images/score/score.png" width="26px;" style="margin-top: 2px"/>
                    <span v-text="vm.integral/100" style="margin-left: 15px"></span>
                </div>
                <div class="score-button">
                    <span @click="record=true">{{$t('score.scoreDetail')}}</span>
                    <span @click="order=true">{{$t('score.scoreExchange')}}</span>
                </div>
            </div>
            <div class="score-nav">
                <div :class="{active:tab=='0'}" @click="tab='0'">{{$t('score.allProducts')}}</div>
                <div :class="{active:tab=='-1'}" @click="tab='-1'">{{$t('score.luckyDrawer')}}</div>
                <div v-for="item in productTypes" :key="item.id" :class="{active:tab==item.id}" @click="tab=item.id">
                    {{item.typeName}}
                </div>
            </div>
            <div class="product">
                <div class="title">{{$t('score.hotExchange')}}</div>
                <ul class="products">
                    <li @click="mJumpDraw" v-if="tab=='0' || tab=='-1'">
                        <div class="product-img">
                            <img src="../../assets/images/score/scoretu1@2x.png" width="105px"/>
                        </div>
                        <div class="product-name" style="height: 54px;line-height: 54px">{{$t('score.luckyDrawer')}}</div>
                        <!--<div class="use">-->
                            <!--<span></span>-->
                            <!--<span></span>-->
                        <!--</div>-->
                    </li>
                    <li v-for="item in productData" :key="item.id" @click="mOrder(item)">
                        <div class="product-img">
                            <img :src="item.img" height="100%"/>
                        </div>
                        <div class="product-name" v-text="item.title"></div>
                        <div class="use">
                            <span>￥{{item.originalPrice}}</span>
                            <span>{{item.currentPrice}} {{$t('score.degits')}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <Drawer :closable="false" v-model="record" width="100" class="score-drawer">
            <div class="header">
                <div class="header-left">
                    <Icon type="ios-arrow-back" class="icon-menu" @click="record=false"/>
                </div>
                <div class="header-middle" style="font-size: 14px; font-weight: bold">{{$t('score.scoreDetail')}}</div>
                <div class="header-right"></div>
            </div>
            <div class="record-title" v-if="dataList.length>0">
                <span><b>{{$t('score.degits')}}</b></span>
                <span><b>{{$t('score.detail')}}</b></span>
                <span><b>{{$t('score.recordTime')}}</b></span>
            </div>
            <div class="record-title" v-for="(item, index) in dataList" :key="index" v-if="dataList.length>0">
                <span v-text="item.totalPrice"></span>
                <span>
                    <Tooltip :content="item.orderContent" placement="top" max-width="200px">
                        {{ item.orderContent}}
                    </Tooltip>
                </span>
                <span v-text="item.payTimeStr"></span>
            </div>
            <div style="height: 90%; width: 100%;display: flex;justify-content: center;align-items: center"
                 v-if="dataList.length==0">
                <img src="../../assets/images/score/nolist.png" width="50%"/>
            </div>
        </Drawer>

        <Drawer :closable="false" v-model="order" width="100" class="order-drawer">
            <div class="header">
                <div class="header-left">
                    <Icon type="ios-arrow-back" class="icon-menu" @click="order=false"/>
                </div>
                <div class="header-middle" style="font-size: 14px; font-weight: bold">{{$t('score.exchangeRecord')}}</div>
                <div class="header-right"></div>
            </div>

            <div class="record-title" v-for="(item, index) in dataList" :key="index" v-if="dataList.length>0">
                <div class="order-title">
                    <span v-text="item.orderTitle"></span>
                    <span v-text="item.stateStr"></span>
                </div>
                <div class="order-content">
                    <img :src="item.orderImg" class="order-img">
                    <div class="order-panel">
                        <span>{{$t('score.orderNumber')}} {{item.orderCode}}</span>
                        <span v-text="item.orderContent"
                              style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 230px"></span>
                        <span v-text="item.shipStateStr"></span>
                    </div>
                </div>
                <div style="height: 35px; line-height:35px;text-align: right; padding-right: 20px;display: flex;justify-content: space-between">
                    <span v-text="item.payTimeStr" style="padding-left: 10px"></span>
                    <span> {{$t('score.all')}}{{item.buyNum}}{{$t('score.products')}} &ensp;&ensp;{{$t('score.expend')}}{{item.totalPrice}}{{$t('score.degits')}}</span>

                </div>
            </div>
            <div style="height: 90%; width: 100%;display: flex;justify-content: center;align-items: center" v-if="dataList.length==0">
                <img src="../../assets/images/score/nolist.png" width="50%"/>
            </div>
        </Drawer>

        <Drawer :closable="false" v-model="buy" width="100" class="buy-drawer">
            <div class="header">
                <div class="header-left">
                    <Icon type="ios-arrow-back" class="icon-menu" @click="buy=false"/>
                </div>
                <div class="header-middle" style="font-size: 14px; font-weight: bold">{{$t('score.confirmOrder')}}</div>
                <div class="header-right"></div>
            </div>
            <div class="buy">
                <router-link :to="{name:'Receiving'}">
                    <div class="receive-address" v-if="hasAddress">
                        <div class="address">{{$t('score.receiveAddress')}}:&ensp; {{hasAddress}}</div>
                        <Icon type="ios-arrow-forward" class="icon-menu" style="font-size: 16px;color: #4c4c4c;"/>
                    </div>
                    <div class="add-address" v-else>
                        <i class="el-icon-circle-plus-outline" style="font-size: 20px"></i>&nbsp;
                        {{$t('score.addAddress')}}
                    </div>
                </router-link>

                <div class="order-content">
                    <img :src="rows.img" class="order-img"/>
                    <div class="order-panel">
                        <div class="flex">
                            <span>{{rows.title}}</span>
                            <span>{{rows.currentPrice}}{{$t('score.degits')}}</span>
                        </div>
                        <div class="flex">
                            <span>{{rows.typeName}}</span>
                            <span>￥{{rows.originalPrice}}</span>
                        </div>
                        <div class="flex">
                            <span class="ready">{{$t('score.kucun')}}: {{rows.stockquantity }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex peisong">
                    <span>{{$t('score.peisong')}}</span>
                    <span>{{$t('score.guanfang')}}</span>
                </div>
                <!--<div class="note peisong">-->
                    <!--<span>留言备注:</span>-->
                    <!--<input type="text" v-model="content" class="text"/>-->
                <!--</div>-->
                <div style="padding: 10px; font-size: 16px"><b>{{$t('score.dingdan')}}</b></div>
                <div class="flex content">
                    <span>{{$t('score.goumai')}}:</span>
                    <span class="calculate">
                        <div @click="number>0 ? number-- : null">-</div>
                        <div>{{ number}}</div>
                        <div @click="number<1000 ? number++ : null">+</div>
                    </span>
                </div>
                <div class="flex content">
                    <span>{{$t('score.yue')}}:</span>
                    <span>{{vm.integral/100}} {{$t('score.degits')}}</span>
                </div>
                <div class="flex content">
                    <span>{{$t('score.shangpinzonge')}}:</span>
                    <span>{{number * rows.currentPrice}} {{$t('score.degits')}}</span>
                </div>
                <!--<div class="flex content">-->
                <!--<span>运费:</span>-->
                <!--<span>+50 积分</span>-->
                <!--</div>-->
                <div class="flex total">
                    <span>{{$t('score.yingfuheji')}}:</span>
                    <span>{{number * rows.currentPrice}} {{$t('score.degits')}}</span>
                </div>
            </div>
            <div class="pay">
                <span>{{$t('score.yingfujifen')}}:</span>
                <span style="color:#ff0000">
                    {{number * rows.currentPrice }} {{$t('score.degits')}}
                </span>
                <span class="comfirm" @click="confirmOrder">{{$t('score.querendingdan')}}</span>
            </div>
        </Drawer>
    </div>
</template>

<script>
    import listMixin from "@/mixins/list";
    import window from "../../mixins/window";
    let _this;
    export default {
        name: "Score",
        mixins: [window, listMixin],
        data() {
            return {
                tab: '0',
                record: false,
                order: false,
                buy: false,
                searchVM: {
                    typeId: "", //类型
                    orderBy: "id desc",
                    rows: 20
                },
                vm: {
                    integral: 0
                },
                needLogin: true,
                products: [],
                productTypes: [],
                initData: {
                    total: 0
                },
                hasAddress: false,
                dataList: [],
                rows: {},
                number: 1,
            };
        },
        computed: {
            productData() {
                if (this.tab == '0') {
                    return this.products;
                } else {
                    return this.products.filter(item => this.tab == item.typeId)
                }

            }
        },
        mounted() {
            this.mInit();
            this.mPullData();
            this.mProductType();
            this.mPullScoreDetail();

            let type=this.$route.params.type;
            if(type=='record'){
                this.order=true;
            }
        },
        methods: {
            mInit(){
                this.mLoading(true);
                this.$http.get("/memberUser/memberinfo.json").then(result => {
                    if (result.code == 0) {
                        this.vm.integral = result.data.integral;
                    }
                });
            },
            mProductType() {
                this.$http.post("/imp/productTypes.json").then(result => {
                    if (result.code == 0) {
                        this.productTypes = !!result.data ? result.data : [];
                    }
                });
            },
            mPullData() {
                this.mLoading(true);
                var params = Object.assign({}, this.searchVM);
                this.$http.post("/imp/products.json", params).then(result => {
                    if (result.code == 0) {
                        this.products = !!result.data ? result.data : [];
                    }
                });
            },
            mPullScoreDetail() {
                this.mLoading(true);
                var params = Object.assign({}, this.searchVM);
                this.$http.post("/imo/myOrders.json", params).then(result => {
                    if (result.code == 0) {
                        this.initData.total = result.total;
                        this.dataList = !!result.rows ? result.rows : [];
                    }
                });
            },
            mJumpDraw() {
                if (!this.toNeedLogin()) {
                    return;
                }
                this.$router.push({name: "Draw"});
            },
            mOrder(item) {
                if (!this.toNeedLogin()) {
                    return;
                }
                this.hasMemberAddress();
                this.buy = true;
                this.number=1;
                this.rows = item;
            },
            confirmOrder(){
                this.$http.post("/imo/exchange.json", {id: this.rows.id, buyNum: this.number})
                    .then(result => {
                        this.mLoading(false);
                        if (result.code == 0) {
                            //兑换成功！
                            this.$Message.success(this.$t('store.order.order12'));
                            this.mInit();
                            this.mPullData();
                            this.mPullScoreDetail();
                        } else {
                            this.$Message.error(result.message);
                        }

                        this.buy=false;
                    });
            },
            hasMemberAddress() {
                this.$http.get("/memberUser/getMemberAddress.json").then(result => {
                    if (result.code == 0) {
                        if (!!result.data.id) {
                            this.hasAddress = result.data.address;
                        } else {
                            this.hasAddress = false;
                        }
                    }
                });
            },
        },
        created() {
            _this=this;
            this.$store.commit('CHANGE_TAB', 'Score');
        }
    }
</script>
