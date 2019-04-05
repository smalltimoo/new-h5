import { dateFormat } from "../utils/util";
import types from "../store/mutation-types";
import alert from "../mixins/alert";
import message from "../mixins/message";
export default {
  mixins: [alert, message],
  computed: {
    cApi: function() {
      // return process.env.VUE_APP_BASE_API;
      return this.$store.getters.getBaseUrl;
    },
    cLoginUser: function() {
      return this.$store.getters.getLoginUser;
    },
    cNeedLogin() {
      return this.$store.getters.getNeedLogin;
    }
  },
  methods: {
    mLoading(visible, content) {
      this.$store.commit(types.UPDATE_LOADING_MODEL_VISIBLE, {
        visible: !!visible,
        content
      });
    },
    mCheckLoginState() {
      this.$store.dispatch(types.LOAD_LOGIN_USER);
      if (this.$store.getters.getNeedLogin) {
        this.$store.dispatch(types.LOGINOUT_USER);
        this.$store.dispatch(types.COMMON_GONGGAO, this);
        if (this.$route.name !== "Reg") {
          this.$router.push({ name: "Home" });
        }
      }
    },
    mReLogin() {
      if (process.env.NODE_ENV == "development") {
        console.log("mReLogin");
      }
      this.mLoading(false);
      this.$store.dispatch(types.LOGINOUT_USER);
      this.mCheckLoginState();
    },
    mRefreshAccountInfo() {
      this.$store.dispatch(types.ACCOUNT_INFO_REFRESH_DATA, true);
    },
    mFormatDate(value, fmt) {
      return dateFormat(value, fmt);
    },
    mOpenCService() {
      let sysInfo = this.$store.getters.getSysInfo;
      if (sysInfo.customUrl) {
        this.$router.push({
          name: "CustomerService",
          params: { aType: "cs", cUrl: sysInfo.customUrl }
        });
      } else {
        this.$store.dispatch(types.SYSTEM_SETTINGS, this);
        this.mAlert("客服正赶来，请刷新后再试..");
      }
    },
    mmLogin(userName, password, vcode) {
      return new Promise((ok, error) => {
        this.$http
          .post("/login.json", {
            username: userName,
            password: password,
            checkcode: vcode
          })
          .then(result => {
            if (result.code == 0) {
              this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
              this.mLoading(false);
              this.mMessage(
                "登陆成功！",
                () => {
                  this.$store.dispatch(types.COMMON_GONGGAO, this);
                  this.$router.push({ name: "Home" });
                },
                "success",
                0.5
              );
              ok(result);
            } else {
              error(result);
            }
          });
      });
    }
  }
};
