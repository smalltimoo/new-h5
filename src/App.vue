<template>
  <div id="app">
    <router-view></router-view>
    <Modal
      v-model="winVisible"
      @on-visible-change="mWinVisibleChange"
      :width="cWinDialog.width"
      class-name="vertical-center-modal"
      :closable="true"
      :mask-closable="false"
      class="model-alert"
    >
      <div slot="header" v-text="cWinDialog.title"></div>
      <component
        :is="cWinDialog.view"
        v-if="cWinDialog.view!=''"
        @callback="cWinDialog.callback"
        @closecallback="cWinDialog.onclose"
        :param-data="cWinDialog.paramData"
      ></component>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import types from "@/store/mutation-types";
import win from "@/mixins/window";

export default {
  name: "App",
  data: () => ({
    winVisible: false,
    onLine: navigator.onLine,
    walletlist:[]
  }),
  mixins: [win],
  components: {},
  computed: {
    GameTransferState: function() {
      return this.$store.state.app.GameTransferState;
    },
    loginState: function() {
      return this.$store.state.app.loginState;
    },
    theme: function() {
      return this.$store.getters.getTheme;
    },
    cLoadingDialog: function() {
      return this.$store.getters.getLoadingModel;
    },
    cWinDialog: function() {
      this.winVisible = this.$store.getters.getWinModel.visible;
      return this.$store.getters.getWinModel;
    }
  },
  watch: {
    theme: {
      handler(newName, oldName) {
        if (newName == 1) {
          document.body.classList.remove("pink");
          document.body.classList.add("dark");
        } else if (newName == 2) {
          document.body.classList.remove("dark");
          document.body.classList.add("pink");
        } else {
          document.body.classList.remove("dark");
          document.body.classList.remove("pink");
        }
      },
      immediate: true
    }
  },
  methods: {
    mWinVisibleChange(v) {
      if (!v) {
        this.mWinClose();
      }
      
    },
    alertDownloadApp() {
      this.$http
        .post("/memberUser/isPopups.json", { isPopups: true })
        .then(result => {
          if (result.code == 0) {
            if (result.data.list && result.data.list.length > 0) {
              this.alert = result.data.list[0];
              this.$alert(this.alert.msgInfo, this.alert.msgTitle, {
                dangerouslyUseHTMLString: true
              });
            }
          }
        });
    },
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
      if(!this.onLine){
          this.$router.push({name:'404',params:{type:'network'}})
      }
    },
    mGetCoin() {
      this.mLoading(true);
      this.$http
        .post("/managerGame/getWalletCoins.json")
        .then(result => {
         sessionStorage.setItem("walletcoinsList", JSON.stringify(result.data.walletlist));
        })
        .catch(err => {
          console.info(this.$t("member.userMember.um24")); //获取余额失败
        });
    },
  },
  mounted() {
    this.alertDownloadApp();
    // 监听网络状态
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
    this.$nextTick((vm)=>{
      console.info(111)
      this.mGetCoin()
    })
  },
  created() {
    this.$store.commit(types.SESSION_TOKEN);
    this.$store.commit(types.CHANGE_URL, "");
    this.$store.dispatch(types.SYSTEM_SETTINGS, this);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  }
};
</script>
