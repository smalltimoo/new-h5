<template>
  <div class="footer">
    <ul ref="tabs">
      <li :class="{active: tab=='Home'}" @click="changeTab('Home')">
        <!-- <i class="icon icon-home"></i> -->
        <lottie
          :options="Home_options"
          class="icon icon-home"
          :isStopped="state.state_home"
          @animCreated="handleAnimation($event,'Home')"
        />
        <div>{{$t('pageFooter.home')}}</div>
      </li>
      <li :class="{active: tab=='Discount'}" @click="changeTab('Discount')">
        <!-- <i class="icon icon-activity"></i> -->
        <lottie
          :options="Discount_options"
          class="icon icon-activity"
          @animCreated="handleAnimation($event,'Discount')"
        />
        <div>{{$t('pageFooter.discount')}}</div>
      </li>
      <li :class="{active: tab == 'Score'}" @click="changeTab('Score')">
        <!-- <i class="icon icon-score"></i> -->
        <lottie
          :options="Score_options"
          class="icon icon-score"
          @animCreated="handleAnimation($event,'Score')"
        />
        <div class="score">{{$t('pageFooter.score')}}</div>
      </li>
      <li :class="{active: tab=='OnlineDeposit'}" @click="changeTab('OnlineDeposit')">
        <!-- <i class="icon icon-deposit"></i> -->
        <lottie
          :options="OnlineDeposit_options"
          class="icon icon-deposit"
          @animCreated="handleAnimation($event,'OnlineDeposit')"
        />
        <div>{{$t('pageFooter.onlineDeposit')}}</div>
      </li>
      <li :class="{active: tab=='UserMember'}" @click="changeTab('UserMember')">
        <!-- <i class="icon icon-user"></i> -->
        <lottie
          :options="UserMember_options"
          class="icon icon-user"
          @animCreated="handleAnimation($event,'UserMember')"
        />
        <div>{{$t('pageFooter.memberCenter')}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
import lottie from "vue-lottie";
import * as animationData from "@/assets/footeranimate/shouye.json";
import * as animationData2 from "@/assets/footeranimate/huodong.json";
import * as animationData3 from "@/assets/footeranimate/shangcheng.json";
import * as animationData4 from "@/assets/footeranimate/qianbao.json";
import * as animationData5 from "@/assets/footeranimate/wode.json";

export default {
  name: "PageFooter",
  data() {
    return {
      showDownApp: true,
      state: { state_home: true },
      prevtab: null,
      Home_options: {
        animationData: animationData.default,
        loop: false,
        autoplay: false
      },
      Discount_options: {
        animationData: animationData2.default,
        loop: false,
        autoplay: false
      },
      Score_options: {
        animationData: animationData3.default,
        loop: false,
        autoplay: false
      },
      OnlineDeposit_options: {
        animationData: animationData4.default,
        loop: false,
        autoplay: false
      },
      UserMember_options: {
        animationData: animationData5.default,
        loop: false,
        autoplay: false
      },
      animationSpeed: 0.5
    };
  },
  components: {
    lottie
  },
  computed: {
    ...mapState({
      tab: state => state.common.tab
    }),
    cNeedLogin() {
      return this.$store.getters.getNeedLogin;
    }
  },
  mounted() {
    this.animateTab(this.tab);
    // this.mMemberAmount()
  },
  methods: {
    changeTab(tab) {
      this.$store.commit("CHANGE_TAB", tab);
      this.$router.push({ name: tab });
      // this.anim = this[tab+'_options']
      this.animateTab(tab);
      // console.info(this.anim)
      // this.anim.autoplay = true;
      // this.anim.play()
      // this.state.state_home = false
    },
    animateTab(tab) {
      this.prevtab && this[`${this.prevtab}_anim`].goToAndStop(0);
      this.prevtab = tab;
      this[`${tab}_anim`].play();
    },
    handleAnimation(...a) {
      this[`${a[1]}_anim`] = a[0];
    },
    mbaiduCount() {
      if (this.$store.getters.getSysPicObj != undefined) {
        var baiduCountCode = this.$store.getters.getSysPicObj.baiduCountCode;
        if (baiduCountCode != undefined && baiduCountCode.length > 0) {
          var hm = document.createElement("script");
          hm.src = baiduCountCode;
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        }
      }
    }
  },
  created() {
    if (this.cNeedLogin == true) {
      this.$http.post("/getLoginUser.json").then(result => {
        if (result.code == 0 && result.data != null) {
          this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
          this.mLoading(false);
          this.mMessage(
            this.$t("mixin.loginSuccess"),
            () => {
              this.$store.dispatch(types.COMMON_GONGGAO, this);
              this.$router.push({ name: "Home" });
            },
            "success",
            0.5
          );
        }
      });
    }

    this.mbaiduCount();
  }
};
</script>
