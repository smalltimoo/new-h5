<template>
  <div class="pointcenter main-body">
    <header-component
      :showyue="false"
      :logo="logo"
      :showIcon="true"
      :showLogo="true"
      :jifen="(integral/100).toFixed(2)"
    ></header-component>
    <div class="container">
      <section class="info">
        <div class="info_left">
          <span class="label">我的积分</span>
          <span class="count">{{(integral/100).toFixed(2)}}</span>
        </div>
        <span class="btn qiandao" v-if="!vm.isSign" @click="$router.push({name:'checkin'})">立即签到</span>
        <span class="btn qiandao" v-else>已签到</span>
        <span class="btn jifenshop" @click="$router.push({name:'Score'})">积分商城</span>
      </section>
      <section class="areacard">
        <span class="text1">
          已连续签到&nbsp;
          <font>{{vm.continuitySignDays}}&nbsp;天</font>
        </span>
        <span class="text2">
          明日签到即可获得&nbsp;
          <font>{{givePoint}}&nbsp;积分</font>
        </span>
        <star :size="48" :type="'flor'"></star>
      </section>
      <div class="title">
        <h3 class="title_main">积分任务</h3>
        <p class="title_desc">做任务赚积分</p>
      </div>

      <section class="rooms">
        <div class="pri" v-for="(item,index) in prilist" :key="index">
          <div class="pri_img">
            <img :src="getpaysrc(item.img)" alt height="30">
          </div>
          <div class="pri_cant">
            <div class="pri_main">
              <p class="pri_title">{{item.title}}</p>
              <p class="pri_desc">{{item.desc}}</p>
            </div>
            <span class="btnl" @click="$router.push({name:item.routeName,params:item.params})" v-if="item.type == 0">去完成</span>
            <span class="btnl aready" v-else>已完成</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";
import star from "@/common/Star.vue";
import types from "@/store/mutation-types";
import { mapState } from "vuex";
export default {
  name: "pointcenter",
  components: {
    headerComponent,
    star
  },
  computed: {
    ...mapState({
      sysPicObj: state => state.common.sysPicObj,
      callbackUri: state => state.common.callbackUri
    })
  },
  data() {
    return {
      logo: "积分中心",
      vm: {},
      givePoint:'',
      integral: "",
      complete:false,
      checkInVm: {},
      prilist: [
        {
          title: "签到",
          desc: "连续签到可获得积分",
          img: "qiandao",
          type: 0,
          routeName: "checkin"
        },
        {
          title: "打码",
          desc: "打码越多，赠送积分越多",
          img: "dama",
          type: 0,
          routeName: "Home"
        },
        {
          title: "推荐我们",
          desc: "成功推荐一位即可获得500积分",
          img: "tuijian",
          type: 0,
          routeName: "shareapp"
        },
        {
          title: "完善资料",
          desc: "快速完善资料",
          img: "wanshan",
          type: 0,
          routeName: "safecenter",
          params:{to:'accountInfo'}
        }
      ]
    };
  },
  methods: {
    mInit() {
      this.$http.get("/memberUser/memberinfo.json").then(result => {
        if (result.code == 0) {
          this.integral = result.data.integral;
          if(this.$i18n.locale =='zh'){
          this.prilist[3].type = [result.data.realName,result.data.email,result.data.qq,result.data.weixin].some(item=>item=='')?0:1
        }else
           this.prilist[3].type = [result.data.realName,result.data.email,result.lineNum,result.data.telegram].some(item=>item=='')?0:1
        }
      });
    },
    getpaysrc(a) {
      return require(`@/assets/images/score/${a}@2x.png`);
    },
    getPoint(){
      this.$http
        .get("/memberUser/daySignGiveAmount.json", {})
        .then(result => {
          if (result.code == 0) {
            this.givePoint = result.data;
          }
        });
    },
    queryIntegral() {
      this.$http
        .get("/activity/queryMemberSignIntegral.json", {})
        .then(result => {
          if (result.code == 0) {
            // this.vm.isSign = result.data.isSign;
            // this.vm.dayIntegral = result.data.dayIntegral;
            // result.data.isSign = 0;
            this.vm = result.data;
            //签到
            this.prilist[0].type = this.vm.isSign;
          }
        });
    },
    getSignDays() {
      this.$http.get("/memberUser/getSignDays.json").then(result => {
        if (result.code == 0) {
          this.checkInVm = result.data;
          this.givePoint = (result.data.daySignGiveAmount/100).toFixed(2)
        }
      });
    }
  },
  created() {
    this.mInit();
    this.queryIntegral();
    this.getSignDays();
  }
};
</script>
<style lang="less" scoped>
@basecolor: #3d7eff;
.pointcenter {
  .container {
    overflow-y: auto;
  }
  .info {
    width: 351px;
    height: 100px;
    background: url("~@/assets/images/score/jifen3@2x.png") center
      center no-repeat;
    background-size: cover;
    // box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .info_left {
      text-align: left;
      width: 120px;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-items: center;
      justify-content: space-between;
      .label {
        font-size: 12px;
        letter-spacing: 0px;
        color: #909399;
      }

      .count {
        font-size: 26px;
        color: @basecolor;
      }
    }
    & > div {
      color: #909399;
      font-size: 12px;
    }
  }
  span.btn {
    width: 80px;
    height: 36px;
    box-shadow: 0px 5px 10px 0px rgba(104, 114, 255, 0.25);
    border-radius: 18px;
    border: solid 1px #ffffff;
    color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span.qiandao {
    background-image: linear-gradient(270deg, #ffd05c 0%, #ffb342 100%);
  }
  span.jifenshop {
    background-image: linear-gradient(270deg, #469aff 0%, #60baf9 100%);
  }

  .areacard {
    width: 315px;
    height: 97px;
    margin: 0 auto;
    color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    .text1 {
      font-size: 16px;
      color: #333;
      font {
        color: @basecolor;
      }
    }
    .text2 {
      margin-top: -10px;
      font-size: 10px;
      color: #909399;
      font {
        color: @basecolor;
      }
    }
  }
  .title {
    width: 345px;
    // height: 65px;
    background-color: #ffffff;
    border-radius: 4px 4px 0px 0px;
    margin: 0 auto 0;
    padding: 40px 15px 13px;
    text-align: left;
    .title_main {
      font-size: 16px;
      color: #303133;
    }
    .title_desc {
      font-size: 10px;
      color: #909399;
    }
  }

  .pri {
    width: 315px;
    height: 64px;
    align-items: center;
    margin: 0 auto;
    display: flex;
    .pri_img {
      width: 40px;
      text-align: left;
    }
    & > div {
      display: flex;
      width: 275px;
      justify-content: space-between;
      align-items: center;
      .pri_main {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .pri_title {
          font-size: 15px;
          color: #606266;
        }
        .pri_desc {
          font-size: 12px;
          color: #909399;
        }
      }
      .btnl {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 20px;
        background-image: url("~@/assets/images/score/quwancheng@2x.png");
        background-size: cover;

        border-radius: 10px;
        font-size: 10px;
        color: #f5f5f5;
      }
      .aready {
        // background-image: url("~@/assets/images/score/yiwancheng@2x.png");
        opacity: .5;
      }
    }
  }
}
</style>
