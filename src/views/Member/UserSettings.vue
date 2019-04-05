<template>
  <div id="app">
   <div class="publicpage">
    <div class="userSettings publicpage_view">
     <div class="TopHeader">
      <div id="return" style="position: absolute;">
          <router-link :to="{name:'UserMember'}">
            <Icon type="ios-arrow-back" />
            </router-link></div>
         {{ $t('member.userSetting.us1') }}
     </div> <!-- 安全设置-->
     <div class="el-row" style="margin-top: 5px;">
      <div class="el-col el-col-24">
       <div class="grid-content bg-purple-dark">
           <router-link :to="{name:'SafaPassword'}">  {{ $t('member.userSetting.us2') }}
         <div class=" rf"><!--提款密码 -->
          <span v-if="coinPassword==''">{{ $t('member.userSetting.us3') }}</span> <!--未设置 -->
          <span v-else>{{ $t('member.userSetting.us4') }}</span><!-- 已设置-->
          <!---->
          <span class="el-icon-arrow-right" style="padding-left: 8px;"></span>
         </div></router-link>
       </div>
      </div>
     </div>
     <div class="line-w"></div>
     <div class="el-row">
      <div class="el-col el-col-24">
       <div class="grid-content bg-purple-dark">
        <router-link :to="{name:'LoginPassword'}">{{ $t('member.userSetting.us5') }}<span class="el-icon-arrow-right rf"></span></router-link><!-- 登录密码-->
       </div>
      </div>
     </div>
     <!-- <div class="line-w"></div>
     <div class="el-row">
      <div class="el-col el-col-24">
       <div class="grid-content bg-purple-dark">
        <a href="#" class=""> 手机号码
         <div class="rf">
          <span class="el-icon-arrow-right"></span>
         </div></a>
       </div>
      </div>
     </div>  -->
     <div class="line-w"></div>
     <div class="el-row" style="margin-top: 5px;">
      <div class="el-col el-col-24">
       <div class="grid-content bg-purple-dark">
         <router-link :to="{name:'UserBankCard'}"  class="texts">
             {{ $t('member.userSetting.us6') }}
         <div class="rf"><!--银行卡 -->
          <!---->
          <span style="padding-right: 8px;" v-if="vm.drawAccountType == 0">{{ $t('member.userSetting.us7') }}</span> <!-- 尚未绑定-->
          <span style="padding-right: 8px;" v-else>{{ $t('member.userSetting.us8') }}</span> <!--已绑定 -->
          <span class="el-icon-arrow-right"></span>
         </div>
        </router-link>
       </div>
      </div>
     </div>
     <div class="line-w"></div>
    </div>
   </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // data: "",
      vm: {
        drawAccountType: "",
        mobile: ""
      },
      coinPassword: ""
    };
  },
  mounted() {
    this.mLoading(true);
    this.$http.all([this.mGetBanks(), this.mGetBindBank()]).then(
      this.$http.spread((rbanks, rbindbank) => {
        console.log(rbanks.data, rbindbank.data);
        this.mLoading(false);
        if (rbanks.code == 0) {
          this.banktypes = rbanks.data.list;
        } else {
          this.mAlert(rbanks.message, () => {}, "error");
        }
        if (rbindbank.code == 0) {
          this.vm = Object.assign(this.vm, rbindbank.data);
        }
      })
    );
    // this.mLoading(true);
    // this.$http.get("/memberUser/membercoin.json").then(result => {
    //   console.log(result.data);
    //   if (result.data == -1) {
    //     this.data = result.data;
    //   }
    // });
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.coinPassword = result.data.coinPassword;
      }
    });
  },
  methods: {
    mGetBanks() {
      return this.$http.get("/banktypes.json");
    },
    mGetBindBank() {
      return this.$http.get("/memberUser/getbindbank.json");
    }
  }
};
</script>
<style>
.userSettings {
  width: 100%;
  font-size: 0;
}
.userSettings .bg-purple-dark {
  background: #545478;
}
.userSettings .bg-purple-dark .texts,
.userSettings .bg-purple-dark a {
  display: block;
  padding: 18px 10px;
  text-align: left;
  font-size: 14px;
  color: #fff;
}
.el-message .el-icon-error,
.el-message .el-icon-success,
.el-message .el-icon-warning {
  font-size: 14px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.app_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px);
  transform: translate(30px);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px);
  transform: translate(-30px);
}
.Bnner {
  width: 100%;
  overflow: hidden;
}
.Bnner,
.Bnner .swiper-container,
.Bnner .swiper-container .swiper-wrapper,
.Bnner .swiper-container .swiper-wrapper .swiper-slide {
  height: 3rem;
}
.Bnner .swiper-container .swiper-wrapper .swiper-slide img {
  height: 100%;
}
.Home-content {
  width: 100%;
}
img {
  display: inline-block;
}
#somediv {
  width: 100%;
  height: 100%;
  font-size: 0.5rem;
}

.uploadApp {
  position: fixed;
  bottom: 59px;
  right: 3px;
  border: 1px solid #d1dbe5;
  border-radius: 3px;
  color: #409eff;
  font-size: 14px;
  width: 150px;
}
.uploadApp .content {
  line-height: 30px;
  height: 30px;
  background: #fff;
  position: relative;
}
.uploadApp .dowload {
  padding-left: 10px;
}
.uploadApp .content:after {
  content: " ";
  position: absolute;
  left: 62px;
  bottom: -10px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0;
  border-color: #fff transparent transparent;
}
.App-box {
  position: fixed;
  bottom: 105px;
  height: 150px;
  width: 100%;
  font-size: 15px;
}
.App-box .in-center {
  width: 95%;
  margin: 0 auto;
  background: #fff;
  height: 160px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #d1dbe5;
}
.App-box .title {
  width: 100%;
  padding: 8px;
  color: #fff;
  background: #33334e;
  border-radius: 5px;
  text-align: left;
}
.App-box .text {
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}
.App-box .load {
  padding: 3px 7px;
  font-size: 14px;
  color: #fff;
  margin-right: 15px;
  border-radius: 3px;
  background: linear-gradient(90deg, #a01f0a, #e91e1e);
  -webkit-animation: gradientChange 2s infinite;
  animation: gradientChange 2s infinite;
}
@-webkit-keyframes gradientChange {
  to {
    background: linear-gradient(90deg, #e91e1e, #6f27b0);
  }
}
@keyframes gradientChange {
  to {
    background: linear-gradient(90deg, #e91e1e, #6f27b0);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.publicpage_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px);
  transform: translate(30px);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px);
  transform: translate(-30px);
}
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
</style>
