<template>
    <div class="discount">
        <header-component :showyue="true" :logo="logo" :showIcon="false" :showLogo="true"></header-component>
        <div class="container">
            <div class="activity-type">
                <span :class="{active: isJoin=='-1'}" @click="changeTab('-1')">{{$t('discount.dis1')}}</span>
                <span :class="{active: isJoin=='0'}" @click="changeTab('0')">{{$t('discount.dis2')}}</span>
                <span :class="{active: isJoin=='1'}" @click="changeTab('1')">{{$t('discount.dis3')}}</span>
                <span :class="{active: isJoin=='2'}" @click="changeTab('2')">{{$t('discount.dis10')}}</span>
            </div>
            <div  class="no-list" v-if="(!avtByIsJoin||avtByIsJoin.length==0)" style="top: 100px;bottom:100px;left: 0;"></div>
            <div v-for="(item, index) in avtByIsJoin" :key="index" style="margin-top: 10px">
                <!--<span v-text="item.quotaStartTimeStr" style="font-size: 12px;"></span>-->
                <div class="dis-panel">
                    <div class="dis-title">
                        <!--<span v-text="item.activityTitle"></span>-->
                        <!--<span class="tip">活动时间：{{item.startTimeStr}}</span>-->
                    </div>
                    <img :src="item.activityImg" @click="showDrawer(item)"
                         style="width: 100%; border-radius: 5px;min-height: 90px;max-height: 95px">
                    <div class="tip">
                        <div class="tip_left">
                            <span v-text="item.activityTitle" class="_tip tip_title"></span>
                             <span v-text="item.activityDesc" class="_tip tip_text" ></span>
                             <span v-text="item.endTimeStr" class="_tip time" ></span>
                        </div>
                        <div class="tip_right">
                            <span class="join" v-if="[6, 7, 8, 9].includes(item.activityType) && item.isJoin=='0'" @click="signed(item)">{{$t('discount.dis4')}}</span>
                            <span class="joined" v-if="[6, 7, 8, 9].includes(item.activityType) && item.isJoin=='1'">{{$t('discount.dis5')}}</span>
                            <span class="join" v-if="item.activityType==10 && item.isJoin=='0'" @click="signed(item)">{{$t('discount.dis6')}}</span>
                            <span class="joined" v-if="item.activityType==10 && item.isJoin=='1'">{{$t('discount.dis7')}}</span>
                        </div>
                        
                        
                    </div>
                    <div class="go"  @click="showDrawer(item)" style="height:14px;">
                        <!-- <span>{{$t('discount.look')}}</span> -->
                        <!-- <Icon type="ios-arrow-forward" class="icon-menu"/> -->
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
            <img :src="activityInfo.infoMobileImgUrl" width="100%" class="activity-image"/>
        </Drawer>
    </div>
</template>
<script>
import headerComponent from '@/common/Header.vue'
    export default {
        name:'Discount',
        components:{
            headerComponent
        },
        data() {
            return {
                logo:'活动',
                isJoin: -1,
                activities: [],
                avtByIsJoin: [],
                drawer: false,
                loading:false,
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
            changeTab(isJoin) {
                this.isJoin =  isJoin || this.isJoin;
                if (this.isJoin == -1) {
                    this.avtByIsJoin = this.activities;
                } else {
                    this.avtByIsJoin = this.activities.filter(item => item.isJoin == this.isJoin);
                }
            },
            showDrawer(item) {
                this.activityInfo = item;
                this.drawer = true;
            },
            signed(item) {
                if(this.loading){return;}
                this.loading=true;
                this.$http
                    .post("/activity/joinActivity.json", {
                        activityId: item.id,
                        memberId: this.cLoginUser.id,
                        joinCycle: item.joinCycle,
                        activityType: item.activityType
                    })
                    .then(result => {
                        this.loading=false;
                        if (result.code == 0) {
                            if (result.data) {
                                item == 10 ? this.$Message.success(this.$t('discount.dis9')) : this.$Message.success(this.$t('discount.dis8'))
                                this.mInit();
                            }
                        } else {
                            this.$Message.error(result.message);
                        }
                    })
                    .catch(error=>{
                        this.loading=false;
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
                            this.changeTab();
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
