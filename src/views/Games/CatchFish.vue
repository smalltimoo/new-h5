<template>
  <div id="app">
    <div class="Home-content">
      <div class="classification app_view">
        <section class="el-container container is-vertical">
          <header class="el-header" style="height: 40px;">{{ $t('games.catchFish.catchFish1')}}</header><!--分类</ -->
          <section class="el-container">
            <aside class="el-aside" style="width: 75px;">
              <router-link :to="{name:'LiveVideo'}" class="G_Tad">{{ $t('games.catchFish.catchFish2')}}</router-link><!--真人 -->
              <router-link :to="{name:'ElectronicGames'}" class="G_Tad">{{ $t('games.catchFish.catchFish3')}}</router-link><!--电子 -->
              <router-link :to="{name:'SportSevents'}" class="G_Tad">{{ $t('games.catchFish.catchFish4')}}</router-link><!-- 体育-->
              <router-link :to="{name:'Lottory'}" class="G_Tad">{{ $t('games.catchFish.catchFish5')}}</router-link><!--彩票 -->
              <router-link :to="{name:'Poket'}" class="G_Tad">{{ $t('games.catchFish.catchFish6')}}</router-link><!--棋牌 -->
              <router-link
                :to="{name:'CatchFish'}"
                class="G_Tad router-link-exact-active router-link-active"
              >{{ $t('games.catchFish.catchFish7')}}</router-link><!-- 捕鱼-->
              <a href="javascript:void(0);" @click="mEnterGame(700)" class="G_Tad">{{ $t('games.catchFish.catchFish8')}}</a><!--电竞 -->
              <router-link :to="{name:'Discount'}" class="G_Tad">{{ $t('games.catchFish.catchFish9')}}</router-link><!--优惠 -->
              <router-link :to="{name:'Exchange'}" class="G_Tad">{{ $t('games.catchFish.catchFish10')}}</router-link><!--商城 -->
              <!-- <a href="" class="G_Tad"> 帮助 </a>
              <a href="" class="G_Tad"> 关于 </a>-->
            </aside>
            <main class="el-main">
              <div class="ElectronicGames">
                <div class="Sportsevents">
                  <div
                    class="G_game el-row"
                    v-for="(room,index) in gameRooms"
                    :key="index"
                    v-if="room.typeId==50"
                  >
                    <div class="el-col el-col-12">
                      <div class="grid-content G_img bg-purple">
                        <img :src="room.mobileImg" style="width: 115px;height: 85px;">
                      </div>
                    </div>
                    <div class="el-col el-col-24">
                      <div class="grid-content bg-purple-light G_title">{{room.gameName}}</div>
                      <div class="grid-content bg-purple-light G_text">{{ $t('games.catchFish.catchFish11')}}</div><!--最好玩最全的捕鱼游戏 -->
                      <div class="grid-content bg-purple-light G_btn">
                        <span @click="mEnterGame(room.gameCompanyId)">{{ $t('games.catchFish.catchFish12')}}</span><!-- 开始游戏-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
  var _this;
export default {
  data() {
    return {
      gameRooms: []
    };
  },
  mounted() {
    this.$http.post("/gamesbytype.json", { sysId: 0 }).then(result => {
      if (result.code == 0) {
        this.gameRooms = !!result.data.companyCustomGames
          ? result.data.companyCustomGames
          : [];
      }
    });
  },
  methods: {
    mEnterGame(roomId) {
      if (this.cNeedLogin) {
          //请先登陆！
        this.mAlert(_this.$t('games.catchFish.catchFish13'));
        return;
      }
      // if (roomId == 102) {
      //   comGameType = "50";
      // }
      this.$router.push({
        name: "GameContainer",
        params: {
          gameCompanyId: roomId,
          comGameType: "50"
        }
      });
    }
  },created(){
      _this=this;
    }
};
</script>
