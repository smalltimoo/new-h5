<template>
  <div class="main-body">
    <!-- <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{ $t('agent.linkManagement.linkManagement1')}}
            </div>
            <div class="header-right"></div>
    </div>-->
    <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="no-list" v-if="!dataList||dataList.length==0"></div>
    <div class="manage-type">
      <div :class="{active: manageType=='1'}" @click="manageType=1">{{ $t("agentMember.am13")}}</div>
      <div :class="{active: manageType=='2'}" @click="manageType=2">{{ $t("agentMember.am15")}}</div>
      <!-- <div > -->
      <el-button
        style="float:right;padding-right:20px;"
        size="small"
        @click="changsearch()"
        icon="el-icon-search"
      >帅选</el-button>

      <!-- </div> -->
    </div>
    <div class="mui-content" v-if="manageType == '1'">
      <section class="el-container is-vertical" v-show="manageTypesearch == 1">
        <div class="searchVm">
          <div>
            <span>时间：</span>
            <el-date-picker
              style="width:131px;"
              size="small"
              v-model="search1.startTime"
              type="datetime"
              placeholder="请选择开始时间"
              default-time="12:00:00"
            ></el-date-picker>
            <hr>
            <el-date-picker
              style="width:131px;"
              v-model="search1.endTime"
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
      <div v-for="(item,i) in dataList" :key="i" style="background-color:#f3f3f3">
        <!-- <div style="font-size: 12px">{{item.createTimeStr}}</div> -->
        <div class="rowbg el-row">
          <div class="grid-content grid-content1">
            <span class="num">{{item.regNum}}</span>
            <span class="Save success">{{item.linkTypeStr}}</span>
          </div>
          <div class="grid-content grid-content2">
            <span>{{ $t('agent.linkManagement.linkManagement2')}}</span>
            <span>{{item.createTimeStr}}</span>
          </div>
          <div class="grid-content grid-content2">
            <span class="bg-purple-dark data">链接：{{item.linkUrl}}</span>
          </div>

          <div class="buttonsgroup">
            <Button
              type="info"
              class="clipboard"
              @click="copy"
              :data-clipboard-text="item.linkUrl"
            >复制</Button>&nbsp;
            <Button type="primary" v-if="item.linkType==2" @click="mShow(item)" class="ratio">
              {{
              $t('agent.linkManagement.linkManagement4')}}
            </Button>
            <!--分红比例 -->
            <Button type="warning" style="margin-left:15px;" @click="mDelete(item)" class="delete">
              {{
              $t('agent.linkManagement.linkManagement5')}}
            </Button>
            <!--一键删除 -->
          </div>
        </div>
      </div>
    </div>
    <div class="mui-content" v-if="manageType == '2'">
      <section class="el-container is-vertical" v-show="manageTypesearch == 2">
        <div class="searchVm">
          <div>
            <span>用户名：</span>
            <el-input placeholder="请输入内容" v-model="searchVM.username"></el-input>
          </div>
          <div>
            <span>用户类型：</span>
            <el-select v-model="searchVM.memberType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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

      <div v-for="(item,i) in dataList2" :key="i" style="background-color:#f3f3f3">
        <!-- <div style="font-size: 12px">{{item.createTimeStr}}</div> -->
        <div class="rowbg el-row">
          <div class="grid-content grid-content1">
            <span class="num">{{item.centerAmount / 100}}</span>
            <span class="Save success" v-if="item.agnetLevel>0">{{item.agnetLevelStr}}</span>
            <span class="Save wait" v-else>{{ $t('agent.AgentrEportforms.memberUser')}}</span>
          </div>
          <div class="grid-content grid-content2">
            <span>{{ $t('agent.AgentrEportforms.centerMoney')}}</span>
            <span>{{item.createTimeStr}}</span>
            <span>姓名：{{item.username}}</span>
          </div>
          <!-- <div class="grid-content grid-content2">
            <span class="bg-purple-dark data">链接：{{item.linkUrl}}</span>
          </div>
          -->
          <div class="buttonsgroup">
            <Button type="primary" @click="mTouzhu(item)" size="small">
              {{
              $t('agent.AgentrEportforms.bettingRecord')}}
            </Button>
            <!--投注记录 -->
            <Button type="warning" @click="mJiaoyi(item)" size="small">
              {{
              $t('agent.AgentrEportforms.transactionDetails')}}
            </Button>
            <!-- 交易明细-->
            <Button type="primary" @click="mShow(item)" size="small">
              {{
              $t('agent.AgentrEportforms.dividendRatio')}}
            </Button>
            <!--分红比例 -->
          </div>
        </div>
      </div>
    </div>
    <van-dialog
        v-model="show"
        :title="$t('agent.linkManagement.linkManagement7')"
        show-cancel-button
    >
    <div class="userbasic_body">
        <ul class="bank_list">
            <li style="font-size: 30px;">
                <span class="tit">{{ $t('agent.commission.commission1')}}</span><!--分红比例： -->
                <span>{{vmd.profitRebate}}%</span>
            </li>
            <li style="font-size: 30px;">
                <span class="tit">{{ $t('agent.commission.commission2')}}</span><!-- 优惠扣除比例：-->
                <span>{{vmd.benefitAmountRebate}}%</span></li>
            <li style="font-size: 30px;">
                <span class="tit">{{ $t('agent.commission.commission3')}}</span><!--返水扣除比例： -->
                <span>{{vmd.rakebackRebate}}%</span>
            </li>
        </ul>
        <br><br>
        <div>
      <!-- <Button type="error" long style="height:50px; font-size:20px" @click="mClose">{{ $t('agent.commission.commission4')}}</Button>关闭 -->
        </div>
    </div>
    </van-dialog>
  </div>
</template>
<script>
import window from "@/mixins/window";
import slist from "@/mixins/list";
// require('../../style/mui/index.less')
import headerComponent from "@/common/Header.vue";
var _this = this;
export default {
  mixins: [window, slist],
  data() {
    return {
      logo: this.$t("agentMember.am24"),
      dataList: [],
      show:false,
      manageType: "1",
      manageTypesearch: 0,
      search1: {
        startTime: "",
        endTime: ""
      },
      options: [
        {
          label: this.$t("agent.AgentrEportforms.all"),
          value: "-1"
        },
        {
          label: this.$t("agent.AgentrEportforms.memberUser"),
          value: "1"
        },
        {
          label: this.$t("agent.AgentrEportforms.proxy"),
          value: "2"
        }
      ],
      showSearch: false,
      dataList2: [],
      searchVM: {
        memberType: "",
        username: "", //用户名查询
        orderBy: "id desc",
        rows: 20
      },
      vmd:{}
    };
  },
  mounted() {
    this.mPullData();
  },
  components: {
    headerComponent
  },
  methods: {
    changsearch() {
      let map = {
        islist1: {
          show: () => (this.manageTypesearch = 1),
          not: () => (this.manageTypesearch = 0)
        },
        islist2: {
          show: () => (this.manageTypesearch = 2),
          not: () => (this.manageTypesearch = 0)
        }
      };
      let firstKey = this.manageType == "1" ? "islist1" : "islist2";
      let lastKey = !this.manageTypesearch ? "show" : "not";
      return map[firstKey][lastKey]();
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/agentUser/agentliks.json", {}).then(result => {
        if (result.code == 0) {
          this.dataList = !!result.rows ? result.rows : [];
        }
      });
      this.$http.post("/agentUser/teams.json", params).then(result => {
                    if (result.code == 0) {
                        this.dataList2 = !!result.rows ? result.rows : [];
                    }
                });
    },
    mDelete(rows) {
      //确定要删除？
      this.mConfirm(_this.$t("agent.linkManagement.linkManagement6"), () => {
        this.mLoading(true);
        var params = Object.assign({}, rows);
        this.$http
          .post("/agentUser/delAgentlinks.json", params)
          .then(result => {
            if (result.code == 0) {
              this.mAlert(result.message, "success");
              this.mPullData();
            } else {
              this.mAlert(result.message, "error");
            }
          });
      });
    },
    mOnResize() {
                this.ivuScrollContainerHeight =
                    window.innerHeight - this.$refs.TopHeader.offsetHeight;
            },
            mTouzhu(rows) {
                this.$router.push({
                    path: "./bettingdetaillist",
                    query: {username: rows.username}
                });
            },
            mJiaoyi(rows) {
                // this.$router.push({
                //     path: "./transactionsdetaillist",
                //     query: {username: rows.username}
                // });
                this.$router.push({
                    path: "./mjiaoyi",
                    query: {username: rows.username}
                });
            },
    mShow(rows) {
    //   this.mWinOpen(
    //     //分红比例详情
    //     _this.$t("agent.linkManagement.linkManagement7"),
    //     () => import("./Commission.vue"),
    //     {
    //       benefitAmountRebate: rows.benefitAmountRebate,
    //       profitRebate: rows.profitRebate,
    //       rakebackRebate: rows.rakebackRebate
    //     },
    //     300
    //   );
        this.show = true;
        this.vmd = rows;
    },
    mClose(rows) {

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
                  this.dataList2 = this.dataList2.concat(result.rows);
                }
                resolve();
              }
            });
        } else {
          this.mLoading(false);
          //没有更多记录了
          this.mAlert(_this.$t("agent.AgentrEportforms.noMoreRecords"));
          resolve();
        }
      });
    }
  },
  created() {
    _this = this;
    let from_name = this.$route.query.name
    switch(from_name){
          case 'AgentrEportforms':
                  this.manageType = '2'
              break;
      }
  }
};
</script>

<style lang="less" scoped>
.mui-bar .mui-title {
  margin-top: 10px;
  text-align: center;
}

.mui-content {
  margin: 50px 0;
}

.rowbg {
  // width: 375px;
  // height: 110px;
  // background-color: #ffffff;
  // border-radius: 2px;
  // display: flex;
  margin: 5px 0 10px;
  padding: 10px 15px;
  border-bottom: 1px solid #f3f3f3;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px 0px rgba(201, 201, 201, 0.8);
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

.Save {
  display: block;
  //   padding: 0 10px;
  text-align: center;
  border-radius: 2px;
  font-size: 11px;
  color: #f5f5f5;
  height: 17px;
  line-height: 17px;
  //   margin-bottom: 10px;
  min-width: 96px;
}
.bg-purple-dark {
  text-align: left;
  width: 100%;
  height: 40px;
  font-size: 12px;
  line-height: 40px;
  margin-top: 17px;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
}
.grid-content {
  width: 100%;
  display: flex;
  //   margin-top: 3px;
  justify-content: space-between;
}
.grid-content1 {
  height: 20px;
  .num {
    width: 60px;
    // height: 15px;
    // font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #3d7eff;
    text-align: center;
  }
}

.success {
  background-color: #3d7eff;
  color: #fff;
}

.manage-type {
  height: 40px;
  overflow: hidden;
  overflow-x: scroll;
  white-space: nowrap;
  display: flex;
  position: fixed;
  background-color: white;
  padding-left: 10px;
  z-index: 999;
  width: 100%;
  justify-content: flex-start;

  & > div {
    float: left;
    min-width: 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    font-size: 16px;
    line-height: 35px;
  }
  .active {
    border-bottom: 2px solid #3d7eff;
    color: #3d7eff;
  }
}
.buttonsgroup {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  /deep/ & > button {
    padding: inherit;
  }
}
.searchVm {
  width: 100%;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
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

/deep/ .van-dialog {
    width: 300px;
    height: 300px;
    
     background-image: url('../../assets/images/agent/tangchuang@2x.png');
     background-size: 100% 100%;
     .userbasic_body {
         padding-top: 50px;
         padding-left: 23px;
     } 
     .van-dialog__header {
         padding-top: 32px;
         font-size: 24px;
         color: #fff;
     }
    ul li {
        text-align: left;
        color: #606266;
        height: 30px;
        line-height: 30px;
        &>span {
            font-size: 15px;
        }
    }
}

</style>

