<template>
    <div class="footer">
        <ul>
            <router-link :to="{name:'Home'}" tag="li" :class="{active: tab=='home'}" @click="changeTab('home')">
                <i class="icon icon-home"></i>
                <div>首页大厅</div>
            </router-link>
            <router-link :to="{name:'Activities'}" tag="li" :class="{active: tab=='activity'}" @click="changeTab('activity')">
                <i class="icon icon-activity"></i>
                <div>优惠活动</div>
            </router-link>
            <router-link :to="{name:'Score'}" tag="li" :class="{active: tab=='score'}" @click="changeTab('score')">
                <i class="icon icon-score"></i>
                <div class="score">积分商城</div>
            </router-link>
            <router-link :to="{name:'OnlineDeposit'}" tag="li" :class="{active: tab=='deposit'}" @click="changeTab('deposit')">
                <i class="icon icon-deposit"></i>
                <div>快速存款</div>
            </router-link>
            <router-link :to="{name:'UserMember'}" tag="li" :class="{active: tab=='user'}" @click="changeTab('user')">
                <i class="icon icon-user"></i>
                <div>个人中心</div>
            </router-link>
        </ul>
    </div>
</template>
<script>
    import types from '@/store/mutation-types'
    import message from '@/mixins/message'
    export default {
        name: 'PageFooter',
        mixins: [message],
        data() {
            return {
                tab: 'home',
                showDownApp: true
            }
        },
        computed: {
            cNeedLogin() {
                return this.$store.getters.getNeedLogin
            },
            getAppUrl: function () {
                // background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
                var sysobj = this.$store.getters.getSysPicObj;
                if (sysobj.appUrl != undefined) {
                    return sysobj.appUrl;
                }
            },
        },
        mounted() {
            // this.mMemberAmount()
        },
        methods: {
            changeTab(tab){
                this.tab=tab;
            },
            mCheckLoginState() {
                this.$store.dispatch(types.LOAD_LOGIN_USER);
                if (this.$store.getters.getNeedLogin) {
                    this.$store.dispatch(types.LOGINOUT_USER);
                    this.$store.dispatch(types.COMMON_GONGGAO, this);
                    if (this.$route.name !== "Reg") {
                        this.$router.push({name: "Home"});
                    }
                }
            },
        },
        created() {
            this.mVCode()
            this.mCheckLoginState()
        }
    }
</script>
