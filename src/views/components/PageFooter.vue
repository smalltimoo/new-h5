<template>
    <div class="footer">
        <ul>
            <li  :class="{active: tab=='Home'}" @click="changeTab('Home')">
                <i class="icon icon-home"></i>
                <div>{{$t('pageFooter.home')}}</div>
            </li>
            <li  :class="{active: tab=='Discount'}" @click="changeTab('Discount')">
                <i class="icon icon-activity"></i>
                <div>{{$t('pageFooter.discount')}}</div>
            </li>
            <li @click="changeTab('Score')">
                <i class="icon icon-score"></i>
                <div class="score">{{$t('pageFooter.score')}}</div>
            </li>
            <li :class="{active: tab=='OnlineDeposit'}" @click="changeTab('OnlineDeposit')">
                <i class="icon icon-deposit"></i>
                <div>{{$t('pageFooter.onlineDeposit')}}</div>
            </li>
            <li :class="{active: tab=='UserMember'}" @click="changeTab('UserMember')">
                <i class="icon icon-user"></i>
                <div>{{$t('pageFooter.memberCenter')}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: 'PageFooter',
        data() {
            return {
                showDownApp: true
            }
        },
        computed: {
            ...mapState({
                tab: state => state.common.tab,
            }),
            cNeedLogin() {
                return this.$store.getters.getNeedLogin;
            },
        },
        mounted() {
            // this.mMemberAmount()
        },
        methods: {
            changeTab(tab) {
                this.$store.commit('CHANGE_TAB', tab);
                this.$router.push({name: tab})
            },
        },
        created() {
            if(this.cNeedLogin == true){
                this.$http.post('/getLoginUser.json').then(result => {
                    if (result.code == 0) {
                        this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
                        this.mLoading(false)
                        this.mMessage(
                            '登陆成功！',
                            () => {
                                this.$store.dispatch(types.COMMON_GONGGAO, this)
                                this.$router.push({name: "Home"});
                            },
                            'success',
                            0.5
                        )
                    }
                })
            }
        }
    }
</script>
