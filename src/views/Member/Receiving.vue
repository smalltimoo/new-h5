<template>
    <div id="receive">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{$t("member.receiving.receive1")}}
            </div>
            <div class="header-right"></div>
        </div>
        <div style="background-color: #fff;">
            <ul class="receive-ul">
                <li>
                    <span>{{$t("member.receiving.receive3")}}:</span>
                    <input type="text"
                           ref="realName"
                           v-model="vm.memberName"
                           autocomplete="off"
                           validateevent="true"
                           :placeholder="$t('member.receiving.receive4')"
                           @click="$refs.tip1.close()"
                           class="input-name"
                    />
                    <cube-tip
                            ref="tip1"
                            class="tip"
                            direction="top"
                    >
                        {{ $t("member.receiving.receive10") }}
                    </cube-tip>
                </li>
                <li>
                    <span>{{$t("member.receiving.receive5")}}:</span>
                    <input type="number"
                           ref="phone"
                           v-model="vm.phone"
                           autocomplete="off"
                           :placeholder="$t('member.receiving.receive6')"
                           @click="$refs.tip2.close()"
                           class="input-name"
                    />
                    <cube-tip ref="tip2"
                              class="tip"
                              direction="top"
                    >
                        {{ $t("member.receiving.receive11") }}
                    </cube-tip>
                </li>
                <li>
                    <span>{{$t("member.receiving.receive7")}}:</span>
                    <input type="text"
                           ref="phone"
                           v-model="vm.address"
                           autocomplete="off"
                           :placeholder="$t('member.receiving.receive14')"
                           @click="$refs.tip3.close()"
                           class="input-name"
                    />
                    <cube-tip ref="tip3"
                              class="tip"
                              direction="top"
                    >
                        {{ $t("member.receiving.receive12") }}
                    </cube-tip>
                </li>
            </ul>
        </div>
        <div v-if="this.data==''">
            <cube-button @click="mSaveAdd" class="save-btn">
                {{$t("member.receiving.receive8")}}
            </cube-button>
        </div>
        <div style="width: 100%; text-align: left;padding-left: 15px;line-height: 40px;" v-else>
            温馨提示: 如需修改信息, 请联系
            <span style="color:red" @click="mOpenCService">在线客服</span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                nameVisible: true,
                vm: {},
                data: ""
            };
        },
        mounted() {
            this.mInit();
        },
        methods: {
            mInit() {
                this.$http.get("/memberUser/getMemberAddress.json").then(result => {
                    if (result.code == 0) {
                        this.vm = !!result.data ? result.data : {};
                        this.data = result.data;
                    }
                });
            },
            goBack() {
                this.$router.back();
            },
            mSaveAdd() {
                if (!this.vm.memberName) {
                    this.$refs.tip1.show()
                    return;
                }
                if (!this.vm.phone) {
                    this.$refs.tip2.show()
                    return;
                }
                if (!this.vm.address) {
                    this.$refs.tip3.show()
                    return;
                }
                this.mLoading(true);
                this.$http
                    .post("/memberUser/saveMemberAddress.json", this.vm)
                    .then(result => {
                        this.mLoading(false);
                        if (result.code == 0) {
                            //恭喜，设置成功！
                            this.$Message.success(this.$t("member.receiving.receive13"));
                            this.mInit()
                        } else {
                            this.$Message.error(result.message);
                        }
                    });
            }
        }
    };
</script>
<style scoped>

    .receive {

    }

    .tip {
        margin-top: 50px;
        margin-left: 70px
    }

    .receive-ul > li {
        height: 45px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: solid 1px #eaeaea;
        padding: 0 10px;
        overflow: hidden;
    }

    .receive-ul > li > span {
        width: 80px;
        text-align: left;
    }

    .input-name {
        padding-left: 10px;
        outline: none;
        border: 0;
        height: 45px;
        width: 240px;
    }
</style>

