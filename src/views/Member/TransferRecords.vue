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
                                <Divider class="top-title">{{$t('member.transferRecords.tfr1') }}</Divider><!-- 资金类型-->
                                <div class="mui-card">
                                    <ul class="mui-table-view" style="max-height:300px;overflow-y:auto;">
                                        <li class="mui-table-view-cell mui-radio mui-right"
                                            v-for="(item,i) in initData.actionTypes" :key="i">
                                            <input name="radio" type="radio" :checked="item.checked" :value="item.id"
                                                   v-model="searchVM.transType">
                                            {{item.value}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="el-row text-center">
                                    <button type="button" class="el-button G-submit el-button--primary"
                                            @click="mSearch(1);mShowSearch('close')">
                                        <span>{{$t('member.transferRecords.tfr2') }}</span><!-- 查询-->
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
                        {{$t('member.transferRecords.tfr3') }}
                    </div>
                    <div class="header-right" @tap="mShowSearch('open')">
                        {{$t('member.transferRecords.tfr4') }}
                    </div>
                </div>
                <!-- 主页面内容容器 -->

                <div  class="no-list" v-if="!dataList||dataList.length==0">
                    <span class="desc">暂无记录</span>
                <router-link :to="{name:'Home'}" class="btn">去打码</router-link>
                </div>
                <div class="mui-content mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <Scroll v-if="dataList&&dataList.length>0" ref="ivuScrollContainer"
                                :on-reach-bottom="mReachBottom" :height="ivuScrollContainerHeight"
                        >
                            <div v-for="(item,i) in dataList" :key="i">
                                <div style="font-size: 12px">{{item.createTimeStr}}</div>
                                <div class="rowbg el-row">
                                    <div class="el-col el-col-24">
                                        <div class="el-col el-col-24">
                                            <div class="el-col el-col-24">
                                                <div class="grid-content">
                                                    <span class="Save wait" v-if="item.transType=='1'">{{item.transTypeStr}}</span>
                                                    <span class="Save success" v-else>{{item.transTypeStr}}</span>
                                                    <span style="height: 30px;line-height: 30px">{{item.gameName}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info">
                                        <div>
                                            <div class="status">{{item.transferAmount / 100}}</div>
                                            <div class="Types">{{$t('member.transferRecords.tfr6') }}</div><!--金额 -->
                                        </div>
                                        <div >
                                            <div class="status">{{item.beforeTransfer / 100}}</div>
                                            <div class="Types">{{$t('member.transferRecords.tfr7') }}</div><!--转前金额 -->
                                        </div>
                                        <div>
                                            <div class="status">{{item.afterTransfer / 100}}</div>
                                            <div class="Types">{{$t('member.transferRecords.tfr8') }}</div><!--转后金额 -->
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
    export default {
        mixins: [slist],
        data() {
            return {
                showSearch: false,
                dataList: [],
                initData: {
                    finalStates: [],
                    actionTypes: [],
                    total: 0
                },
                searchVM: {
                    transType: "", //转账类型
                    actionStates: "", //完成状态
                    orderBy: "id desc",
                    rows: 20
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
                this.$http.get("/memberCoin/coinTransfer.json").then(result => {
                    if (result.code == 0) {
                        let gcs = result.data.transTypeList;
                        gcs.unshift({id: -1, value: this.$t('member.transferRecords.tfr9')});
                        gcs.forEach((ele, i) => {
                            ele.checked = i === 0;
                        });
                        this.initData.actionTypes = result.data.transTypeList;
                        this.initData.finalStates = result.data.stateList;
                    }
                });
            },
            mPullData() {
                this.mLoading(true);
                let params = Object.assign({}, this.searchVM);
                this.$http.post("/memberCoin/queryTransfer.json", params).then(result => {
                    if (result) {
                        // this.initData.total = result.total;
                        this.dataList = !!result.rows ? result.rows : [];
                    } else {
                        //数据检索错误！
                        this.mAlert(this.$t('member.transferRecords.tfr10'));
                    }
                    this.mLoading(false);
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
                            .post("/memberCoin/queryTransfer.json", params)
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
                        this.$Message.warning(this.$t('member.transferRecords.tfr11'));
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
        background-color: #2d8cf0;
    }

    .wait {
        background-color: #b58c2a;
    }

    .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
    }
</style>

