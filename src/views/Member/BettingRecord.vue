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
                                <Divider class="top-title">{{ $t('member.bettingRecord.br1') }}</Divider><!-- 游戏日期-->
                                <button ref="tapDate1" class="btn mui-btn mui-btn-link" style="color: #4c4c4c;"
                                        @tap="mTapDate1"
                                >
                                    {{ $t('member.bettingRecord.br15') }}
                                </button><!-- 选择日期 ...-->
                                <button ref="tapDate2" class="btn mui-btn mui-btn-link" style="color: #4c4c4c;"
                                        @tap="mTapDate2"
                                >
                                    {{ $t('member.bettingRecord.br16') }}
                                </button><!-- 选择日期 ...-->
                                <Divider class="top-title"  style="background-color: #4c4c4c;">{{ $t('member.bettingRecord.br3') }}</Divider><!-- 游戏厅-->
                                <div class="mui-card">
                                    <ul class="mui-table-view" style="max-height:380px;overflow-y:auto;">
                                        <li class="mui-table-view-cell mui-radio mui-right"
                                            v-for="(item,i) in initData.gamecompays" :key="i">
                                            <input name="radio" type="radio" :checked="item.checked" :value="item.id"
                                                   v-model="searchVM.gameCompanyId">
                                            {{item.value}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="el-row text-center">
                                    <button type="button" class="el-button G-submit el-button--primary"
                                            @click="mSearch(1);mShowSearch('close')">
                                        <span>{{ $t('member.bettingRecord.br4') }}</span><!-- 查询-->
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
                        {{ $t('member.bettingRecord.br5') }}
                    </div>
                    <div class="header-right" @tap="mShowSearch('open')">
                        {{ $t('member.bettingRecord.br6') }}
                    </div>
                </div>
                <div class="dama">
                    <div style="text-align: left">
                        {{ $t('member.bettingRecord.br3') }}: {{ gameRoomName }}
                    </div>
                    <div style="text-align: right">
                        {{ $t('member.bettingRecord.br17') }} {{ totalDama.toFixed(2) }}
                    </div>
                </div>

                <!-- 主页面内容容器 -->

                <div  class="no-list" v-if="(!dataList||dataList.length==0)&&!showSearch"></div>
                <div class="mui-content mui-scroll-wrapper">
                    <div class="mui-scroll">

                        <Scroll v-if="dataList&&dataList.length>0&&!showSearch" :on-reach-bottom="mReachBottom"
                                :height="ivuScrollContainerHeight" style="margin-bottom: 30px">
                            <div v-for="(item,i) in dataList" :key="i">
                                <div style="font-size: 12px">{{item.createTimeStr}}</div>
                                <div class="rowbg el-row">
                                    <div class="el-col el-col-24">
                                        <div class="el-col el-col-24">
                                            <div class="el-col el-col-24">
                                                <div class="grid-content">
                                                    <span class="Save success">{{item.gameTypeStr}}</span>
                                                    <span style="height: 30px;line-height: 30px">{{item.gameCompanyName}} {{item.gameName}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info">
                                        <div>
                                            <div class="status">{{item.investAmount / 100}}</div>
                                            <div class="Types">{{ $t('member.bettingRecord.br8') }}</div><!-- 下注金额-->
                                        </div>
                                        <div>
                                            <div class="status">{{item.validAmount / 100}}</div>
                                            <div class="Types">{{ $t('member.bettingRecord.br9') }}</div><!-- 有效金额-->
                                        </div>
                                        <div>
                                            <div class="status">{{item.validAmount / 100}}</div>
                                            <div class="Types">{{ $t('member.bettingRecord.br10') }}</div><!-- 打码量-->
                                        </div>
                                        <div>
                                            <div class="status">{{item.bunkoAmount / 100}}</div>
                                            <div class="Types">{{ $t('member.bettingRecord.br11') }}</div><!--输赢金额 -->
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
    import {dateFormat} from "../../assets/lib/util";

    require('../../style/mui/index.less')
    var vue;
    export default {
        mixins: [slist],
        data() {
            return {
                showSearch: false,
                initData: {
                    gamecompays: [],
                    gametypes: [],
                    games: [],
                    total: 0
                },
                dataList: [],
                searchVM: {
                    gameCompanyId: -1,
                    orderBy: "id desc",
                    rows: 20,
                    startTime: "", //查询起始时间
                    endTime: "", //查询结束时间
                },
                totalDama: 0,
                ivuScrollContainerHeight: 620
            };
        },
        computed: {
            gameRoomName() {
                let rooms = this.initData.gamecompays.filter(item => this.searchVM.gameCompanyId == item.id)
                if (rooms.length > 0) {
                    return rooms[0].value
                } else {
                    return "";
                }

            }
        },
        mounted() {
            this.mPullData();
        },
        methods: {
            mInit() {
                this.$http.get("/managerGame/gameBetInit.json").then(result => {
                    if (result.code == 0) {
                        let gcs = result.data.gamecompays;
                        gcs.unshift({id: -1, value: this.$t('member.bettingRecord.br13')});
                        gcs.forEach((ele, i) => {
                            ele.checked = i === 0;
                        });
                        this.initData.gamecompays = gcs;
                        this.initData.gametypes = result.data.gametypes;
                        this.mSearch(1);
                    }
                });
            },
            mPullData() {
                this.mLoading(true);
                var params = Object.assign({}, this.searchVM);
                this.$http
                    .post("/managerGame/memberGameOrders.json", params)
                    .then(result => {
                        if (result.code == 0) {
                            this.initData.total = result.total;
                            this.dataList = !!result.rows ? result.rows : [];
                            this.totalDama = this.dataList.reduce((sum, current) => {
                                return sum + current.validAmount / 100;
                            }, 0)
                        } else {
                            this.mLoading(false);
                        }
                    }).catch(error => {
                    this.mLoading(false);
                })
            },
            mReachBottom() {
                return new Promise(resolve => {
                    this.mLoading(true);
                    if (parseInt(this.initData.total / (this.searchVM.rows * this.searchVM.page)) > 0) {
                        ++this.searchVM.page;
                        this.searchVM.start = (this.searchVM.page - 1) * this.searchVM.rows;
                        this.searchVM.limit = this.searchVM.rows;
                        var params = Object.assign({}, this.searchVM);
                        this.$http
                            .post("/managerGame/memberGameOrders.json", params)
                            .then(result => {
                                if (result.code == 0) {
                                    this.initData.total = result.total;
                                    if (!!result.rows && result.rows.length > 0) {
                                        this.dataList = this.dataList.concat(result.rows);
                                        this.totalDama = this.dataList.reduce((sum, current) => {
                                            return sum + current.validAmount / 100;
                                        }, 0)
                                    }
                                    resolve();
                                }
                            });
                    } else {
                        this.mLoading(false);
                        this.$Message.warning(this.$t('member.bettingRecord.br14')); //没有更多记录了
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
            mTapDate1() {
                let _self = this.$refs.tapDate1;
                if (_self.picker) {
                    _self.picker.show(function (rs) {
                        vue.searchVM.startTime = rs.text;
                        _self.innerHTML = rs.text;
                        _self.picker.dispose();
                        _self.picker = null;
                    });
                } else {
                    var options = {type: "date"};
                    _self.picker = new mui.DtPicker(options);
                    _self.picker.show(function (rs) {
                        vue.searchVM.startTime = rs.text;
                        _self.innerHTML = rs.text;
                        _self.picker.dispose();
                        _self.picker = null;
                    });
                }
            },
            mTapDate2() {
                let _self = this.$refs.tapDate2;
                if (_self.picker) {
                    _self.picker.show(function (rs) {
                        vue.searchVM.endTime = rs.text;
                        _self.innerHTML = rs.text;
                        _self.picker.dispose();
                        _self.picker = null;
                    });
                } else {
                    var options = {type: "date"};
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
            this.mInit();
        }
    };
</script>

<style scoped>
    .mui-bar .mui-title {
        margin-top: 10px;
        text-align: center;
    }

    .mui-content {
        margin-top: 80px;
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

    .failed {
        background-color: #b58c2a;
    }

    .wait {
        background-color: #007bc9;
    }

    .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
    }

    .dama {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        margin-top: 43px;
        font-size: 14px;
        background-color: #cd0005;
        height: 40px;
        display: flex;
        color: #fff;
        justify-content: space-between;
        align-items: center;
        padding:0 15px;
        z-index: 99;
    }
</style>
