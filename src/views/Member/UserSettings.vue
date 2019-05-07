<template>
    <div class="main-body">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{ $t('member.userSetting.us1') }}
            </div>
            <div class="header-right">
            </div>
        </div>
        <div class="userSettings" style="margin-top: 60px">
            <div class="el-row" style="margin-top: 5px;">
                <div class="el-col el-col-24">
                    <div class=" bg-purple-dark">
                        <router-link :to="{name:'SafaPassword'}">
                            {{ $t('member.userSetting.us2') }}
                            <div class=" rf"><!--提款密码 -->
                                <span v-if="coinPassword==''">{{ $t('member.userSetting.us3') }}</span> <!--未设置 -->
                                <span v-else>{{ $t('member.userSetting.us4') }}</span><!-- 已设置-->
                                <span class="el-icon-arrow-right" style="padding-left: 8px;"></span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class=" bg-purple-dark">
                        <router-link :to="{name:'LoginPassword'}">
                            {{ $t('member.userSetting.us5') }} <!-- 登录密码-->
                            <span class="el-icon-arrow-right rf"></span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="el-row" style="margin-top: 5px;">
                <div class="el-col el-col-24">
                    <div class=" bg-purple-dark">
                        <router-link :to="{name:'UserBankCard'}" class="texts">
                            {{ $t('member.userSetting.us6') }}
                            <div class="rf">
                                <span style="padding-right: 8px;" v-if="vm.drawAccountType == 0">{{ $t('member.userSetting.us7') }}</span> <!--银行卡 -->
                                <span style="padding-right: 8px;" v-else>{{ $t('member.userSetting.us8') }}</span>  <!-- 尚未绑定-->
                                <span class="el-icon-arrow-right"></span> <!--已绑定 -->
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import win from "@/mixins/mixin";
    export default {
        data() {
            return {
                vm: {
                    drawAccountType: "",
                    mobile: ""
                },
                coinPassword: ""
            };
        },
        computed: {
            sysInfo: function() {
                return this.$store.getters.getSysInfo;
            },
        },
        mixins: [win],
        mounted() {
            this.mLoading(true);
            this.$http.all([ this.mGetBindBank()]).then(
                this.$http.spread((rbindbank) => {
                    console.log(rbindbank.data);
                    this.mLoading(false);
                    if (rbindbank.code == 0) {
                        this.vm = Object.assign(this.vm, rbindbank.data);
                    }
                })
            );
            this.mLoading(true);
            this.$http.get("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    this.coinPassword = result.data.coinPassword;
                }
            });
        },
        methods: {
            mGetBanks() {
                // return this.$http.post("/banktypes.json",{lineCountry:this.sysInfo.lineCountry});
            },
            mGetBindBank() {
                return this.$http.get("/memberUser/getbindbank.json");
            }
        }
    };
</script>
<style scoped>
    .userSettings {
        width: 100%;
        font-size: 0;
    }

    .userSettings .bg-purple-dark {
        background: #545478;
    }

    .userSettings .bg-purple-dark .texts,
    .userSettings .bg-purple-dark a {
        width: 100%;
        text-align: left;
        font-size: 14px;
        color: #4c4c4c;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }


    .userSettings .bg-purple-dark{
        background-color: #fff;
        border-bottom: solid 1px #f3f3f3;
        height: 40px;
        padding: 3px 10px;
        /*flex-direction: column;*/

    }

</style>
