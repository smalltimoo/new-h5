<template>
  <van-dialog
    class="main"
    v-model="openStatus"
    title="客服中心"
    @confirm="onConfirm"
    show-cancel-button
    closeOnPopstate
    @cancel="onCancel"
  >
    <van-picker ref="picker" :columns="columns" :visible-item-count="3" />
  </van-dialog>
</template>
<script>
// import window from "../mixins/window";
export default {
  props: {
    panelShow: {
      type: Boolean
    }
  },
  data() {
    return {
      value: "",
      openStatus: this.panelShow,
      // panelShow: false,
      columns: [],
      agentQQ: ""
    };
  },
  computed: {
    cQQ1() {
      let sysInfo = this.$store.getters.getSysInfo;
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
    minit() {
      this.columns = [
        {
          id: 1,
          text: this.$t("customservice"),
          value: this.$t("customservice")
        },
        {
          id: 2,
          text: 'QQ:'+this.cQQ1,
          value:this.cQQ1
        },
        {
          id: 3,
          text: 'QQ:'+this.cQQ2,
          value:this.cQQ2
        },
        {
          id: 4,
          text: 'QQ:'+this.agentQQ,
          value:this.agentQQ
        },
        {
          id: 5,
          text: 'Line:'+this.sysInfo.lineUrl,
          value:this.sysInfo.lineUrl
        }
      ].filter((ele,i) => ele.value);
    },
    onCancel(value) {
      this.$emit("close", false);
    },
    onConfirm() {
      let values = this.$refs.picker.getValues();
      let value = values[0]
      switch (value.id) {
        case 1:
          this.mOpenCService();
          break;
        default:
          window.open(
            `mqqwpa://im/chat?chat_type=wpa&uin=${value.value.split(':')[1]}&version=1&src_type=web`
          );
          break;
      }
      this.$emit("close", false);
    }
  },
  watch: {
    panelShow(val) {
      this.openStatus = val;
    }
  },
  created() {
    this.minit();
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  /deep/ .van-dialog__header {
    height: 90px;
    background-image: url("~@/assets/images/dialog/tanchuang7@2x.png");
    font-family: Source Han Sans CN;
    font-size: 25px;
    color: #ffffff;
    box-shadow: 0px 3px 11px 0px rgba(0, 123, 188, 0.75);
  }
  /deep/ .van-button__text {
    width: 120px;
    height: 34px;
    line-height: 2;
    background-color: #3d7eff;
    box-shadow: 0px 1px 7px 0px rgba(81, 126, 215, 0.72);
    border-radius: 17px;
    text-align: center;
    color: #ffffff;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }
  /deep/ .van-picker-column__item {
    background: #fff;
    font-size: 13px;
    color: #393939;
  }
  /deep/ .van-picker-column__item:nth-child(2n) {
    background: #f3f3f3;
  }
  /deep/ .van-picker-column__item--selected {
    background-color: #3d7eff !important;
    color: #fff;
  }
  h3 {
    width: 300px;
    height: 40px;
    line-height: 40px;
    background-color: #f3f3f3;
    font-size: 14px;
    color: #303133;
    text-align: left;
    padding-left: 5px;
    font {
      color: #3d7eff;
    }
  }
}
</style>
