<template>
  <div class="main-body shareapp" style="margin-top: 0">
    <header-component :logo="logo" :showIcon="true" :showLogo="true" :jifen="balanceIntegral"></header-component>
    <div class="top bg-lunpan container">
      <div class="_title">
        <span>邀好友</span>
        <span>拿好礼</span>
      </div>
      <div class="chanpin"></div>
      <el-card class="box-card">
        <div class="title">活动流程</div>
        <div class="view">
          <span class="step">1</span>
          <span class="step">2</span>
          <span class="step">3</span>
        </div>
        <div class="text">
          <span class="step">分享邀请链接</span>
          <span class="step">邀请好友下载注册</span>
          <span class="step">获得商品积分</span>
        </div>
      </el-card>
      <el-card class="box-card box-card2">
        <div class="title">
          <span>我的邀请</span>
          <router-link :to="{name:'AssetsOverView'}">
            邀请规则
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </div>
        <div class="usercount" @click="$router.push({name:'sharerecord'})">
          <div class="count_item">
            <span v-if="vm.inviteCount">{{vm.inviteCount}}</span>
            <i class="el-icon-loading" v-else></i>
            <span style="font-size: 12px">成功分享</span>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="count_item">
            <span v-if="vm.giveAmount">{{vm.giveAmount}}</span>
            <i class="el-icon-loading" v-else></i>
            <span>获得积分</span>
          </div>
        </div>
      </el-card>
      <span class="btn" @click="$router.push({name:'sharefri'})">立即分享</span>
    </div>
  </div>
</template>

<script>
var _this;
require("../../assets/lib/jQueryRotate.2.2");
require("../../assets/lib/scroll");
import imgurl1 from "../../assets/images/draw/dianwo@3x.png";
import imgurl_en1 from "../../assets/images/draw/dianwo@3x_en.png";
import imgurl2 from "../../assets/images/draw/guize@2x.png";
import imgurl_en2 from "../../assets/images/draw/guize@2x_en.png";
import headerComponent from "@/common/Header.vue";
export default {
  name: "shareapp",
  data() {
    return {
      vm:{},
      logo: "分享中心",
      drawNewTime: "",
      balanceIntegral: 0
    };
  },
  components: {
    headerComponent
  },
  methods: {
    mInit() {
      // 用户抽奖信息
      this.$http
        .get("/memberUser/getInviteSum.json")
        .then(result => {
          if (result.code == "0") {
            this.vm = result.data;
          }
        });
      // 用户积分信息
      this.$http.get("/memberUser/memberinfo.json").then(result => {
        if (result.code == "0") {
          this.balanceIntegral = parseInt(result.data.integral / 100);
        }
      });
    }
  },
  created() {
    _this = this;
    this.mInit();
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
.main-body {
  background-color: #ffffff;
  overflow-x: hidden;
  // margin-top: -44px;
}

.top {
  // background-color: #2a85ff;
  // padding: 25px 0 20px 0;
  width: 100%;
  background-image: url("~@/assets/images/share/beijing@2x.png");
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // padding: 0 12px;
  ._title {
    width: 100%;
    height: 39px;
    margin-top: 21px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: PingFangSC-Medium;
    font-size: 41px;
    line-height: 24px;
    letter-spacing: 0px;
    color: #3d7eff;
    // box-shadow: 2px 1px 3px 0px
    // 	rgba(35, 35, 35, 0.22);
  }
  .chanpin {
    width: 312px;
    height: 208px;
    margin: 0 auto;
    background-image: url("~@/assets/images/share/chanpin@2x.png");
    background-size: cover;
  }

  /deep/ .box-card {
    width: 346px;
    height: 90px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 3px;
    margin-top: 21px;
    .el-card__body {
      padding: 11px 13px;
    }
    .title {
      height: 18px;
      font-family: PingFangSC-Regular;
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 0px;
      color: #303133;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }
    .view {
      width: 308px;
      height: 6px;
      margin-top: 20px;
      background-color: #3d7eff;
      border-radius: 3px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .step {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        width: 19px;
        height: 19px;
        background-color: #2668ec;
        font-size: 15px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .text {
      width: 308px;
      height: 12px;
      margin-top: 16px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .step {
        font-size: 12px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #909399;
      }
    }
  }
  /deep/ .box-card2 {
    height: 104px;
    .title {
      a{
        font-size: 15px;
	line-height: 24px;
	letter-spacing: 0px;
	color: #909399;
      }
    }
  }
  .btn {
    width: 346px;
    height: 49px;
    text-align: center;
    background-color: #3d7eff;
    margin-top: 14px;
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 15px;
    line-height: 49px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .usercount {
    width: 100%;
    height: 77px;
    // margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;

    & > .count_item {
      height: 100%;
      width: 33%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      flex-direction: column;

      span:nth-child(2) {
        font-size: 15px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #909399;
      }

      span:nth-child(1) {
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #3d7eff;
      }
    }
  }
  /deep/ .el-divider--vertical {
    height: 2.5em;
}
}
</style>
