<template>
  <div class="main-body">
    <div class="header">
      <div class="header-left">
        <Icon type="ios-arrow-back" class="icon-menu" @click.stop="$router.push('/games')"/>
        <span class="logo">{{logo}}</span>
      </div>
      <div class="header-right">
        <el-input
        :placeholder="$t('games.gameList.gameList1')"
        v-model="searchGameKey"
        @change="mSearchGameByKey"
        suffix-icon="el-icon-search"
      >
      </el-input>
        <Poptip trigger="click" placement="bottom-end">
          <i class="icon-menu message"></i>
          <ul slot="content">
            <li class="icon-kefu" @click="mOpenCService">{{$t('customservice')}}</li>
            <li class="icon-qq" :style="{display:cQQ1||cQQ2?'block':'none'}">
              <a
                v-if="cQQ1"
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ1+'&version=1&src_type=web'"
              >{{cQQ1}}</a>
              <a
                v-if="cQQ2"
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ2+'&version=1&src_type=web'"
              >{{cQQ2}}</a>
            </li>
            <li class="icon-agent" v-if="agentQQ">
              <a
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'"
              >{{agentQQ}}</a>
            </li>
            <li class="icon-line" v-if="sysInfo.lineUrl">
              <a
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'"
              >{{sysInfo.lineUrl}}</a>
            </li>
          </ul>
        </Poptip>
      </div>
      
    </div>
    <div id="MG_game" class="MG_game gameThree">
      <div class="game-type">
        <div class="game" @click="gameType =1">
          <span :class="{active:gameType == 1}">游戏({{totalgames}})</span>
        </div>
        <div class="coll" @click="gameType =2">
          <span :class="{active:gameType == 2}">收藏({{collgames}})</span>
        </div>
      </div>
      <div class="A-game-content-wrapper row">
        <div class="el-rows">
          <div
            v-for="(game,index) in games"
            :key="index"
            data-id="sw_888t"
            class="Game"
            v-show="gameType == 1"
          >
            <p class="BgImg">
              <img
                :src="game.prcUrl"
                style="height: 100%;width: 100%;"
                @click="mEnterGame(game.id)"
              >
            </p>
            <p class="text">
              <span>{{game.value}}</span>
              <span class="love" @click="saveGames(game)" :class="{actived:game.collection}"></span>
            </p>
          </div>
          <div
            v-for="(game,index) in sGames"
            :key="index+'label'"
            data-id="sw_888t"
            class="Game"
            v-show="gameType == 2"
          >
            <p class="BgImg">
              <img
                :src="game.prcUrl"
                style="height: 100%;width: 100%;"
                @click="mEnterGame(game.id)"
              >
            </p>
            <p class="text">
              <span>{{game.value}}</span>
              <span
                class="love"
                @click="game.collection = !game.collection"
                :class="{actived:game.collection}"
              ></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var _this;
export default {
  data() {
    return {
      logo: "",
      gameType: "1",
      activeName: "game",
      gameCompanyId: 0,
      gameName: "",
      games: [],
      sGames: [],
      searchGameKey: "",
      totalgames: 0,
      collgames: 0
    };
  },
  mounted() {
    let params = this.$route.params;
    if (params && params.gameCompanyId) {
      sessionStorage.setItem("ep", JSON.stringify(params));
    } else {
      params = JSON.parse(sessionStorage.getItem("ep") || "{}");
    }
    if (params.gameCompanyId) {
      this.gameCompanyId = params.gameCompanyId;
      this.gameName = params.gameName;
      this.mInit();
    } else {
      this.$router.push({ name: "ElectronicGames" });
    }
  },
  methods: {
    mInit() {
      this.$http
        .get("/managerGame/gamePlays.json?id=" + this.gameCompanyId)
        .then(result => {
          if (result.code == 0) {
            this.games = result.data.playlist;
            this.sGames = this.games.filter(item => item.collection);
            this.totalgames = this.games.length;
            this.collgames = this.sGames.length;
          }
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    mEnterGame(gameid) {
      if (this.cNeedLogin) {
        //请先登陆！
        this.mAlert(_this.$t("games.gameList.gameList3"));
        return;
      }
      this.$router.push({
        name: "GameContainer",
        params: { gameCompanyId: this.gameCompanyId, gameId: gameid }
      });
    },
    mSearchGameByKey(k) {
      this.games = [];
      if (k === 0) {
        this.searchGameKey = "";
        this.games = Object.assign([], this.sGames);
      } else {
        this.games = this.sGames.filter(
          g => g.value.indexOf(this.searchGameKey) >= 0
        );
      }
    },
    saveGames(game) {
      let path = !game.collection ? "saveGames" : "removeGames";
      game.collection = !game.collection;
      this.$http
        .post(`/memberUser/${path}.json`, {
          collectGameId: game.gameId,
          collectCompanyGameId: game.gameCompanyId
        })
        .then(result => {
          if (result.code == 0) {
               this.$http
                .post(`/memberUser/collectGameList.json`,{id:this.gameCompanyId}).then(res=>{
                    if(res.code ===0){
                        this.sGames =  res.data;
                        this.collgames = this.sGames.length
                    }
                })
              
            
          }
        });
    }
  },
  watch: {},
  created() {
    _this = this;
  }
};
</script>
<style lang="less" scoped>
.iconfont {
  font-size: 20px;
}
.main-body {
  background-color: #f3f3f3;
}
button {
  display: inline-block;
  width: 26px;
  height: 26px;
  background: url(/static/images/game/search.png) no-repeat;
  background-size: 100% 100%;
  border: none;
  vertical-align: middle;
}

.MG_game {
  min-height: 100%;
  width: 100%;
  /* margin-top: 44px; */
}

.A-search {
  font-size: 0;
  overflow: hidden;
  padding-right: 10px;
  height: 70px;
  padding-top: 15px;
  /* background: #cd0005; */
}

.A-search .A-lf {
  text-align: center;
}

.A-search .A-rf {
  position: relative;
}
.A-rf {
  width: 91.5px;
  height: 21px;
  color: #606266;
  background-color: #f3f3f3;
  border-radius: 10.5px;
}

.A-search .A-rf .A-sousuo-box {
  position: relative;
  width: 200px;
  margin: 0 auto;
  border-radius: 1.25rem;
}

.A-search .A-rf label {
  display: block;
}

.A-search .A-rf label input {
  width: 100%;
  font-size: 14px;
  height: 30px;
  background: #f3f3f3;
  border-radius: 30px;
  color: #fff;
  outline: none;
}

.A-search .A-rf span {
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
  text-align: center;
  color: #fff;
  margin-right: 10px;
}

.A-game-content-wrapper {
  width: 100%;
  margin-top: 50px;
}
.MG_game .Game {
  //   font-size: 0;
  width: 165px;
  height: 182px;
  background-color: #ffffff;
  border-radius: 2px;
  margin-top: 5px;
}

.MG_game .Game .text {
  line-height: 30.5px;
  height: 30.5px;
  font-size: 12px;
  background-color: #fff;
  font-size: 12px;
  letter-spacing: 0.7px;
  color: #606266;
  text-align: center;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
}

.MG_game .Game .BgImg {
  width: 165.5px;
  height: 151.5px;
  border-radius: 3px;
  //   margin: 6px auto 0;
}
.game-type {
  width: 100%;
  height: 60px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 40px;
  background-color: #fff;
  margin-bottom: 40px;
  & > div {
    width: 50%;
    text-align: center;
    span {
      display: inline-block;
    }
    .active {
      color: #3d7eff;
      border-bottom: 2px solid #3d7eff;
      width: 70px;
    }
  }
}
.el-rows {
  width: 351px;
  margin: 0 auto;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .love {
    width: 13px;
    height: 12.5px;
    background: url("~@/assets/images/games/loveNormal.png") center center
      no-repeat;
    background-size: 100% 100%;
  }
  .love.actived {
    background: url("~@/assets/images/games/loveSelected.png") center center
      no-repeat;
    background-size: 100% 100%;
  }
}

/deep/ .el-input--suffix .el-input__inner {
    width: 91.5px;
	height: 21px;
	background-color: #f3f3f3;
	border-radius: 10.5px;
}
</style>

