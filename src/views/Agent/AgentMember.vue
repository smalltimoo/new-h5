<template>
    <div class="main-body agent">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                代理中心
            </div>
            <div class="header-right">
                <router-link :to="{name:'AgentThat'}">代理说明</router-link>
            </div>
        </div>
        <div class="container">
            <div class="top">
                <img src="../../assets/images/uesrCenter/admin.png" width="50px"/>
                <div class="user-info">
                    <div style="display: flex;justify-content: space-between">
                        <span>账户：{{cLoginUser.username}}({{cLoginUser.id}})</span>
                        <router-link :to="{name:'AgentDrawing'}" class="drawer">提现</router-link>
                    </div>
                    <div>分红余额：{{parseFloat(sumAgent.agentBalance/100).toFixed(2)}} 元</div>
                </div>
            </div>
            <div class="agent-info">
                <router-link :to="{name:'MembermanAgement'}">
                    <div style="border: 0">
                        <span v-text="sumAgent.agentNum ? sumAgent.agentNum : 0"></span>
                        <span>代理人数</span>
                    </div>
                    <div>
                        <span v-text="sumAgent.totalNum"></span>
                        <span>会员人数</span>
                    </div>
                    <div>
                        <span v-text="sumAgent.totalTeamRakebackAmount/100"></span>
                        <span>分红金额</span>
                    </div>
                    <div>
                        <span v-text="parseFloat(sumAgent.totalTeamCashTotal/100).toFixed(2)"></span>
                        <span>提现金额</span>
                    </div>
                </router-link>
            </div>

            <div class="agent-icon">
                <div class="share">我要分享</div>
                <div class="icons">
                    <router-link :to="{name:'OpenInvitation'}" style="width: 50%">
                        <img src="../../assets/images/agent/agenttu1@2x.png" width="36px"/>
                        <span>推广链接</span>
                    </router-link>
                    <router-link :to="{name:'LinkManagement'}" style="width: 50%">
                        <img src="../../assets/images/agent/agenttu2@2x.png" width="36px"/>
                        <span>链接管理</span>
                    </router-link>
                </div>
            </div>
            <div class="agent-icon">
                <div class="share">其他服务</div>
                <div class="icons">
                    <router-link :to="{name:'AgentrEportforms'}" class="icon-panel">
                        <img src="../../assets/images/agent/agenttu4@2x.png" width="36px"/>
                        <span>会员管理</span>
                    </router-link>
                    <router-link :to="{name:'OpenAccounts'}" class="icon-panel">
                        <img src="../../assets/images/agent/agenttu5@2x.png" width="36px"/>
                        <span>下级开户</span>
                    </router-link>
                    <router-link :to="{name:'MembermanAgement'}" class="icon-panel">
                        <img src="../../assets/images/agent/agenttu6@2x.png" width="36px"/>
                        <span>代理报表</span>
                    </router-link>
                    <router-link :to="{name:'BettingdetailList'}" class="icon-panel">
                        <img src="../../assets/images/agent/agenttu7@2x.png" width="36px"/>
                        <span>投注明细</span>
                    </router-link>
                    <router-link :to="{name:'TransactionsdetailList'}" class="icon-panel">
                        <img src="../../assets/images/agent/agenttu8@2x.png" width="36px"/>
                        <span>交易明细</span>
                    </router-link>
                    <router-link :to="{name:'AgentCashList'}" class="icon-panel">
                        <img src="../../assets/images/agent/agenttu9@2x.png" width="36px"/>
                        <span>提现记录</span>
                    </router-link>
                    <router-link :to="{name:'AgentCoinList'}" class="icon-panel">
                        <img src="../../assets/images/agent/agenttu10@2x.png" width="36px"/>
                        <span>钱包日志</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: "AgentMember",
        data() {
            return {
                sumAgent: {
                    agentBalance: 0,
                    totalNum: 0,
                    totalTeamRakebackAmount: 0,
                    totalTeamCashTotal: 0
                }
            };
        },
        mounted() {
            this.$http
                .post("/agentUser/sumagent.json",
                    {
                        endTime: "",
                        orderBy: "id desc",
                        rows: "10",
                        startTime: "",
                        sysId: "0",
                        timeType: ""
                    })
                .then(result => {
                    if (result.code == 0) {
                        this.sumAgent = result.data;
                    } else {
                        this.$Message.error(result.message);
                        console.log(result.message);
                    }
                })

        },
    }
</script>
