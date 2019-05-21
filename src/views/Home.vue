<template>
    <div class="home">
        <div class="get-app" v-if="sysPicObj.appUrl && showApp">
            <i class="icon-close" style="margin-left: 12px" @click="closeApp"/>
            <div class="img-app">
                <img :src="sysPicObj.mobileLogo" class="img-logo"/>
                <span style="color:#fff;padding-top: 2px"><b>{{ $t('home.home1')}}{{sysPicObj.name}}App</b></span>
                <span><b>{{ $t('home.home2')}}</b></span>
            </div>
            <a class="download" :href="sysPicObj.appUrl" target="_blank">{{ $t('home.home3')}}</a>
        </div>
        <div class="header" :class="sysPicObj.appUrl && showApp ? 'hasApp' : 'noApp'">
            <div class="header-left">
                <Icon type="md-menu" class="icon-menu" @click="openDrawer"/>
                <Drawer placement="left" width="80" :closable="false" v-model="leftDrawer" class="header-drawer">
                    <div class="left-top">
                        <span class="level">
                            <img src="../assets/images/vip.png" width="11px"> &nbsp;
                            {{cLoginUser.memberLevelName}}
                        </span>
                        <img src="../assets/images/home/defaultAvator.png" width="47px"
                             style="margin-top: 15px;"/>
                        <div class="user-operate" v-if="cNeedLogin">
                            <span @click="$router.push({name:'Login'})">{{ $t('home.home9')}}</span>&emsp;&emsp;
                            <span @click="$router.push({name:'Login', params:{type:'register'}})">{{ $t('home.home10')}}</span>
                        </div>
                        <div class="user-operate" v-else>
                            <div style="text-align: right">
                                {{ $t('home.home11')}} {{ parseFloat(cLoginUser.centerAmount/100).toFixed(2) }}
                                <span style="font-size: 12px">{{ $t('yuan')}}</span>
                            </div>&emsp;&emsp;
                            <div>
                                {{ $t('home.home12')}} {{ cLoginUser.integral ?
                                parseFloat(cLoginUser.integral/100).toFixed(2) :'0.00' }}
                                <span style="font-size: 12px">{{ $t('fen')}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="left-center">
                        <router-link :to="{name:'AgentMember'}" v-if="cLoginUser.agnetLevel>0">
                            <img src="../assets/images/home/left-agent.png" width="20px"/>
                            {{ $t('home.home13')}}
                        </router-link>
                        <router-link :to="{name:'OnlineDeposit'}">
                            <img src="../assets/images/home/left-recharge.png" width="20px"/>
                            {{ $t('home.home14')}}
                        </router-link>
                        <router-link :to="{name:'IndoorTransfer'}">
                            <img src="../assets/images/home/left-change.png" width="20px"/>
                            {{ $t('home.home15')}}
                        </router-link>
                        <router-link :to="{name:'Withdrawals'}">
                            <img src="../assets/images/home/left-out.png" width="18px"/>
                            {{ $t('home.home16')}}
                        </router-link>
                        <router-link :to="{name:'Discount'}" style="margin-left: -2px">
                            <img src="../assets/images/home/left-active.png" width="20px"/>
                            {{ $t('home.home17')}}
                        </router-link>
                    </div>
                    <div class="myGame">
                        {{ $t('home.home18')}}
                    </div>
                    <div class="left-center">
                        <li @click="quickEnterGame('101','','1')">
                            <img src="../assets/images/home/play1.png" width="20px"/>
                            {{ $t('home.home19')}}
                        </li>
                        <li @click="quickEnterGame('102','','3')">
                            <img src="../assets/images/home/play3.png" width="20px"/>
                            {{ $t('home.home20')}}
                        </li>
                        <!--<li @click="quickEnterGame('506','','5','QG游戏厅')">-->
                        <!--<img src="../assets/images/home/play2.png" width="20px"/>-->
                        <!--{{ $t('home.home21')}}-->
                        <!--</li>-->
                    </div>
                    <div class="myGame">
                        <span>{{$i18n.locale=='zh' ? '设置' : 'Setting'}}</span>
                    </div>
                    <div class="local">
                        <span style="width: 50%;">
                            <img src="../assets/images/home/global.png" width="20px"/>
                            {{$i18n.locale=='zh' ? '语言' : 'Language'}}
                        </span>
                        <el-select v-model="$i18n.locale" placeholder="请选择" @change="changeLocal" size="mini">
                            <el-option v-for="item in options"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="local">
                         <span style="width: 50%;">
                            <img src="../assets/images/home/moon.png" width="20px"/>
                            {{$i18n.locale=='zh' ? '主题' : 'Theme'}}
                        </span>
                        <!--<cube-switch v-model="theme" size="small"/>-->
                        <div class="color-theme">
                           <span :class="{active: theme=='0'}" @click="changeTheme('0')"></span>
                           <span :class="{active: theme=='1'}" @click="changeTheme('1')"></span>
                           <span :class="{active: theme=='2'}" @click="changeTheme('2')"></span>
                        </div>
                    </div>
                </Drawer>
            </div>
            <div class="header-middle">
                <img :src="sysPicObj.mobilelongLogo" width="110px"/>
            </div>
            <div class="header-right">
                <Poptip trigger="click" placement="bottom-end">
                    <i class="icon-menu message"></i>
                    <ul slot="content">
                        <li class="icon-kefu" @click="mOpenCService">
                            {{$t('customservice')}}
                        </li>
                        <li class="icon-qq" v-if="cQQ1 || cQQ2">
                            <a v-if="cQQ1" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ1+'&version=1&src_type=web'">
                                {{cQQ1}}
                            </a>
                            <a v-if="cQQ2" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ2+'&version=1&src_type=web'">
                                {{cQQ2}}
                            </a>
                        </li>
                        <li class="icon-agent" v-if="agentQQ">
                            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'">{{agentQQ}}</a>
                        </li>
                        <li class="icon-line" v-if="sysInfo.lineUrl">
                            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'">{{sysInfo.lineUrl}}</a>
                        </li>
                    </ul>
                </Poptip>
            </div>
        </div>
        <div class="container">
            <cube-slide ref="slide" :data="[]" style="margin-bottom: -4px;min-height: 140px">
                <cube-slide-item v-for="(item, index) in getBanner" :key="index" >
                    <img :src="item.imgUrl" width="100%" height="100%" v-if="item.isDraw" @click="$router.push({name:'Draw'})">
                    <img :src="item.imgUrl" width="100%" height="100%" v-else/>
                </cube-slide-item>
            </cube-slide>

            <div class="notice">
                <i class="icon laba"/>
                <marquee behavior="scroll" direction="left" scrollamount="4" id="mar0">
                    <span v-for="(item,index) in cGongGaos" :key="index" v-text="item.content"
                          style="margin-right: 100px">
                    </span>
                </marquee>
            </div>

            <div class="shortcut">
                <router-link :to="{name:'OnlineDeposit'}" tag="li">
                    <i class="home-recharge"/>
                    <span>{{ $t('home.home4')}}</span>
                </router-link>
                <router-link :to="{name:'Withdrawals'}" tag="li">
                    <i class="home-deposit"/>
                    <span>{{ $t('home.home5')}}</span>
                </router-link>
                <li @click="mOpenCService">
                    <i class="home-custom"/>
                    <span>{{ $t('home.home6')}}</span>
                </li>
                <router-link :to="{name:'AgentMember'}" tag="li" v-if="cLoginUser.agnetLevel>0">
                    <i class="home-agent"/>
                    <span>{{ $t('home.home7')}}</span>
                </router-link>
                <router-link :to="{name:'BettingRecord'}" tag="li" v-else>
                    <i class="home-bet"/>
                    <span>{{ $t('home.home8')}}</span>
                </router-link>
            </div>

            <div class="game-center">
                <div class="hot" :class="{active: gameType=='0'}" @click="gameType=0">{{ $t('home.home22')}}</div>
                <div class="game-type">
                    <div :class="{active: gameType=='1'}" @click="gameType=1">{{ $t('home.home23')}}</div>
                    <div :class="{active: gameType=='2'}" @click="gameType=2">{{ $t('home.home24')}}</div>
                    <div :class="{active: gameType=='4'}" @click="gameType=4">{{ $t('home.home25')}}</div>
                    <div :class="{active: gameType=='5'}" @click="gameType=5">{{ $t('home.home26')}}</div>
                    <div :class="{active: gameType=='6'}" @click="gameType=6"
                         v-if="Object.values(companyCustomGames).filter(item=>item.typeId==6).length>0"
                    >{{ $t('home.home27')}}</div>
                    <div :class="{active: gameType=='7'}" @click="gameType=7"
                         v-if="Object.values(companyCustomGames).filter(item=>item.typeId==7).length>0"
                    >{{ $t('home.home28')}}</div>
                    <div :class="{active: gameType=='50'}" @click="gameType=50"
                         v-if="Object.values(companyCustomGames).filter(item=>item.typeId==50).length>0"
                    >{{ $t('home.home29')}}</div>
                </div>
                <div class="game-rooms">
                    <div v-for="(game, index) in selectedGames" :key="index"
                         @click="mEnterGame(game.gameId==601?301:game.gameId,game.typeId==50?0:((game.gameId==601||(game.gameId==301&&game.typeId==6))?'ws00':''),game.typeId,game.gameName,game.gameCompanyId)"
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
                    <span>{{ $t('home.home30')}}</span>
                    <span><router-link :to="{name:'Discount'}">{{ $t('home.home31')}}</router-link></span>
                </div>
            </div>

            <div class="activity-panel">
                <el-carousel :interval="4000" type="card" height="140px" indicator-position="none">
                    <el-carousel-item v-for="(item,index) in activities" :key="index" class="active-img">
                        <router-link :to="{name:'Discount',query:{id:item.id}}">
                            <div class="active-title">
                                <span style="width: 110px;text-align: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis">{{ item.activityTitle }}</span>
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
    import types from "../store/mutation-types";

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
                options: [
                    {
                        value: 'zh',
                        label: '简体中文'
                    }, {
                        value: 'th',
                        label: 'ไทย'
                    }
                ],
                showApp: true,
                gameType: 0,
                isDraw: false,
                agentQQ: "",
                lunBoTus: [],
                activities: [],
                drawBanner: '',
                companyCustomGames: [],
                alert: {}
            }
        },
        computed: {
            ...mapState({
                theme:state => state.common.theme,
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
                   let bs = mobileBanner.split(",");
                   bs.map(item=>{
                       banner.push({imgUrl:item})
                   })
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
            changeTheme(theme){
                this.$store.commit(types.THEME, theme);
            },
            drawGame() {
                this.$http.get('/integralDrawC/queryRouletteSettingSwitch.json').then(result => {
                    if (result.data) {
                        this.isDraw = result.data;
                        if(this.isDraw){
                            this.getBanner.push({
                                imgUrl:this.drawBanner,
                                isDraw:this.isDraw
                            })
                        }
                    }
                })
            },
            mEnterGame(roomId, gameId, comGameType, gameName, gameCompanyId) {
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

                // OG和AG会出现域名跳转问题 ios下有问题。
                if (gameCompanyId == 100 || gameCompanyId == 103) {
                    this.$http
                        .post('/managerGame/getMemberGameUrl.json', {
                            gameCompanyId: roomId,
                            comGameType: comGameType,
                            username: this.cLoginUser.username
                        })
                        .then(result => {
                            if (result.code == 0) {
                                let gameUrl = result.data.dgUrl.mobileUrl;
                                window.location.href = gameUrl;
                            } else {
                                this.$Message.error(result.message)
                            }
                        })
                        .catch(error => {
                            this.$Message.error(_this.$t('games.gameContainer.gameContainer3'))
                        })

                    return;
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
            },
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
                        document.querySelector('.header').style.marginTop = '5px';
                        document.querySelector('.get-app').style.display = 'flex'
                    } else {
                        document.querySelector('.header').style.position = 'fixed';
                        document.querySelector('.header').style.marginTop = '0'
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

