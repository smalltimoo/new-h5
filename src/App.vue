<template>
    <div id="app">
        <router-view></router-view>
        <Modal v-model="winVisible"
                @on-visible-change="mWinVisibleChange"
                :width="cWinDialog.width"
                class-name="vertical-center-modal"
                :closable="true"
                :mask-closable="false"
                class="model-alert"
        >
            <div slot="header" v-text="cWinDialog.title"></div>
            <component
                    :is="cWinDialog.view"
                    v-if="cWinDialog.view!=''"
                    @callback="cWinDialog.callback"
                    @closecallback="cWinDialog.onclose"
                    :param-data="cWinDialog.paramData"
            ></component>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    import types from '@/store/mutation-types';
    import win from "@/mixins/window";
    export default {
        name: 'App',
        data: () => ({
            winVisible: false
        }),
        mixins: [win],
        components: {},
        computed: {
            GameTransferState: function() {
                return this.$store.state.app.GameTransferState;
            },
            loginState: function() {
                return this.$store.state.app.loginState;
            },
            cLoadingDialog: function() {
                return this.$store.getters.getLoadingModel;
            },
            cWinDialog: function() {
                this.winVisible = this.$store.getters.getWinModel.visible;
                return this.$store.getters.getWinModel;
            }
        },
        methods: {
            mWinVisibleChange(v) {
                if (!v) {
                    this.mWinClose();
                }
            },
        },
        created() {
            this.$store.commit(types.SESSION_TOKEN);
            this.$store.commit(types.CHANGE_URL, "")
            this.$store.dispatch(types.SYSTEM_SETTINGS, this);
        }
    }
</script>
