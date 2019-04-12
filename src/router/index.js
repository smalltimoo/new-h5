import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'current',
  routes: [
    { path: '/', redirect: '/home' },
    { path: "/login", name: "Login", component: () => import("../views/Login.vue") },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        { path: "reg", name: "Reg", component: () => import("../views/Reg.vue") },
        { path: "home", name: "Home", component: () => import("../views/Home.vue") },
        { path: "activity", name: "Activity", component: () => import("../views/Activity/Activity.vue") },
        { path: "score", name: "Score", component: () => import("../views/Activity/Score.vue") },
        { path: "onlinedeposit", name: "OnlineDeposit", component: () => import("../views/Member/OnlineDeposit.vue") },
        { path: "membercentre", name: "UserMember", component: () => import("../views/Member/UserMember.vue") },
        { path: "discount", name: "Discount", component: () => import("../views/Activity/Discount.vue") },
        // { path: "assetsoverview", name: "AssetsOverView", component: () => import("../views/Member/AssetsOverView.vue") },
        // { path: "usersetting", name: "UserSettings", component: () => import("../views/Member/UserSettings.vue") },
        // { path: "loginpwd", name: "LoginPassword", component: () => import("../views/Member/LoginPassword.vue") },
        // { path: "safe_pwd", name: "SafaPassword", component: () => import("../views/Member/SafaPassword.vue") },
        // { path: "userBankCard", name: "UserBankCard", component: () => import("../views/Member/UserBankCard.vue") },
        // { path: "usercapitalpwd", name: "UserCapitalPassword", component: () => import("../views/Member/UserCapitalPassword.vue") },
        // { path: "user_limit", name: "UserLimit", component: () => import("../views/Member/UserLimit.vue") },
        { path: "receiving", name: "Receiving", component: () => import("../views/Member/Receiving.vue") },
        // { path: "withdrawals", name: "Withdrawals", component: () => import("../views/Member/Withdrawals.vue") },
        // { path: "livevideo", name: "LiveVideo", component: () => import("../views/Games/LiveVideo.vue") },
        // { path: "eGames", name: "ElectronicGames", component: () => import("../views/Games/ElectronicGames.vue") },
        // { path: "sportsevents", name: "SportSevents", component: () => import("../views/Games/SportSevents.vue") },
        // { path: "lottory", name: "Lottory", component: () => import("../views/Games/Lottory.vue") },
        // { path: "poket", name: "Poket", component: () => import("../views/Games/Poket.vue") },
        // { path: "indoortransfer", name: "IndoorTransfer", component: () => import("../views/Member/IndoorTransfer.vue") },
        // { path: "rechargeRecord", name: "RechargeRecord", component: () => import("../views/Member/RechargeRecord.vue") },
        // { path: "bettingRecord", name: "BettingRecord", component: () => import("../views/Member/BettingRecord.vue") },
        // { path: "capitalRecord", name: "CapitalRecord", component: () => import("../views/Member/CapitalRecord.vue") },
        // { path: "transferRecords", name: "TransferRecords", component: () => import("../views/Member/TransferRecords.vue") },
        // { path: "withdrawRecord", name: "WithdrawRecord", component: () => import("../views/Member/WithdrawRecord.vue") },
        // { path: "Agent_Member", name: "AgentMember", component: () => import("../views/Agent/AgentMember.vue") },
        // { path: "Agent_that", name: "AgentThat", component: () => import("../views/Agent/AgentThat.vue") },
        // { path: "agentreportforms", name: "AgentrEportforms", component: () => import("../views/Agent/AgentrEportforms.vue") },
        // { path: "openaccounts", name: "OpenAccounts", component: () => import("../views/Agent/OpenAccounts.vue") },
        // { path: "openinvitation", name: "OpenInvitation", component: () => import("../views/Agent/OpenInvitation.vue") },
        // { path: "linkmanagement", name: "LinkManagement", component: () => import("../views/Agent/LinkManagement.vue") },
        // { path: "membermanagement", name: "MembermanAgement", component: () => import("../views/Agent/MembermanAgement.vue") },
        // { path: "aubordinatereportforms", name: "AubordinaterEportforms", component: () => import("../views/Agent/AubordinaterEportforms.vue") },
        // { path: "bettingdetaillist", name: "BettingdetailList", component: () => import("../views/Agent/BettingdetailList.vue") },
        // { path: "transactionsdetaillist", name: "TransactionsdetailList", component: () => import("../views/Agent/TransactionsdetailList.vue") },
        // { path: "exchange", name: "Exchange", component: () => import("../views/Store/Exchange.vue") },
        // { path: "order", name: "Order", component: () => import("../views/Store/Order.vue") },
        // { path: "conversionrecord", name: "ConversionRecord", component: () => import("../views/Store/ConversionRecord.vue") },
        { path: "gamelist", name: "GameList", component: () => import("../views/Games/GameList.vue") },
        { path: "gamecontainer", name: "GameContainer", component: () => import("../views/Games/GameContainer.vue") },
        // { path: "payview", name: "PayView", component: () => import("../views/Member/PayView.vue") },
        // { path: "agentdrawing", name: "AgentDrawing", component: () => import("../views/Agent/Withdrawals.vue") },
        // { path: "agentcashlist", name: "AgentCashList", component: () => import("../views/Agent/AgentCashList.vue") },
        // { path: "agentcoinlist", name: "AgentCoinList", component: () => import("../views/Agent/AgentCoinList.vue") },
        { path: "customerservice", name: "CustomerService", component: () => import("../views/CommIframe.vue") },
        // { path: "catchfish", name: "CatchFish", component: () => import("../views/Games/CatchFish.vue") },
        // { path: "finance_deposit", name: "FinanceDeposit", component: () => import("../views/Member/FinanceDeposit.vue") },
        // { path: "messagelist", name: "MessageList", component: () => import("../views/Member/MessageList.vue") },
        // { path: "messageinfo", name: "MessageInfo", component: () => import("../views/Member/MessageInfo.vue") },
        { path: "draw", name: "Draw", component: () => import("../views/Member/Draw.vue") },
        // { path: "/local", name: "local", component: () => import("../views/Member/local.vue") },
      ]
    }
  ]
})
