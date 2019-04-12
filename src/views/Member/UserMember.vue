<template>
  <div id="app">
  </div>
</template>
<script>
import types from "@/store/mutation-types";
import message from "@/mixins/message";
export default {
  mixins: [message],
  data() {
    return { amount: 0, agnetLevel: "", isDraw:false, };
  },
  mounted() {
    // this.mLoading(true);
    // this.$http.get("/memberUser/memberinfo.json").then(result => {
    //   if (result.code == 0) {
    //     this.agnetLevel = result.data.agnetLevel;
    //   }
    // });
    // this.mMemberAmount();
    // this.drawGame();
  },
  computed: {
     // getmobileLogoStyle: function() {
     //    var sysobj = this.$store.getters.getSysPicObj;
     //    if(sysobj.mobileLogo != undefined){
     //    var style = "background:url('"+sysobj.mobileLogo
     //               +"'); background-size:100%; height:70px;width:70px;"
     //                 return style;
     //    }
     // },
  },
  methods: {
    drawGame(){
      this.$http.get('/integralDrawC/queryRouletteSettingSwitch.json').then(result => {
        if (result.data) {
          this.isDraw = result.data;
        }
      })
    },
    mMemberAmount() {
      if (!this.cNeedLogin) {
        this.$http.post("/memberUser/memberamount.json").then(result => {
          if (result.code == 0) {
            this.amount = result.data;
          }
        });
      }
    },
    mLoginOut() {
        //确定要退出账号吗
      this.mConfirm("确定要退出账号吗", () => {
          //请稍等...
        this.mLoading(true, "请稍等...");
        this.$http.post("/logout.json").then(result => {
          if (result.code === 0) {
              //退出成功！
            this.mMessage("退出成功", "success", 0.5);
            sessionStorage.removeItem(types.SESSION_TOKEN);
            this.$store.commit(types.SESSION_TOKEN);
            this.mReLogin();
            this.mLoading(false);
          }
        });
      });
    },
  },
  created(){
    // this.$store.commit('CHANGE_TAB','user')
  }
};
</script>

<style>
/* .el-row {
  height: 98px;
} */
.el-col-8 {
  height: 65px;
}
.HomeWrapper {
  height: auto;
}
.Home-content {
  height: auto;
}
.MemberCentre {
  padding-bottom: 1.4rem;
  height: 100%;
}
.app_view {
  position: initial;
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
  /* position: absolute; */
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
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.MemberBox,
.MemberCentre,
.MemberTitle {
  width: 100%;
  font-size: 0;
}
.MemberCentre {
  padding-bottom: 1.4rem;
}
.MemberCentre a {
  color: #fff;
}
.MemberCentre .el-header {
  padding-top: 0.4rem;
  /*background: url("/static/images/bg.jpg") no-repeat;*/
  background-size: cover;
}
.MemberCentre .G-Mroot {
  margin-top: 4.5rem;
  padding: 14px;
}
.MemberCentre .G-M-NA {
  display: block;
}
.MemberCentre .Hicon {
  background: #545478;
  padding: 0.2rem 6px;
  border-radius: 0.6rem;
  margin: 0 15px;
  padding-bottom: 15px;
}
.MemberCentre .Hicon .Micon {
  margin: 0.4rem 0 0;
}
.MemberCentre .Hicon .text {
  height: 0.5rem;
  line-height: 0.5rem;
  /* font-size: 0.22rem; */
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
}
.MemberCentre .G-MemberCentre-Nav {
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 4rem;
  border-radius: 0.6rem;
  margin-left: 15px;
  margin-right: 15px;
}
.MemberCentre .G-MemberCentre-Nav .logobox {
  position: relative;
}
.MemberCentre .G-MemberCentre-Nav .logobox span {
  right: -35px;
  top: -39px;
  position: absolute;
}
.MemberCentre .G-MemberCentre-Nav .logobox .logoSpan {
  width: 70px;
  height: 70px;
  background-image: url("https://mobile.beike188.com/modelHG/image/icon.png");
  background-repeat: no-repeat;
  background-size: 603px 603px;
  background-color: #33334e;
  background-position: -12px -359px;
  border-radius: 50%;
}
.MemberCentre .G-MemberCentre-Nav .G-MemberCentre-Nav-capital {
  padding: 1rem 1rem 0.3rem;
  margin-top: 33px;
}
.MemberCentre .G-MemberCentre-Nav .G-MemberCentre-Nav-capital .G-M-N-L-sup {
  font-size: 1.3rem;
  line-height: 0.5rem;
  font-weight: 700;
  color: #fff;
}
.MemberCentre .G-MemberCentre-Nav .G-MemberCentre-Nav-capital .Hre {
  height: 2.4rem;
  line-height: 2.4rem;
  font-size: 1rem;
}
.MemberCentre .G-MemberCentre-Nav .G-MemberCentre-Nav-capital .G-M-N-L-sub {
  font-size: 14px;
  line-height: 2.4rem;
  color: #fff;
}
.MemberCentre .G-MemberCentre-Nav .G-MemberCentre-Nav-capital .G-M-N-L {
  position: relative;
  text-align: left;
}
.MemberCentre .G-MemberCentre-Nav .G-MemberCentre-Nav-capital .G-M-N-R {
  text-align: left;
  padding-left: 0.3rem;
}
.MemberCentre .G-MemberCentre-Nav .G-MemberCentre-Nav-capital .G-M-N-L:after {
  content: "";
  position: absolute;
  height: 1.5rem;
  right: 0;
  top: 0.7rem;
  border-right: 1px solid #4a4a4a;
}
.MemberCentre .G-MemberCentre-Nav .G-M-N-lin {
  width: 90%;
  margin: 0 auto;
  height: 0.02rem;
  background-color: #4a4a4a;
}
</style>
