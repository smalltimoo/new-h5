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
                                <Divider class="top-title">{{ $t('agent.beetingdetaiList.userName')}}</Divider>
                                <!--用户名 -->
                                <input type="search"
                                       class="mui-input-clear"
                                       :placeholder="$t('agent.beetingdetaiList.inputType')"
                                       v-model="searchVM.username"
                                       style="height: 40px;"
                                >
                                <Divider class="top-title">{{ $t('agent.beetingdetaiList.gameTing')}}</Divider>
                                <!--游戏厅 -->
                                <div class="mui-card">
                                    <ul class="mui-table-view" style="max-height:300px;overflow-y:auto;">
                                        <li class="mui-table-view-cell mui-radio mui-right"
                                            v-for="(item,i) in initData.gamecompays"
                                            :key="i"
                                            v-if="item.id>0"
                                        >
                                            <input name="radio"
                                                   type="radio"
                                                   :checked="item.checked"
                                                   :value="item.id"
                                                   v-model="searchVM.gameCompanyId"
                                            >
                                            {{item.value}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="el-row text-center">
                                    <button type="button"
                                            class="el-button G-submit el-button--primary"
                                            @click="mSearch(1);mShowSearch('close')"
                                    >
                                        <span>{{ $t('agent.beetingdetaiList.search')}}</span><!-- 查询-->
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
                        {{ $t('agent.beetingdetaiList.specified')}}
                    </div>
                    <div class="header-right" @tap="mShowSearch('open')">
                        {{$t('member.transferRecords.tfr4') }}
                    </div>
                </div>
                <div class="no-list" v-if="(!dataList||dataList.length==0)&&!showSearch"></div>
                <!-- 主页面内容容器 -->
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
                                                    <span class="Save success">{{item.gameCompanyName}}</span>
                                                    <span style="height: 30px;line-height: 30px">{{item.username}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info">
                                        <div>
                                            <div class="status">{{item.gameCompanyName}}</div>
                                            <div class="Types">{{ $t('agent.beetingdetaiList.game')}}</div><!-- 游戏-->
                                        </div>
                                        <div>
                                            <div class="status">{{item.validAmount/100}}</div>
                                            <div class="Types">{{ $t('agent.beetingdetaiList.betAmount')}}</div><!--投注金额 -->
                                        </div>
                                        <div>
                                            <div class="status">{{item.bunkoAmount/100}}</div>
                                            <div class="Types">{{ $t('agent.beetingdetaiList.winAndLossAmount')}}</div>
                                            <!--输赢金额 -->
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

    var _this;
    export default {
        mixins: [slist],
        data() {
            return {
                showSearch: false,
                dataList: [],
                initData: {
                    gamecompays: [],
                    total: 0
                },
                searchVM: {
                    gameCompanyId: "", //资金类型
                    memberName: "",
                    orderBy: "id desc",
                    rows: 20
                },
                ivuScrollContainerHeight: 620,
                fromRoute: {}
            };
        },
        mounted() {
            this.mUsername();
            this.mPullData();
            this.mInit();
        },
        methods: {
            mInit() {
                this.$http.get("/managerGame/gameCompanys.json").then(result => {
                    if (result.code == 0) {
                        this.initData.gamecompays = !!result.data.gamelist
                            ? result.data.gamelist
                            : [];
                    }
                });
            },
            mPullData() {
                this.mLoading(true);
                var params = Object.assign({}, this.searchVM);
                console.log(params);
                this.$http
                    .post("/agentUser/memberGameOrders.json", params)
                    .then(result => {
                        if (result.code == 0) {
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
                        this.mAlert(_this.$t('agent.beetingdetaiList.noMoreRecords'));
                        resolve();
                    }
                });
            },
            mOnResize() {
                this.ivuScrollContainerHeight =
                    window.innerHeight - this.$refs.TopHeader.offsetHeight;
            },
            mUsername() {
                if (!!this.$route.query.username) {
                    this.searchVM.memberName = this.$route.query.username;
                }
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
            mGoBack() {
                if (this.fromRoute.name) {
                    this.$router.push({
                        name: this.fromRoute.name,
                        params: Object.assign({}, this.fromRoute.params)
                    });
                } else {
                    this.$router.back();
                }
            }
        }, created() {
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
    .mui-input-clear{
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

