<template>
  <div class="user-member">
    <div class="header">
      <div class="header-left"></div>
      <div class="header-middle">
        个人中心
      </div>
      <div class="header-right">
        <Poptip trigger="click" placement="bottom-end">
          <i class="icon-menu message"></i>
          <ul slot="content">
            <li class="icon-kefu" @click="mOpenCService">
              在线客服
            </li>
            <li class="icon-qq">
              <a v-if="cQQ1" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ1+'&version=1&src_type=web'">
                {{cQQ1}}
              </a>
              <a v-if="cQQ2" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ2+'&version=1&src_type=web'">
                {{cQQ2}}
              </a>
            </li>
            <li class="icon-qq">
              <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'">{{agentQQ}}</a>
            </li>
          </ul>
        </Poptip>
      </div>
    </div>
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
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
      }
    });
    this.mMemberAmount();
    this.drawGame();
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
      })
    },
    cQQ1() {
      let sysInfo = this.$store.getters.getSysInfo;
      this.drawBanner = sysInfo.rouletteSlide;
      this.agentQQ = sysInfo.agentQQ;
      return sysInfo.customQQ ? sysInfo.customQQ : '';
    },
    cQQ2() {
      if (process.env.VUE_APP_ISAPP == 'TRUE') {
        let qq = process.env.VUE_APP_QQ
        return qq ? qq : ''
      }
    },
  },
  created(){
    // this.$store.commit('CHANGE_TAB','user')
  }
};
</script>

<style scoped>

</style>
