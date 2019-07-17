<template>
  <div class="main-body shareapp" style="margin-top: 0">
    <!-- <header-component :logo="logo" :showIcon="true" :showLogo="true" :jifen="balanceIntegral"></header-component> -->
    <div class="header hasApp">
      <div class="header-left">
        <Icon type="ios-arrow-back" class="icon-menu" @click.stop="goBack"/>
        <span class="logo">{{logo}}</span>
      </div>
      <div class="header-right">
        <div class="yue">积分:{{balanceIntegral}}</div>
        <span class="shaixuan-room" @click="showSearch = !showSearch">
          筛选
          <span class="icon-shaixuan"></span>
        </span>
      </div>
    </div>
    <div class="container">
      <div class="usercount usercount1">
        <div class="count_item">
          <span style="color:#303133">分享总收益</span>
          <span v-if="vm.giveAmount!=undefined" style="color:#3d7eff;font-size:60px">{{(vm.giveAmount/100).toFixed(2)}}</span>
          <i style="color:#3d7eff;font-size:60px" class="el-icon-loading" v-else></i>
        </div>
      </div>
      <div class="usercount">
        <div class="count_item">
          <span style>今日分享人数</span>
          <span v-if="vm.dayInviteCount!=undefined">{{vm.dayInviteCount}}</span>
          <i class="el-icon-loading" v-else></i>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="count_item">
          <span>总分享人数</span>
          <span v-if="vm.inviteCount!=undefined">{{vm.inviteCount}}</span>
          <i class="el-icon-loading" v-else></i>
        </div>
      </div>
      <p class="tip">温馨提示：所有积分收益在第二天早上9点后即可查到</p>
      <section class="el-container is-vertical" v-show="showSearch">
        <div class="searchVm">
          <div class="time">
            <input
              type="text"
              v-model="searchVm.startDate"
              readonly
              @input="mSearch"
              @click="showDatePicker($event,0)"
            >
            <font>~</font>
            <input
              type="text"
              v-model="searchVm.endDate"
              readonly
              @input="mSearch"
              @click="showDatePicker($event,1)"
            >
          </div>

          <div class="buttons">
            <el-button
              class="btns"
              :class="activeClass == index ? 'active':''"
              v-for="(item,index) in pickerOptions.shortcuts"
              :key="index"
              @click="clickBtn(item.value,index)"
            >{{item.text}}</el-button>
          </div>
        </div>
      </section>
      <section class="rooms">
        <div class="pri" v-for="(item,index) in userList" :key="index">
          <div class="pri_img">
            <img :src="getpaysrc('shiyuan')" alt height="18px">
          </div>
          <div class="pri_cant">
            <div class="pri_main">
              <p class="pri_title">{{item.username}}</p>
              <p class="pri_desc">当前等级{{item.memberLevelName}}</p>
            </div>
            <span >{{(item.memberGiveAmount/100).toFixed(2)}}积分</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
var _this;
let currenttime;
import headerComponent from "@/common/Header.vue";
import {betweenday} from '@/global'
export default {
  name: "sharefri",
  data() {
    return {
      vm: {},
      logo: "分享记录",
      showSearch: false,
      balanceIntegral: 0,
      activeClass: -1,
      searchVm: {
        startDate: "",
        endDate: "",
      },
      userList: [],
      prilist: [
        {
          title: "签到",
          desc: "连续签到可获得积分",
          img: "shiyuan",
          type: 0,
          routeName: "checkin"
        },
        {
          title: "打码",
          desc: "打码越多，赠送积分越多",
          img: "qukuan",
          type: 0,
          routeName: "checkin"
        },
        {
          title: "推荐我们",
          desc: "成功推荐一位即可获得500积分",
          img: "lihe",
          type: 0,
          routeName: "checkin"
        },
        {
          title: "完善资料",
          desc: "完善资料可获得积分",
          img: "lihe",
          type: 0,
          routeName: "checkin"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            value: 0
          },
          {
            text: "最近三天",
            value: 3
          },
          {
            text: "最近一周",
            value: 7
          },
          {
            text: "最近一个月",
            value: 30
          }
        ]
      }
    };
  },
  components: {
    headerComponent
  },
  methods: {
    mInit() {
      [this.searchVm.startDate,this.searchVm.endDate] = betweenday()
      // 用户抽奖信息
      this.$http.get("/memberUser/getInviteSum.json").then(result => {
        if (result.code == 0) {
          this.vm = result.data;
        }
      });
      // 用户积分信息
      this.$http.get("/memberUser/memberinfo.json").then(result => {
        if (result.code == "0") {
          this.balanceIntegral = parseInt(result.data.integral / 100);
        }
      });
    },
    mSearch() {
      console.info('alert')
      this.$http
        .post("/memberUser/getInviteMembers.json", this.searchVm)
        .then(result => {
          if (result.code == 0) {
            this.userList = result.data.userList;
          }
        });
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
          format: { year: "YYYY", month: "MM", date: "DD" }
        });
      }
      this.datePicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      // console.info(date, selectedVal, selectedText);
      if (currenttime == 1) {
        this.searchVm.endDate = selectedVal.join("-");
      } else {
        this.searchVm.startDate = selectedVal.join("-");
      }
      this.mSearch();
      // this.$set(this.searchVm.time, currenttime, selectedVal.join("-"));
    },
    clickBtn(value, index) {
      this.activeClass = index;
      const end = new Date();
      const start = new Date();
      // start = ();
      this.searchVm.startDate = this.getMyDate(
        start.getTime() - 3600 * 1000 * 24 * value
      );
      this.searchVm.endDate = this.getMyDate(end);
      // let picker = this.$refs.time.$options;
      // start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
      // picker.$emit('pick', [start, end]);
    },
    getpaysrc(a) {
      return require(`@/assets/images/membercentre/${a}@2x.png`);
    }
  },
  created() {
    _this = this;
    this.mInit();
    this.mSearch();
  },
  beforeDestroy: function() {
    $(".HomeWrapper").removeClass("bg-color");
  }
};
</script>
<style>
.bg-color {
  background-color: #ffffff;
}
</style>
<style scoped lang="less">
.header-right {
  .yue {
    margin-right: 80px;
  }
}
.main-body {
  background-color: #ffffff;
  overflow-x: hidden;
  // margin-top: -44px;
}
.usercount {
  width: 283px;
  margin: 0 auto;
  height: 90px;
  // margin-top: 15px;
  display: flex;
  font-size: 14px;
  color: #909399;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  & > .count_item {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;

    span:nth-child(1) {
      // font-size: 15px;
      line-height: 24px;
      letter-spacing: 0px;
      color: #909399;
    }

    span:nth-child(2) {
      // font-size: 24px;
      line-height: 24px;
      letter-spacing: 0px;
      color: #303133;
    }
  }
}
.usercount1 {
  justify-content: center;
  height: 120px;
  .count_item {
    justify-content: space-around;
  }
}
/deep/ .el-divider--vertical {
  height: 2.5em;
}
.tip {
  font-size: 12px;
  color: #909399;
  margin-bottom: 10px;
}
.pri {
  width: 315px;
  height: 64px;
  align-items: center;
  margin: 0 auto;
  display: flex;
  border-bottom: 1px solid #f3f3f3;
  .pri_img {
    width: 40px;
    text-align: left;
  }
  & > div {
    display: flex;
    width: 275px;
    justify-content: space-between;
    align-items: center;
    .pri_main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .pri_title {
        font-size: 15px;
        color: #606266;
      }
      .pri_desc {
        font-size: 12px;
        color: #909399;
      }
    }
    .btnl {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 20px;
      background-image: linear-gradient(
        270deg,
        #4699ff 0%,
        #53a9fc 47%,
        #5fb9f9 100%
      );
      border-radius: 10px;
      font-size: 10px;
      color: #f5f5f5;
    }
  }
}
.searchVm { padding-top:10px;
  width: 325px;
  margin: 0 auto;
  display: flex;
  // padding: 10px;
  flex-wrap: wrap;
  justify-content: space-between;

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
      width: 90px;
      background-color: #ededed;
      height: 34px;
    }
  }
  /deep/ .time {
    width: 100%;
    height: 34px;
    background-color: #ededed;
    input {
      width: 150px;
      background-color: #ededed;
    }
  }
  .buttons{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
