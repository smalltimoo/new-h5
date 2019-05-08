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
            GameTransferState: function () {
                return this.$store.state.app.GameTransferState;
            },
            loginState: function () {
                return this.$store.state.app.loginState;
            },
            darkTheme: function () {
                return this.$store.getters.getTheme;
            },
            cLoadingDialog: function () {
                return this.$store.getters.getLoadingModel;
            },
            cWinDialog: function () {
                this.winVisible = this.$store.getters.getWinModel.visible;
                return this.$store.getters.getWinModel;
            }
        },
        watch: {
            darkTheme: {
                handler(newName, oldName) {
                    if (newName) {
                        document.body.classList.add('theme')
                    } else {
                        document.body.classList.remove('theme')
                    }
                },
                immediate: true
            }
        },
        methods: {
            mWinVisibleChange(v) {
                if (!v) {
                    this.mWinClose();
                }
            },
            alertDownloadApp() {
                this.$http.post('/memberUser/isPopups.json', {isPopups: true}).then(result => {
                    if (result.code == 0) {
                        if (result.data.list && result.data.list.length > 0) {
                            this.alert = result.data.list[0];
                            this.$alert(this.alert.msgInfo, this.alert.msgTitle, {
                                dangerouslyUseHTMLString: true,
                            });
                        }
                    }
                })
            }
        },
        mounted() {
            this.alertDownloadApp();
        },
        created() {
            this.$store.commit(types.SESSION_TOKEN);
            this.$store.commit(types.CHANGE_URL, "")
            this.$store.dispatch(types.SYSTEM_SETTINGS, this);
        }
    }
</script>
