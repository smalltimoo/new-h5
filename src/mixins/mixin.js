import {
    dateFormat
} from "../assets/lib/util";
import types from "../store/mutation-types";
import alert from "../mixins/alert";
import message from "../mixins/message";
import Clipboard from 'clipboard';

export default {
    mixins: [alert, message],
    data() {
        return {
            leftDrawer: false,
            walletlist: []
        }
    },
    computed: {
        cApi: function () {
            // return process.env.VUE_APP_BASE_API;
            return this.$store.getters.getBaseUrl;
        },
        cLoginUser: function () {
            return this.$store.getters.getLoginUser;
        },
        cLoginUserYue: function () {
            return this.$store.getters.getLoginUserYue
        },
        cNeedLogin() {
            return this.$store.getters.getNeedLogin;
        },
        sysInfo: function () {
            return this.$store.getters.getSysInfo;
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
    methods: {
        changeLocal() {
            // localStorage.setItem("lang", this.$i18n.locale);
            document.documentElement.lang = this.$i18n.locale;
            // window.location.reload();
        },
        quickEnterGame(roomId, gameId, comGameType, gameName) {
            if (comGameType == 5) {
                this.$router.push({
                    name: 'GameList',
                    params: {
                        gameCompanyId: roomId,
                        gameName: gameName,
                    }
                })
            } else {
                this.$router.push({
                    name: 'GameContainer',
                    params: {
                        gameCompanyId: roomId,
                        gameId: gameId,
                        comGameType: comGameType
                    }
                })
            }
        },
        openDrawer() {
            this.leftDrawer = true;
            this.$http.get("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
                }
            });
        },
        goBack() {
            this.$router.back();
        },
        //复制功能
        copy() {
            if (JSON.stringify(this.clipboard)) {
                this.clipboard.destroy()
            }
            this.clipboard = new Clipboard('.clipboard');
            this.clipboard.on('success', () => {
                this.$Message.success(this.$t('mixin.alreadyCopy'));
            })
            this.clipboard.on('error', function (e) {})
        },
        mLoading(visible, content) {
            this.$store.commit(types.UPDATE_LOADING_MODEL_VISIBLE, {
                visible: !!visible,
                content
            });
        },
        toNeedLogin() {
            if (this.cNeedLogin) {
                this.mConfirm(this.$t('mixin.pleaseLogin'), () => {
                    this.$router.push({
                        name: 'Login'
                    })
                })
                return false
            } else {
                return true
            }
        },
        mCheckLoginState() {
            this.$store.dispatch(types.LOAD_LOGIN_USER);
            if (this.$store.getters.getNeedLogin) {
                this.$store.dispatch(types.LOGINOUT_USER);
                this.$store.dispatch(types.COMMON_GONGGAO, this);
                if (this.$route.name !== "Login" && this.$route.name !== "Home" && this.$route.name !== "Score" && this.$route.name !== "Discount" && this.tab !== "Score") {
                    this.mConfirm(this.$t('mixin.pleaseLogin'), () => {
                        this.$router.push({
                            name: 'Login'
                        })
                    })
                }
            } else {
                this.$router.push({
                    name: this.tab
                })
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
                    params: {
                        aType: "cs",
                        cUrl: sysInfo.customUrl
                    }
                });
            } else {
                this.$store.dispatch(types.SYSTEM_SETTINGS, this);
                this.mAlert(this.$t('mixin.refresh'));
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
                            this.mgetToalCoin();
                            this.mLoading(false);
                            this.mMessage(
                                this.$t('mixin.loginSuccess'),
                                () => {
                                    this.$store.dispatch(types.COMMON_GONGGAO, this);
                                    this.$router.push({
                                        name: "Home"
                                    });
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
        },
        mgetToalCoin() {
            return this.$http.post("/memberUser/memberamount.json")
        },
        mGetCoin() {
            this.mLoading(true);
            this.$http
                .post("/managerGame/getWalletCoins.json")
                .then(result => {
                    this.walletlist = result.data.walletlist;
                })
                .catch(err => {
                    console.info(this.$t("member.userMember.um24")); //获取余额失败
                });
        },
    }
};