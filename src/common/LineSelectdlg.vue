<template>
  <van-dialog class="main" v-model="active" title="线路选择">
    <h3>
      当前线路：
      <font>{{line}}</font>
    </h3>
    <van-picker :columns="columns" @confirm="onConfirm" @change="onChange"/>
  </van-dialog>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      active: false,
      columns: [],
      line: process.env.VUE_APP_BASE_API
    };
  },
  props: {
    isShow: Boolean
  },
  methods: {
    minit() {
      this.$http
        .post("http://192.168.0.168:8082/memberApiList.json")
        .then(result => {
          if (result.code == 0) {
            this.columns = JSON.parse(result.data);
          }
        });
    },
    onChange(...a) {
      console.info(a)
       this.$http.defaults.baseURL = a[1];
      //  process.env.VUE_APP_BASE_API = a[1];
       this.line = a[1];
    },
    onConfirm(value) {
      // this.value = value;
      this.$emit("CB_dialog", false);
    }
  },
  watch: {
    isShow: function() {
      this.active = this.isShow;
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
  height: 416px;
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
    width: 230px;
    height: 34px;
    line-height: 2;
    background-color: #3d7eff;
    box-shadow: 0px 1px 7px 0px rgba(81, 126, 215, 0.72);
    border-radius: 17px;
    text-align: center;
    color: #ffffff;
    display: inline-block;
    font-size: 16px;
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
