<template>
    <div class="game-container">
        <div class="game-body">
            <div class="game-center">

                <div class="move" id="move" ref="TopHeader" @click="panel=!panel" style="width: 40px; height: 40px;background-size: 40px auto;"></div>

                <div v-if="panel"
                     style="position: absolute;height: 100%;width: 100%; display: flex;justify-content: center;align-items: center">
                    <div class="window" style="width: 355px; padding-bottom: 10px;">
                        <div class="close" @click="panel=false"
                             style="right: 10px; top: 10px; width: 26px; height: 27px;background-size: auto 25px;"></div>
                        <div class="top" style=" width: 283px;height: 35px; background-size: auto 35px; font-size: 16px">
                            {{$t('games.gameContainer.gameContainer4')}}
                        </div>
                        <div class="window-panel" style=" margin-top: 8px;width: 95%;height: 160px; padding: 10px;border-radius: 7px;">
                            <span style="font-size: 14px">
                                {{$t('games.gameContainer.gameContainer5')}}：
                                <input type="text" v-model="vm.dealCoin" placeholder="请输入金额" class="input"
                                       style="height: 27px;line-height: 27px; border-radius: 4px; width: 120px;"/>
                                {{$t('yuan')}}
                            </span>
                            <span style="color: #960000;font-size: 12px;margin: 10px 0">
                                {{$t('games.gameContainer.gameContainer6')}}: {{this.cLoginUser.centerAmount/100}}{{$t('yuan')}}
                            </span>
                            <span class="moneys">
                            <div @click="vm.dealCoin=10"
                                 style="height: 73px;width: 60px; background-size: 58px 66px;font-size: 12px;">
                                <span>{{$t('games.gameContainer.gameContainer7')}}</span>
                                <img src="../../assets/images/game/chongzhi1.png" width="30px">
                                <span>￥10</span>
                            </div>
                            <div @click="vm.dealCoin=100"
                                 style="height: 73px;width: 60px; background-size: 58px 66px;font-size: 12px;">
                                <span>{{$t('games.gameContainer.gameContainer7')}}</span>
                                <img src="../../assets/images/game/chongzhi2.png" width="30px">
                                <span>￥100</span>
                            </div>
                            <div @click="vm.dealCoin=200"
                                 style="height: 73px;width: 60px; background-size: 58px 66px;font-size: 12px;">
                                <span>{{$t('games.gameContainer.gameContainer7')}}</span>
                                <img src="../../assets/images/game/chongzhi3.png" width="30px">
                                <span>￥200</span>
                            </div>
                            <div @click="vm.dealCoin=500"
                                 style="height: 73px;width: 60px; background-size: 58px 66px;font-size: 12px;">
                                <span>{{$t('games.gameContainer.gameContainer7')}}</span>
                                <img src="../../assets/images/game/chongzhi4.png" width="30px">
                                <span>￥500</span>
                            </div>
                            <div @click="vm.dealCoin=1000"
                                 style="height: 73px;width: 60px; background-size: 58px 66px;font-size: 12px;">
                                <span>{{$t('games.gameContainer.gameContainer7')}}</span>
                                <img src="../../assets/images/game/chongzhi5.png" width="30px">
                                <span>￥1000</span>
                            </div>
                        </span>
                        </div>
                        <div style="display: flex;justify-content: space-between;padding: 0 10px; margin-top:5px;width: 100%;">
                            <img src="../../assets/images/game/game-close.png" height="35px" @click="mClose">
                            <img src="../../assets/images/game/confirm.png" height="35px" @click="mSave">
                        </div>
                    </div>
                </div>

                <div style="width:100%;height:100%;-webkit-overflow-scrolling:touch;overflow:auto;">
                    <iframe :src="gameUrl"
                            frameborder="0"
                            width="100%"
                            height="100%"
                            class="game-iframe"
                    ></iframe>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    let _this;
    import types from "@/store/mutation-types";

    export default {
        data() {
            return {
                panel: false,
                gameUrl: '',
                width: 0,
                height: 0,
                loading: false,
                vm: {
                    walletIn: '',
                    walletOut: 0,
                    dealCoin: ''
                },
                comeSource: '',
            }
        },
        mounted() {
            this.comeSource = this.$route.name
            this.mInit();
            this.getMemberInfo();
            this.$nextTick(this.mGCStyles);
            move();
            setTimeout(()=>{
                document.querySelector('.game-body').style.background='inherit';
            },15000)

        },
        methods: {
            getMemberInfo() {
                this.$http.get("/memberUser/memberinfo.json").then(result => {
                    if (result.code == 0) {
                        this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
                    }
                });
            },
            mInit() {
                let params = this.$route.params;
                this.vm.walletIn = params.gameCompanyId;
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
                                    // this.mAlert(this.$t('games.gameContainer.gameContainer2'), () => {
                                    //     this.mClose()
                                    // })
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
            mSave() {
                if (this.loading) {
                    return;
                }
                if (this.vm.dealCoin < 1 || this.vm.dealCoin == '') {
                    this.$Message.warning(this.$t('member.indoorTransfer.it11')) //转账金额必须大于1元
                    return;
                }
                this.loading = true;
                this.mLoading(true)
                this.$http
                    .post('/managerGame/wallettransfer.json', this.vm)
                    .then(result => {
                        this.mLoading(false)
                        if (result.code == 0) {
                            this.$Message.success(this.$t('member.indoorTransfer.it12'))  //操作成功
                            this.getMemberInfo();
                            this.vm.dealCoin = 0;
                            if (result.data < 0) {
                                this.$Message.warning(this.$t('member.indoorTransfer.it13')) //记录转账记录失败
                            } else if (result.data == 2) {
                                this.$Message.warning(this.$t('member.indoorTransfer.it14'))  //操作中心账户失败
                            } else if (result.data == 3) {
                                this.$Message.warning(this.$t('member.indoorTransfer.it15'))  //游戏厅操作失败
                            } else if (result.data == 4) {
                                this.$Message.warning(this.$t('member.indoorTransfer.it16')) //游戏厅未返回，请联系客服
                            }
                            this.loading = false;
                        } else {
                            this.$Message.warning(result.message)
                            this.loading = false;
                        }
                    })
                    .catch(error => {
                        this.loading = false;
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
        },
        created() {
            _this = this;
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.comeSource = from
            })
        }
    }


    function move() {
        let obj = document.getElementById('move');
        let parentNode = window.self;
        let pWidth = parentNode.innerWidth, pHeight = parentNode.innerHeight;

        obj.addEventListener('touchstart', function (event) {
            //当只有一个手指时              .
            if (event.touches.length == 1) {
                //禁止浏览器默认事
                // event.preventDefault();
            }
            let touch = event.targetTouches[0];
            let disX = touch.clientX - obj.offsetLeft, disY = touch.clientY - obj.offsetTop;
            let oWidth = obj.offsetWidth, oHeight = obj.offsetHeight;

            obj.addEventListener('touchmove', function (event) {
                let touch = event.targetTouches[0];
                obj.style.left = touch.clientX - disX + 'px';
                obj.style.top = touch.clientY - disY + 'px';

                if (obj.offsetLeft <= 0) {  //左侧
                    obj.style.left = 0;
                }
                if (obj.offsetLeft >= pWidth - oWidth) {  //右侧
                    obj.style.left = pWidth - oWidth + 'px';
                }
                if (obj.offsetTop <= 0) {  //上面
                    obj.style.top = 0;
                }
                if (obj.offsetTop >= pHeight - oHeight) {  //下面
                    obj.style.top = pHeight - oHeight + 'px';
                }
            });
            // obj.addEventListener('touchend', function (event) {
            //     obj.removeEventListener('touchmove');
            //     obj.removeEventListener('touchend');
            // })
        });
    }
</script>
