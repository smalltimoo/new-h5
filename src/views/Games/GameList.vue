<template>
    <div class="main-body">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{this.gameName}}
            </div>
            <div class="header-right"></div>
        </div>
        <div id="MG_game" class="MG_game gameThree">
            <div class="row A-search">
                <div class="A-lf" style="width: 40%;float: left">
                    <img src="https://mobile.beike188.com/modelHG/Home/swgame.png" alt style="width: 100%;">
                </div>
                <div class="A-rf" style="width: 60%;float: left">
                    <div class="A-sousuo-box">
                        <label>
                            <input @change="mSearchGameByKey"
                                   v-model="searchGameKey"
                                   type="text"
                                   :placeholder="$t('games.gameList.gameList1')"
                            ><!--搜索 -->
                        </label>
                        <span class="iconfont"><Icon type="ios-search"/></span>
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
                this.$router.push({name: 'ElectronicGames'})
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
                    params: {gameCompanyId: this.gameCompanyId, gameId: gameid}
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
        }, created() {
            _this = this;
        }
    }
</script>
<style scoped>
    .iconfont {
        font-size: 20px;
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
        margin-top: 44px;
    }


    .A-search {
        font-size: 0;
        overflow: hidden;
        padding-right: 10px;
        height: 70px;
        padding-top: 15px;
        background: #cd0005;
    }

    .A-search .A-lf {
        text-align: center;
    }

    .A-search .A-rf {
        position: relative;
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
        background: #272829;
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
    }

    .MG_game .A-game-content-wrapper .A-title {
        background-image: linear-gradient(180deg, #22de2f, #2fb8da);
    }

    .A-game-content-wrapper .A-title {
        height: 45px;
        line-height: 45px;
        color: #fff;
        text-align: left;
        padding-left: 0.6rem;
        font-size: 16px;
        background-image: linear-gradient(180deg, #ffb301, #ffb301);
        margin-bottom: 10px;
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
        background: url(https://mobile.beike188.com/modelHG/image/Home/BBIN/bg.png) no-repeat;
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

