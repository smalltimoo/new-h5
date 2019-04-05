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
                <Divider style="color:#fff">{{ $t('agent.transactionsdetailList.transactionsdetailList1')}}</Divider><!--用户名 -->
                <input
                  type="search"
                  class="mui-input-clear"
                  :placeholder="$t('agent.transactionsdetailList.transactionsdetailList2')"
                  v-model="searchVM.merberName"
                ><!-- 请输入用户名-->
                <div class="el-row text-center">
                  <button
                    type="button"
                    class="el-button G-submit el-button--primary"
                    @click="mSearch(1);mShowSearch()"
                  >
                    <span>{{ $t('agent.transactionsdetailList.transactionsdetailList3')}}</span><!--查询-->
                  </button>
                </div>
              </section>
            </div>
          </div>
        </aside>
        <!-- 主页面标题 -->
        <header ref="TopHeader" class="mui-bar mui-bar-nav">
          <i class="mui-icon mui-icon-back mui-pull-left" @click="mGoBack"></i>
          <h1 class="mui-title">{{ $t('agent.transactionsdetailList.transactionsdetailList4')}}</h1><!-- 交易明细-->
          <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @tap="mShowSearch">{{ $t('agent.transactionsdetailList.transactionsdetailList5')}}</button><!--筛选 -->
        </header>
        <!-- 主页面内容容器 -->
        <div class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 主界面具体展示内容 -->
            <div
              v-if="(!dataList||dataList.length==0)&&!showSearch"
              style="height:36px;color:#d3d3d3;font-size:16px;"
              class="text-center"
            >{{ $t('agent.transactionsdetailList.transactionsdetailList6')}}</div><!--暂无数据 -->
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
                      <span class="status">{{item.username}}</span>
                    </div>
                  </div>
                  <!-- <div class="el-col el-col-10" style="color:#fff;text-align:center;">
                    <div class="bg-purple-dark data">{{item.createTimeStr}}</div>
                  </div> -->
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('agent.transactionsdetailList.transactionsdetailList7')}}</div><!-- 钱包类型-->
                  <div class="status">{{item.walletTypeStr}}</div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('agent.transactionsdetailList.transactionsdetailList8')}}</div><!-- 操作前资金-->
                  <div class="status">{{item.beforeAmount/100}}</div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('agent.transactionsdetailList.transactionsdetailList9')}}</div><!-- 操作资金-->
                  <div class="status">{{item.amount/100}}</div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('agent.transactionsdetailList.transactionsdetailList10')}}</div><!--操作后资金 -->
                  <div class="status">{{item.afterAmount/100}}</div>
                </div>
                <div class="el-col el-col-16" style="text-align:center;">
                  <div class="Types" >{{ $t('agent.transactionsdetailList.transactionsdetailList11')}}</div><!--备注 -->
                  <div class="status" style="width:200px;">{{item.info}}</div>
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
        merberName: "",
        orderBy: "id desc",
        rows: 20
      },
      ivuScrollContainerHeight: 500,
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
          this.mAlert(_this.$t('agent.transactionsdetailList.transactionsdetailList12'));
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
        this.searchVM.merberName = this.$route.query.username;
      }
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
    }
  },created(){
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

