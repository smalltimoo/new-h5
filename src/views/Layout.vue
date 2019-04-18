<template>
    <div class="page-body">
        <router-view></router-view>
        <page-footer></page-footer>
    </div>
</template>
<script>
    import types from "@/store/mutation-types";
    import PageFooter from "@/views/components/PageFooter";
    import message from '@/mixins/message'

    export default {
        name: "Layout",
        mixins: [message],
        components: {
            PageFooter,
        },
        data: () => ({}),
        created() {
            this.mCheckLoginState();
            this.$store.dispatch(types.COMMON_GONGGAO, this);
            // this.showFooter = ['Home', 'Discount', 'Score', 'OnlineDeposit', 'UserMember'].includes(this.$route.name);
        }
    };
</script>
