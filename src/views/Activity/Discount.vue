<template>
    <div class="discount">
        <div class="header">
            <div class="header-left"></div>
            <div class="header-middle">
                优惠活动
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
                        <li class="icon-agent" v-if="agentQQ">
                            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'">{{agentQQ}}</a>
                        </li>
                        <li class="icon-line" v-if="sysInfo.lineCountry">
                            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'">{{sysInfo.lineUrl}}</a>
                        </li>
                    </ul>
                </Poptip>
            </div>
        </div>
        <div class="container">
            <div v-for="(item, index) in activities" :key="index" style="margin-top: 0px">
                <!--<span v-text="item.quotaStartTimeStr" style="font-size: 12px;"></span>-->
                <div class="dis-panel" @click="showDrawer(item)">
                    <div class="dis-title">
                        <!--<span v-text="item.activityTitle"></span>-->
                        <!--<span class="tip">活动时间：{{item.startTimeStr}}</span>-->
                    </div>
                    <img :src="item.activityImg"
                         style="width: 100%; border-radius: 5px;min-height: 90px;max-height: 95px">
                    <!--<div class="tip" v-text="item.giveTypeStr" style="text-align: left;border-bottom:solid 1px #f3f3f3;padding-bottom: 4px"></div>-->
                    <div class="go" style="border-top:solid 1px #f3f3f3">
                        <span>查看详情</span>
                        <Icon type="ios-arrow-forward" class="icon-menu"/>
                    </div>
                </div>
            </div>
        </div>
        <Drawer :closable="false" v-model="drawer" width="100" class="discount-drawer">
            <div class="header">
                <div class="header-left">
                    <Icon type="ios-arrow-back" class="icon-menu" @click="drawer=false"/>
                </div>
                <div class="header-middle" v-text="activityInfo.activityTitle"
                     style="font-size: 14px; font-weight: bold"></div>
                <div class="header-right"></div>
            </div>
            <div class="sign" @click="signed"
                 v-if="activityInfo.activityType==6 || activityInfo.activityType==7 || activityInfo.activityType==8 || activityInfo.activityType==9">
                <span v-if="activityInfo.signed"><b>已领取</b></span>
                <span v-else><b>领取</b></span>
            </div>
            <div class="sign" @click="signed" v-if="activityInfo.activityType==10">
                <span v-if="activityInfo.signed"><b>已签到</b></span>
                <span v-else><b>签到</b></span>
            </div>
            <img :src="activityInfo.infoMobileImgUrl" width="100%" style="margin-top: 44px"/>
        </Drawer>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activities: [],
                drawer: false,
                activityInfo: {
                    activityTitle: '',
                    activityInfo: '',
                    startTimeStr: '',
                    endTimeStr: '',
                    activityTypeStr: '',
                    infoMobileImgUrl: ''
                }
            };
        },
        methods: {
            showDrawer(item) {
                this.activityInfo = item;
                this.drawer = true;
                if ([6, 7, 8, 9, 10].includes(this.activityInfo.activityType)) {
                    this.$http
                        .post("/activity/isCheckIn.json", {
                            activityId: this.activityInfo.id,
                            memberId: this.cLoginUser.id
                        })
                        .then(result => {
                            if (result.code == 0) {
                                this.activityInfo = {...this.activityInfo, ...{signed: result.data}};
                            }
                        })
                }
            },
            signed() {
                if (this.activityInfo.signed) {
                    return;
                }
                this.$http
                    .post("/activity/isJoin.json", {
                        activityId: this.activityInfo.id,
                        memberId: this.cLoginUser.id,
                        joinCycle:this.activityInfo.joinCycle,
                        activityType:this.activityInfo.activityType
                    })
                    .then(result => {
                        if (result.code == 0) {
                            if (result.data) {
                                this.activityInfo = {...this.activityInfo, ...{signed: true}};
                                this.activityInfo.activityType == 10 ? this.$Message.success('签到成功！') : this.$Message.success('领取成功！');
                            }
                        }
                        else {
                            this.$Message.error(result.message);
                        }
                    })
            },
            mInit() {
                this.$http
                    .post("/activities.json", {limit: 20, start: 0})
                    .then(result => {
                        if (result.code == 0) {
                            let list = result.data.activityVoList
                                ? result.data.activityVoList
                                : [];
                            list.forEach(element => {
                                element.selected = false;
                            });
                            this.activities = list;
                        }
                    })
                    .then(() => {
                        this.$nextTick(() => {
                            this.id = this.$route.query.id;
                            if (this.id) {
                                this.showDrawer(this.activities.filter(item => this.id == item.id)[0])
                            }
                        })
                    })
            }
        },
        created() {
            this.mInit();
            this.$store.commit('CHANGE_TAB', "Discount");
        }
    };
</script>
<style scoped>
    .sign {
        position: absolute;
        top: 100px;
        right: 15px;
        width: 50px;
        height: 50px;
        border-radius: 50px;
        background-color: #d0af3a;
        color: #fff;
        justify-content: center;
        align-items: center;
        display: flex;
        font-size: 14px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        cursor: pointer;
    }
</style>
