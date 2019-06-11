<template>
  <div class="memberAgent" style="height:620px;">
    <!-- 侧滑导航根容器 -->
    <div class="mui-off-canvas-wrap mui-scalable">
      <!-- 主页面容器 -->
      <div class="mui-inner-wrap">
        <!-- 菜单容器 -->

        <section class="el-container is-vertical" v-show="manageTypesearch == 2">
          <div class="searchVm">
            <!-- <div>
              <span> {{$t('agent.transactionsdetailList.transactionsdetailList1')}}</span>
              <el-input :placeholder="$t('agent.transactionsdetailList.transactionsdetailList2')" v-model="searchVM.merberName"></el-input>
            </div>-->
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
        <div class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 主界面具体展示内容 -->
            <Scroll
              v-if="!showSearch"
              ref="ivuScrollContainer"
              :on-reach-bottom="mReachBottom"
              :height="ivuScrollContainerHeight"
            >
              <form class="el-form el-form--label-right form-agent">
                <div class="el-form-item">
                  <label
                    class="el-form-item__label"
                  >{{$t('agent.membermanAgenment.membermanAgenment9')}}</label>
                  <!--投注资金 -->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="realName"
                        v-model="vm.totalBetAmount"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                  <label
                    class="el-form-item__label"
                  >{{$t('agent.membermanAgenment.membermanAgenment10')}}</label>
                  <!--团队分红金额(元) -->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="phone"
                        v-model="vm.totalTeamRakebackAmount"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                  <label
                    class="el-form-item__label"
                  >{{$t('agent.membermanAgenment.membermanAgenment11')}}</label>
                  <!--个人分红金额(元) -->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="address"
                        v-model="vm.totalRakebackAmount"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                  <label class="el-form-item__label">
                    {{
                    $t('agent.membermanAgenment.membermanAgenment12')}}
                  </label>
                  <!--输赢金额(元) -->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="address"
                        v-model="vm.totalTeamProfitAmount"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                  <label class="el-form-item__label">
                    {{
                    $t('agent.membermanAgenment.membermanAgenment13')}}
                  </label>
                  <!--下级总人数 -->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="address"
                        v-model="vm.totalNum"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                  <label class="el-form-item__label">
                    {{
                    $t('agent.membermanAgenment.membermanAgenment14')}}
                  </label>
                  <!--投注人数 -->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="address"
                        v-model="vm.betMembers"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                  <label class="el-form-item__label">
                    {{
                    $t('agent.membermanAgenment.membermanAgenment15')}}
                  </label>
                  <!--首充人数 -->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="address"
                        v-model="vm.firstMembers"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                  <label class="el-form-item__label">
                    {{
                    $t('agent.membermanAgenment.membermanAgenment16')}}
                  </label>
                  <!--注册人数 -->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="address"
                        v-model="vm.regNum"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                  <label class="el-form-item__label">
                    {{
                    $t('agent.membermanAgenment.membermanAgenment17')}}
                  </label>
                  <!--下级代理总人数 -->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="address"
                        v-model="vm.agentNum"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                  <label class="el-form-item__label">
                    {{
                    $t('agent.membermanAgenment.membermanAgenment18')}}
                  </label>
                  <!-- 下级玩家总人数-->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="address"
                        v-model="vm.memberNum"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                  <label class="el-form-item__label">
                    {{
                    $t('agent.membermanAgenment.membermanAgenment19')}}
                  </label>
                  <!--存款金额(元) -->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="address"
                        v-model="vm.totalTeamRechargeTotal"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                  <label class="el-form-item__label">
                    {{
                    $t('agent.membermanAgenment.membermanAgenment20')}}
                  </label>
                  <!--提款金额(元) -->
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input
                        ref="address"
                        v-model="vm.totalTeamCashTotal"
                        autocomplete="off"
                        rows="2"
                        validateevent="true"
                        class="el-input__inner"
                        readonly
                      >
                    </div>
                  </div>
                </div>
              </form>
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
  props: ["username","manageTypesearch"],
  data() {
    return {
      showSearch: false,
      searchVM: {
        timeType: "",
        orderBy: "id desc",
        rows: 20
      },
      dataList: [],
      vm: {
        totalBetAmount: 0, //投注金额
        totalTeamRakebackAmount: 0, //团队分红金额
        totalRakebackAmount: 0, //个人分红金额
        totalTeamProfitAmount: 0, //输赢金额
        totalTeamRechargeTotal: 0, //存款金额
        totalTeamCashTotal: 0, //提款金额
        totalNum: 0, //总会员数
        agentNum: 0, //下级代理人数
        memberNum: 0, //下级会员人数
        regNum: 0, //注册人数
        betMembers: 0, //投注人数
        firstMembers: 0 //首冲人数
      },
      ivuScrollContainerHeight: 620
    };
  },
  mounted() {
    this.mPullData();
  },
  methods: {
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/agentUser/sumagent.json", params).then(result => {
        if (result.code == 0) {
          this.vm.totalBetAmount = result.data.totalBetAmount / 100;
          this.vm.totalTeamRakebackAmount =
            result.data.totalTeamRakebackAmount / 100;
          this.vm.totalRakebackAmount = result.data.totalRakebackAmount / 100;
          this.vm.totalTeamProfitAmount =
            result.data.totalTeamProfitAmount / 100;
          this.vm.totalTeamRechargeTotal =
            result.data.totalTeamRechargeTotal / 100;
          this.vm.totalTeamCashTotal = result.data.totalTeamCashTotal / 100;
          this.vm.totalNum = result.data.totalNum;
          this.vm.agentNum = result.data.agentNum;
          this.vm.regNum = result.data.regNum;
          this.vm.betMembers = result.data.betMembers;
          this.vm.firstMembers = result.data.firstMembers;
        }
      });
    },
    mReachBottom() {
      return new Promise(resolve => {
        // _this.mLoading(true);
        if (
          parseInt(
            _this.initData.total / (_this.searchVM.rows * _this.searchVM.page)
          ) > 0
        ) {
          ++_this.searchVM.page;
          _this.searchVM.start =
            (_this.searchVM.page - 1) * _this.searchVM.rows;
          _this.searchVM.limit = _this.searchVM.rows;
          var params = Object.assign({}, _this.searchVM);
          params.endTime = dateFormat(new Date().getTime(), "yyyy-MM-dd");
          _this.$http
            .post("/memberCoin/queryTransfer.json", params)
            .then(result => {
              if (result.code == 0) {
                _this.initData.total = result.total;
                if (!!result.rows && result.rows.length > 0) {
                  _this.dataList = _this.dataList.concat(result.rows);
                }
                resolve();
              }
            });
        } else {
          this.mLoading(false);
          //没有更多记录了
          this.mAlert(_this.$t("agent.membermanAgenment.membermanAgenment21"));
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
    }
  },
  created() {
    _this = this;
  }
};
</script>
<style lang="less" scoped>
.mui-bar .mui-title {
  margin-top: 10px;
  text-align: center;
}

/* .mui-content {
        margin-top: 44px;
    } */

.mui-scalable {
  background-color: #efeff4 !important;
}

.memberAgent .ivu-scroll-loader {
  height: 0;
}
.memberAgent .el-form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background: #fff;
  border: solid 1px #f3f3f3;
  margin-bottom: 0;
}

.memberAgent .el-form-item__label {
  text-align: left;
  width: 50%;
}

.memberAgent .el-form-item__content {
  text-align: right;
  width: 50%;
}

.memberAgent .el-input__inner {
  border: 0;
  text-align: right;
}

.ivu-divider-inner-text {
  color: #4c4c4c;
}

.mui-off-canvas-left,
.mui-off-canvas-right {
  background-color: #fff;
  color: #4c4c4c;
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

