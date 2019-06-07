<template>
  <div class="user-member">
    <header-component :logo="logo" :showIcon="true" :showLogo="false"></header-component>
    <div class="container">
      <div class="usercard">
        <div class="userbase">
          <div class="name_block">
            <div class="icon"></div>
            <div class="user_base_info">
              <p class="name">帅的被人砍</p>
              <div class="fillinfo">
                <span class="icon icon_left"></span>
                <span class="text">快速完善资料</span>
                <span class="icon icon_right"></span>
              </div>
            </div>
          </div>
          <div class="qiandao">签到应积分</div>
        </div>
        <div class="usercount deposit">
          <div class="count_item">
            <router-link :to="{name:'Score'}">
            
              <span v-if="cLoginUser.integral || cLoginUser.integral==0">
                {{ cLoginUser.integral ? parseFloat(cLoginUser.integral/100).toFixed(2) :'0.00' }}
                <span
                  style="font-size: 12px"
                >{{$t('fen')}}</span>
              </span>
              <i class="el-icon-loading" v-else></i>
                <span>{{this.$t('member.userMember.um4')}}</span>
            </router-link>
          </div>
           <el-divider direction="vertical"></el-divider>
          <div class="count_item">
            <router-link :to="{name:'AssetsOverView'}">
              
              <span v-if="amount || cLoginUser.integral==0">
                {{ parseFloat(amount/100).toFixed(2) }}
                <span style="font-size: 12px">{{$t('yuan')}}</span>
              </span>
              <i class="el-icon-loading" v-else></i>
              <span>{{this.$t('member.userMember.um5')}}</span>
            </router-link>
          </div>
           <el-divider direction="vertical"></el-divider>
          <div class="count_item">
            <router-link :to="{name:'AssetsOverView'}">
              
              <span v-if="totalCoins || cLoginUser.integral==0">
                {{ parseFloat(totalCoins/100).toFixed(2) }}
                <span
                  style="font-size: 12px"
                >{{$t('yuan')}}</span>
              </span>
              
              <i class="el-icon-loading" v-else></i>
              <span>{{this.$t('member.userMember.um6')}}</span>
            </router-link>
          </div>
        </div>
        <div class="userpay">
          <div>
            <router-link :to="{name:'Score'}">
              <img src="@/assets/images/mycenter/wode2@2x.png" />
              <span>充值</span>
            </router-link>
          </div>
          <div>
            <router-link :to="{name:'Score'}">
              <img src="@/assets/images/mycenter/wode3@2x.png" />
              <span>转账</span>
            </router-link>
          </div>
          <div>
            <router-link :to="{name:'Score'}">
              <img src="@/assets/images/mycenter/wode4@2x.png" />
              <span>提现</span>
            </router-link>
          </div>
         
        </div>
      </div>
     
      <div class="router-panel">
        <!-- <div class="title">{{this.$t('member.userMember.um7')}}</div> -->
        <div class="my-pay">
          <router-link :to="{name:'IndoorTransfer'}">
            <div>
              <img src="../../assets/images/mycenter/wode10@2x.png" width="43px">
            </div>
            <span>{{this.$t('member.userMember.um8')}}</span>
          </router-link>
          <router-link :to="{name:'CapitalRecord'}">
            <div>
              <img src="../../assets/images/mycenter/wode9@2x.png" width="43px">
            </div>
            <span>{{this.$t('member.userMember.um9')}}</span>
          </router-link>
          <router-link :to="{name:'RechargeRecord'}">
            <div>
              <img src="../../assets/images/mycenter/wode11@2x.png" width="43px">
            </div>
            <span>{{this.$t('member.userMember.um10')}}</span>
          </router-link>
          <router-link :to="{name:'TransferRecords'}">
            <div>
              <img src="../../assets/images/mycenter/wode8@2x.png" width="43px">
            </div>
            <span>{{this.$t('member.userMember.um11')}}</span>
          </router-link>
          <!-- <router-link :to="{name:'WithdrawRecord'}">
            <div>
              <img src="./../assets/images/mycenter/wo10@2x.png" width="30px">
            </div>
            <span>{{this.$t('member.userMember.um12')}}</span>
          </router-link> -->
        </div>
      </div>
      <div class="pst-top"></div>
      <div class="router-panel manager" >
       <router-link v-for="(item, index) in routePanel" :to="{name:item.routeName}"  :key="index" >
            <div class="wrap">
              <div class="name_left">
                  <span class="icon_new"  :class="{'icon_new_white':!item.newInfo}" ></span>
                  <span class="text_name" >{{item.name}}</span>
              </div>
              <div class="link_right">
                  <span class="link_text">{{item.text}}</span>
                  <span class="sanjiao"></span>
              </div>
            </div>
            <!-- <span>{{this.$t('member.userMember.um11')}}</span> -->
          </router-link>
         
        
      </div>
      <div style="height: 20px;"></div>
    </div>
  </div>
</template>
<script>
import types from "@/store/mutation-types";
import { mapState } from "vuex";
import headerComponent from "@/common/Header.vue";

export default {
  data() {
    return {
      logo: "我的",
      amount: "",
      agnetLevel: "",
      isDraw: false,
      memberLevel: 0,
      walletlist: [{ coin: 0 }],
      totalCoins: "",
      routePanel:[{
          name:'帮助中心',
          newInfo:true,
          text:'专业解答',
          routeName:'helpcenter'
      },
      {
          name:'安全中心',
          newInfo:false,
          text:'专业解答'
      },
      {
          name:'我的消息',
          newInfo:true,
          text:'专业解答'
      },
      {
          name:'线路选择',
          newInfo:true,
          text:'专业解答'
      },
      {
          name:'系统设置',
          newInfo:true,
          text:'专业解答',
          routeName:'systemset'
      }],
      countInfo:[{
          name:'账户总额',
          value:'20.00',
          pa:'分'
      },{
          name:'分红金额',
          value:'20.00',
          pa:'元'
      },{
          name:'提现金额',
          value:'200.00',
          pa:'元'
      }]
    };
  },
  components: {
    headerComponent
  },
  mounted() {
    if (!this.toNeedLogin()) {
      return;
    }
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
        this.memberLevel = result.data.memberLevel;
        this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
      }
    });
    this.mMemberAmount();
    this.drawGame();
    this.mGetCoin();
  },
  computed: {
    ...mapState({
      sysPicObj: state => state.common.sysPicObj
    })
  },
  methods: {
    mGetCoin() {
      this.mLoading(true);
      this.$http
        .post("/managerGame/getWalletCoins.json")
        .then(result => {
          this.walletlist = result.data.walletlist;
          this.totalCoins = this.walletlist.reduce((x, y) => {
            let coin = y.coin;
            if (y.coin < 0) {
              coin = 0;
            }
            return parseFloat(x + coin || 0);
          }, 0);

          this.mLoading(false);
        })
        .catch(err => {
          this.$Message.warning(this.$t("member.userMember.um24")); //获取余额失败
        });
    },
    drawGame() {
      this.$http
        .get("/integralDrawC/queryRouletteSettingSwitch.json")
        .then(result => {
          if (result.data) {
            this.isDraw = result.data;
          }
        });
    },
    mMemberAmount() {
      if (!this.toNeedLogin()) {
        return;
      }
      this.$http.post("/memberUser/memberamount.json").then(result => {
        if (result.code == 0) {
          this.amount = result.data;
        }
      });
    },
    mLoginOut() {
      //确定要退出账号吗
      this.mConfirm(this.$t("member.userMember.um25"), () => {
        //请稍等...
        this.mLoading(true, this.$t("member.userMember.um26"));
        this.$http.post("/logout.json").then(result => {
          if (result.code === 0) {
            //退出成功！
            this.mMessage(this.$t("member.userMember.um27"), "success", 0.5);
            sessionStorage.removeItem(types.SESSION_TOKEN);
            this.$store.commit(types.SESSION_TOKEN);
            this.mLoading(false);
            this.$router.push({ name: "Home" });
          }
        });
      });
    }
  },
  created() {
    this.$store.commit("CHANGE_TAB", "UserMember");
  }
};
</script>

<style scoped>
  .user-member >>> .el-divider--vertical {
    display: inline-block;
    width: .5px;
    height: 15px;
    /* margin: 0 0.213333rem; */
    vertical-align: middle;
    position: relative;
    color: #fff;
    /* margin-top: -19px; */
}
</style>

