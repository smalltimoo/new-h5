<template>
  <div class="haoup">
    <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      
      <section class="rooms">
        <div class="pri" v-for="(item,index) in prilist" :key="index">
          <div class="pri_img">
            <img :src="getpaysrc(item.img)" alt width="32px">
          </div>
          <div class="pri_main">
            <p class="pri_title">{{item.title}}</p>
            <p class="pri_desc">{{item.desc}}</p>
          </div>
        </div>
      
      </section>
    </div>
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";

export default {
  name: "haoup",
  components: {
    headerComponent
  },
  data() {
    return {
      prilist: [
        {
          title: "普通会员",
          desc: "0=<投资金额(含现金券)<5万",
          img: "lv1"
        },
        {
          title: "普通会员",
          desc: "0=<投资金额(含现金券)<5万",
          img: "lv1"
        },
        {
          title: "普通会员",
          desc: "0=<投资金额(含现金券)<5万",
          img: "lv1"
        },{
          title: "普通会员",
          desc: "0=<投资金额(含现金券)<5万",
          img: "lv1"
        },{
          title: "普通会员",
          desc: "0=<投资金额(含现金券)<5万",
          img: "lv1"
        },{
          title: "普通会员",
          desc: "0=<投资金额(含现金券)<5万",
          img: "lv1"
        },
      ],
     
     
      logo: '如何升级'
    };
  },
  methods: {
    getpaysrc(a) {
      return require(`../../assets/images/membercentre/${a}@2x.png`);
    },
  },
  mounted() {
  },
  created() {
  },
  destroyed() {
  }
};
</script>
<style lang="less" scoped>

  .pri {
    width: 351px;
    height: 64px;
    align-items: center;
    margin: 0 auto;
    display: flex;
    .pri_img {
      width: 40px;
      text-align: left;
      img {
          vertical-align: bottom;
      }
    }
    .pri_main {
      display: flex;
      width: 250px;
      flex-direction: column;
      align-items: flex-start;
      border-bottom: 1px solid #f3f3f3;
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

</style>
