<template>
  <div class="pointdetails">
    <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      <section class="info">
          <div>
            <img src="" alt="" class="pointimg">
            <span class="curcount" v-text="count"></span>
            <span  class="curpoint">当前积分</span>
            <span class="addpoint" >本月新增积分：{{count}}</span>
          </div>
      </section>
      <section class="rooms">
        <h2 class="title">
          <span>积分记录</span>
          <span>筛选</span>
        </h2>
        <div class="pri" v-for="(item,index) in integralLog" :key="index">
          <div class="pri_img">
            <img :src="getpaysrc(item.img)" alt height="18px">
          </div>
          <div class="pri_main">
            <div>
              <p class="pri_title">{{item.remark}}</p>
              <p class="pri_desc">{{item.exchangeRate}}</p>
            </div>
             <div>
              <p class="pri_title">{{item.operateTimeStr}}</p>
              <p class="pri_desc">{{item.integralTypeStr}}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";
import star from "@/common/Star.vue"
import types from "@/store/mutation-types";
import { mapState } from "vuex";
export default {
  name: "pointdetails",
  components: {
    headerComponent,
  },
  computed: {
    ...mapState({
      sysPicObj: state => state.common.sysPicObj,
      callbackUri: state => state.common.callbackUri
    })
  },
  data() {
    return {
      logo: "积分明细",
      integralLog:[],
      count:8888,
    };
  },
  methods: {
     mInit() {
      this.record = true;
      this.mLoading(true);
      let params = {
        sysId: this.cLoginUser.sysId,
        memberId: this.cLoginUser.id
      };
      this.$http
        .post("/memberCoin/queryIntegralLogs.json", params)
        .then(result => {
          if (result.code == 0) {
            this.integralLog = result.rows;
          }
        });
    },
    getpaysrc(a) {
      // return require(`../../assets/images/membercentre/${a}@2x.png`);
      return ''
    },
  },
  created() {
    this.mInit();
  }
};
</script>
<style lang="less" scoped>
.pointdetails {
  .info {
    width: 100%;
    height: 200px;
    & > div{
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .pointimg {
        width: 50px;
        height: 70px;
      }
      .curcount {
        font-size: 34px;
        letter-spacing: 0px;
        color: #3d7eff;
      }
      }
      .curpoint {
        font-size: 12px;
        line-height: 10px;
        letter-spacing: 0px;
        color: #909399;
        opacity: 0.5;
      }
      .addpoint {
        font-family: PingFang SC;
        font-size: 12px;
        letter-spacing: 0px;
        color: #606266;
      
    }
  }
  .title {
    height: 80px;
    width: 351px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title_name {
      font-size: 15px;
      color: #303133;
      .title_desc {
        font-size: 12px;
        color: #909399;
      }
    }
    .howup {
      color: #3d7eff;
      font-size: 12px;
    }
  }
  .pri {
    width: 351px;
    height: 64px;
    align-items: center;
    margin: 0 auto;
    display: flex;
    .pri_img {
      width: 40px;
      text-align: left;
    }
    .pri_main {
      width: 311px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      div {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        .pri_title {
        font-size: 15px;
        color: #606266;
      }
      .pri_desc {
        font-size: 12px;
        color: #909399;
      }
      }
      
    }
  }
  button.btn {
    width: 250px;
    height: 42px;
    margin-top: 50px;
    background-color: #ffffff;
    border-radius: 21px;
    border: solid 1px #dadada;
    font-family: SourceHanSansCN-Normal;
    font-size: 12px;
    line-height: 42px;
    color: #303133;
    text-align: center;
  }
}
</style>
