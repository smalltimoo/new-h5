<template>
  <div id="app">
    <div class="Home-content">
      <div class="classification app_view">
        <section class="el-container container is-vertical">
          <header class="el-header" style="height: 40px;">{{ $t('games.sportSevents.sportSevents1')}}</header><!-- 分类-->
          <section class="el-container">
            <aside class="el-aside" style="width: 75px;">
              <router-link :to="{name:'LiveVideo'}" class="G_Tad">{{ $t('games.sportSevents.sportSevents2')}}</router-link><!--真人 -->
              <router-link :to="{name:'ElectronicGames'}" class="G_Tad">{{ $t('games.sportSevents.sportSevents3')}}</router-link><!--电子 -->
              <router-link
                :to="{name:'SportSevents'}"
                class="G_Tad router-link-exact-active router-link-active"
              >{{ $t('games.sportSevents.sportSevents4')}}</router-link><!-- 体育-->
              <router-link :to="{name:'Lottory'}" class="G_Tad">{{ $t('games.sportSevents.sportSevents5')}}</router-link><!-- 彩票-->
              <router-link :to="{name:'Poket'}" class="G_Tad">{{ $t('games.sportSevents.sportSevents6')}}</router-link><!--棋牌 -->
              <router-link :to="{name:'CatchFish'}" class="G_Tad">{{ $t('games.sportSevents.sportSevents7')}}</router-link><!-- 捕鱼-->
              <a href="javascript:void(0);" @click="mEnterGame(700)" class="G_Tad">{{ $t('games.sportSevents.sportSevents8')}}</a><!-- 电竞-->
              <router-link :to="{name:'Discount'}" class="G_Tad">{{ $t('games.sportSevents.sportSevents9')}}</router-link><!--优惠 -->
              <router-link :to="{name:'Exchange'}" class="G_Tad">{{ $t('games.sportSevents.sportSevents10')}}</router-link><!-- 商城-->
              <!-- <a href="/help" class="G_Tad"> 帮助 </a>
              <a href="/aboutOne" class="G_Tad"> 关于 </a>-->
            </aside>
            <main class="el-main">
              <div class="Sportsevents">
                <div class="G_game el-row" v-for="(room,index) in gameRooms" :key="index"
                     v-if="room.typeId==4"
                >
                  <div class="el-col el-col-12">
                    <div class="grid-content G_img bg-purple">
                      <img :src="room.mobileImg" style="width: 115px;height: 85px;">
                    </div>
                  </div>
                  <div class="el-col el-col-24">
                    <div class="grid-content bg-purple-light G_title">{{room.gameName}}</div>
                    <div class="grid-content bg-purple-light G_text">{{room.content}}</div>
                    <div
                      class="grid-content bg-purple-light G_btn"
                      @click="mEnterGame(room.gameCompanyId,room.typeId)"
                    >
                      <span>{{ $t('games.sportSevents.sportSevents11')}}</span><!--开始游戏 -->
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
      gameRooms: [
        // {
        //   roomId: 401,
        //   roomName: "IBC体验",
        //   content: "顶级赛事 为您呈现",
        //   isSelect: true,
        //   bg: {
        //     background:
        //       "url('//mobile.beike188.com/modelHG/image/Home/Sportsevents/hg.png') 0% 0% / cover"
        //   }
        // },
        // {
        //   roomId: 402,
        //   roomName: "利鑫体育",
        //   content: "顶级赛事 为您呈现",
        //   isSelect: true,
        //   bg: {
        //     background:
        //       "url('//mobile.beike188.com/modelHG/image/Home/Sportsevents/hg.png') 0% 0% / cover"
        //   }
        // }
      ],
      games: [] //{id,value}
    };
  },
  mounted() {
    this.$http.post("/gamesbytypedisc.json", { sysId: 0 ,playType : 4}).then(result => {
      if (result.code == 0) {
        this.gameRooms = !!result.data.companyCustomGames
          ? result.data.companyCustomGames
          : [];
      }
    });
  },
  methods: {
    mEnterGame(roomId,typeId) {
      if (this.cNeedLogin) {
          //请先登陆！
        this.mAlert(_this.$t('games.sportSevents.sportSevents12'));
        return;
      }
      this.$router.push({
        name: "GameContainer",
        params: { gameCompanyId: roomId,comGameType: typeId, gameId: 0 }
      });
    }
  },created(){
      _this=this;
    }
};
</script>
