<template>
    <div class="home">
        <div class="get-app" v-if="sysPicObj.appUrl && showApp">
            <i class="icon-close" style="margin-left: 12px" @click="closeApp"/>
            <div class="img-app">
                <img :src="sysPicObj.mobileLogo" class="img-logo"/>
                <span style="color:#fff;padding-top: 2px"><b>打开{{sysPicObj.name}}App</b></span>
                <span><b>走到哪，玩到哪</b></span>
            </div>
            <a class="download" :href="sysPicObj.appUrl" target="_blank">立即下载</a>
        </div>
        <div class="header" :style="sysPicObj.appUrl && showApp ? 'margin-top:5px' : 'margin-top:-44px'">
            <div class="header-left">
                <!--<Icon type="md-menu" class="icon-menu"/>-->
            </div>
            <div class="header-middle">
                <img :src="sysPicObj.mobilelongLogo" width="110px"/>
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
        <div class="container">
            <cube-slide ref="slide" :data="getBanner" style="margin-bottom: -4px;">
                <cube-slide-item v-for="(item, index) in getBanner" :key="index">
                    <img :src="item" width="100%">
                </cube-slide-item>
                <cube-slide-item>
                    <router-link :to="{name:'Draw'}">
                        <img :src="drawBanner" width="100%" height="100%"/>
                    </router-link>
                </cube-slide-item>
            </cube-slide>

            <div class="notice">
                <i class="icon laba"/>
                <marquee behavior="scroll" direction="left" scrollamount="4" id="mar0">
                    <span v-for="(item,index) in cGongGaos" :key="index" v-text="item.content" style="margin-right: 100px"></span>
                </marquee>
            </div>

            <div class="shortcut">
                <router-link :to="{name:'OnlineDeposit'}" tag="li">
                    <i class="home-recharge"/>
                    <span>用户充值</span>
                </router-link>
                <router-link :to="{name:'Withdrawals'}" tag="li">
                    <i class="home-deposit"/>
                    <span>用户提款</span>
                </router-link>
                <li @click="mOpenCService">
                    <i class="home-custom"/>
                    <span>在线客服</span>
                </li>
                <router-link :to="{name:'AgentMember'}" tag="li" v-if="cLoginUser.agnetLevel>0">
                    <i class="home-agent"/>
                    <span>代理中心</span>
                </router-link>
                <router-link :to="{name:'BettingRecord'}" tag="li" v-else>
                    <i class="home-bet"/>
                    <span>投注记录</span>
                </router-link>
            </div>

            <div class="game-center">
                <div class="hot" :class="{active: gameType=='0'}" @click="gameType=0">热门游戏</div>
                <div class="game-type">
                    <div :class="{active: gameType=='1'}" @click="gameType=1">真人视讯</div>
                    <div :class="{active: gameType=='2'}" @click="gameType=2">彩票游戏</div>
                    <div :class="{active: gameType=='4'}" @click="gameType=4">体育竞技</div>
                    <div :class="{active: gameType=='5'}" @click="gameType=5">电子游戏</div>
                    <div :class="{active: gameType=='6'}" @click="gameType=6">棋牌游戏</div>
                    <div :class="{active: gameType=='7'}" @click="gameType=7">电子竞技</div>
                    <div :class="{active: gameType=='50'}" @click="gameType=50">捕鱼游戏</div>
                </div>
                <div class="game-rooms">
                    <div v-for="(game, index) in selectedGames" :key="index"
                         @click="mEnterGame(game.gameId==601?301:game.gameId,game.typeId==50?0:((game.gameId==601||(game.gameId==301&&game.typeId==6))?'ws00':''),game.typeId,game.gameName)"
                    >
                        <img :src="game.mobileImg" width="100%" height="105px" v-if="game.mobileImg"/>
                        <div class="img-error" style="height: 105px;" v-else></div>
                        <div class="game-text">
                            <span v-text="game.gameName"></span>
                            <span v-text="game.typeName"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="activity">
                <div class="title">
                    <span>优惠活动</span>
                    <span><router-link :to="{name:'Discount'}">更多>>></router-link></span>
                </div>
            </div>

            <div class="activity-panel">
                <el-carousel :interval="4000" type="card" height="140px" indicator-position="none">
                    <el-carousel-item v-for="(item,index) in activities" :key="index" class="active-img">
                        <router-link :to="{name:'Discount',query:{id:item.id}}">
                            <div class="active-title">
                                <span>{{ item.activityTitle }}</span>
                                <span>{{ item.endTimeStr }}</span>
                            </div>
                            <img :src="item.activityImg" width="100%" style="max-height: 85px;min-height: 80px"/>
                        </router-link>
                    </el-carousel-item>
                </el-carousel>
            </div>

        </div>
    </div>
</template>
<script>
    let _this;
    import {mapState} from 'vuex';
    import message from '@/mixins/message'

    function StartGameForIframe(gameId) {
        _this.mEnterGame(gameId)
    }

    window.addEventListener('message', receiveMessage, false)

    function receiveMessage(event) {
        if (event.data == 'StartGameForIframe101') {
            StartGameForIframe(101)
        }
    }

    export default {
        name: 'Home',
        mixins: [message],
        components: {},
        data() {
            return {
                showApp: true,
                gameType: 0,
                isDraw: false,
                agentQQ: "",
                lunBoTus: [],
                activities: [],
                drawBanner: '',
                companyCustomGames: [],
            }
        },
        computed: {
            ...mapState({
                sysPicObj: state => state.common.sysPicObj,
            }),
            selectedGames() {
                return Object.values(this.companyCustomGames).filter(item => {
                    if (this.gameType == 0) {
                        return item.state == 3 || item.state == 2;
                    } else if (this.gameType == 2) {
                        return item.typeId == 2 || item.typeId == 3;
                    } else {
                        return this.gameType == item.typeId;
                    }
                })
            },
            cGongGaos() {
                return this.$store.getters.getGonggaos
            },
            getBanner() {
                var mobileBanner = this.$store.getters.getSysPicObj.mobileBanner
                var banner = [];
                if (mobileBanner != undefined && mobileBanner != '') {
                    banner = mobileBanner.split(",");
                }
                return banner;
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
            drawGame() {
                this.$http.get('/integralDrawC/queryRouletteSettingSwitch.json').then(result => {
                    if (result.data) {
                        this.isDraw = result.data;
                    }
                })
            },
            mEnterGame(roomId, gameId, comGameType, gameName) {
                if (!this.toNeedLogin()) {
                    return;
                }
                if (!roomId) {
                    roomId = 0
                }
                if (!gameId) {
                    gameId = 0
                }
                if (!comGameType) {
                    comGameType = ''
                }

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
            allGame() {
                this.$http.post('/gamesbytype.json', {playType: -1, state: 1, sysId: 0}).then(result => {
                    if (result.code == 0) {
                        this.companyCustomGames = Object.assign({}, result.data.companyCustomGames);
                    }
                })
            },
            activity() {
                this.$http.post('/activities.json', {sysId: 0}).then(result => {
                    if (result.code == 0) {
                        this.activities = Object.assign({}, result.data.activityVoList);
                    }
                })
            },
            closeApp() {
                this.showApp = false;
                localStorage.setItem('showApp', 'false')
            }
        },
        created() {
            _this = this;
            this.$store.commit('CHANGE_TAB', 'Home');
            this.showApp = localStorage.getItem('showApp') ? false : true;
            this.drawGame();
            this.allGame();
            this.activity();

            window.onscroll = function () {
                let scrollheight = document.body.scrollTop == 0 ? document.documentElement.scrollTop
                    : document.body.scrollTop
                if (scrollheight >= 44) {
                    document.querySelector('.header').style.position = 'fixed';
                    if (_this.sysPicObj.appUrl && _this.showApp) {
                        document.querySelector('.header').style.marginTop = '0'
                        document.querySelector('.get-app') ? document.querySelector('.get-app').style.display = 'none' : null
                    } else {
                        document.querySelector('.header').style.marginTop = '0';
                    }

                } else {
                    if (_this.sysPicObj.appUrl && _this.showApp) {
                        document.querySelector('.header').style.position = 'inherit';
                        document.querySelector('.header').style.marginTop = '0';
                        document.querySelector('.get-app').style.display = 'flex'
                    } else {
                        document.querySelector('.header').style.position = 'fixed';
                        document.querySelector('.header').style.marginTop = '0px'
                    }
                }

            }
        },
        destroyed() {
            _this = undefined;
            window.onscroll = function () {
                if (document.querySelector('.header')) {
                    document.querySelector('.header').style.position = 'fixed';
                    document.querySelector('.header').style.marginTop = '0';
                }
            }
        }
    }
</script>
<style>
</style>

