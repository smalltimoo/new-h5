<template>
    <div class="score">
        <div class="header">
            <div class="header-left"></div>
            <div class="header-middle">
                优惠活动
            </div>
            <div class="header-right"></div>
        </div>
        <div class="container">
            <div class="top">
                <router-link :to="{name:'Login'}" v-if="cNeedLogin">
                    <div class="login-color">
                        <div class="needLogin">
                            请登录
                        </div>
                    </div>
                </router-link>
                <div class="integer" v-else>
                    <img src="../../assets/images/score/score.png" width="26px;" style="margin-top: 2px"/>
                    <span v-text="vm.integral/100" style="margin-left: 15px"></span>
                </div>
                <div class="score-button">
                    <span @click="record=true">积分明细</span>
                    <span @click="order=true">积分兑换记录</span>
                </div>
            </div>
            <div class="score-nav">
                <div :class="{active:tab=='0'}" @click="tab='0'">所有商品</div>
                <div :class="{active:tab=='-1'}" @click="tab='-1'">幸运大转盘</div>
                <div v-for="item in productTypes" :key="item.id" :class="{active:tab==item.id}" @click="tab=item.id">
                    {{item.typeName}}
                </div>
            </div>
            <div class="product">
                <div class="title">热门兑换</div>
                <ul class="products">
                    <li @click="mJumpDraw" v-if="tab=='0' || tab=='-1'">
                        <div class="product-img">
                            <img src="../../assets/images/score/scoretu1@2x.png" width="105px"/>
                        </div>
                        <div class="product-name" style="height: 54px;line-height: 54px">积分大转盘</div>
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
                            <span>{{item.currentPrice}} 积分</span>
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
                <div class="header-middle" style="font-size: 14px; font-weight: bold">积分明细</div>
                <div class="header-right"></div>
            </div>
            <div class="record-title" v-if="dataList.length>0">
                <span><b>积分</b></span>
                <span><b>详细说明</b></span>
                <span><b>记录时间</b></span>
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
                <div class="header-middle" style="font-size: 14px; font-weight: bold">积分订单</div>
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
                        <span>订单号：{{item.orderCode}}</span>
                        <span v-text="item.orderContent"
                              style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 230px"></span>
                        <span v-text="item.shipStateStr"></span>
                    </div>
                </div>
                <div style="height: 35px; line-height:35px;text-align: right; padding-right: 20px;display: flex;justify-content: space-between">
                    <span v-text="item.payTimeStr" style="padding-left: 10px"></span>
                    <span> 共{{item.buyNum}}件商品 &ensp;&ensp;消耗{{item.totalPrice}}积分</span>

                </div>
            </div>
            <div style="height: 90%; width: 100%;display: flex;justify-content: center;align-items: center"
                 v-if="dataList.length==0">
                <img src="../../assets/images/score/nolist.png" width="50%"/>
            </div>
        </Drawer>

        <Drawer :closable="false" v-model="buy" width="100" class="buy-drawer">
            <div class="header">
                <div class="header-left">
                    <Icon type="ios-arrow-back" class="icon-menu" @click="buy=false"/>
                </div>
                <div class="header-middle" style="font-size: 14px; font-weight: bold">确认订单</div>
                <div class="header-right"></div>
            </div>
            <div class="buy">
                <router-link :to="{name:'Receiving'}">
                    <div class="receive-address" v-if="hasAddress">
                        <div class="address">收件地址:&ensp; 北京市东城区</div>
                        <Icon type="ios-arrow-forward" class="icon-menu" style="font-size: 16px;color: #4c4c4c;"/>
                    </div>
                    <div class="add-address" v-else>
                        <i class="el-icon-circle-plus-outline" style="font-size: 20px"></i>&nbsp;
                        添加地址
                    </div>
                </router-link>

                <div class="order-content">
                    <img :src="rows.img" class="order-img"/>
                    <div class="order-panel">
                        <div class="flex">
                            <span>{{rows.title}}</span>
                            <span>{{rows.currentPrice}}积分</span>
                        </div>
                        <div class="flex">
                            <span>{{rows.typeName}}</span>
                            <span>￥{{rows.originalPrice}}</span>
                        </div>
                        <div class="flex">
                            <span class="ready">库存: {{rows.stockquantity }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex peisong">
                    <span>配送信息</span>
                    <span>官方配送</span>
                </div>
                <!--<div class="note peisong">-->
                    <!--<span>留言备注:</span>-->
                    <!--<input type="text" v-model="content" class="text"/>-->
                <!--</div>-->
                <div style="padding: 10px; font-size: 16px"><b>订单详情</b></div>
                <div class="flex content">
                    <span>购买台数:</span>
                    <span class="calculate">
                        <div @click="number>0 ? number-- : null">-</div>
                        <div>{{ number}}</div>
                        <div @click="number<1000 ? number++ : null">+</div>
                    </span>
                </div>
                <div class="flex content">
                    <span>当前余额:</span>
                    <span>{{vm.integral/100}} 积分</span>
                </div>
                <div class="flex content">
                    <span>商品总额:</span>
                    <span>{{number * rows.currentPrice}} 积分</span>
                </div>
                <!--<div class="flex content">-->
                <!--<span>运费:</span>-->
                <!--<span>+50 积分</span>-->
                <!--</div>-->
                <div class="flex total">
                    <span>应付合计:</span>
                    <span>{{number * rows.currentPrice}} 积分</span>
                </div>
            </div>
            <div class="pay">
                <span>应付积分:</span>
                <span style="color:#ff0000">
                    {{number * rows.currentPrice }} 积分
                </span>
                <span class="comfirm" @click="confirmOrder">确认订单</span>
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
                            this.hasAddress = true;
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
