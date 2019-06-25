<template>
  <div class="main-body">
    <header-component :showyue="true" :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="no-list" v-if="!dataList||dataList.length==0"></div>
    <div class="menunav">
      <div class="manage-type">
        <div :class="{active: manageType=='1'}" @click="manageType=1">{{ $t("agentMember.am19")}}</div>
        <div :class="{active: manageType=='2'}" @click="manageType=2">{{ $t("agentMember.am17")}}</div>
        <div :class="{active: manageType=='3'}" @click="manageType=3">{{ $t("agentMember.am25")}}</div>
        <div :class="{active: manageType=='4'}" @click="manageType=4">{{ $t("agentMember.am20")}}</div><!--提现记录-->
        <div :class="{active: manageType=='5'}" @click="manageType=5">{{ $t("agentMember.am18")}}</div><!--投注明细-->
        <!-- <div > -->
      </div>
      <span class="shaixuan-room" @click="changsearch()">筛选<span class="icon-shaixuan" ></span></span>
    </div>
    
    <div class="mui-content" v-if="manageType == '1'">
      <transactions-detaillist :username="this.$route.query.username" :manageTypesearch="this.manageTypesearch"></transactions-detaillist>
    </div>
    <div class="mui-content" v-if="manageType == '2'">
      <memberman-agement :username="this.$route.query.username" :manageTypesearch="this.manageTypesearch"></memberman-agement>
    </div>
    <div class="mui-content" v-if="manageType == '3'">
      <agent-coinList :username="this.$route.query.username" :manageTypesearch="this.manageTypesearch"></agent-coinList>
    </div>
    <div class="mui-content" v-if="manageType == '4'">
      <agent-cashList :username="this.$route.query.username" :manageTypesearch="this.manageTypesearch"></agent-cashList>
    </div>
    <div class="mui-content" v-if="manageType == '5'">
      <betting-detailList :username="this.$route.query.username" :manageTypesearch="this.manageTypesearch"></betting-detailList>
    </div>
    
  </div>
</template>
<script>
import window from "@/mixins/window";
import slist from "@/mixins/list";
// require('../../style/mui/index.less')
import headerComponent from "@/common/Header.vue";
import transactionsDetaillist from './TransactionsdetailList.vue' //交易明细
import membermanAgement from './MembermanAgement.vue' //代理报表
import agentCoinList from './AgentCoinList.vue' //钱包日志
import agentCashList from './AgentCashList.vue' //提现记录
import bettingDetailList from './BettingdetailList.vue' //投注明细
var _this = this;
export default {
  mixins: [window, slist],
  data() {
    return {
      logo: this.$t("agentMember.am24"),
      dataList: [],
      show: false,
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
      vmd: {}
    };
  },
  mounted() {
    this.mPullData();
  },
  components: {
    headerComponent,
    transactionsDetaillist,
    membermanAgement,
    agentCashList,
    agentCoinList,
    bettingDetailList
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
        query: { username: rows.username }
      });
    },
    mJiaoyi(rows) {
      this.$router.push({
        path: "./transactionsdetaillist",
        query: { username: rows.username }
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
    mClose(rows) {},
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
    // this.mReachBottom();
    let from_name = this.$route.query.name
    switch(from_name){
        //代理报表
          case 'MembermanAgement':
                  this.manageType = '2'
              break;
          case 'BettingdetailList':
              this.manageType = '5'
          break;
          case 'agentCashList':
                  this.manageType = '4'
              break;
          case 'agentCoinList':
              this.manageType = '3'
          break;
          default:
                  this.manageType = '1'
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
    border-color: #3d7eff;
    background-color: #3d7eff;
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
  width: 80%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;

  & > div {
    float: left;
    min-width: 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin-right: 60px;
    font-size: 16px;
    // line-height: 35px;
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
.menunav {
  position: fixed;
  width: 100%;
  height: 40px;
  background-color: #fff;
  z-index: 999;
}
.manage-type::-webkit-scrollbar {
  color: #fff;
}
/deep/ .van-dialog {
  width: 300px;
  height: 300px;

  background-image: url("../../assets/images/agent/tangchuang@2x.png");
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
    & > span {
      font-size: 15px;
    }
  }
}
.shaixuan-room {
  top: 10px;
}
</style>

