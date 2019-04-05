<template>
  <div id="app" v-resize="mOnResize">
    <div class="publicpage">
      <div class="userSettings publicpage_view">
        <div class="TopHeader" ref="TopHeader">
          <div id="return" style="position: absolute;">
            <Icon type="md-close" @click="mClose"/>
          </div>
        </div>
        <iframe :src="url" frameborder="0" class="game-container" :style="cGCStyles"></iframe>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      url: "",
      width: 0,
      height: 0,
      comeSource: "",
      params: {}
    };
  },
  computed: {
    cGCStyles() {
      return {
        width: this.width + "px",
        height: this.height + "px"
      };
    }
  },
  mounted() {
    this.mInit();
    this.$nextTick(this.mGCStyles);
  },
  methods: {
    mInit() {
      // params
      // isTimer: 0
      // native: false
      // orderNo: "363"
      // postData: null
      // qrcoDepath: "http://pay.m1da44.cn/alipay?p=1227220124521271"
      this.params = Object.assign({}, this.$route.params);
      this.url = this.params.qrcoDepath;
      this.comeSource = this.$route.name;
      console.log(this.params);
    },
    mGCStyles() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      h = h - this.$refs.TopHeader.clientHeight;
      this.width = w;
      this.height = h;
    },
    mOnResize() {
      this.mGCStyles();
    },
    mClose() {
      this.$router.push({
        name: this.comeSource.name ? this.comeSource.name : "OnlineDeposit",
        params: this.comeSource.params
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.comeSource = from;
    });
  }
};
</script>

<style>
.userSettings {
  width: 100%;
  font-size: 0;
}
.userSettings .bg-purple-dark {
  background: #545478;
}
.userSettings .bg-purple-dark .texts,
.userSettings .bg-purple-dark a {
  display: block;
  padding: 18px 10px;
  text-align: left;
  font-size: 14px;
  color: #fff;
}
.publicpage_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.publicpage {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #33334e;
  z-index: 10;
}
.game-container {
  border: 0px;
  overflow: hidden;
}
</style>
