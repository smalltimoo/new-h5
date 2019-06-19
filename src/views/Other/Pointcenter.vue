<template>
  <div class="checkin">
    <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      <section class="info">
        <div class="info_left">
          <span class="label">我的积分</span>
          <span class="count">8888.00</span>
            
        </div>
        <span class="btn qiandao">立即签到</span>
        <span class="btn jifenshop">积分商城</span>
      </section>
      <section class="areacard">
        <span class="text1">已连续签到&nbsp;<font>2&nbsp;天</font></span>
        <span class="text2">明日签到即可获得&nbsp;<font>5&nbsp;积分</font></span>
        <star :size="48" :score="7" :type="'flor'"></star>
      </section>
      <div class="title" >
        <h3 class="title_main">积分任务</h3>
        <p class="title_desc">做任务赚积分</p>
      </div>
      
      <section class="rooms">
        <div class="pri" v-for="(item,index) in prilist" :key="index">
          <div class="pri_img">
            <img :src="getpaysrc(item.img)" alt height="18px">
          </div>
          <div class="pri_cant">
            <div class="pri_main">
              <p class="pri_title">{{item.title}}</p>
              <p class="pri_desc">{{item.desc}}</p>
            </div>
            <span class="btnl">去完成</span>
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
  name: "checkin",
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
      prilist: [
        {
          title: "10元现金券",
          desc: "打码满2000元,期限>=25天可用",
          img: "shiyuan"
        },
        {
          title: "10元现金券",
          desc: "打码满2000元,期限>=25天可用",
          img: "qukuan"
        },
        {
          title: "10元现金券",
          desc: "打码满2000元,期限>=25天可用",
          img: "lihe"
        }
      ],
     };
  },
  methods: {
    getpaysrc(a) {
      return require(`@/assets/images/membercentre/${a}@2x.png`);
    },
  },
  created() {
    // this.mInit();
  }
};
</script>
<style lang="less" scoped>
@basecolor:#3d7eff;
.checkin {
  .container {
    overflow-y:auto;
  }
  .info {
	width: 351px;
	height: 100px;
	background-color: #ffffff;
	box-shadow: 0px 5px 10px 0px 
		rgba(0, 0, 0, 0.05);
	border-radius: 4px;
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .info_left {
      text-align: left;
      width: 100px;
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
      box-shadow: 0px 5px 10px 0px 
        rgba(104, 114, 255, 0.25);
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
      background-image: linear-gradient(270deg,#469aff 0%, #60baf9 100%);
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
      margin-top:-10px;
      font-size: 10px;
      color: #909399;
      font{
        color:@basecolor;
      }
    }
    star {

    }
    
  }
  .title {
      width: 345px;
      height: 65px;
      background-color: #ffffff;
      border-radius: 4px 4px 0px 0px;
      margin: 20px auto 0;
      padding: 10px 15px;
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
    & >div {
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
      background-image: linear-gradient(270deg, 
        #4699ff 0%, 
        #53a9fc 47%, 
        #5fb9f9 100%);
      border-radius: 10px;
      font-size: 10px;
      color: #f5f5f5;
    }
    }
    
  }

}
</style>
