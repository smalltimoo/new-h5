<template>
    <div v-resize="mOnResize">
        <div class="game-body">
            <div class="userSettings game_view">
                <div class="TopHeader" ref="TopHeader">
                    <div id="return" style="position: absolute;">
                        <Icon type="md-close" @click="mClose"/>
                    </div>
                </div>
                <div :style="cGCStyles" style="width:100%;height:100%;-webkit-overflow-scrolling:touch;overflow:auto;">
                    <iframe
                            :src="gameUrl"
                            frameborder="0"
                            width="100%"
                            height="100%"
                            class="game-container"
                            :style="cIframeStyles"
                    ></iframe>
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
                gameUrl: '',
                width: 0,
                height: 0,
                comeSource: ''
            }
        },
        computed: {
            cGCStyles() {
                return {
                    width: this.width + 'px',
                    height: this.height + 'px'
                }
            },
            cIframeStyles() {
                return {
                    minHeight: this.height + 'px'
                }
            }
        },
        mounted() {
            this.comeSource = this.$route.name
            this.mInit()
            this.$nextTick(this.mGCStyles)
        },
        methods: {
            mInit() {
                let params = this.$route.params
                this.mEnterGame(params.gameCompanyId, params.gameId, params.comGameType)
            },
            mEnterGame(roomId, gameId, comGameType) {
                if (this.cNeedLogin) {
                    //请先登陆！
                    this.mAlert(_this.$t('games.gameContainer.gameContainer1'))
                    return
                }
                this.mLoading(true)
                let params = {username: this.cLoginUser.username}
                if (roomId) {
                    params.gameCompanyId = roomId
                }
                if (gameId) {
                    params.gameId = gameId
                }
                if (comGameType) {
                    params.comGameType = comGameType
                }
                this.$http
                    .post('/managerGame/getMemberGameUrl.json', params)
                    .then(result => {
                        if (result.code == 0) {
                            this.mLoading(true)
                            this.gameUrl = result.data.dgUrl.mobileUrl
                            // OG和AG会出现域名跳转问题 ios下有问题。
                            if (roomId == 103 || roomId == 100) {
                                if (process.env.VUE_APP_ISAPP == 'FALSE') {
                                    window.location.href = this.gameUrl //, '_self') //, '_blank'
                                    this.mClose()
                                }
                            }
                            setTimeout(() => {
                                this.mLoading(false)
                                if (!this.gameUrl) {
                                    //未能拉取到游戏，请稍后再试...
                                    this.mAlert(_this.$t('games.gameContainer.gameContainer2'), () => {
                                        this.mClose()
                                    })
                                }
                            }, 2000)
                        } else {
                            this.mLoading(false)
                            this.mAlert(result.message, () => {
                                this.mClose()
                            })
                        }
                    })
                    .catch(error => {
                        this.mLoading(false)
                        //游戏正忙，请稍后再试...
                        this.mAlert(_this.$t('games.gameContainer.gameContainer3'), () => {
                            this.mClose()
                        })
                    })
            },
            mGCStyles() {
                let w = window.innerWidth
                let h = window.innerHeight
                h = h - this.$refs.TopHeader.clientHeight
                this.width = w
                this.height = h
            },
            mOnResize() {
                this.mGCStyles()
            },
            mClose() {
                this.$router.push({
                    name: this.comeSource.name ? this.comeSource.name : 'Home',
                    params: this.comeSource.params
                })
            }
        }, created() {
            _this = this;
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.comeSource = from
            })
        }
    }
</script>

<style>
    .userSettings {
        width: 100%;
        font-size: 0;
    }

    .userSettings .bg-purple-dark .texts,
    .userSettings .bg-purple-dark a {
        display: block;
        padding: 18px 10px;
        text-align: left;
        font-size: 14px;
        color: #fff;
    }

    .game_view {
        position: absolute;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .game-body {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 100;
        background: url("../../assets/images/game-loading.gif") 50% 50% no-repeat;
        background-size: 350px auto;
        background-color: #fff;
    }

    .game-container {
        border: 0px;
        overflow: auto;
    }
</style>
