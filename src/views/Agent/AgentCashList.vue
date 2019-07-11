<template>
  <div class="main-body" style="height:620px;">
    <!-- 侧滑导航根容器 -->
    <div class="mui-off-canvas-wrap mui-scalable">
      <!-- 主页面容器 -->
      <div class="mui-inner-wrap">
        <!-- 菜单容器 -->

        <!-- 主页面标题 -->
        <!-- <div class="header">
                    <div class="header-left">
                        <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
                    </div>
                    <div class="header-middle">
                        {{ $t('agent.agentCashList.dividendWithdrawalRecord')}}
                    </div>
                    <div class="header-right" @tap="mShowSearch('open')">
                        {{ $t('agent.agentCashList.filter')}}
                    </div>
        </div>-->
        <!-- 菜单容器 -->
        <section class="el-container is-vertical" v-show="manageTypesearch == '4'">
          <div class="searchVM">

            <div>
              <span>类别</span>
               <el-select v-model="searchVM.gameCompanyId" placeholder="请选择" class="type">
              <el-option
                v-for="(item,index) in initData.gamecompays"
                :key="index"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
            </div>
            <div>
              <span>时间：</span>
              <div class="time">
                <input
                  type="text"
                  v-model="searchVM.startTime"
                  readonly
                  @click="showDatePicker($event,0)"
                >
                <font>~</font>
                <input
                  type="text"
                  v-model="searchVM.endTime"
                  readonly
                  @click="showDatePicker($event,1)"
                >
              </div>

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
        <div class="no-list" v-if="!dataList||dataList.length==0">
          <span class="desc">暂无记录</span>
          <router-link :to="{name:'Home'}" class="btn">去打码</router-link>
        </div>
        <div class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 主界面具体展示内容 -->
            <Scroll
              v-if="dataList&&dataList.length>0"
              ref="ivuScrollContainer"
              :on-reach-bottom="mReachBottom"
              :height="ivuScrollContainerHeight"
            >
              <div v-for="(item,i) in dataList" :key="i" style="background-color:#f3f3f3">
                <!-- <div style="font-size: 12px">{{item.createTimeStr}}</div> -->
                <div class="rowbg el-row">
                  <div class="grid-content grid-content1">
                    <div>
                      <span class="num">{{item.drawAmount/100}}</span>
                      <span class="user">{{ $t('agent.agentCashList.withdrawalAmount')}}</span>
                    </div>
                    <div>
                      <span class="time">{{item.auditeTimeStr}}</span>
                    </div>
                    <div style="align-items:flex-end">
                      <span class="btn" style="margin-bottom:9px;">{{item.stateStr}}</span>
                      <span class="user">账号：{{item.realName}}</span>
                    </div>
                  </div>

                  <div class="grid-content grid-content3">
                    <span
                      class="num"
                    >{{ $t('agent.agentCashList.handlingFee')}}&nbsp;&nbsp;￥{{item.commissionAmount/100}}</span>
                    <span>
                      {{ $t('agent.agentCashList.theActualAmount')}}&nbsp;&nbsp;
                      <font
                        style="color:#3d7eff"
                      >￥{{item.realAmount/100}}</font>
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
var vue;
var _this;
let currenttime;
export default {
  mixins: [slist],
  props: ["username", "manageTypesearch"],
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
          this.$Message.warning(_this.$t("agent.agentCashList.noMoreRecords"));
          resolve();
        }
      });
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
    mTapDateS() {
      let _self = this.$refs.tapDateS;
      if (_self.picker) {
        _self.picker.show(function(rs) {
          vue.searchVM.startTime = rs.text;
          _self.innerHTML = rs.text;
          _self.picker.dispose();
          _self.picker = null;
        });
      } else {
        var options = { type: "datetime" };
        _self.picker = new mui.DtPicker(options);
        _self.picker.show(function(rs) {
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
        _self.picker.show(function(rs) {
          vue.searchVM.endTime = rs.text;
          _self.innerHTML = rs.text;
          _self.picker.dispose();
          _self.picker = null;
        });
      } else {
        var options = { type: "datetime" };
        _self.picker = new mui.DtPicker(options);
        _self.picker.show(function(rs) {
          vue.searchVM.endTime = rs.text;
          _self.innerHTML = rs.text;
          _self.picker.dispose();
          _self.picker = null;
        });
      }
    },
     showDatePicker(event, index) {
      currenttime = index;
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "请选择开始时间",
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.selectHandle,
          format: { year: "YY年", month: "MM月", date: "第 D 日" }
        });
      }
      this.datePicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      // console.info(date, selectedVal, selectedText);
      if (currenttime == 1) {
        this.searchVM.endTime = selectedVal.join("/");
      } else {
        this.searchVM.startTime = selectedVal.join("/");
      }
      this.mSearch();
      // this.$set(this.searchVM.time, currenttime, selectedVal.join("/"));
    },
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
  justify-content: space-between;
}

.searchVM { padding-top:10px;
  // width: 351px;
  width:100%;
  margin: 0 auto;
  display: flex;
  // padding: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  z-index: 99;
  background-color: #fff;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    & > span {
      min-width: 80px;
    }
  }
  .type {
    /deep/ .el-input--suffix,
    .el-date-editor--daterange {
      background-color: #e2e2e2;
      border-radius: 4px;
    }
    /deep/ .el-input__inner {
      // width: 90px;
      // background-color: #ededed;
      height: 34px;
      border: 1px solid #f3f3f3;
    }
  }
  /deep/ .time {
    width: 261px;
    height: 34px;
    line-height: 34px;
    border: 1px solid #f3f3f3;
    box-sizing: content-box;
    border-radius: 3px;
    // background-color: #ededed;
    input {
      width: 126px;
      // background-color: #ededed;
    }
  }
  .btns {
    width: 80px;
    height: 34px;
    background-color: #ededed;
    border-radius: 4px;
    // color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  .btns.active {
    background-color: #3d7eff;
    color: #f5f5f5;
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

