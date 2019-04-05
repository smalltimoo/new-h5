<template>
  <div id="app">
    <div class="publicpage">
      <div class="userSettings publicpage_view">
        <div class="TopHeader">
          <div id="return" style="position: absolute;">
            <router-link :to="{name:'LiveVideo'}">
              <Icon type="ios-arrow-back"/>
            </router-link>
          </div>{{ $t('store.exchange.ex1') }}
        </div><!-- 商品列表-->
        <section class="el-container">
          <main class="el-main">
            <div class="el-row">
              <div
                class="el-col el-col-24"
                v-for="item in products"
                :key="item.id "
                style="height: 200px; margin-bottom:15px;    background-color: #909399;"
              >
                <div style="margin-bottom: 5px;height: 100%;width: 50%;float: left;">
                  <img :src="item.img" style="width: 170px;height: 170px;margin: 13px 10px;">
                </div>
                <div style="height: 100%;width: 50%;float: right;">
                  <div style="margin:15px;width: 95%;height: 180px;">
                    <h2
                      style="height: 20px;color:#303133;font-size: 16px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 140px;margin-left: 10px;"
                    >{{item.title}}</h2>
                    <p
                      style="height: 20px;color: #fff;font-size: 16px;text-align: left;margin: 10px;"
                    >{{ $t('store.exchange.ex2') }}{{vm.integral/100}}</p><!-- 当前积分：-->
                    <p
                      style="height: 20px;color: #fff;font-size: 16px;text-align: left;margin: 10px;"
                    >{{ $t('store.exchange.ex3') }}{{item.currentPrice}}</p><!-- 所需积分：-->
                    <button
                      type="button"
                      class="el-button G-submit el-button--primary"
                      @click="mOrder(item)"
                    >
                      <!---->
                      <!---->
                      <span>{{ $t('store.exchange.ex4') }}</span><!--立即兑换 -->
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
import window from "../../mixins/window";
export default {
  mixins: [window, listMixin],
  data() {
    return {
      searchVM: {
        typeId: "", //类型
        orderBy: "id desc",
        rows: 20
      },
      vm: {
        integral: 0
      },
      products: []
    };
  },
  mounted() {
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.vm.integral = result.data.integral;
      }
    });
    this.mPullData();
  },
  methods: {
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/imp/products.json", params).then(result => {
        if (result.code == 0) {
          this.products = !!result.data ? result.data : [];
        }
      });
    },
    mOrder(rows) {
      this.$router.push({
        path: "./Order",
        query: {
          title: rows.title,
          currentPrice: rows.currentPrice,
          content: rows.content,
          img: rows.img,
          id: rows.id,
          stockquantity: rows.stockquantity
        }
      });
    }
  }
};
</script>

<style scoped>
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
.el-message .el-icon-error,
.el-message .el-icon-success,
.el-message .el-icon-warning {
  font-size: 14px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.app_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px);
  transform: translate(30px);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px);
  transform: translate(-30px);
}
.Bnner {
  width: 100%;
  overflow: hidden;
}
.Bnner,
.Bnner .swiper-container,
.Bnner .swiper-container .swiper-wrapper,
.Bnner .swiper-container .swiper-wrapper .swiper-slide {
  height: 3rem;
}
.Bnner .swiper-container .swiper-wrapper .swiper-slide img {
  height: 100%;
}
.Home-content {
  width: 100%;
}
img {
  display: inline-block;
}
#somediv {
  width: 100%;
  height: 100%;
  font-size: 0.5rem;
}

.uploadApp {
  position: fixed;
  bottom: 59px;
  right: 3px;
  border: 1px solid #d1dbe5;
  border-radius: 3px;
  color: #409eff;
  font-size: 14px;
  width: 150px;
}
.uploadApp .content {
  line-height: 30px;
  height: 30px;
  background: #fff;
  position: relative;
}
.uploadApp .dowload {
  padding-left: 10px;
}
.uploadApp .content:after {
  content: " ";
  position: absolute;
  left: 62px;
  bottom: -10px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0;
  border-color: #fff transparent transparent;
}
.App-box {
  position: fixed;
  bottom: 105px;
  height: 150px;
  width: 100%;
  font-size: 15px;
}
.App-box .in-center {
  width: 95%;
  margin: 0 auto;
  background: #fff;
  height: 160px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #d1dbe5;
}
.App-box .title {
  width: 100%;
  padding: 8px;
  color: #fff;
  background: #33334e;
  border-radius: 5px;
  text-align: left;
}
.App-box .text {
  font-size: 12px;
  line-height: 18px;
  text-align: left;
}
.App-box .load {
  padding: 3px 7px;
  font-size: 14px;
  color: #fff;
  margin-right: 15px;
  border-radius: 3px;
  background: linear-gradient(90deg, #a01f0a, #e91e1e);
  -webkit-animation: gradientChange 2s infinite;
  animation: gradientChange 2s infinite;
}
@-webkit-keyframes gradientChange {
  to {
    background: linear-gradient(90deg, #e91e1e, #6f27b0);
  }
}
@keyframes gradientChange {
  to {
    background: linear-gradient(90deg, #e91e1e, #6f27b0);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.publicpage_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px);
  transform: translate(30px);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px);
  transform: translate(-30px);
}
.publicpage {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #33334e;
  z-index: 10;
}
.G-submit {
  width: 130px;
}
.el-button--primary {
  background-color: #d5d627;
  border-color: #d1dbe5;
}
</style>
