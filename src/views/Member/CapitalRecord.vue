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
                                <Divider class="top-title">{{ $t('member.capitalRecord.cr1') }}</Divider><!--状态 -->
                                <div class="mui-card">
                                    <ul class="mui-table-view" style="max-height:300px;overflow-y:auto;">
                                        <li class="mui-table-view-cell mui-radio mui-right"
                                            v-for="(item,i) in initData.depositStates" :key="i"
                                            v-if="item.id!=3  && item.id!=4"
                                        >
                                            <input name="radio" type="radio" :checked="item.checked" :value="item.id" v-model="searchVM.state">
                                            {{item.value}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="el-row text-center">
                                    <button type="button" class="el-button G-submit el-button--primary"
                                            @click="mSearch(1);mShowSearch('close')">
                                        <span>{{ $t('member.capitalRecord.cr2') }}</span><!--查询 -->
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </aside>

                <div class="header">
                    <div class="header-left">
                        <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
                    </div>
                    <div class="header-middle">
                        {{ $t('member.capitalRecord.cr3') }}
                    </div>
                    <div class="header-right" @tap="mShowSearch('open')">
                        {{ $t('member.capitalRecord.cr23') }}
                    </div>
                </div>

                <div  class="no-list" v-if="(!dataList||dataList.length==0)&&!showSearch"></div>
                <!-- 主页面内容容器 -->
                <div class="mui-content mui-scroll-wrapper" v-else>
                    <div class="mui-scroll">
                        <!-- 主界面具体展示内容 -->
                        <Scroll v-if="dataList&&dataList.length>0&&!showSearch" ref="ivuScrollContainer"
                                :on-reach-bottom="mReachBottom" :height="ivuScrollContainerHeight"
                        >
                            <div v-for="(item,i) in dataList" :key="i">
                                <div style="font-size: 12px">{{item.createTimeStr}}</div>
                                <div class="rowbg el-row">
                                    <div class="el-col el-col-24">
                                        <div class="el-col el-col-24">
                                            <div class="grid-content">
                                                <span class="Save wait" v-if="item.depositState==0">{{item.depositStateStr}}</span>
                                                <span class="Save success"
                                                      v-else-if="item.depositState==1 || item.depositState==3">{{item.depositStateStr}}</span>
                                                <span class="Save failed" v-else>{{item.depositStateStr}}</span>
                                                <span style="height: 30px;line-height: 30px">{{item.depositTypeStr}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info">
                                        <div>
                                            <div class="status" style="color: #c10005; font-size: 16px">{{item.depositAmount / 100}}
                                            </div>
                                            <div class="Types">{{ $t('member.capitalRecord.cr5') }}</div><!--充值金额 -->
                                        </div>
                                        <div>
                                            <div class="status">{{item.benefitAmount / 100}}</div>
                                            <div class="Types">{{ $t('member.capitalRecord.cr7') }}</div><!--赠送金额 -->
                                        </div>
                                        <div >
                                            <div class="status" style="color: #c10005; font-size: 16px">
                                                {{item.realAmount / 100}}
                                            </div>
                                            <div class="Types">{{ $t('member.capitalRecord.cr8') }}</div><!--实际金额 -->
                                        </div>
                                    </div>
                                    <div class="info">
                                        <!--<div>-->
                                            <!--<div class="status" style="font-weight: 400;font-size: 14px">-->
                                                <!--{{mBenefitState(item.benefitState)}}-->
                                            <!--</div>-->
                                            <!--<div class="Types">{{ $t('member.capitalRecord.cr9') }}</div>&lt;!&ndash;解锁状态 &ndash;&gt;-->
                                        <!--</div>-->
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
    export default {
        mixins: [slist],
        data() {
            return {
                showSearch: false,
                dataList: [],
                searchVM: {
                    //depositType: "", //转账类型
                    // startTime: "", //查询起始时间
                    // endTime: "", //查询结束时间
                    state: "", //状态
                    orderBy: "id desc",
                    rows: 20
                },
                initData: {
                    depositStates: [],
                    depositTypes: [],
                    activeTypes: [],
                    total: 0
                },
                ivuScrollContainerHeight: 620
            };
        },
        mounted() {
            this.mInit();
            this.mPullData();
        },
        methods: {
            mInit() {
                this.$http.get("/memberCoin/rechargeindex.json").then(result => {
                    console.log(result);
                    if (result.code == 0) {
                        let gcs = result.data.depositStates;
                        gcs.unshift({id: -1, value: this.$t('member.capitalRecord.cr10')});
                        gcs.forEach((ele, i) => {
                            ele.checked = i === 0;
                        });
                        this.initData.depositStates = result.data.depositStates;
                        this.initData.depositTypes = result.data.depositTypes;
                        this.initData.activeTypes = result.data.activeTypes;
                    }
                });
            },
            mPullData() {
                this.mLoading(true);
                var params = Object.assign({}, this.searchVM);
                this.$http.post("/memberCoin/rechargelist.json", params).then(result => {
                    if (result.code == 0) {
                        this.initData.total = result.total;
                        this.dataList = !!result.rows ? result.rows : [];
                    }
                });
            },
            mBenefitStateLabel(benefitState) {
                if (benefitState == 0) {
                    //无活动
                    return this.$t('member.capitalRecord.cr11');
                } else if (benefitState == 1) {
                    //打码中
                    return this.$t('member.capitalRecord.cr12');
                } else if (benefitState == 2) {
                    //可解锁
                    return `<span style="color: green;">${this.$t("member.capitalRecord.cr13")}</span>`;
                } else if (benefitState == 3) {
                    //已结算
                    return `<span>${this.$t("member.capitalRecord.cr14")}</span>`;
                } else if (benefitState == 4) {
                    //已过期
                    return `<span style="color: #f00;">${this.$t("member.capitalRecord.cr15")}</span>`;
                }
            },
            mReachBottom() {
                return new Promise(resolve => {
                    this.mLoading(true);
                    if (parseInt(this.initData.total / (this.searchVM.rows * this.searchVM.page)) > 0) {
                        ++this.searchVM.page;
                        this.searchVM.start = (this.searchVM.page - 1) * this.searchVM.rows;
                        this.searchVM.limit = this.searchVM.rows;
                        var params = Object.assign({}, this.searchVM);
                        params.endTime = dateFormat(new Date().getTime(), "yyyy-MM-dd");
                        this.$http
                            .post("/memberCoin/rechargelist.json", params)
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
                        this.$Message.warning(this.$t("member.capitalRecord.cr17"));
                        resolve();
                    }
                });
            },
            mBenefitState(state) {
                //0：无优惠金额，1：打码中，2：可结算，3：已结算，4：已过期
                let bs = [this.$t("member.capitalRecord.cr18"), this.$t("member.capitalRecord.cr19"), this.$t("member.capitalRecord.cr20"), this.$t("member.capitalRecord.cr21"), this.$t("member.capitalRecord.cr22")];
                return (state <= 4 && bs[state]) || "-";
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
            }
        }
    };
</script>

<style scoped>
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
        height: 30px;
        line-height: 30px;
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

    .wait {
        background-color: #007bc9;
    }

    .success {
        background-color: #2d8cf0;
    }

    .failed {
        background-color: #cccccc;
    }

    .info{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
    }
</style>

