<template>
    <div class="main-body">
        <!-- 侧滑导航根容器 -->
        <div class="mui-off-canvas-wrap mui-scalable">
            <!-- 主页面容器 -->
            <div class="mui-inner-wrap">
                <!-- 菜单容器 -->
                <aside class="mui-off-canvas-right">
                    <div class="mui-scroll-wrapper">
                        <div class="mui-scroll">
                            <!-- 菜单具体展示内容 -->
                            <section class="el-container is-vertical">
                                <Divider class="top-title">{{ $t('agent.agentCashList.queryWithdrawalTime')}}</Divider>
                                <!--查询提现时间 -->
                                <button ref="tapDateS"
                                        class="btn mui-btn mui-btn-link"
                                        style="color: #4c4c4c;"
                                        @tap="mTapDateS"
                                >{{ $t('agent.agentCashList.startTime')}}
                                </button><!--选择开始时间 ... -->
                                <button ref="tapDateE"
                                        class="btn mui-btn mui-btn-link"
                                        style="color: #4c4c4c;"
                                        @tap="mTapDateE"
                                >{{ $t('agent.agentCashList.endTime')}}
                                </button><!--选择结束时间 ... -->
                                <div class="el-row text-center" style="margin-top: 10px">
                                    <button
                                            type="button"
                                            class="el-button G-submit el-button--primary"
                                            @click="mSearch(1);mShowSearch('close')"
                                    >
                                        <span>{{ $t('agent.agentCashList.search')}}</span><!-- 查询-->
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </aside>
                <!-- 主页面标题 -->
                <div class="header">
                    <div class="header-left">
                        <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
                    </div>
                    <div class="header-middle">
                        {{ $t('agent.agentCashList.dividendWithdrawalRecord')}}
                    </div>
                    <div class="header-right" @tap="mShowSearch('open')">
                        {{ $t('agent.agentCashList.filter')}}
                    </div>
                </div>

                <!-- 主页面内容容器 -->
                <div class="no-list" v-if="(!dataList||dataList.length==0)&&!showSearch"></div>
                <div class="mui-content mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <!-- 主界面具体展示内容 -->
                        <Scroll v-if="dataList&&dataList.length>0&&!showSearch"
                                ref="ivuScrollContainer"
                                :on-reach-bottom="mReachBottom"
                                :height="ivuScrollContainerHeight"
                        >
                            <div v-for="(item,i) in dataList" :key="i">
                                <div style="font-size: 12px">{{item.createTimeStr}}</div>
                                <div class="rowbg el-row">
                                    <div class="el-col el-col-24">
                                        <div class="el-col el-col-24">
                                            <div class="el-col el-col-24">
                                                <div class="grid-content">
                                                    <span class="Save wait"
                                                          v-if="item.state==0">{{item.stateStr}}</span>
                                                    <span class="Save success" v-else-if="item.state==3">{{item.stateStr}}</span>
                                                    <span class="Save failed" v-else>{{item.stateStr}}</span>
                                                    <span style="height: 30px;line-height: 30px">{{item.realName}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info">
                                        <div>
                                            <div class="status">{{item.drawAmount/100}}</div>
                                            <div class="Types">{{ $t('agent.agentCashList.withdrawalAmount')}}</div>
                                            <!--提现金额 -->
                                        </div>
                                        <div>
                                            <div class="status">{{item.commissionAmount/100}}</div>
                                            <div class="Types">{{ $t('agent.agentCashList.handlingFee')}}</div>
                                            <!--手续费 -->
                                        </div>
                                        <div>
                                            <div class="status">{{item.auditeTimeStr}}</div>
                                            <div class="Types">{{ $t('agent.agentCashList.timeOfPayment')}}</div>
                                            <!-- 打款时间-->
                                        </div>
                                    </div>
                                    <div class="info">
                                        <div>
                                            <div class="status">{{item.realAmount/100}}</div>
                                            <div class="Types">{{ $t('agent.agentCashList.theActualAmount')}}</div>
                                            <!-- 实际金额-->
                                        </div>
                                        <div>
                                            <div class="status">{{item.memberAccountTypeStr}}</div>
                                            <div class="Types">{{ $t('agent.agentCashList.cashWithdrawalBank')}}</div>
                                            <!--提现银行 -->
                                        </div>
                                        <div>
                                            <div class="status">{{ item.memberAccount.slice(0,4) }} **** **** {{ item.memberAccount.slice(item.memberAccount.length-5,item.memberAccount.length-1) }}</div>
                                            <div class="Types">{{ $t('agent.agentCashList.bankId')}}</div><!--银行账户 -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Scroll>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import slist from "@/mixins/list";
    require('../../style/mui/index.less')
    var vue;
    var _this;
    export default {
        mixins: [slist],
        data() {
            return {
                showSearch: false,
                dataList: [],
                initData: {
                    actionTypes: [],
                    total: 0
                },
                searchVM: {
                    startTime: "", //查询起始时间
                    endTime: "", //查询结束时间
                    orderBy: "id desc",
                    rows: 20
                },
                ivuScrollContainerHeight: 620,
                fromRoute: {}
            };
        },
        mounted() {
            this.mPullData();
        },
        methods: {
            mPullData() {
                this.mLoading(true);
                var params = Object.assign({}, this.searchVM);
                this.$http.post("/agentUser/agentcashlist.json", params).then(result => {
                    if (result.code == 0) {
                        this.initData.total = result.total;
                        this.dataList = !!result.rows ? result.rows : [];
                    }
                });
            },
            mReachBottom() {
                return new Promise(resolve => {
                    this.mLoading(true);
                    if (
                        parseInt(
                            this.initData.total / (this.searchVM.rows * this.searchVM.page)
                        ) > 0
                    ) {
                        ++this.searchVM.page;
                        this.searchVM.start = (this.searchVM.page - 1) * this.searchVM.rows;
                        this.searchVM.limit = this.searchVM.rows;
                        var params = Object.assign({}, this.searchVM);
                        params.endTime = dateFormat(new Date().getTime(), "yyyy-MM-dd");
                        this.$http
                            .post("/agentUser/agentcashlist.json", params)
                            .then(result => {
                                if (result.code == 0) {
                                    this.initData.total = result.total;
                                    if (!!result.rows && result.rows.length > 0) {
                                        this.dataList = this.dataList.concat(result.rows);
                                    }
                                    resolve();
                                }
                            });
                    } else {
                        this.mLoading(false);
                        //没有更多记录了
                        this.$Message.warning(_this.$t('agent.agentCashList.noMoreRecords'));
                        resolve();
                    }
                });
            },
            mShowSearch(operate) {
                if (operate == 'open') {
                    mui(".mui-off-canvas-wrap")
                        .offCanvas()
                        .show();

                    this.open = true;
                } else {
                    mui(".mui-off-canvas-wrap")
                        .offCanvas()
                        .close();
                    this.open = false;
                }

                $(".mui-content").click(() => {
                    if (this.open) {
                        mui(".mui-off-canvas-wrap")
                            .offCanvas()
                            .close();
                        this.open = false;
                    }
                })
            },
            mTapDateS() {
                let _self = this.$refs.tapDateS;
                if (_self.picker) {
                    _self.picker.show(function (rs) {
                        vue.searchVM.startTime = rs.text;
                        _self.innerHTML = rs.text;
                        _self.picker.dispose();
                        _self.picker = null;
                    });
                } else {
                    var options = {type: "datetime"};
                    _self.picker = new mui.DtPicker(options);
                    _self.picker.show(function (rs) {
                        vue.searchVM.startTime = rs.text;
                        _self.innerHTML = rs.text;
                        _self.picker.dispose();
                        _self.picker = null;
                    });
                }
            },
            mTapDateE() {
                let _self = this.$refs.tapDateE;
                if (_self.picker) {
                    _self.picker.show(function (rs) {
                        vue.searchVM.endTime = rs.text;
                        _self.innerHTML = rs.text;
                        _self.picker.dispose();
                        _self.picker = null;
                    });
                } else {
                    var options = {type: "datetime"};
                    _self.picker = new mui.DtPicker(options);
                    _self.picker.show(function (rs) {
                        vue.searchVM.endTime = rs.text;
                        _self.innerHTML = rs.text;
                        _self.picker.dispose();
                        _self.picker = null;
                    });
                }
            }
        },
        created() {
            vue = this;
            _this = this;
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.fromRoute = from;
            });
        }
    };
</script>

<style scoped>

    .mui-input-clear {
        background-color: #fff;
        border-bottom: solid 1px #f3f3f3;
        border-radius: 0;
        margin-top: 5px;
        font-size: 14px;
    }

    .mui-bar .mui-title {
        margin-top: 10px;
        text-align: center;
    }

    .mui-content {
        margin-top: 50px;
    }

    .mui-scalable {
        background-color: #efeff4 !important;
    }

    .rowbg {
        margin: 5px 10px 10px 10px;
        padding: 10px 15px;
        border-bottom: 1px solid #f3f3f3;
        background-color: #ffffff;
        box-shadow: 0px 1px 5px 0px rgba(201, 201, 201, 0.8);
        border-radius: 3px;
    }

    .Save {
        display: block;
        padding: 0 10px;
        text-align: center;
        border-radius: 2px;
        font-size: 14px;
        color: #fff;
        height: 28px;
        line-height: 28px;
        margin-bottom: 10px;
        min-width: 76px;
    }

    .status {
        height: 28px;
        line-height: 28px;
        text-align: center;
        font-weight: bold;
        font-family: Consolas, "Courier New", Courier, FreeMono, monospace;
    }

    .Types {
        line-height: 22px;
        text-align: center;
        color: #333;
        padding-bottom: 5px;
    }

    .ivu-divider-inner-text {
        color: #4c4c4c;
    }

    .mui-off-canvas-left, .mui-off-canvas-right {
        background-color: #fff;
        color: #4c4c4c;
    }

    .grid-content {
        width: 100%;
        display: flex;
        margin-top: 3px;
        justify-content: space-between;
    }

    .success {
        background-color: #cd0005;
    }

    .wait {
        background-color: #007bc9;
    }

    .failed {
        background-color: #b58c2a;
    }

    .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
        /*font-size: 12px;*/
    }

    .info >div{
        white-space: nowrap;
    }
</style>

