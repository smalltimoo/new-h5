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
                                <Divider class="top-title">{{ $t("member.rechargeRecord.rr1") }}</Divider><!--状态 -->
                                <div class="mui-card">
                                    <ul class="mui-table-view" style="max-height:300px;overflow-y:auto;">
                                        <li class="mui-table-view-cell mui-radio mui-right"
                                            v-for="(item,i) in initData.actionTypes"
                                            :key="i"
                                        >
                                            <input name="radio"
                                                   type="radio"
                                                   :checked="item.checked"
                                                   :value="item.id"
                                                   v-model="searchVM.actionType"
                                            >
                                            {{item.value}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="el-row text-center">
                                    <button
                                            type="button"
                                            class="el-button G-submit el-button--primary"
                                            @click="mSearch(1);mShowSearch('close')"
                                    >
                                        <span>{{ $t("member.rechargeRecord.rr2") }}</span><!--查询 -->
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </aside>
                <!-- 主页面标题 -->
                <!-- <div class="header">
                    <div class="header-left">
                        <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
                    </div>
                    <div class="header-middle">
                        {{ $t('member.rechargeRecord.rr3') }}
                    </div>
                    <div class="header-right" @tap="mShowSearch('open')">
                        {{ $t('member.capitalRecord.cr23') }}
                    </div>
                </div> -->
                <header-component :showyue="true" :logo="logo" :showIcon="true" :showLogo="true" ></header-component>
                <div  class="no-list" v-if="(!dataList||dataList.length==0)&&!showSearch"></div>
                <!-- 主页面内容容器 -->
                <div class="mui-content mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <Scroll v-if="dataList&&dataList.length>0&&!showSearch"
                                ref="ivuScrollContainer"
                                :on-reach-bottom="mReachBottom"
                                :height="ivuScrollContainerHeight"
                        >
                            <div v-for="(item,i) in dataList" :key="i" style="background-color:#f3f3f3">
                                <!-- <div style="font-size: 12px">{{item.createTimeStr}}</div> -->
                                <div class="rowbg el-row">
                                <div class="grid-content grid-content1">
                                    <div>
                                    <span class="num">{{item.amount / 100}}</span>
                                    <span
                                        class="user"
                                    >{{$t('agent.transactionsdetailList.transactionsdetailList9')}}</span>
                                    </div>
                                    <div style="align-items:flex-end">
                                    <span class="btn success" style="margin-bottom:9px;">{{item.actionTypeStr}}</span>
                                    <span class="user">{{item.createTimeStr}}</span>
                                    </div>
                                </div>
                                <div class="grid-content grid-content3">
                                    <span
                                    class="num"
                                    >{{ $t("member.rechargeRecord.rr6") }}&nbsp;&nbsp;￥{{item.beforeAmount/100}}</span>
                                    <span>
                                    {{ $t("member.rechargeRecord.rr7") }}&nbsp;&nbsp;
                                    <font style="color:#3d7eff">￥{{item.afterAmount/100}}</font>
                                    </span>
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
    import slist from '@/mixins/list'
    import {dateFormat} from '../../assets/lib/util';
    import headerComponent from "@/common/Header.vue";
    require('../../style/mui/index.less')
    var vue
    export default {
        mixins: [slist],
        data() {
            return {
                showSearch: false,
                logo:'交易记录',
                initData: {
                    actionTypes: [],
                    total: 0
                },
                dataList: [],
                searchVM: {
                    actionType: -1,
                    orderBy: 'createTime',
                    rows: 20
                },
                ivuScrollContainerHeight: 620
            }
        },
        components: {
            headerComponent
        },
        mounted() {
            this.mPullData()
        },
        methods: {
            mInit() {
                this.$http.get('/memberCoin/coinindex.json').then(result => {
                    if (result.code == 0) {
                        let gcs = result.data.actionTypes
                        gcs.unshift({id: -1, value: this.$t("member.rechargeRecord.rr9")})
                        gcs.forEach((ele, i) => {
                            ele.checked = i === 0
                        })
                        this.initData.actionTypes = result.data.actionTypes
                    }
                })
            },
            mPullData() {
                this.mLoading(true)
                var params = Object.assign({}, this.searchVM)
                this.$http.post('/memberCoin/coinlist.json', params).then(result => {
                    if (result.code == 0) {
                        this.initData.total = result.total
                        this.dataList = !!result.rows ? result.rows : []
                    }
                    this.mLoading(false)
                })
            },
            mReachBottom() {
                return new Promise(resolve => {
                    this.mLoading(true)
                    if (
                        parseInt(
                            this.initData.total / (this.searchVM.rows * this.searchVM.page)
                        ) > 0
                    ) {
                        ++this.searchVM.page
                        this.searchVM.start = (this.searchVM.page - 1) * this.searchVM.rows
                        this.searchVM.limit = this.searchVM.rows
                        var params = Object.assign({}, this.searchVM)
                        this.$http.post('/memberCoin/coinlist.json', params).then(result => {
                            if (result.code == 0) {
                                this.initData.total = result.total
                                if (!!result.rows && result.rows.length > 0) {
                                    this.dataList = this.dataList.concat(result.rows)
                                }
                                resolve()
                            }
                        })
                    } else {
                        this.mLoading(false)
                        this.$Message.warning(this.$t("member.rechargeRecord.rr10")); //没有更多记录了
                        resolve()
                    }
                })
            },
            mOnResize() {
                setTimeout(() => {
                    this.ivuScrollContainerHeight =
                        window.innerHeight - this.$refs.TopHeader.offsetHeight
                }, 500)
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
        },
        created() {
            vue = this
            this.mInit()
        }
    }
</script>

<style lang="less" scoped>

    .mui-bar .mui-title {
        margin-top: 10px;
        text-align: center;
    }

    .mui-content {
        margin-top: 0px;
    }

    .mui-scalable {
        background-color: #efeff4 !important;
    }

    .rowbg {
        margin: 5px 10px 10px 10px;
        padding: 10px;
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

    .success {
        background-color: #2d8cf0;
    }

    .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
    }

    .rowbg {
  // width: 375px;
  // height: 110px;
  // background-color: #ffffff;
  // border-radius: 2px;
  // display: flex;
  margin: 5px 0 10px;
  padding: 10px 15px;
  // display: flex;

  // width: 375px;
  // height: 149px;
  background-color: #fff;
  border-radius: 2px;
  /deep/ .ivu-btn {
    border-radius: 2px;
    width: 60px;
    height: 19px;
  }
  /deep/ .ivu-btn-info {
    border-color: #377eff;
    background-color: #3d7eff;
  }
  /deep/ .ratio {
    border-color: #fb9736;
    background-color: #fb9736;
  }
  /deep/ .delete {
    border-color: #3d7eff;
    background-color: #3d7eff;
  }
}
.grid-content {
  width: 100%;
  display: flex;
  //   margin-top: 3px;
  justify-content: space-between;
  border-bottom: 1px solid #f3f3f3;
  .time {
    color: #606266;
    font-size: 9px;
  }
  .btn {
    width: 96px;
    height: 18px;
    line-height: 18px;
    background-color: #3d7eff;
    border-radius: 2px;
    line-height: 18px;
    font-size: 11px;
    color: #f5f5f5;
  }
  .user {
    font-size: 12px;
    color: #606266;
  }
}
.grid-content1 {
  height: 72px;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .num {
    width: 60px;
    // height: 15px;
    // font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #3d7eff;
    text-align: center;
  }
}
.grid-content2 {
  height: 38px;
  color: #377eff;
  display: flex;
  align-items: center;
}
.grid-content3 {
  height: 38px;
  display: flex;
  align-items: center;
  border: none;
  justify-content: space-between;
}

.searchVm {
  width: 100%;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  background-color:#f3f3f3;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    & > span {
      min-width: 80px;
    }
  }
  .search_buttons {
    padding-left: 80px;
    display: flex;
    justify-content: space-between;
    /deep/ & > button {
      width: 136px;
      height: 25px;
      line-height: 25px;
      background-color: #3d7eff;
      border-radius: 6px;
      color: #f3f3f3;
      padding: 0;
      text-align: center;
    }
  }
  /deep/ .el-input__inner {
    width: 260px;
  }
  
}

</style>
