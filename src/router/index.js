import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'current',
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue")
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [{
          path: "home",
          name: "Home",
          component: () => import("../views/Home.vue")
        },
        {
          path: "score",
          name: "Score",
          component: () => import("../views/Activity/Score.vue")
        },
        {
          path: "onlinedeposit",
          name: "OnlineDeposit",
          component: () => import("../views/Member/OnlineDeposit.vue")
        },
        {
          path: "usermember",
          name: "UserMember",
          component: () => import("../views/Member/UserMember.vue")
        }, //个人中心
        {
          path: "discount",
          name: "Discount",
          component: () => import("../views/Activity/Discount.vue")
        },
        {
          path: "assetsoverview",
          name: "AssetsOverView",
          component: () => import("../views/Member/AssetsOverView.vue")
        },
        {
          path: "usersetting",
          name: "UserSettings",
          component: () => import("../views/Member/UserSettings.vue")
        },
        {
          path: "loginpwd",
          name: "LoginPassword",
          component: () => import("../views/Member/LoginPassword.vue")
        },
        {
          path: "safe_pwd",
          name: "SafaPassword",
          component: () => import("../views/Member/SafaPassword.vue")
        },
        {
          path: "userBankCard",
          name: "UserBankCard",
          component: () => import("../views/Member/UserBankCard.vue")
        },
        {
          path: "usercapitalpwd",
          name: "UserCapitalPassword",
          component: () => import("../views/Member/UserCapitalPassword.vue")
        },
        {
          path: "user_limit",
          name: "UserLimit",
          component: () => import("../views/Member/UserLimit.vue")
        },
        {
          path: "receiving",
          name: "Receiving",
          component: () => import("../views/Member/Receiving.vue")
        },
        {
          path: "withdrawals",
          name: "Withdrawals",
          component: () => import("../views/Member/Withdrawals.vue")
        },
        {
          path: "indoortransfer",
          name: "IndoorTransfer",
          component: () => import("../views/Member/IndoorTransfer.vue")
        },
        {
          path: "rechargeRecord",
          name: "RechargeRecord",
          component: () => import("../views/Member/RechargeRecord.vue")
        },
        {
          path: "bettingRecord",
          name: "BettingRecord",
          component: () => import("../views/Member/BettingRecord.vue")
        },
        {
          path: "capitalRecord",
          name: "CapitalRecord",
          component: () => import("../views/Member/CapitalRecord.vue")
        },
        {
          path: "transferRecords",
          name: "TransferRecords",
          component: () => import("../views/Member/TransferRecords.vue")
        },
        {
          path: "withdrawRecord",
          name: "WithdrawRecord",
          component: () => import("../views/Member/WithdrawRecord.vue")
        },
        {
          path: "Agent_Member",
          name: "AgentMember",
          component: () => import("../views/Agent/AgentMember.vue")
        }, //代理中心
        {
          path: "Agent_that",
          name: "AgentThat",
          component: () => import("../views/Agent/AgentThat.vue")
        },
        {
          path: "agentreportforms",
          name: "AgentrEportforms",
          component: () => import("../views/Agent/AgentrEportforms.vue")
        },
        {
          path: "openaccounts",
          name: "OpenAccounts",
          component: () => import("../views/Agent/OpenAccounts.vue")
        },
        {
          path: "openinvitation",
          name: "OpenInvitation",
          component: () => import("../views/Agent/OpenInvitation.vue")
        },
        {
          path: "linkmanagement",
          name: "LinkManagement",
          component: () => import("../views/Agent/LinkManagement.vue")
        },
        {
          path: "membermanagement",
          name: "MembermanAgement",
          component: () => import("../views/Agent/MembermanAgement.vue")
        },
        // { path: "aubordinatereportforms", name: "AubordinaterEportforms", component: () => import("../views/Agent/AubordinaterEportforms.vue") },
        {
          path: "bettingdetaillist",
          name: "BettingdetailList",
          component: () => import("../views/Agent/BettingdetailList.vue")
        },
        {
          path: "transactionsdetaillist",
          name: "TransactionsdetailList",
          component: () => import("../views/Agent/TransactionsdetailList.vue")
        },
        // { path: "exchange", name: "Exchange", component: () => import("../views/Store/Exchange.vue") },
        // { path: "order", name: "Order", component: () => import("../views/Store/Order.vue") },
        {
          path: "gamelist",
          name: "GameList",
          component: () => import("../views/Games/GameList.vue")
        },
        {
          path: "gamecontainer",
          name: "GameContainer",
          component: () => import("../views/Games/GameContainer.vue")
        },
        // { path: "payview", name: "PayView", component: () => import("../views/Member/PayView.vue") },
        {
          path: "agentdrawing",
          name: "AgentDrawing",
          component: () => import("../views/Agent/Withdrawals.vue")
        },
        {
          path: "agentcashlist",
          name: "AgentCashList",
          component: () => import("../views/Agent/AgentCashList.vue")
        },
        {
          path: "agentcoinlist",
          name: "AgentCoinList",
          component: () => import("../views/Agent/AgentCoinList.vue")
        },
        {
          path: "customerservice",
          name: "CustomerService",
          component: () => import("../views/CommIframe.vue")
        },
        {
          path: "messagelist",
          name: "MessageList",
          component: () => import("../views/Member/MessageList.vue")
        },
        {
          path: "draw",
          name: "Draw",
          component: () => import("../views/Member/Draw.vue")
        },
        // { path: "/local", name: "local", component: () => import("../views/Member/local.vue") },

        {
          path: "games",
          name: "Games",
          component: () => import("../views/Games/Games.vue")
        },
        {
          path: "systemset",
          name: "systemset",
          component: () => import("../views/System/Systemset.vue")
        },
        {
          path: "helpcenter",
          name: "helpcenter",
          component: () => import("../views/System/Helpcenter.vue")
        },
        {
          path: "safecenter",
          name: "safecenter",
          component: () => import("../views/System/Safecenter.vue")
        },
        //会员中心MemberCentre
        {
          path: "membercentre",
          name: "membercentre",
          component: () => import("../views/Member/MemberCentre.vue")
        },
        {
          path: "mjiaoyi",
          name: "mjiaoyi",
          component: () => import("../views/Agent/MjiaoyiComponent.vue")
        },{
          //如何升级
          path: "haoup",
          name: "haoup",
          component: () => import("../views/Member/Haoup.vue")
        },
        {
          path: "*",
          name: "404",
          component: () => import("../common/Newpage.vue")
        },
      ]
    }
  ]
})