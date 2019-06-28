<template>
  <div class="main-body" style="height:620px;">
    <!-- 侧滑导航根容器 -->
    <div class="mui-off-canvas-wrap mui-scalable">
      <!-- 主页面容器 -->
      <div class="mui-inner-wrap">
        <!-- 菜单容器 -->

        <!-- 主页面标题 -->

        <div class="no-list" v-if="(!dataList||dataList.length==0)&&!showSearch"></div>
        <!-- 主页面内容容器 -->
        <div class="mui-content mui-scroll-wrapper">
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
                      <span class="num">{{item.validAmount/100}}</span>
                      <span class="user">{{ $t('agent.beetingdetaiList.betAmount')}}</span>
                    </div>
                    <div>
                      <span class="time">{{item.createTimeStr}}</span>
                    </div>
                    <div style="align-items:flex-end">
                      <span class="btn success" style="margin-bottom:9px;">{{item.gameCompanyName}}</span>
                      <span class="user">账号：{{item.username}}</span>
                    </div>
                  </div>

                  <div class="grid-content grid-content3">
                    <span class="num">有效金额&nbsp;&nbsp;￥{{item.commissionAmount/100}}</span>
                    <span>
                      <font
                        style="color:#3d7eff"
                      >{{ $t('agent.beetingdetaiList.winAndLossAmount')}}&nbsp;&nbsp;￥{{item.bunkoAmount/100}}</font>
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
      props: ["username", "manageTypesearch"],
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
          this.mAlert(_this.$t("agent.beetingdetaiList.noMoreRecords"));
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

/* .mui-content {
        margin-top: 50px;
    } */

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

.mui-off-canvas-left,
.mui-off-canvas-right {
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

    border-radius: 2px;
    line-height: 18px;
    font-size: 11px;
    color: #f5f5f5;
  }
  .success {
    background-color: #3d7eff;
  }

  .wait {
    background-color: #b9b9b9;
  }

  .failed {
    background-color: #3d7eff;
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
  background-color: #f3f3f3;
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

