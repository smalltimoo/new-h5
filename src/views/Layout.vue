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
        methods:{
            alertDownloadApp() {
                if (!this.cNeedLogin) {
                    this.$http.post('/memberUser/isPopups.json', {isPopups: true}).then(result => {
                        if (result.code == 0) {
                            if(result.data.list && result.data.list.length>0){
                                this.alert = result.data.list[0];
                                this.$alert(this.alert.msgInfo, this.alert.msgTitle, {
                                    dangerouslyUseHTMLString: true,
                                });
                            }
                        }
                    })
                }
            }
        },
        created() {
            this.mCheckLoginState();
            this.alertDownloadApp();
            this.$store.dispatch(types.COMMON_GONGGAO, this);
            // this.showFooter = ['Home', 'Discount', 'Score', 'OnlineDeposit', 'UserMember'].includes(this.$route.name);
        }
    };
</script>
