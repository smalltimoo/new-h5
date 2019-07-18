<template>
  <div class="main-body shareapp" style="margin-top: 0">
    <header-component :logo="logo" :showIcon="true" :showLogo="true" :jifen="balanceIntegral"></header-component>
    <div class="top bg-lunpan">
      <div class="chanpin"></div>
      <div class="panel">
        <span class="link">我的邀请码&nbsp;&nbsp;{{tid}}</span>
        <span class="link">下载地址&nbsp;&nbsp;{{downloadurl}}</span>
        <span class="btn" @click="$router.push({name:'sharefri'})">一键复制</span>
        <span style="margin-top:-10px;" @click="$router.push({name:'sharerecord'})">
          点击查看邀请记录
          <!-- <img src="../../assets/images/share/jiantou@2x.png" height="10" alt> -->
        </span>
      </div>
      <div class="tips">
        <div class="title">{{$t('share.od16')}}</div>
        <div>{{$t('share.od17')}}</div>
        <div>{{$t('share.od18')}}"</div>
        <div>{{$t('share.od43')}}</div>
        <div>{{$t('share.od44')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
var _this;
import headerComponent from "@/common/Header.vue";
import { mapState } from "vuex";
export default {
  name: "sharefri",
  data() {
    return {
      vm: {},
      logo: "分享好友",
      balanceIntegral: 0,
      tid:Number,
      downloadurl:''
    };
  },
  components: {
    headerComponent
  },
  computed: {
    ...mapState({
      sysPicObj: state => state.common.sysPicObj,
      lang: state => state.common.lang
    })
  },
  methods: {
    mInit() {
      this.$http.get("/memberUser/getInviteSum.json").then(result => {
        if (result.code == "0") {
          this.vm = result.data;
        }
      });
      this.$http.get("/memberUser/memberinfo.json").then(result => {
        if (result.code == "0") {
          this.balanceIntegral = parseInt(result.data.integral / 100);
          this.tid = result.data.id
        }
      });
    },
    getDownLoadUrl(){
      this.$http.get("/sysImage/queryAppVersion.json").then(result => {
              if (result.code == "0") {
                this.downloadurl = result.data;
              }
            });
    }
  },
  created() {
    _this = this;
    this.mInit();
    this.getDownLoadUrl();
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
  width: 320px;
  margin: 0 auto 100px;
  // background-image: url("~@/assets/images/share/beijing@2x.png");
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // padding: 0 12px;
  .chanpin {
    width: 100%;
    height: 350px;
    margin: 0 auto;
    background-image: url("~@/assets/images/share/xinfeng@2x.png");
    background-size: cover;
  }
  .panel {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 180px;
    flex-direction: column;
    .link {
      color: #3d7eff;
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
  .tips {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    padding: 0 10px;
    line-height: 24px;

    & > div {
      width: 100%;
      text-align: left;
      font-size: 12px;
    }
    .title {
      color: #1a1a1a;
      font-size: 14px;
    }
  }
}
</style>
