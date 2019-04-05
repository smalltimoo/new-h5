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
                <Divider style="color:#fff">{{ $t('member.bettingRecord.br1') }}</Divider><!-- 游戏日期-->
                <button ref="tapDate1" class="btn mui-btn mui-btn-link" style="color:#fff" @tap="mTapDate1">{{ $t('member.bettingRecord.br15') }}</button><!-- 选择日期 ...-->
                <button ref="tapDate2" class="btn mui-btn mui-btn-link" style="color:#fff" @tap="mTapDate2">{{ $t('member.bettingRecord.br16') }}</button><!-- 选择日期 ...-->
                <Divider style="color:#fff">{{ $t('member.bettingRecord.br3') }}</Divider><!-- 游戏厅-->
                <div class="mui-card">
                  <ul class="mui-table-view" style="max-height:410px;overflow-y:auto;">
                    <li class="mui-table-view-cell mui-radio mui-right" v-for="(item,i) in initData.gamecompays" :key="i">
                      <input name="radio" type="radio" :checked="item.checked" :value="item.id" v-model="searchVM.gameCompanyId" >
                      {{item.value}}
                    </li>
                  </ul>
                </div>
                <div class="el-row text-center">
                  <button type="button" class="el-button G-submit el-button--primary" @click="mSearch(1);mShowSearch()">
                    <span>{{ $t('member.bettingRecord.br4') }}</span><!-- 查询-->
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
          <h1 class="mui-title">{{ $t('member.bettingRecord.br5') }}</h1><!--投注记录 -->
          <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @tap="mShowSearch">{{ $t('member.bettingRecord.br6') }}</button><!--筛选 -->
        </header>
        <!-- 主页面内容容器 -->
        <div class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 主界面具体展示内容 -->
            <Row class="rowbg" style="font-size: 16px;color: #fff;border-top: solid 1px #fff;">
              <Col span="12" style="font-weight: 600">
                {{ $t('member.bettingRecord.br3') }}: {{ gameRoomName }}
              </Col>
              <Col span="12" style="font-weight: 600;text-align: right;">
                {{ $t('member.bettingRecord.br17') }}  {{ totalDama }}
              </Col>
            </Row>
            <div
              v-if="(!dataList||dataList.length==0)&&!showSearch"
              style="height:36px;color:#d3d3d3;font-size:16px;"
              class="text-center"
            >{{ $t('member.bettingRecord.br7') }}</div><!-- 暂无数据-->

            <Scroll v-if="dataList&&dataList.length>0&&!showSearch" :on-reach-bottom="mReachBottom">
              <div class="rowbg el-row" v-for="(item,i) in dataList" :key="i">
                <div class="el-col el-col-24" style="padding-bottom: 1.1rem;">
                  <div class="el-col el-col-6">
                    <div class="grid-content bg-purple-dark">
                      <span class="Save">{{item.gameTypeStr}}</span>
                    </div>
                  </div>
                  <div class="el-col el-col-6">
                    <div class="grid-content bg-purple-dark" style="text-align: center;">
                      <span class="status">{{item.gameName}}</span>
                    </div>
                  </div>
                  <div class="el-col el-col-12">
                    <div class="bg-purple-dark data">{{item.createTimeStr}}</div>
                  </div>
                </div>
                <div class="el-col el-col-6">
                  <div class="Types">{{ $t('member.bettingRecord.br8') }}</div><!-- 下注金额-->
                  <div class="status">{{item.investAmount / 100}}</div>
                </div>
                <div class="el-col el-col-6">
                  <div class="Types">{{ $t('member.bettingRecord.br9') }}</div><!-- 有效金额-->
                  <div class="status">{{item.validAmount / 100}}</div>
                </div>
                <div class="el-col el-col-6">
                  <div class="Types">{{ $t('member.bettingRecord.br10') }}</div><!-- 打码量-->
                  <div class="status">{{item.validAmount / 100}}</div>
                </div>
                <div class="el-col el-col-6">
                  <div class="Types">{{ $t('member.bettingRecord.br11') }}</div><!--输赢金额 -->
                  <div class="status">{{item.bunkoAmount / 100}}</div>
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
import { dateFormat } from "@/utils/util";
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
      totalDama:0,
      ivuScrollContainerHeight: 500
    };
  },
  computed:{
    gameRoomName(){
      let rooms= this.initData.gamecompays.filter(item=>this.searchVM.gameCompanyId==item.id)
      if(rooms.length>0){
        return rooms[0].value
      }
      else{
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
          gcs.unshift({ id: -1, value: this.$t('member.bettingRecord.br13')});
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
            this.totalDama= this.dataList.reduce((sum,current)=>{
              return sum+current.validAmount/100;
            },0)
          }
          else {
            this.mLoading(false);
          }
        }).catch(error=>{
        this.mLoading(false);
      })
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
          this.$http
            .post("/managerGame/memberGameOrders.json", params)
            .then(result => {
              if (result.code == 0) {
                this.initData.total = result.total;
                if (!!result.rows && result.rows.length > 0) {
                  this.dataList = this.dataList.concat(result.rows);
                  this.totalDama= this.dataList.reduce((sum,current)=>{
                    return sum+current.validAmount/100;
                  },0)
                }
                resolve();
              }
            });
        } else {
          this.mLoading(false);
          //没有更多记录了
          this.mAlert(this.$t('member.bettingRecord.br14'));
          resolve();
        }
      });
    },
    mOnResize() {
      setTimeout(() => {
        this.ivuScrollContainerHeight =
          window.innerHeight - this.$refs.TopHeader.offsetHeight;
      }, 500);
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
    mTapDate1() {
      let _self = this.$refs.tapDate1;
      if (_self.picker) {
        _self.picker.show(function(rs) {
          vue.searchVM.startTime = rs.text;
          _self.innerHTML = rs.text;
          _self.picker.dispose();
          _self.picker = null;
        });
      } else {
        var options = { type: "date" };
        _self.picker = new mui.DtPicker(options);
        _self.picker.show(function(rs) {
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
        _self.picker.show(function(rs) {
          vue.searchVM.endTime = rs.text;
          _self.innerHTML = rs.text;
          _self.picker.dispose();
          _self.picker = null;
        });
      } else {
        var options = { type: "date" };
        _self.picker = new mui.DtPicker(options);
        _self.picker.show(function(rs) {
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
  text-align: center;
  color: #fff;
}

.Types {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #fbd3d3;
  /*font-weight: 700;*/
}

.mui-scroll{
  height: 100%;
  /*position: relative;*/
}
  .totalDama{
    position: fixed;
    z-index: 100;
    height: 40px;
    line-height: 40px;
    width: 100%;
    border: solid 1px red;
    display: flex;

  }
</style>
<style>
  .ivu-scroll-wrapper{
    height: 100%;
  }
  .ivu-scroll-container{
    height:100%!important;
  }
</style>
