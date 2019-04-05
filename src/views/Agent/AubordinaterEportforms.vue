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
                <Divider style="color:#fff">{{ $t('agent.aubordinaterEportforms.aubordinaterEportforms1')}}</Divider><!-- 分红记录-->
                <!-- <div class="mui-card">
                  <ul class="mui-table-view" style="max-height:300px;overflow-y:auto;">
                    <li class="mui-table-view-cell mui-radio mui-right" v-for="(item,i) in initData.drawStates" :key="i">
                      <input name="radio" type="radio" :checked="item.checked" :value="item.id" v-model="searchVM.state" >
                      {{item.value}}
                    </li>
                  </ul>
                </div> -->
                <div class="mui-card">
                  <ul class="mui-table-view" style="max-height:300px;overflow-y:auto;">
                    <li class="mui-table-view-cell mui-radio mui-right" >
                      <label>{{ $t('agent.aubordinaterEportforms.aubordinaterEportforms2')}}</label><!--今天 -->
                      <input name="radio" type="radio" value="1" v-model="searchVM.timeType">
                    </li>
                    <li class="mui-table-view-cell mui-radio mui-right" >
                      <label>{{ $t('agent.aubordinaterEportforms.aubordinaterEportforms3')}}</label><!--昨天 -->
                      <input name="radio" type="radio" value="2" v-model="searchVM.timeType">
                    </li>
                    <li class="mui-table-view-cell mui-radio mui-right" >
                      <label>{{ $t('agent.aubordinaterEportforms.aubordinaterEportforms4')}}</label><!--本月 -->
                      <input name="radio" type="radio" value="3" v-model="searchVM.timeType">
                    </li>
                    <li class="mui-table-view-cell mui-radio mui-right" >
                      <label>{{ $t('agent.aubordinaterEportforms.aubordinaterEportforms5')}}</label><!-- 上个月-->
                      <input name="radio" type="radio" value="4" v-model="searchVM.timeType">
                    </li>
                  </ul>
                </div>
                <div class="el-row text-center">
                  <button type="button" class="el-button G-submit el-button--primary" @click="mSearch(1);mShowSearch()">
                    <span>{{ $t('agent.aubordinaterEportforms.aubordinaterEportforms6')}}</span><!--查询 -->
                  </button>
                </div>
              </section>
            </div>
          </div>
        </aside>
        <!-- 主页面标题 -->
        <header ref="TopHeader" class="mui-bar mui-bar-nav">
          <router-link :to="{name:'AgentMember'}">
            <i class="mui-icon mui-icon-back mui-pull-left"></i>
          </router-link>
          <h1 class="mui-title">{{ $t('agent.aubordinaterEportforms.aubordinaterEportforms7')}}</h1><!--下级报表 -->
          <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @tap="mShowSearch">{{ $t('agent.aubordinaterEportforms.aubordinaterEportforms8')}}</button><!--筛选 -->
        </header>
        <!-- 主页面内容容器 -->
        <div class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 主界面具体展示内容 -->
            <div
              v-if="(!dataList||dataList.length==0)&&!showSearch"
              style="height:36px;color:#d3d3d3;font-size:16px;"
              class="text-center"
            >{{ $t('agent.aubordinaterEportforms.aubordinaterEportforms9')}}</div><!--暂无数据 -->
            <Scroll v-if="dataList&&dataList.length>0&&!showSearch" ref="ivuScrollContainer" :on-reach-bottom="mReachBottom" :height="ivuScrollContainerHeight">
              <div class="rowbg el-row" v-for="(item,i) in dataList" :key="i">
                <div class="el-col el-col-24" style="padding-bottom: 1.1rem;">
                <div class="el-col el-col-6">
                  <div class="grid-content bg-purple-dark">
                  <span class="Save"> {{item.memberTypeStr }}</span>
                  </div>
                </div>
                <div class="el-col el-col-12" style="text-align: center;">
                  <div class="grid-content bg-purple-dark">
                  <span class="status">{{item.username}}</span>
                  </div>
                </div>
                </div>
                <div class="el-col el-col-8">
                <div class="Types">
                  {{ $t('agent.aubordinaterEportforms.aubordinaterEportforms10')}}
                </div><!--团队分红金额 -->
                <div class="status">
                  {{item.allrakebackAmount / 100}}
                </div>
                </div>
                <div class="el-col el-col-8">
                <div class="Types">
                  {{ $t('agent.aubordinaterEportforms.aubordinaterEportforms11')}}
                </div><!-- 个人分红金额-->
                <div class="status">
                  {{item.rakebackAmount / 100}}
                </div>
                </div>
                <div class="el-col el-col-8">
                <div class="Types">
                  {{ $t('agent.aubordinaterEportforms.aubordinaterEportforms12')}}
                </div><!--投注人数 -->
                <div class="status">
                  {{item.betMembers}}
                </div>
                </div>
                <div class="el-col el-col-8">
                <div class="Types">
                  {{ $t('agent.aubordinaterEportforms.aubordinaterEportforms13')}}
                </div><!--投注金额 -->
                <div class="status">
                  {{item.allBetAmount / 100}}
                </div>
                </div>
                <div class="el-col el-col-8">
                <div class="Types">
                  {{ $t('agent.aubordinaterEportforms.aubordinaterEportforms14')}}
                </div><!--输赢金额 -->
                <div class="status">
                  {{item.allProfitAmount / 100}}
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
var _this;
export default {
  mixins: [slist],
  data() {
    return {
      showSearch: false,
      dataList: [],
      searchVM: {
        timeType: "",
        orderBy: "id desc",
        rows: 20
      },
      ivuScrollContainerHeight: 500
    };
  },
  mounted() {
    this.mPullData();
  },
  methods: {
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/agentUser/rakeback.json", params).then(result => {
        if (result.code == 0) {
          this.dataList = !!result.data.list ? result.data.list : [];
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
          this.mAlert(_this.$t('agent.aubordinaterEportforms.aubordinaterEportforms15'));
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
    }
  },created(){
      _this=this;
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
  text-align: center;
}
.Types {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: 700;
}
</style>

