<template>
    <div>
        <div>品牌</div>
    </div>
</template>
<script>
    import types from '@/store/mutation-types'

    var _this

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
        components: {},
        data() {
            return {
                isDraw:false,
                agentQQ:"",
                lunBoTus: [],
                activities: [],
                tuiJianGames: [],
                drawBanner:'',
            }
        },
        computed: {
            cGongGaos: function () {
                return this.$store.getters.getGonggaos
            },
            getmobilelongLogoStyle: function () {
                // background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
                var sysobj = this.$store.getters.getSysPicObj;
                if (sysobj.mobilelongLogo != undefined) {
                    var style = "background:url('" + sysobj.mobilelongLogo
                        + "'); background-size:100%; height:35px;width:124px;"
                    return style;
                }
            },
            getBanner: function () {
                var mobileBanner = this.$store.getters.getSysPicObj.mobileBanner
                var banner = [];
                if (mobileBanner != undefined && mobileBanner != '') {
                    banner = mobileBanner.split(",");
                }
                return banner;
            },
            cQQ1() {
                let sysInfo = this.$store.getters.getSysInfo;
                this.drawBanner=sysInfo.rouletteSlide;
                this.agentQQ=sysInfo.agentQQ;
                return sysInfo.customQQ ? sysInfo.customQQ : '';
            },
            cQQ2() {
                if (process.env.VUE_APP_ISAPP == 'TRUE') {
                    let qq = process.env.VUE_APP_QQ
                    return qq ? qq : ''
                }

            },
            cTuiJianGames() {
                let tjs = this.tuiJianGames.filter(
                    ele => ele.state == 2 || ele.state == 3
                )
                if (tjs.length < 8) {
                    let tmp = this.tuiJianGames.filter(ele => ele.state == 1)
                    tjs = tjs.concat(tmp.slice(0, 8 - tjs.length))
                }
                return tjs
            },
            cGoodRoad() {
                return process.env.VUE_APP_GOOD_ROAD_RECOMMENDATION
            }
        },
        mounted() {
            setTimeout(() => {
                var lbSwiper = new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    // effect : 'flip',
                    loop: true,
                    speed: 1 * 1000,
                    autoplay: {
                        delay: 3 * 1000
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                })
                var ggSwiper = new Swiper('.swiper-container-gg', {
                    direction: 'vertical',
                    loop: this.cGongGaos.length > 1,
                    autoplay: {
                        delay: 5 * 1000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false
                    }
                })
            }, 1000)
        },
        methods: {
            drawGame(){
                this.$http.get('/integralDrawC/queryRouletteSettingSwitch.json').then(result => {
                    if (result.data) {
                        this.isDraw = result.data;
                    }
                })
            },
            mEnterGame(roomId, gameId, comGameType) {
                if (this.cNeedLogin) {
                    //请先登陆！
                    this.mAlert( this.$t('home.home11'))
                    return
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
                this.$router.push({
                    name: 'GameContainer',
                    params: {
                        gameCompanyId: roomId,
                        gameId: gameId,
                        comGameType: comGameType
                    }
                })
            },
            mupnav(type, obj, baseUrl) {

                var listStr = localStorage.getItem(types.BASE_URL_LIST)
                if (!listStr || listStr == '[]') {
                    this.$store.commit(types.CHANGE_URL, "")
                    this.$store.dispatch(types.WEBNAV, {callback: this.mupnav, url: '', type: type})
                } else {
                    var dispatchdo = false;
                    if (this.tuiJianGames == '' || this.tuiJianGames == '[]') {
                        if (type == 'tuiJianGames') {
                            dispatchdo = true;
                        }
                        ;
                    }
                    if (this.activities == '' || this.activities == '[]') {
                        if (type == 'activities') {
                            if (baseUrl == undefined || baseUrl == '') {
                                dispatchdo = true;
                            }
                        }
                        ;
                    }
                    if (dispatchdo) {
                        if (obj != 2) {
                            var list = JSON.parse(listStr);
                            list.filter(i => {
                                this.$store.dispatch(types.WEBNAV, {callback: this.mupnav, url: i, type: type})
                            });
                        }
                    }

                }
                if (obj == undefined) {
                } else if (obj == 2) {
                    //  this.$store.commit(types.CHANGE_URL,baseUrl)
                } else {
                    if (this.tuiJianGames == '' || this.tuiJianGames == '[]') {
                        if (type == 'tuiJianGames') {
                            this.tuiJianGames = obj
                        }
                        ;
                    }
                    if (this.activities == '' || this.activities == '[]') {
                        if (type == 'activities') {
                            this.activities = obj
                        }
                        ;
                    }

                }
            }
        },
        created() {
            _this = this
            this.mupnav('tuiJianGames');
            this.mupnav('activities');
            this.drawGame();
            this.lunBoTus=[
                {
                    title: this.$t('home.home12'),
                    img: 'https://line.xwiht.cn/HG1/imgs/15351003513366hg全勤奖手机.jpg'
                },
                {
                    title: this.$t('home.home13'),
                    img: 'https://line.xwiht.cn/HG1/imgs/15348463340176hg嫩模手机.jpg'
                },
                {
                    title: this.$t('home.home14'),
                    img: 'https://line.xwiht.cn/HG1/imgs/15352721271386hg网银手机.jpg'
                },
                {
                    title: this.$t('home.home15'),
                    img: 'https://line.xwiht.cn/HG1/imgs/15352721688526HG首存手机.jpg'
                },
                {
                    title: this.$t('home.home16'),
                    img: 'https://line.xwiht.cn/HG1/imgs/15351813163036hg酒店手机.jpg'
                },
                {
                    title: this.$t('home.home17'),
                    img: 'https://line.xwiht.cn/HG1/imgs/15351770115516hg棋牌手机.jpg'
                }
            ]
        },
        destroyed() {
            _this = undefined
        }
    }
</script>
<style>
</style>

