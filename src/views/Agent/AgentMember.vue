<template>
  <div class="agent">
    <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      <div class="usercard">
        <div class="userbase">
          <div class="name_block">
            <div class="icon"></div>
            <div class="user_base_info">
              <p class="name">帅的被人砍</p>
              <div class="fillinfo">
                {{$t('agentMember.am9')}}
                <!-- <span class="icon icon_left"></span> -->
                <span class="text" v-text="parseFloat(sumAgent.totalTeamCashTotal/100).toFixed(2)"></span>
                <!-- <span class="icon icon_right"></span> -->
                {{$t('yuan')}}
              </div>
            </div>
          </div>
          <div class="qiandao">{{$t('agentMember.am4')}}</div>
        </div>
        <div class="usercount deposit">
          <div class="count_item">
            <router-link :to="{name:'Score'}">
              <span>
                {{sumAgent.totalNum}}
                <span style="font-size: 12px">{{$t('fen')}}</span>
              </span>
              <span>{{$t('agentMember.am8')}}</span>
            </router-link>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="count_item">
            <router-link :to="{name:'AssetsOverView'}">
              <span v-text="sumAgent.agentNum ? sumAgent.agentNum : 0"></span>
              <span>{{$t('agentMember.am7')}}</span>
            </router-link>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="count_item">
            <router-link :to="{name:'AssetsOverView'}">
              <span v-text="sumAgent.totalTeamRakebackAmount/100"></span>
              <span>{{$t('agentMember.am9')}}</span>
            </router-link>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="count_item">
            <router-link :to="{name:'AssetsOverView'}">
              <span v-text="parseFloat(sumAgent.totalTeamCashTotal/100).toFixed(2)"></span>
              <span>{{$t('agentMember.am10')}}</span>
            </router-link>
          </div>
        </div>
      </div>

      <div class="agent-icon">
        <div class="share">{{$t('agentMember.am11')}}</div>
        <div class="icons">
          <router-link :to="{name:'OpenInvitation'}" style="width: 33%">
            <img src="../../assets/images/agent/daili3@2x.png" width="41px">
            <span>{{$t('agentMember.am12')}}</span>
          </router-link>
          <router-link :to="{name:'LinkManagement'}" style="width: 33%">
            <img src="../../assets/images/agent/daili4@2x.png" width="41px">
            <span>{{$t('agentMember.am13')}}</span>
          </router-link>
          <router-link :to="{name:'LinkManagement'}" style="width: 33%">
            <img src="../../assets/images/agent/daili5@2x.png" width="41px">
            <span>{{$t('agentMember.am22')}}</span>
          </router-link>
        </div>
      </div>
      <div class="agent-icon">
        <div class="share">{{$t('agentMember.am14')}}</div>
        <div class="icons">
          <router-link :to="{name:'AgentrEportforms'}" class="icon-panel">
            <img src="../../assets/images/agent/daili6@2x.png" width="36px">
            <span>{{$t('agentMember.am15')}}</span>
          </router-link>
          <router-link :to="{name:'OpenAccounts'}" class="icon-panel">
            <img src="../../assets/images/agent/daili7@2x.png" width="36px">
            <span>{{$t('agentMember.am16')}}</span>
          </router-link>
          <router-link :to="{name:'MembermanAgement'}" class="icon-panel">
            <img src="../../assets/images/agent/daili8@2x.png" width="36px">
            <span>{{$t('agentMember.am17')}}</span>
          </router-link>
           <router-link :to="{name:'MembermanAgement'}" class="icon-panel">
            <img src="../../assets/images/agent/daili9@2x.png" width="36px">
            <span>{{$t('agentMember.am23')}}</span>
          </router-link>
          <router-link :to="{name:'BettingdetailList'}" class="icon-panel">
            <img src="../../assets/images/agent/daili10@2x.png" width="36px">
            <span>{{$t('agentMember.am18')}}</span>
          </router-link>
          <router-link :to="{name:'TransactionsdetailList'}" class="icon-panel">
            <img src="../../assets/images/agent/daili11@2x.png" width="36px">
            <span>{{$t('agentMember.am19')}}</span>
          </router-link>
          <router-link :to="{name:'AgentCashList'}" class="icon-panel">
            <img src="../../assets/images/agent/daili12@2x.png" width="36px">
            <span>{{$t('agentMember.am20')}}</span>
          </router-link>
          <router-link :to="{name:'AgentCoinList'}" class="icon-panel">
            <img src="../../assets/images/agent/daili13@2x.png" width="36px">
            <span>{{$t('agentMember.am21')}}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import types from "@/store/mutation-types";
import { mapState } from "vuex";
import headerComponent from "@/common/Header.vue";

export default {
  name: "AgentMember",
  data() {
    return {
      logo: this.$t("member.userMember.um18"),
      sumAgent: {
        agentBalance: 0,
        totalNum: 0,
        totalTeamRakebackAmount: 0,
        totalTeamCashTotal: 0
      }
    };
  },
  components:{
      headerComponent
  },
  mounted() {
    this.$http
      .post("/agentUser/sumagent.json", {
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
      });
  }
};
</script>

<style scoped>
.agent >>> .el-divider--vertical {
  display: inline-block;
  width: 0.5px;
  height: 15px;
  /* margin: 0 0.213333rem; */
  vertical-align: middle;
  position: relative;
  color: #fff;
  /* margin-top: -19px; */
}
</style>

