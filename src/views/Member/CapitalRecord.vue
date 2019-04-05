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
                <Divider style="color:#fff">{{ $t('member.capitalRecord.cr1') }}</Divider><!--状态 -->
                <div class="mui-card">
                  <ul class="mui-table-view" style="max-height:300px;overflow-y:auto;">
                    <li class="mui-table-view-cell mui-radio mui-right" v-for="(item,i) in initData.depositStates" :key="i">
                      <input name="radio" type="radio" :checked="item.checked" :value="item.id" v-model="searchVM.state" >
                      {{item.value}}
                    </li>
                  </ul>
                </div>
                <div class="el-row text-center">
                  <button type="button" class="el-button G-submit el-button--primary" @click="mSearch(1);mShowSearch()">
                    <span>{{ $t('member.capitalRecord.cr2') }}</span><!--查询 -->
                  </button>
                </div>
              </section>
            </div>
          </div>
        </aside>
        <!-- 主页面标题 -->
        <header ref="TopHeader" class="mui-bar mui-bar-nav">
          <router-link :to="{name:'UserMember'}">
            <i class="mui-icon mui-icon-back mui-pull-left"></i>
          </router-link>
          <h1 class="mui-title">{{ $t('member.capitalRecord.cr3') }}</h1><!--充值记录 -->
          <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @tap="mShowSearch">{{ $t('member.capitalRecord.cr23') }}</button><!-- 筛选-->
        </header>
        <!-- 主页面内容容器 -->
        <div class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 主界面具体展示内容 -->
            <div
              v-if="(!dataList||dataList.length==0)&&!showSearch"
              style="height:36px;color:#d3d3d3;font-size:16px;"
              class="text-center"
            >{{ $t('member.capitalRecord.cr4') }}</div><!--暂无数据 -->
            <Scroll v-if="dataList&&dataList.length>0&&!showSearch" ref="ivuScrollContainer" :on-reach-bottom="mReachBottom" :height="ivuScrollContainerHeight">
              <div class="rowbg el-row" v-for="(item,i) in dataList" :key="i">
                <div class="el-col el-col-24" style="padding-bottom: 1.1rem;">
                  <div class="el-col el-col-6">
                    <div class="grid-content bg-purple-dark">
                      <span class="Save">{{item.depositStateStr}}</span>
                    </div>
                  </div>
                  <div class="el-col el-col-6">
                    <div class="grid-content bg-purple-dark" style="text-align:center;">
                      <span class="status">{{item.depositTypeStr}}</span>
                    </div>
                  </div>
                  <div class="el-col el-col-12" style="color:#fff;text-align:center;">
                    <div class="bg-purple-dark data">{{item.createTimeStr}}</div>
                  </div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('member.capitalRecord.cr5') }}</div><!--充值金额 -->
                  <div class="status">{{item.depositAmount / 100}}</div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('member.capitalRecord.cr6') }}</div><!--手续费 -->
                  <div class="status">{{item.commissionAmount / 100}}</div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('member.capitalRecord.cr7') }}</div><!--赠送金额 -->
                  <div class="status">{{item.benefitAmount / 100}}</div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('member.capitalRecord.cr8') }}</div><!--实际金额 -->
                  <div class="status">{{item.realAmount / 100}}</div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t('member.capitalRecord.cr9') }}</div><!--解锁状态 -->
                  <div class="status">{{mBenefitState(item.benefitState)}}</div>
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
export default {
  mixins: [slist],
  data() {
    return {
      showSearch: false,
      dataList: [],
      searchVM: {
        //depositType: "", //转账类型
        // startTime: "", //查询起始时间
        // endTime: "", //查询结束时间
        state: "", //状态
        orderBy: "id desc",
        rows: 20
      },
      initData: {
        depositStates: [],
        depositTypes: [],
        activeTypes: [],
        total: 0
      },
      ivuScrollContainerHeight: 500
    };
  },
  mounted() {
    this.mInit();
    this.mPullData();
  },
  methods: {
    mInit() {
      this.$http.get("/memberCoin/rechargeindex.json").then(result => {
        console.log(result);
        if (result.code == 0) {
          let gcs = result.data.depositStates;
          gcs.unshift({ id: -1, value: this.$t('member.capitalRecord.cr10') });
          gcs.forEach((ele, i) => {
            ele.checked = i === 0;
          });
          this.initData.depositStates = result.data.depositStates;
          this.initData.depositTypes = result.data.depositTypes;
          this.initData.activeTypes = result.data.activeTypes;
        }
      });
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/memberCoin/rechargelist.json", params).then(result => {
        if (result.code == 0) {
          this.initData.total = result.total;
          this.dataList = !!result.rows ? result.rows : [];
        }
      });
    },
    mBenefitStateLabel(benefitState) {
      if (benefitState == 0) {
          //无活动
        return this.$t('member.capitalRecord.cr11');
      } else if (benefitState == 1) {
          //打码中
        return this.$t('member.capitalRecord.cr12');
      } else if (benefitState == 2) {
          //可解锁
        return `<span style="color: green;">${this.$t("member.capitalRecord.cr13")}</span>`;
      } else if (benefitState == 3) {
          //已结算
        return `<span>${this.$t("member.capitalRecord.cr14")}</span>`;
      } else if (benefitState == 4) {
          //已过期
        return `<span style="color: #f00;">${this.$t("member.capitalRecord.cr15")}</span>`;
      }
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
            .post("/memberCoin/rechargelist.json", params)
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
          this.mAlert(this.$t("member.capitalRecord.cr17"));
          resolve();
        }
      });
    },
    mOnResize() {
      this.ivuScrollContainerHeight =
        window.innerHeight - this.$refs.TopHeader.offsetHeight;
    },
    mBenefitState(state) {
      //0：无优惠金额，1：打码中，2：可结算，3：已结算，4：已过期
      let bs = [this.$t("member.capitalRecord.cr18"), this.$t("member.capitalRecord.cr19"), this.$t("member.capitalRecord.cr20"), this.$t("member.capitalRecord.cr21"), this.$t("member.capitalRecord.cr22")];
      return (state <= 4 && bs[state]) || "-";
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
    }
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
  padding-left: 2.1rem;
  text-align: left;
}
.Types {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: 700;
}
</style>

