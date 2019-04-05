<template>
  <div class="publicpage">
    <div id="MG_game" class="MG_game gameThree publicpage_view">
      <div ref="TopHeader" class="TopHeader">
        <div id="return" style="position: absolute;">
          <router-link :to="{name:'ElectronicGames'}">
            <Icon type="ios-arrow-back"/>
          </router-link>
        </div>
        {{this.gameName}}
      </div>
      <div class="row A-search">
        <div class="col-6 A-lf">
          <img src="https://mobile.beike188.com/modelHG/Home/swgame.png" alt style="width: 100%;">
        </div>
        <div class="col-6 A-rf" style="padding-top: 1.6rem;">
          <div class="A-sousuo-box">
            <label for="sousuo">
              <input
                @change="mSearchGameByKey"
                v-model="searchGameKey"
                type="text"
                :placeholder="$t('games.gameList.gameList1')"
              ><!--搜索 -->
            </label>
            <span class="iconfont">
              <Icon type="ios-search"/>
            </span>
          </div>
        </div>
      </div>
      <div class="A-game-content-wrapper" style="display: none;">
        <p class="A-title">
          <span class="iconfont A-re icon-ziyuan"></span>
        </p>
        <div class="el-row"></div>
      </div>
      <div class="A-game-content-wrapper row">
        <p class="A-title">{{ $t('games.gameList.gameList2')}}</p><!-- 游戏列表-->
        <div class="el-row">
          <div
            v-for="(game,index) in games"
            :key="index"
            class="el-col el-col-24 el-col-xs-8 el-col-sm-6 el-col-md-4 el-col-lg-2 el-col-xl-1"
          >
            <div data-id="sw_888t" class="Game" @click="mEnterGame(game.id)">
              <p class="text">{{game.value}}</p>
              <p class="BgImg">
                <img :src="game.prcUrl" style="height: 100%;width: 100%;">
              </p>
            </div>
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
      gameCompanyId: 0,
      gameName: '',
      games: [],
      searchGameKey: ''
    }
  },
  mounted() {
    let params = this.$route.params
    if (params && params.gameCompanyId) {
      sessionStorage.setItem('ep', JSON.stringify(params))
    } else {
      params = JSON.parse(sessionStorage.getItem('ep') || '{}')
    }
    if (params.gameCompanyId) {
      this.gameCompanyId = params.gameCompanyId
      this.gameName = params.gameName
      this.mInit()
    } else {
      this.$router.push({ name: 'ElectronicGames' })
    }
  },
  methods: {
    mInit() {
      this.$http
        .get('/managerGame/gamePlays.json?id=' + this.gameCompanyId)
        .then(result => {
          if (result.code == 0) {
            this.games = result.data.playlist
            this.sGames = this.games
          }
        })
    },
    mEnterGame(gameid) {
      if (this.cNeedLogin) {
          //请先登陆！
        this.mAlert(_this.$t('games.gameList.gameList3'))
        return
      }
      this.$router.push({
        name: 'GameContainer',
        params: { gameCompanyId: this.gameCompanyId, gameId: gameid }
      })
    },
    mSearchGameByKey(k) {
      this.games = []
      if (k === 0) {
        this.searchGameKey = ''
        this.games = Object.assign([], this.sGames)
      } else {
        this.games = this.sGames.filter(
          g => g.value.indexOf(this.searchGameKey) >= 0
        )
      }
    }
  },created(){
      _this=this;
    }
}
</script>
<style scoped>
.iconfont {
  font-size: 20px;
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
  background: #33334e;
  min-height: 100%;
  width: 100%;
}
.publicpage_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.TopHeader {
  background-color: #545478;
  border-bottom: 1px solid #3a3a3a;
  color: #fff;
  width: 100%;
}
.TopHeader {
  position: relative;
  z-index: 8;
  background: #545478;
  font-size: 17px;
  height: 40px;
  font-weight: 900;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
.A-search {
  font-size: 0;
  overflow: hidden;
  height: auto;
}
.A-search .A-lf {
  padding-top: 0.8rem;
  text-align: center;
}
.col-6 {
  width: 50%;
  float: left;
}
.A-search .A-rf {
  position: relative;
  padding-top: 0.9rem;
}
.A-search .A-rf .A-sousuo-box {
  position: relative;
  /* background: #272829; */
  width: 10rem;
  margin: 0 auto;
  border-radius: 1.25rem;
}
.A-search .A-rf label {
  width: 10rem;
  display: block;
}
.A-search .A-rf label input {
  width: 100%;
  font-size: 1.25rem;
  height: 0.5rem;
  background: #272829;
  border-radius: 1rem;
  color: #fff;
  outline: none;
  padding-left: 0.5rem;
  height: 2rem;
}
.A-search .A-rf span {
  position: absolute;
  right: 0;
  top: 0;
  width: 1.7rem;
  height: 1.5rem;
  line-height: 1.3rem;
  text-align: center;
  color: #fff;
  margin: 3px 7px;
}
.A-game-content-wrapper {
  width: 100%;
}
.MG_game .A-game-content-wrapper .A-title {
  background-image: linear-gradient(180deg, #22de2f, #2fb8da);
}
.A-game-content-wrapper .A-title {
  height: 2.8rem;
  line-height: 2.8rem;
  color: #fff;
  text-align: left;
  padding-left: 0.6rem;
  font-size: 1rem;
  background-image: linear-gradient(180deg, #ffb301, #ffb301);
}
.el-row {
  box-sizing: border-box;
}
.el-col-xs-8 {
  width: 33.33333%;
  float: left;
}
.MG_game .Game {
  font-size: 0;
  height: 100px;
  width: 100px;
  padding: 0 5px;
  margin: 5px auto;
  background: url(https://mobile.beike188.com/modelHG/image/Home/BBIN/bg.png)
    no-repeat;
  background-size: 100% 100%;
}
.MG_game .Game .text {
  line-height: 22px;
  height: 16px;
  font-size: 12px;
  color: #fff;
  padding: 0 5px;
  text-align: center;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.MG_game .Game .BgImg {
  width: 88px;
  height: 72px;
  border-radius: 3px;
  margin: 6px auto 0;
}
</style>

