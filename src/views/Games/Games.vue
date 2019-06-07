<template>
  <div class="games">
    <header-component :logo="logo" :showIcon="true" :showLogo="false"></header-component>
    <div class="game-center">
      <div
        class="hot"
        :class="{active: gameType=='0'}"
        @click="gameType=0"
      >{{ $t('games.gameTabs.game1')}}</div>
      <div class="game-type">
        <div :class="{active: gameType=='2'}" @click="gameType=2">{{ $t('games.gameTabs.game2')}}</div>
        <div :class="{active: gameType=='1'}" @click="gameType=1">{{ $t('games.gameTabs.game3')}}</div>
        <div :class="{active: gameType=='4'}" @click="gameType=4">{{ $t('games.gameTabs.game4')}}</div>
        <div :class="{active: gameType=='6'}" @click="gameType=6">{{ $t('games.gameTabs.game6')}}</div>
        <div
          :class="{active: gameType=='5'}"
          @click="gameType=5"
          v-if="Object.values(companyCustomGames).filter(item=>item.typeId==5).length>0"
        >{{ $t('games.gameTabs.game5')}}</div>
        <div
          :class="{active: gameType=='7'}"
          @click="gameType=7"
          v-if="Object.values(companyCustomGames).filter(item=>item.typeId==7).length>0"
        >{{ $t('games.gameTabs.game4')}}</div>
        <div
          :class="{active: gameType=='50'}"
          @click="gameType=50"
          v-if="Object.values(companyCustomGames).filter(item=>item.typeId==50).length>0"
        >{{ $t('games.gameTabs.game6')}}</div>
      </div>
      <div class="game-rooms">
        <div
          v-for="(game, index) in selectedGames"
          :key="index"
          @click="mEnterGame(game.gameId==601?301:game.gameId,game.typeId==50?0:((game.gameId==601||(game.gameId==301&&game.typeId==6))?'ws00':''),game.typeId,game.gameName,game.gameCompanyId)"
        >
          <img :src="game.mobileImg" width="100%"  v-if="game.mobileImg">
          <div class="img-error" style="height: 105px;" v-else></div>
          <div class="game-text">
              <div class="game_text_left">
                  <span v-text="game.gameName"></span>
                  <span v-text="game.typeName"></span>
              </div>
              <div class="game_text_right">
                  <span >立即进入</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let _this;
import { mapState } from "vuex";
import message from "@/mixins/message";
import types from "@/store/mutation-types";
import headerComponent from "@/common/Header.vue";

function StartGameForIframe(gameId) {
  _this.mEnterGame(gameId);
}

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  if (event.data == "StartGameForIframe101") {
    StartGameForIframe(101);
  }
}

export default {
  name: "Home",
  mixins: [message],
  components: {
    headerComponent
  },
  data() {
    return {
      options: [
        {
          value: "zh",
          label: "简体中文"
        },
        {
          value: "th",
          label: "ไทย"
        }
      ],
      logo:'',
      showApp: true,
      gameType: 0,
      isDraw: false,
      agentQQ: "",
      lunBoTus: [],
      activities: [],
      drawBanner: "",
      companyCustomGames: [],
      alert: {}
    };
  },
  computed: {
    ...mapState({
      theme: state => state.common.theme,
      sysPicObj: state => state.common.sysPicObj
    }),
    selectedGames() {
      return Object.values(this.companyCustomGames).filter((item ,idx) => {
          if(idx<20) item.mobileImg = require(`@/assets/images/games/${idx}.png`)
        if (this.gameType == 0) {
          return item.state == 3 || item.state == 2;
        } else if (this.gameType == 2) {
          return item.typeId == 2 || item.typeId == 3;
        } else {
          return this.gameType == item.typeId;
        }
      });
    },
    cGongGaos() {
      return this.$store.getters.getGonggaos;
    },
    getBanner() {
      var mobileBanner = this.$store.getters.getSysPicObj.mobileBanner;
      var banner = [];
      if (mobileBanner != undefined && mobileBanner != "") {
        let bs = mobileBanner.split(",");
        bs.map(item => {
          banner.push({ imgUrl: item });
        });
      }
      return banner;
    },
    cQQ1() {
      let sysInfo = this.$store.getters.getSysInfo;
      this.drawBanner = sysInfo.rouletteSlide;
      this.agentQQ = sysInfo.agentQQ;
      return sysInfo.customQQ ? sysInfo.customQQ : "";
    },
    cQQ2() {
      if (process.env.VUE_APP_ISAPP == "TRUE") {
        let qq = process.env.VUE_APP_QQ;
        return qq ? qq : "";
      }
    }
  },
  methods: {
    changeTheme(theme) {
      this.$store.commit(types.THEME, theme);
    },
    drawGame() {
      this.$http
        .get("/integralDrawC/queryRouletteSettingSwitch.json")
        .then(result => {
          if (result.data) {
            this.isDraw = result.data;
            if (this.isDraw) {
              this.getBanner.push({
                imgUrl: this.drawBanner,
                isDraw: this.isDraw
              });
            }
          }
        });
    },
    mEnterGame(roomId, gameId, comGameType, gameName, gameCompanyId) {
      console.info(12);
      if (!this.toNeedLogin()) {
        return;
      }
      if (!roomId) {
        roomId = 0;
      }
      if (!gameId) {
        gameId = 0;
      }
      if (!comGameType) {
        comGameType = "";
      }

      // OG和AG会出现域名跳转问题 ios下有问题。
      if (comGameType != 5 && (gameCompanyId == 100 || gameCompanyId == 103)) {
        this.$http
          .post("/managerGame/getMemberGameUrl.json", {
            gameCompanyId: roomId,
            comGameType: comGameType,
            username: this.cLoginUser.username
          })
          .then(result => {
            if (result.code == 0) {
              let gameUrl = result.data.dgUrl.mobileUrl;
              window.location.href = gameUrl;
            } else {
              this.$Message.error(result.message);
            }
          })
          .catch(error => {
            this.$Message.error(_this.$t("games.gameContainer.gameContainer3"));
          });

        return;
      }

      if (comGameType == 5) {
        this.$router.push({
          name: "GameList",
          params: {
            gameCompanyId: roomId,
            gameName: gameName
          }
        });
      } else {
        this.$router.push({
          name: "GameContainer",
          params: {
            gameCompanyId: roomId,
            gameId: gameId,
            comGameType: comGameType
          }
        });
      }
    },
    allGame() {
      this.$http
        .post("/gamesbytype.json", { playType: -1, state: 1, sysId: 0 })
        .then(result => {
          if (result.code == 0) {
            this.companyCustomGames = Object.assign(
              {},
              result.data.companyCustomGames
            )
          }
        });
    },
    activity() {
      this.$http.post("/activities.json", { sysId: 0 }).then(result => {
        if (result.code == 0) {
          this.activities = Object.assign({}, result.data.activityVoList);
        }
      });
    },
    closeApp() {
      this.showApp = false;
      localStorage.setItem("showApp", "false");
    }
  },
  created() {
    _this = this;
    this.$store.commit("CHANGE_TAB", "Home");
    this.showApp = localStorage.getItem("showApp") ? false : true;
    // this.init();
    this.drawGame();
    this.allGame();
    // this.activity();

    window.onscroll = function() {
      let scrollheight =
        document.body.scrollTop == 0
          ? document.documentElement.scrollTop
          : document.body.scrollTop;
      if (scrollheight >= 44) {
        document.querySelector(".header").style.position = "fixed";
        if (_this.sysPicObj.appUrl && _this.showApp) {
          document.querySelector(".header").style.marginTop = "0";
          document.querySelector(".get-app")
            ? (document.querySelector(".get-app").style.display = "none")
            : null;
        } else {
          document.querySelector(".header").style.marginTop = "0";
        }
      } else {
        if (_this.sysPicObj.appUrl && _this.showApp) {
          document.querySelector(".header").style.position = "inherit";
          document.querySelector(".header").style.marginTop = "5px";
          document.querySelector(".get-app").style.display = "flex";
        } else {
          document.querySelector(".header").style.position = "fixed";
          document.querySelector(".header").style.marginTop = "0";
        }
      }
    };
  },
  destroyed() {
    _this = undefined;
    window.onscroll = function() {
      if (document.querySelector(".header")) {
        document.querySelector(".header").style.position = "fixed";
        document.querySelector(".header").style.marginTop = "0";
      }
    };
  }
};
</script>

