<template>
  <div class="publicpage" v-resize="mOnResize">
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
                <Divider style="color:#fff">{{ $t('agent.agentCoinList.queryWalletOperationTime')}}</Divider><!--查询钱包操作时间 -->
                <button
                  ref="tapDateS"
                  class="btn mui-btn mui-btn-link"
                  style="color:#fff"
                  @tap="mTapDateS"
                >{{ $t('agent.agentCoinList.start')}}</button><!--选择开始时间 ... -->
                <button
                  ref="tapDateE"
                  class="btn mui-btn mui-btn-link"
                  style="color:#fff"
                  @tap="mTapDateE"
                >{{ $t('agent.agentCoinList.endTime')}}</button><!--选择结束时间 ... -->
                <Divider style="color:#fff">{{ $t('agent.agentCoinList.operationType')}}</Divider><!--操作类型 -->
                <button
                  ref="tapActionType"
                  class="btn mui-btn mui-btn-link"
                  style="color:#fff"
                  @tap="mTapActionType"
                >{{ $t('agent.agentCoinList.type')}}</button><!--不限类型 -->
                <div class="el-row text-center">
                  <button
                    type="button"
                    class="el-button G-submit el-button--primary"
                    @click="mSearch(1);mShowSearch()"
                  >
                    <span>{{ $t('agent.agentCoinList.search')}}</span><!--查询 -->
                  </button>
                </div>
              </section>
            </div>
          </div>
        </aside>
        <!-- 主页面标题 -->
        <header ref="TopHeader" class="mui-bar mui-bar-nav">
          <i class="mui-icon mui-icon-back mui-pull-left" @click="mGoBack"></i>
          <h1 class="mui-title">{{ $t('agent.agentCoinList.dividedWalletLog')}}</h1><!--分红钱包日志 -->
          <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @tap="mShowSearch">{{ $t('agent.agentCoinList.filter')}}</button><!--筛选 -->
        </header>
        <!-- 主页面内容容器 -->
        <div class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 主界面具体展示内容 -->
            <div
              v-if="(!dataList||dataList.length==0)&&!showSearch"
              style="height:36px;color:#d3d3d3;font-size:16px;"
              class="text-center"
            >{{ $t('agent.agentCoinList.noData')}}</div><!--暂无数据 -->
            <Scroll
              v-if="dataList&&dataList.length>0&&!showSearch"
              ref="ivuScrollContainer"
              :on-reach-bottom="mReachBottom"
              :height="ivuScrollContainerHeight"
            >
              <div class="rowbg el-row" v-for="(item,i) in dataList" :key="i">
                <div class="el-col el-col-24" style="padding-bottom: 1.1rem;">
                  <div class="el-col el-col-6">
                    <div class="grid-content bg-purple-dark">
                      <span class="Save">{{item.actionTypeStr}}</span>
                    </div>
                  </div>
                  <div class="el-col el-col-8">
                    <div class="grid-content bg-purple-dark" style="text-align:center;">
                      <span class="status">{{item.name}}</span>
                    </div>
                  </div>
                  <div class="el-col el-col-10" style="color:#fff">
                    <div class="bg-purple-dark data">{{item.createTimeStr}}</div>
                  </div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('agent.agentCoinList.preOperationFunds')}}</div><!-- 操作前资金-->
                  <div class="status">{{item.beforeAmount/100}}</div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('agent.agentCoinList.operatingFunds')}}</div><!-- 操作资金-->
                  <div class="status">{{item.amount/100}}</div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('agent.agentCoinList.postOperatingFunds')}}</div><!-- 操作后资金-->
                  <div class="status">{{item.afterAmount/100}}</div>
                </div>
                <div class="el-col el-col-24">
                  <div class="Types">{{ $t('agent.agentCoinList.instructions')}}</div><!--操作说明 -->
                  <div class="status">{{item.info}}</div>
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
        actionType: 0, //操作类型：1充值，2提现，3管理员操作，4活动
        startDate: "", //查询起始时间
        endDate: "", //查询结束时间
        orderBy: "id desc",
        rows: 20
      },
      ivuScrollContainerHeight: 500,
      fromRoute: {},
      actionTypes: [
        { value: 0, text: "不限类型" },
        { value: 1, text: "充值" },
        { value: 2, text: "提现" },
        { value: 3, text: "管理员操作" },
        { value: 4, text: "活动" }
      ]
    };
  },
  mounted() {
    this.mPullData();
  },
  methods: {
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/agentUser/agentcoinlist.json", params).then(result => {
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
          params.endDate = dateFormat(new Date().getTime(), "yyyy-MM-dd");
          this.$http
            .post("/agentUser/agentcoinlist.json", params)
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
          this.mAlert(_this.$t('agent.agentCoinList.noMoreRecords'));
          resolve();
        }
      });
    },
    mOnResize() {
      this.ivuScrollContainerHeight =
        window.innerHeight - this.$refs.TopHeader.offsetHeight;
    },
    mShowSearch() {
      if (!this.showSearch) {
        mui(".mui-off-canvas-wrap")
          .offCanvas()
          .show();
        this.showSearch = true;
      } else {
        mui(".mui-off-canvas-wrap")
          .offCanvas()
          .close();
        this.showSearch = false;
      }
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
    },
    mTapDateS() {
      let _self = this.$refs.tapDateS;
      if (_self.picker) {
        _self.picker.show(function(rs) {
          vue.searchVM.startDate = rs.text;
          _self.innerHTML = rs.text;
          _self.picker.dispose();
          _self.picker = null;
        });
      } else {
        var options = { type: "datetime" };
        _self.picker = new mui.DtPicker(options);
        _self.picker.show(function(rs) {
          vue.searchVM.startDate = rs.text;
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
          vue.searchVM.endDate = rs.text;
          _self.innerHTML = rs.text;
          _self.picker.dispose();
          _self.picker = null;
        });
      } else {
        var options = { type: "datetime" };
        _self.picker = new mui.DtPicker(options);
        _self.picker.show(function(rs) {
          vue.searchVM.endDate = rs.text;
          _self.innerHTML = rs.text;
          _self.picker.dispose();
          _self.picker = null;
        });
      }
    },
    mTapActionType() {
      let _self = this.$refs.tapActionType;
      if (_self.picker) {
        _self.picker.show(function(rs) {
          vue.searchVM.actionType = rs[0].value;
          _self.innerHTML = rs[0].text;
          _self.picker.dispose();
          _self.picker = null;
        });
      } else {
        _self.picker = new mui.PopPicker();
        _self.picker.setData(this.actionTypes);
        _self.picker.show(function(rs) {
          vue.searchVM.actionType = rs[0].value;
          _self.innerHTML = rs[0].text;
          _self.picker.dispose();
          _self.picker = null;
        });
      }
    }
  },
  created() {
    vue = this;
    _this=this;
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from;
    });
  }
};
</script>

<style scoped>
.publicpage {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #33334e;
  z-index: 10;
}
.mui-bar .mui-title {
  margin-top: 10px;
  text-align: center;
}
.TopHeader {
  background-color: #545478;
  border-bottom: 1px solid #3a3a3a;
  color: #fff;
}
.filter {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  z-index: 15;
  color: #fff;
  font-weight: 800;
  padding: 13px 10px;
}
.publicpage_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
h1 {
  line-height: 1.8rem;
  font-size: 16px;
  text-align: left;
}
.rowbg {
  background: #545478;
  padding: 1rem;
  border-bottom: 1px solid #3a3a3a;
  margin-bottom: 10px;
}
.Save {
  display: block;
  padding: 0.05rem;
  text-align: center;
  background: #ff695a;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
}
.status {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #fff;
}
.data {
  line-height: 22px;
  font-size: 14px;
  padding-left: 0.1rem;
  text-align: left;
}
.Types {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: 700;
}
input {
  background-color: #f5f7fa;
  width: 80%;
  margin-left: 10%;
}
</style>

