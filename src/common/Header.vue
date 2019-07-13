<template>
  <div class="header hasApp">
    <div class="header-left">
      <Icon type="ios-arrow-back" v-if="showIcon" class="icon-menu" @click.stop="back" />
      <span class="logo" v-if="showLogo">{{logo}}</span>
    </div>
    <div class="header-right">
      <router-link :to="{name:'Login',params:{type:'islogin'}}" class="yue" v-if="cNeedLogin">登录</router-link>
      <div class="yue" v-else-if="showyue">余额:{{yue}}</div>
      <div class="yue" v-else>积分:{{jifen}}</div>
      <i @click="isshowservice = true" class="icon-menu message"></i>
      <!-- <Poptip trigger="click" placement="bottom-end">
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
      </Poptip> -->

    </div>
    <c-service :panelShow="isshowservice" @close="CB_dialog"></c-service>
  </div>
</template>

<script>
import { mapState } from "vuex";
import cService from "@/common/CService.vue";
export default {
  name: "Header",
  props: ["showIcon", "showLogo", "logo","showyue","jifen"],
  components:{
    cService
  },
  data() {
    return {
      yue: '',
      agentQQ:'',
      isshowservice:false,
    };
  },
  computed: {
    ...mapState({
      theme: state => state.common.theme,
      sysPicObj: state => state.common.sysPicObj
    }),
    cQQ1() {
      let sysInfo = this.$store.getters.getSysInfo;
      this.drawBanner = sysInfo.rouletteSlide;
      this.agentQQ = sysInfo.agentQQ;
      return sysInfo.customQQ ? sysInfo.customQQ : "";
    },
    cQQ2() {
      if (process.env.VUE_APP_ISAPP == "TRUE") {
        let qq = process.env.VUE_APP_QQ;
        return qq ? qq : "";
      }
    }
  },
  methods: {
    back() {
      if (this.$parent.$el.className.indexOf("notback") > -1) {
        this.draw = false;
        this.$emit("notgoback", this.draw);
      } else {
        this.$router.go(-1); //返回上一层
      }
    },
    CB_dialog (data){
      this.isshowservice = data;
    }
  },

  created () {
     this.$http.post("/memberUser/memberamount.json").then((result)=>{
      if(result.code == 0){
        this.yue = (result.data/100).toFixed(2)
      }
     })
    }
}
</script>

<style lang="less" >
.header {
  width: 100%;
  // height: 32px;
  // margin:16px auto;
  background-color: white;
  .yue {
    min-width: 85px;
    padding: 0 3px;
    height: 21px;
    background-color: #f3f3f3;
    border-radius: 8px;
    font-family: PingFang SC;
    font-size: 11px;
    text-align: center;
    line-height: 21px;
    color: #303133;
  }
  .logo {
    font-size: 24px;
    color: #303133;
    padding-left: 11px;
    line-height: 24px;

    font-family: PingFang SC;
    letter-spacing: 1px;
  }
  .ivu-poptip-rel {
    top: 8px;
  }
}
</style>

