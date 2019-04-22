<template>
    <div class="main-body">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{ $t('member.userLimit.ul1') }}
            </div>
            <div class="header-right">
                <Poptip trigger="click" placement="bottom-end">
                    <i class="icon-menu message"></i>
                    <ul slot="content">
                        <li class="icon-kefu" @click="mOpenCService">
                            在线客服
                        </li>
                        <li class="icon-qq">
                            <a v-if="cQQ1" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ1+'&version=1&src_type=web'">
                                {{cQQ1}}
                            </a>
                            <a v-if="cQQ2" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ2+'&version=1&src_type=web'">
                                {{cQQ2}}
                            </a>
                        </li>
                        <li class="icon-qq">
                            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'">{{agentQQ}}</a>
                        </li>
                    </ul>
                </Poptip>
            </div>
        </div>
        <div class="limit" style="margin-top: 60px">
            <div class="bg-purple-dark"><!--用户名 -->
                <span>{{ $t('member.userLimit.ul4') }}</span>
                <span class="info">{{info.username}}</span>
            </div>
            <div class="bg-purple-dark"><!--用户ID -->
                <span>{{ $t('member.userLimit.ul5') }}</span>
                <span class="info">&nbsp;{{info.id}}</span>
            </div>
            <div class="bg-purple-dark"><!--用户ID -->
                <span>{{ $t('member.userLimit.ul6') }}</span>
                <span class="info" >{{info.realName}}</span>
            </div>
            <div class="bg-purple-dark"><!--用户ID -->
                <span>{{ $t('member.userLimit.ul7') }}</span>
                <span class="info" v-if="info.mobile">{{info.mobile}}</span>
                <span class="info" v-else>未设置</span>
            </div>
            <div class="bg-purple-dark"><!--用户ID -->
                <span>{{ $t('member.userLimit.ul8') }}</span>
                <span class="info" v-if="info.weixin">{{info.weixin}}</span>
                <span class="info" v-else>未设置</span>
            </div>
            <div class="bg-purple-dark"><!--用户ID -->
                <span>{{ $t('member.userLimit.ul9') }}</span>
                <span class="info" v-if="info.qq">{{info.qq}}</span>
                <span class="info" v-else>未设置</span>
            </div>
        </div>
        <div style="height: 40px;width: 100%;line-height: 40px;text-align: left;padding-left: 15px;color: #000;">
            {{ $t('member.userLimit.ul10') }}
        </div>
        <div class="limit">
            <div class="bg-purple-dark"><!--注册时间 -->
                <span>{{ $t('member.userLimit.ul11') }}</span>
                <span class="info" >{{info.createTimeStr}}</span>
            </div>
            <div class="bg-purple-dark"><!-- 最后登录时间-->
                <span>{{ $t('member.userLimit.ul12') }}</span>
                <span class="info" >{{info.lastLoginStr}}</span>
            </div>
        </div>
        <div class="title" style="margin-top: 20px;font-size: 13px"><!--  温馨提示 ： 如需修改信息，请联系-->
            <span>温馨提醒: 如需修改信息，请联系</span>
            <a href="javascript:void(0)"
               @tap="mOpenCService"
               style="color: rgb(184, 17, 9);"
            >{{ $t('member.userBankCard.ubc11') }}</a><!-- 在线客服-->
        </div>
    </div>

</template>

<script>
    import types from "@/store/mutation-types";
    import message from "@/mixins/message";
    import {mapState} from 'vuex';

    export default {
        mixins: [message],
        data() {
            return {
                info: {
                    username: "",
                    realName: "",
                    mobile: "",
                    qq: "",
                    weixin: "",
                    createTimeStr: "",
                    lastLoginStr: "",
                    id: 0,
                }
            };
        },
        computed: {
            ...mapState({
                sysPicObj: state => state.common.sysPicObj,
            }),
        },
        mounted() {
            this.mLoading(true);
            this.$http.get("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    this.info.username = result.data.username;
                    this.info.realName = result.data.realName;
                    this.info.mobile = result.data.mobile;
                    this.info.qq = result.data.qq;
                    this.info.weixin = result.data.weixin;
                    this.info.createTimeStr = result.data.createTimeStr;
                    this.info.lastLoginStr = result.data.lastLoginStr;
                    this.info.id = result.data.id;
                }
            });
        },
    };
</script>

<style>

    .gameLimit {
        font-size: 0;
        width: 100%;
        margin-top: 60px;
    }

    .limit{
        width: 100%;
    }

    .gameLimit .grid-content {
        height: 35px;
        line-height: 35px;
        text-align: left;
        padding-left: 16px;
        font-size: 14px;
    }

    .bg-purple-dark {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        background: #ffffff;
        height: 44px;
        line-height: 44px;
        color: #4c4c4c;
        font-weight: 700;
        width: 100%;
        padding: 0 15px;
        border-bottom: 1px solid #f3f3f3;
    }

    .gameLimit .el-button--primary {
        background-color: #ffb301;
        border-color: #ffc501;
    }

    .gameLimit .info {
        position: absolute;
        right: 16px;
        top: 0;
        text-align: right;
        min-width: 90px;
    }
</style>
