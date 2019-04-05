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
                <Divider style="color:#fff">{{ $t("member.rechargeRecord.rr1") }}</Divider><!--状态 -->
                <div class="mui-card">
                  <ul class="mui-table-view" style="max-height:300px;overflow-y:auto;">
                    <li
                      class="mui-table-view-cell mui-radio mui-right"
                      v-for="(item,i) in initData.actionTypes"
                      :key="i"
                    >
                      <input
                        name="radio"
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
                    @click="mSearch(1);mShowSearch()"
                  >
                    <span>{{ $t("member.rechargeRecord.rr2") }}</span><!--查询 -->
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
          <h1 class="mui-title">{{ $t("member.rechargeRecord.rr3") }}</h1><!-- 资金流水-->
          <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @tap="mShowSearch">{{ $t("member.rechargeRecord.rr11") }}</button><!-- 筛选-->
        </header>
        <!-- 主页面内容容器 -->
        <div class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 主界面具体展示内容 -->
            <div
              v-if="(!dataList||dataList.length==0)&&!showSearch"
              style="height:36px;color:#d3d3d3;font-size:16px;"
              class="text-center"
            >{{ $t("member.rechargeRecord.rr4") }}</div><!-- 暂无数据-->
            <Scroll
              v-if="dataList&&dataList.length>0&&!showSearch"
              ref="ivuScrollContainer"
              :on-reach-bottom="mReachBottom"
              :height="ivuScrollContainerHeight"
            >
              <div class="rowbg el-row" v-for="(item,index) in dataList" :key="index">
                <div class="el-col el-col-24">
                  <div class="el-col el-col-6">
                    <div class="grid-content bg-purple-dark">
                      <span class="Save">{{item.actionTypeStr}}</span>
                    </div>
                  </div>
                  <div class="el-col el-col-6" style="margin-left:10px;">
                    <div class="grid-content bg-purple-dark">
                      <span class="status">{{item.walletTypeStr}}</span>
                    </div>
                  </div>
                  <div class="el-col el-col-12" style="float:right;width:46%">
                    <div
                      class="bg-purple-dark data"
                      style="color:#fff;float:right"
                    >{{item.createTimeStr}}</div>
                  </div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t("member.rechargeRecord.rr5") }}</div><!--金额 -->
                  <div class="status">{{item.amount / 100}}</div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t("member.rechargeRecord.rr6") }}</div><!-- 转前金额-->
                  <div class="status">{{item.beforeAmount / 100}}</div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{ $t("member.rechargeRecord.rr7") }}</div><!-- 转后金额-->
                  <div class="status">{{item.afterAmount / 100}}</div>
                </div>
                <div class="el-col el-col-24" style="padding-bottom: 1.1rem;">
                  <div class="Types" style="float:left; margin-left:40px;">
                    {{ $t("member.rechargeRecord.rr8") }}
                    <span style="color:#fff;">{{item.info}}</span><!-- 备注信息:-->
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
import { dateFormat } from '@/utils/util'
var vue
export default {
  mixins: [slist],
  data() {
    return {
      showSearch: false,
      initData: {
        actionTypes: [],
        total: 0
      },
      dataList: [],
      searchVM: {
        actionType: -1,
        orderBy: 'id desc',
        rows: 20
      },
      ivuScrollContainerHeight: 500
    }
  },
  mounted() {
    this.mPullData()
  },
  methods: {
    mInit() {
      this.$http.get('/memberCoin/coinindex.json').then(result => {
        if (result.code == 0) {
          let gcs = result.data.actionTypes
          gcs.unshift({ id: -1, value: this.$t("member.rechargeRecord.rr9") })
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
            //没有更多记录了
          this.mAlert(this.$t("member.rechargeRecord.rr10"))
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
    mShowSearch() {
      if (!this.showSearch) {
        mui('.mui-off-canvas-wrap')
          .offCanvas()
          .show()
        this.showSearch = true
      } else {
        mui('.mui-off-canvas-wrap')
          .offCanvas()
          .close()
        this.showSearch = false
      }
    }
  },
  created() {
    vue = this
    this.mInit()
  }
}
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

.TransferRecords {
  width: 100%;
  font-size: 0;
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
</style>
