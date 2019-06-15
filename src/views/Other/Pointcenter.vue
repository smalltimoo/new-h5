<template>
  <div class="checkin">
    <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      <section class="info">
        <div class="info_left">
          <span class="count">8888.00</span>
          <div>
            <span>我的积分</span>
            <el-divider direction="vertical"></el-divider>
            <span>
              今日已领取
              <font style="color:#317cfd">303</font>积分
            </span>
          </div>
        </div>
        <span class="btn" @click="mShow = true">签到</span>
      </section>
      <section class="areacard">
        <span>本月漏签&nbsp;2&nbsp;天</span>
        <span>
          补签卡&nbsp;0&nbsp;张
          <span class="rightsanjiao"></span>
        </span>
      </section>
      <section class="calendar">
        <el-calendar>
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{date, data}">
            <p
              :class="data.isSelected ? 'is-selected' : ''"
            >{{ data.day.split('-').slice(2).join('-') }}</p>
          </template>
        </el-calendar>
      </section>
      <section class="rule">
        <h3>活动规则</h3>
        <ul>
          <li v-for="( item, index) in rulelist" :key="index">
            <span></span>{{item}}
          </li>
        </ul>
      </section>
    </div>
    <van-dialog
      v-model="mShow"
      title="签到成功"
     :className="'vanmodal'"
    >
     <star style="margin-top:130px;" :size="48" :score="5"></star>
      <el-divider>已累计签到一天，获得20积分</el-divider>
    </van-dialog>
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";
import star from "@/common/Star.vue"
import StarRate from 'vue-cute-rate';
import types from "@/store/mutation-types";
import { mapState } from "vuex";
export default {
  name: "checkin",
  components: {
    headerComponent,
    star
  },
  computed: {
    ...mapState({
      sysPicObj: state => state.common.sysPicObj,
      callbackUri: state => state.common.callbackUri
    })
  },
  data() {
    return {
      logo: "积分中心",
      mShow:false,
      totalcount:7,
      rulelist:['每天可签到1次，随机2-8积分;','当月累计签到满10天，当日额外赠送20积分;','当月累计签到满20天，当日额外赠送40积分;','当月累计签到满30天，当日额外赠送60积分']
    };
  },
  methods: {},
  created() {
    // this.mInit();
  }
};
</script>
<style lang="less" scoped>
.checkin {
  .container {
    overflow-y:auto;
  }
  .info {
    width: 351px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info_left {
      display: flex;
      flex-direction: column;
      justify-items: center;
      justify-content: space-around;
      .count {
        font-size: 31px;
        color: #303133;
        letter-spacing: -2px;
      }
      & > div {
        color: #909399;
        font-size: 12px;
      }
    }
    span.btn {
      width: 71px;
      height: 29px;
      background-color: #317cfd;
      border-radius: 5px;
      font-size: 13px;
      color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .areacard {
    width: 351px;
    height: 81px;
    margin: 12px auto;
    padding: 0 26px;
    color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: linear-gradient(270deg, #7e6bef 0%, #9e8cff 100%);
    border-radius: 5px;
    .rightsanjiao {
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-left: 10px solid white;
      border-bottom: 6px solid transparent;
      display: inline-block;
      margin-left: 12px;
    }
  }
  .calendar {
    width: 351px;
    height: 327px;
    margin: 20px auto;
    background-color: #ffffff;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    /deep/ .el-calendar__body {
      padding: 0px;
    }
    /deep/ .el-calendar__header{
      border-bottom: 0;
    }
    /deep/ .el-calendar__button-group {
      display: none;
    }
    /deep/ .el-calendar-table td {
      border: none;
    }
    /deep/ .el-calendar-table td.is-selected {
      background-color: #fff;
    }
    /deep/ .el-calendar-table .el-calendar-day {
      padding: 0;
      width: 41px;
      height: 41px;
      background-color: #fff;
      & > p {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        width: 24px;
        border-radius: 50%;
        background: #fff;
        color: #909399;
        font-size: 12px;
        text-align: center;
      }
      .is-selected {
        background-color: #317cfd;
        color: #f5f5f5;
      }
      .miss-selected {
        background-color: #dadada;
        color: #f5f5f5;
      }
    }
  }
  .rule {
    width: 351px;
    margin: 20px auto;
    text-align: left;
    h3 {
      font-size: 16px;
      color: #317cfd;
      margin: 5px 0;
    }
    ul,li{
      font-size: 14px;
      height: 28px;
      color: #606266;
      line-height: 28px;
      list-style: none;
      span {
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: #317cfd;
        border-radius: 50%;
        margin-right: 5px;
        transform: translateY(-50%);
      }
    }
  }
  /deep/ .star-main{
    width: 275px;
    height:33px;
    .icon-heart {
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      color: #dadada;
      border:1px solid #dadada;
    }
    .icon-heart:before {
      content: '1天';
      font-size:12px;
      
    }
    .star-half {
      display: none;
    }
    .star-full {
      margin-right:5px;
    }
    .icon-full {
      color: #317cfd;
      border:1px solid #317cfd;
    }
  }
  /deep/ .vanmodal {
     width:296px;
     height:295px;
      .el-divider--vertical {
      display: inline-block;
      width: 0.5px;
      height: 15px;
      /* margin: 0 0.213333rem; */
      vertical-align: middle;
      position: relative;
      margin-top: -19px;
      font-size: 12px;
      color: #4892ff;
    }
    .el-divider.el-divider--horizontal {
      width: 80%;
      line-height: 0.026667rem;
      margin: 0.64rem auto;
    }
    .el-divider__text.is-center {
      left: 14%;
      transform: translateX(-5%);
      font-size: 12px;
      color: #4892ff;
    }
    .van-button__text {
      display: inline-block;
      width:232px;
      height: 34px;
      line-height: 34px;
      color: #f5f5f5;
      background-color: #4892ff;
      border-radius: 20px;
      text-align: center;
    }
  }
}
</style>
