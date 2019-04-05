<template>
  <div id="app">
    <div class="publicpage">
      <div class="userSettings publicpage_view">
        <div class="TopHeader">
          <div id="return" style="position: absolute;">
            <router-link :to="{name:'UserMember'}">
              <Icon type="ios-arrow-back"/>
            </router-link>
          </div>{{ $t('agent.agentMember.agentCenter')}}
        </div><!-- 代理中心-->
        <div class="el-row" style="margin-top: 5px;">
          <div class="el-col el-col-24">
            <div class="grid-content bg-purple-dark">
              <router-link :to="{name:'AgentThat'}">{{ $t('agent.agentMember.agentDescription')}}
                <div class="rf"><!-- 代理说明-->
                  <span class="el-icon-arrow-right" style="padding-left: 8px;"></span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="line-w"></div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <div class="grid-content bg-purple-dark">
              <router-link :to="{name:'AgentDrawing'}">
                {{ $t('agent.agentMember.dividendWithdrawal')}}
                <span class="el-icon-arrow-right rf"></span><!-- 分红提现-->
              </router-link>
            </div>
          </div>
        </div>
        <div class="line-w"></div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <div class="grid-content bg-purple-dark">
              <router-link :to="{name:'AgentrEportforms'}">
                {{ $t('agent.agentMember.memberManagement')}}
                <span class="el-icon-arrow-right rf"></span><!-- 会员管理-->
              </router-link>
            </div>
          </div>
        </div>
        <div class="line-w"></div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <div class="grid-content bg-purple-dark">
              <router-link :to="{name:'OpenAccounts'}">
                {{ $t('agent.agentMember.lower')}}
                <span class="el-icon-arrow-right rf"></span><!--下级开户 -->
              </router-link>
            </div>
          </div>
        </div>
        <div class="line-w"></div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <div class="grid-content bg-purple-dark">
              <router-link :to="{name:'OpenInvitation'}">
                {{ $t('agent.agentMember.sponsoredLinks')}}
                <span class="el-icon-arrow-right rf"></span><!--推广链接 -->
              </router-link>
            </div>
          </div>
        </div>
        <div class="line-w"></div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <div class="grid-content bg-purple-dark">
              <router-link :to="{name:'LinkManagement'}">
                {{ $t('agent.agentMember.linkManagement')}}
                <span class="el-icon-arrow-right rf"></span><!--链接管理 -->
              </router-link>
            </div>
          </div>
        </div>
        <div class="line-w"></div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <div class="grid-content bg-purple-dark">
              <router-link :to="{name:'MembermanAgement'}">
                {{ $t('agent.agentMember.agentReport')}}
                <span class="el-icon-arrow-right rf"></span><!--代理报表 -->
              </router-link>
            </div>
          </div>
        </div>
        <!--<div class="line-w"></div>-->
        <!--<div class="el-row">-->
          <!--<div class="el-col el-col-24">-->
            <!--<div class="grid-content bg-purple-dark">-->
              <!--<router-link :to="{name:'AubordinaterEportforms'}">-->
                <!--下级报表-->
                <!--<span class="el-icon-arrow-right rf"></span>-->
              <!--</router-link>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="line-w"></div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <div class="grid-content bg-purple-dark">
              <router-link :to="{name:'BettingdetailList'}">
                {{ $t('agent.agentMember.specified')}}
                <span class="el-icon-arrow-right rf"></span><!-- 投注明细-->
              </router-link>
            </div>
          </div>
        </div>
        <div class="line-w"></div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <div class="grid-content bg-purple-dark">
              <router-link :to="{name:'TransactionsdetailList'}">
                {{ $t('agent.agentMember.transactionDetails')}}
                <span class="el-icon-arrow-right rf"></span><!--交易明细 -->
              </router-link>
            </div>
          </div>
        </div>
        <div class="line-w"></div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <div class="grid-content bg-purple-dark">
              <router-link :to="{name:'AgentCashList'}">
                {{ $t('agent.agentMember.dividendWithdrawalRecord')}}
                <span class="el-icon-arrow-right rf"></span><!-- 分红提现记录-->
              </router-link>
            </div>
          </div>
        </div>
        <div class="line-w"></div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <div class="grid-content bg-purple-dark">
              <router-link :to="{name:'AgentCoinList'}">
                {{ $t('agent.agentMember.dividedWalletLog')}}
                <span class="el-icon-arrow-right rf"></span><!--分红钱包日志 -->
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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
