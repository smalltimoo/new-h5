<template>
  <div class="bg_newpage">
    <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="img_room">
      <img :src="getbg()" width="187px">
      <p>{{des}}</p>
    </div>
    <span class="btn">{{btn}}</span>
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";
export default {
  name: "newPage",
  components: {
    headerComponent
  },
  data() {
    return {
      logo: "",
      pageType: "",
      bgdef: "",
      des: "",
      btn: ""
    };
  },
  created() {
    console.info(1);
    let params = this.$route.params;
    if (params && params.type) {
      switch (params.type) {
        case "network":
          [this.bgdef, this.des, this.btn] = [
            "network",
            "无网络，请点击重试",
            "点击重试"
          ];
          break;
        case "addr":
          [this.bgdef, this.des, this.btn] = [
            "addr",
            "你还没有收货地址哦~",
            "新建地址"
          ];
          break;
        case "bank":
          [this.bgdef, this.des, this.btn] = [
            "bank",
            "暂无绑定银行卡",
            "绑定银行卡"
          ];
          break;
        case "password":
          [this.bgdef, this.des, this.btn] = [
            "password",
            "暂无设置密码",
            "点击设置"
          ];
          break;
        case "collect":
          [this.bgdef, this.des, this.btn] = [
            "collect",
            "你还没有收藏,快去逛逛吧~",
            "去逛逛"
          ];
          break;
        case "mosaic":
          [this.bgdef, this.des, this.btn] = ["mosaic", "暂无记录", "去打码"];
          break;
        default:
          [this.bgdef, this.des, this.btn] = [
            "404",
            "页面走丢了，请点击重试",
            "点击重试"
          ];
          break;
      }
    } else {
      [this.bgdef, this.des, this.btn] = [
        "404",
        "页面走丢了，请点击重试",
        "点击重试"
      ];
    }
  },
  methods: {
    getbg() {
      return require(`../assets/images/default/${this.bgdef}@2x.png`);
    }
  }
};
</script>
<style lang="less">
.bg_newpage {
  width: 100%;
  height: 100%;
  .img_room {
    width: 187px;
    height: 197px;
    display: flex;
    margin: 160px auto 26px;
    flex-direction: column;
    align-content: space-between;
    justify-content: space-between;
    p {
      font-family: Arial;
      font-size: 16px;
      color: #bfc2cc;
    }
  }
  span.btn {
    display: inline-block;
    width: 105px;
    height: 24px;
    border-radius: 3px;
    border: solid 1px #317aed;
    text-align: center;
    font-family: PingFang SC;
    font-size: 14px;
    line-height: 24px;
    color: #317aed;
  }
}
</style>

