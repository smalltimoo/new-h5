<template>
  <div class="agent">
    <div class="header">
      <div class="header-left">
        <Icon type="ios-arrow-back" class="icon-menu" @click.stop="goBack"/>
        <span class="logo">{{logo}}</span>
      </div>
      <div class="header-middle">
        <!-- {{$t('member.onlineDeposit.od1')}} -->
      </div>
      <div class="header-right">
         <router-link class="desc" :to="{name:'AgentThat'}">{{$t('agentMember.am2')}}</router-link>
        <Poptip trigger="click" placement="bottom-end">
          <i class="icon-menu message"></i>
          <ul slot="content">
            <li class="icon-kefu" @click="mOpenCService">{{$t('customservice')}}</li>
            <li class="icon-qq" :style="{display:cQQ1||cQQ2?'block':'none'}">
              <a
                v-if="cQQ1"
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ1+'&version=1&src_type=web'"
              >{{cQQ1}}</a>
              <a
                v-if="cQQ2"
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+cQQ2+'&version=1&src_type=web'"
              >{{cQQ2}}</a>
            </li>
            <li class="icon-agent" v-if="agentQQ">
              <a
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'"
              >{{agentQQ}}</a>
            </li>
            <li class="icon-line" v-if="sysInfo.lineUrl">
              <a
                :href="'mqqwpa://im/chat?chat_type=wpa&uin='+agentQQ+'&version=1&src_type=web'"
              >{{sysInfo.lineUrl}}</a>
            </li>
          </ul>
        </Poptip>
      </div>
    </div>
    <div class="container">
      <div class="usercard">
        <div class="userbase">
          <div class="name_block">
            <div class="icon"></div>
            <div class="user_base_info">
              <p class="name">{{cLoginUser.userName2}}({{cLoginUser.id}})</p>
              <div class="fillinfo">
                {{$t('agentMember.am9')}}
                <!-- <span class="icon icon_left"></span> -->
                <span class="text" v-text="parseFloat(sumAgent.totalTeamCashTotal/100).toFixed(2)"></span>
                <!-- <span class="icon icon_right"></span> -->
                {{$t('yuan')}}
              </div>
            </div>
          </div>
          <router-link :to="{name:'AgentDrawing'}" class="qiandao">{{$t('agentMember.am4')}}</router-link>
          <!-- <div class="qiandao">{{$t('agentMember.am4')}}</div> -->
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
          <!-- 会员管理 -->
          <router-link
            :to="{name:'LinkManagement',query:{name:'AgentrEportforms'}}"
            class="icon-panel"
          >
            <img src="../../assets/images/agent/daili6@2x.png" width="36px">
            <span>{{$t('agentMember.am15')}}</span>
          </router-link>
          <!-- 下级开户 -->
          <router-link :to="{name:'OpenAccounts'}" class="icon-panel">
            <img src="../../assets/images/agent/daili7@2x.png" width="36px">
            <span>{{$t('agentMember.am16')}}</span>
          </router-link>
          <!-- 代理报表 -->
          <router-link :to="{name:'mjiaoyi',query:{name:'MembermanAgement'}}" class="icon-panel">
            <img src="../../assets/images/agent/daili8@2x.png" width="36px">
            <span>{{$t('agentMember.am17')}}</span>
          </router-link>
          <!-- 下级报表 -->
          <router-link
            :to="{name:'mjiaoyi',query:{name:'transactionsDetaillist'}}"
            class="icon-panel"
          >
            <img src="../../assets/images/agent/daili9@2x.png" width="36px">
            <span>{{$t('agentMember.am23')}}</span>
          </router-link>
          <!-- 投注明细 -->
          <router-link :to="{name:'mjiaoyi',query:{name:'bettingDetailList'}}" class="icon-panel">
            <img src="../../assets/images/agent/daili10@2x.png" width="36px">
            <span>{{$t('agentMember.am18')}}</span>
          </router-link>
          <!-- 交易明细 -->
          <router-link
            :to="{name:'mjiaoyi',query:{name:'transactionsDetaillist'}}"
            class="icon-panel"
          >
            <img src="../../assets/images/agent/daili11@2x.png" width="36px">
            <span>{{$t('agentMember.am19')}}</span>
          </router-link>
          <!-- 提现记录 -->
          <router-link :to="{name:'mjiaoyi',query:{name:'agentCashList'}}" class="icon-panel">
            <img src="../../assets/images/agent/daili12@2x.png" width="36px">
            <span>{{$t('agentMember.am20')}}</span>
          </router-link>
          <!-- 钱包日志 -->
          <router-link :to="{name:'mjiaoyi',query:{name:'agentCoinList'}}" class="icon-panel">
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
  components: {
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
.header-right .desc {
  font-size: 12px;
	line-height: 35px;
	letter-spacing: 1px;
	color: #303133;
}
</style>

