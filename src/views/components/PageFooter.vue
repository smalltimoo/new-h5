<template>
    <div class="footer">
        <ul>
            <li  :class="{active: tab=='Home'}" @click="changeTab('Home')">
                <i class="icon icon-home"></i>
                <div>首页大厅</div>
            </li>
            <li  :class="{active: tab=='Discount'}" @click="changeTab('Discount')">
                <i class="icon icon-activity"></i>
                <div>优惠活动</div>
            </li>
            <li @click="changeTab('Score')">
                <i class="icon icon-score"></i>
                <div class="score">积分商城</div>
            </li>
            <li :class="{active: tab=='OnlineDeposit'}" @click="changeTab('OnlineDeposit')">
                <i class="icon icon-deposit"></i>
                <div>快速存款</div>
            </li>
            <li :class="{active: tab=='UserMember'}" @click="changeTab('UserMember')">
                <i class="icon icon-user"></i>
                <div>个人中心</div>
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
        created() {}
    }
</script>
