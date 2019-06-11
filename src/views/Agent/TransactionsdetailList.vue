<template>
  <div class="main" style="height:620px;">
    <!-- 侧滑导航根容器 -->
    <div class="mui-off-canvas-wrap mui-scalable">
      <!-- 主页面容器 -->
      <div class="mui-inner-wrap">
        <!-- 主页面标题 -->
        <!-- <div class="header">
          <div class="header-left">
            <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
          </div>
          <div class="header-middle">{{ $t('agent.transactionsdetailList.transactionsdetailList4')}}</div>
          <div
            class="header-right"
            @tap="mShowSearch('open')"
          >{{ $t('agent.transactionsdetailList.transactionsdetailList5')}}</div>
        </div>-->
        <section class="el-container is-vertical" v-show="manageTypesearch == 1">
          <div class="searchVm">
            <div>
              <span> {{$t('agent.transactionsdetailList.transactionsdetailList1')}}</span>
              <el-input :placeholder="$t('agent.transactionsdetailList.transactionsdetailList2')" v-model="searchVM.merberName"></el-input>
            </div>
            <div>
              <span>时间：</span>
              <el-date-picker
                style="width:131px;"
                size="small"
                v-model="searchVM.startTime"
                type="datetime"
                placeholder="请选择开始时间"
                default-time="12:00:00"
              ></el-date-picker>
              <hr>
              <el-date-picker
                style="width:131px;"
                v-model="searchVM.endTime"
                type="datetime"
                placeholder="请选择结束时间"
                default-time="12:00:00"
              ></el-date-picker>
            </div>

            <div class="search_buttons">
              <button
                type="button"
                class="el-button G-submit el-button--primary"
                @click="manageTypesearch=0"
              >
                {{ $t('agent.AgentrEportforms.cancel')}}
                <!-- 查询-->
              </button>
              <button
                type="button"
                class="el-button G-submit el-button--primary"
                @click="mSearch(1);manageTypesearch=0"
              >
                {{ $t('agent.AgentrEportforms.ok')}}
                <!-- 查询-->
              </button>
            </div>
          </div>
        </section>
        <!-- 主页面内容容器 -->
        <div class="no-list" v-if="(!dataList||dataList.length==0)&&!showSearch"></div>
        <div class="mui-content mui-scroll-wrapper" :style="{top:getScrollTop}">
          <div class="mui-scroll">
            <!-- 主界面具体展示内容 -->
            <Scroll
              v-if="dataList&&dataList.length>0&&!showSearch"
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
                    <div>
                      <span class="time">{{item.createTimeStr}}</span>
                    </div>
                    <div style="align-items:flex-end">
                      <span class="btn" style="margin-bottom:9px;">{{item.walletTypeStr}}</span>
                      <span class="user">账号：{{item.username}}</span>
                    </div>
                  </div>
                  <div
                    class="grid-content grid-content2"
                  >{{ $t('agent.transactionsdetailList.transactionsdetailList11')}}：{{item.info}}</div>
                  <div class="grid-content grid-content3">
                    <span
                      class="num"
                    >{{$t('agent.transactionsdetailList.transactionsdetailList8')}}&nbsp;&nbsp;￥{{item.beforeAmount/100}}</span>
                    <span>
                      {{ $t('agent.transactionsdetailList.transactionsdetailList10')}}&nbsp;&nbsp;
                      <font style="color:#f03838">￥{{item.afterAmount/100}}</font>
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
import slist from "@/mixins/list";

require("../../style/mui/index.less");
var _this;
export default {
  props: ["username","manageTypesearch"],
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
        merberName: "",
        startTime:'',
        endTime:'',
        orderBy: "id desc",
        rows: 20
      },
      ivuScrollContainerHeight: 620,
      fromRoute: {}
    };
  },
  computed : {
            getScrollTop(){
                return this.manageTypesearch?150:0 + 'px'
            }
        },
  mounted() {
    // this.mUsername();
    this.mPullData();
    this.mInit();
  },
  methods: {
    mInit() {
      this.$http.get("/memberCoin/coinindex.json").then(result => {
        if (result.code == 0) {
          this.initData.actionTypes = result.data.actionTypes;
        }
      });
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/agentUser/coinlist.json", params).then(result => {
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
          this.$Message.warning(
            _this.$t("agent.transactionsdetailList.transactionsdetailList12")
          );
          resolve();
        }
      });
    },
    mUsername() {
      if (!!this.$route.query.username) {
        this.searchVM.merberName = this.$route.query.username;
      }
    },
    mShowSearch(operate) {
      if (operate == "open") {
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
      });
    }
  },
  created() {
    _this = this;
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from;
    });
  }
};
</script>

<style lang="less" scoped>
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
    border-color: #f03838;
    background-color: #f03838;
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

