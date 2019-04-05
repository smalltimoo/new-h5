<template>
  <div id="app">
    <div class="publicpage">
      <div class="userSettings publicpage_view">
        <div class="TopHeader">
          <!-- <div id="return" style="position: absolute;">
          <a href="javascript:history.go(-1);">
            <Icon type="ios-arrow-back" />
          </a></div>活动中心
          </div>-->
          <div id="return" style="position: absolute;">
            <router-link :to="{name:'LiveVideo'}">
              <Icon type="ios-arrow-back"/>
            </router-link>
          </div>{{ $t('views.discount.activityCenter')}}
        </div><!--活动中心 -->
        <section class="el-container">
          <main class="el-main">
            <div class="el-row" v-for="(item, index) in activities" :key="index">
              <div class="el-col el-col-24">
                <div style="margin-bottom: 5px;">
                  <router-link :to="{name:'Activity', query:{id:item.id}}">
                    <img :src="item.activityImg" alt style="width: 100%;">
                  </router-link>
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
export default {
  data() {
    return {
      activities: []
    };
  },
  methods: {
    mInit() {
      this.$http
        .post("/activities.json", { param: { limit: 20, start: 0 } })
        .then(result => {
          if (result.code == 0) {
            let list = result.data.activityVoList
              ? result.data.activityVoList
              : [];
            list.forEach(element => {
              element.selected = false;
            });
            this.activities = list;
          }
        });
    }
  },
  created() {
    this.mInit();
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
</style>
