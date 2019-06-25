<template>
  <div class="membercentre">
    <header-component :showyue="true" :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      <div class="slider-wrap">
        <div id="iSlider-wrapper" ref="swipe"></div>
      </div>
      <div class="title">
        <div class="title_name">
          黄金特权
          <span class="title_desc">(当前为黄金会员)</span>
        </div>
        <router-link :to="'/haoup'" class="howup">如何升级？</router-link>
      </div>
      <section class="rooms">
        <div class="pri" v-for="(item,index) in prilist" :key="index">
          <div class="pri_img">
            <img :src="getpaysrc(item.img)" alt height="18px">
          </div>
          <div class="pri_main">
            <p class="pri_title">{{item.title}}</p>
            <p class="pri_desc">{{item.desc}}</p>
          </div>
        </div>
        <button class="btn">更多特权持续增加...</button>
      </section>
    </div>
  </div>
</template>
<script>
let _this;
import { mapState } from "vuex";
require("islider.js");
import types from "../../store/mutation-types";
import headerComponent from "@/common/Header.vue";

export default {
  name: "membercentre",
  components: {
    headerComponent
  },
  data() {
    return {
      swipeinfo: [
        {
          content: require("@/assets/images/2x/lbt@2x.png")
        },
        {
          content: require("@/assets/images/2x/lb@2x.png")
        },
        {
          content: require("@/assets/images/2x/hd@2x.png")
        }
      ],
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
      vm: {
        count: 8000,
        count2: 903
      },
      imgSrcs: [],
      swiperOption: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      logo: this.$t("member.userMember.um10")
    };
  },
  computed: {
    ...mapState({
      theme: state => state.common.theme,
      sysPicObj: state => state.common.sysPicObj
    })
  },
  methods: {
    neiStyle() {
      setTimeout(() => {
        let self = this;
        // let data = this.swipeinfo;
        let data = this.swipeinfo.map((item, idx) => {
          item.content = `<div class="active_box">
                                          <span class="text1">vip1</span>
                                          <span class="text2">当前等级</span>
                                          <span class="text3">当前成长值：${
                                            this.vm.count
                                          }</span>
                                          <span class="text4">距离下一等级还差${
                                            this.vm.count2
                                          }分</span>
                                      </div>
                                      `;
          return item;
        });
        //轮盘
        self.S = new iSlider(
          document.getElementById("iSlider-wrapper"),
          data,
          {
            isLooping: 1,
            // isOverspread: 1,
            isAutoplay: true,
            animateTime: 800,
            animateType: "depth",
            isDebug: true,
            depth: ".9"
          },
          300
        );
      });
    },
    getpaysrc(a) {
      return require(`@/assets/images/membercentre/${a}@2x.png`);
    },
    
    
  },
  mounted() {
    this.neiStyle();
  },
  created() {
    _this = this;
  },
  destroyed() {
    _this = undefined;
  }
};
</script>
<style lang="less" scoped>
/*ul wrapper*/
.slider-wrap {
  width: 100%;
  height: 183px;
  #iSlider-wrapper {
    height: 184px;
    width: 100%;
    overflow: hidden;
    position: absolute;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    li {
      position: absolute;
      margin: 0;
      padding: 0;
      height: 100%;
      //  height: 182px;
      width: 325px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-pack: center;
      -webkit-box-align: center;
      list-style: none;
      img {
        width: 100%;
        height: 100%;
        background-size: cover;
      }
    }
  }
}
.active_box {
  width: 326px;
  height: 135px;
  box-shadow: 0px 2px 11px 1px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  .active_title {
    width: 100%;
    height: 22px;
  }
}
.ivu-poptip-rel {
  margin: 0 5px;
  top: 5px;
}

.membercentre {
  /deep/ .islider-html {
    // width: 421px;
    // height: 203px;
    width: 303px;
    height: 146px;
  }
  /deep/ .islider-active {
    transform: translateX(-30px);
  }
  /deep/ .islider-prev {
    transform: translateX(-540px);
  }
  /deep/ .islider-next {
    transform: translateX(460px);
  }
  /deep/ .active_box {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/membercentre/DLV1@2x.png"),
      linear-gradient(-4deg, #3e8dff 0%, #40acff 100%);

    box-shadow: 0px 4px 13px 0px rgba(79, 139, 248, 0.27);
    border-radius: 10px;
    background-repeat: no-repeat, no-repeat, repeat;
    background-position: 180px 20px, top, right;
    background-size: 91px 104px, 100% 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 0 0 20px;
    justify-content: start;
    align-items: flex-start;
    .text1 {
      font-size: 24px;
      color: #fff;
      letter-spacing: 0px;
    }
    .text2 {
      font-size: 14px;
      color: #f3f3f3;
      letter-spacing: 0px;
      margin-top: -4px;
    }
    .text3 {
      font-size: 14px;
      color: #fff;
      letter-spacing: 0px;
      margin-bottom: 4px;
    }
    .text4 {
      font-size: 10px;
      color: #f3f3f3;
      margin-top: -4px;
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
