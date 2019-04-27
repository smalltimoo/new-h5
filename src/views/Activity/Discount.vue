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
                        <li class="icon-qq" v-if="agentQQ">
                            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'">{{agentQQ}}</a>
                        </li>
                    </ul>
                </Poptip>
            </div>
        </div>
        <div class="container">
            <div v-for="(item, index) in activities" :key="index" style="margin-top: 7px">
                <span v-text="item.quotaStartTimeStr" style="font-size: 12px;"></span>
                <div class="dis-panel" @click="showDrawer(item)">
                    <div class="dis-title">
                        <span v-text="item.activityTitle"></span>
                        <span class="tip">活动时间：{{item.startTimeStr}}</span>
                    </div>
                    <img :src="item.activityImg" style="width: 100%; border-radius: 5px;min-height: 90px;max-height: 95px">
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
                <div class="header-middle" v-text="activityInfo.activityTitle" style="font-size: 14px; font-weight: bold"></div>
                <div class="header-right"></div>
            </div>
            <img :src="activityInfo.infoMobileImgUrl" width="100%" style="margin-top: 40px"/>
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
        computed: {
            cQQ1() {
                let sysInfo = this.$store.getters.getSysInfo;
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
            showDrawer(item) {
                this.activityInfo = item;
                this.drawer = true;
            },
            mInit() {
                this.$http
                    .post("/activities.json",  {limit: 20, start: 0})
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
                        this.$nextTick(()=>{
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
