<template>
  <div class="safecenter">
    <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      <div class="line title">
        <span>密码设置</span>
      </div>
      <div v-for="(item, index) in passSet" :to="{name:item.routeName}" :key="index">
        <div class="wrap">
          <div class="name_left">
            <span class="text_name">{{item.name}}</span>
          </div>
          <div class="link_right">
            <span class="link_text">{{item.type}}</span>
            <span class="sanjiao" @click="routetodraw(item.routeName)"></span>
          </div>
        </div>
        <!-- <span>{{this.$t('member.userMember.um11')}}</span> -->
      </div>
      <div class="line title">
        <span>账户信息</span>
      </div>
      <div v-for="(item, index) in userInfo" :to="{name:item.routeName}" :key="index">
        <div class="wrap">
          <div class="name_left">
            <span class="text_name">{{item.name}}</span>
          </div>
          <div class="link_right">
            <span class="link_text">{{item.type}}</span>
            <span class="sanjiao" @click="routetodraw(item.routeName)"></span>
          </div>
        </div>
        <!-- <span>{{this.$t('member.userMember.um11')}}</span> -->
      </div>
    </div>
    <van-popup v-model="show2" position="right" style="width:100%;height:100%">
      <headerComponent :showIcon="true" :showLogo="true" :logo="popuptitle2" @notgoback="notgoback"></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle2}}</div>
        <div class="editpassword setshipaddr">
          <div>
            <span>收货人</span>
           <span v-text="getgoods"></span>
          </div>
         <div>
            <span>联系电话</span>
           <span v-text="getgoods"></span>
          </div><div>
            <span>配送地址</span>
           <span v-text="getgoods"></span>
          </div>
          
          <div class="info" style="margin-top: 20px;font-size:12px;">
            <!--  温馨提示 ： 如需修改绑定银行卡信息，请联系-->
            {{ $t('member.userBankCard.ubc10') }}
            <a
              href="javascript:void(0)"
              @tap="mOpenCService"
              style="color: #3d7eff"
            >{{ $t('member.userBankCard.ubc11') }}</a>
            <!-- 在线客服-->
          </div>
        </div>
      </section>
    </van-popup>
    <van-popup v-model="show1" position="right" style="width:100%;height:100%">
      <headerComponent :showIcon="true" :showLogo="true" :logo="popuptitle" @notgoback="notgoback"></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle}}</div>
        <div class="editpassword">
          <div>
            <span>新密码</span>
            <el-input placeholder="请输入4位数字密码" v-model="passwordVm.password" show-password></el-input>
          </div>
          <div>
            <span>确认密码</span>
            <el-input placeholder="请再次输入密码" v-model="passwordVm.mpassword" show-password></el-input>
          </div>
          <cube-button :active="true" @click="mSave" class="save-btn">
            <span>{{ $t('member.withdrawals.wa11') }}</span>
            <!--下一步 -->
          </cube-button>
          <div class="info" style="margin-top: 20px;font-size:12px;">
            <!--  温馨提示 ： 如需修改绑定银行卡信息，请联系-->
            {{ $t('member.userBankCard.ubc10') }}
            <a
              href="javascript:void(0)"
              @tap="mOpenCService"
              style="color: #3d7eff"
            >{{ $t('member.userBankCard.ubc11') }}</a>
            <!-- 在线客服-->
          </div>
        </div>
      </section>
    </van-popup>
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";
import types from "@/store/mutation-types";
import { mapState } from "vuex";
export default {
  name: "systemset",
  components: {
    headerComponent
  },
  computed: {
    ...mapState({
      sysPicObj: state => state.common.sysPicObj,
      callbackUri: state => state.common.callbackUri
    })
  },
  data() {
    return {
      logo: this.$t("member.userMember.um21"),
      show1: false,
      show2:false,
      popuptitle: "设定提款密码",
      popuptitle2: "收货地址信息",
      getgoods:'',
      passwordVm: {
        password: "",
        mpassword: ""
      },
      passSet: [
        {
          name: "登录密码",
          type: "已设置",
          routeName: "helpcenter"
        },
        {
          name: "提款密码",
          type: "",
          routeName: "withdrawpassword"
        },
        {
          name: "我的消息",
          type: "专业解答"
        }
      ],
      userInfo: [
        {
          name: "银行卡",
          type: "已绑定",
          routeName: "helpcenter"
        },
        {
          name: "收货地址",
          type: "未绑定",
          routeName: "shipaddr"
        },
        {
          name: "我的账户",
          type: "待完善",
          routeName: "safecenter"
        }
      ]
    };
  },
  methods: {
    routetodraw(...a) {
      let name = a[0];
      if (name == "withdrawpassword") {
        this.show1 = true;
      }
      if(name == 'shipaddr') {
          this.show2 = true
      }
    },
    notgoback(data) {
      this.show1 = data;
    },
    mLoginOut() {
      //确定要退出账号吗
      this.mConfirm(this.$t("member.userMember.um25"), () => {
        //请稍等...
        this.mLoading(true, this.$t("member.userMember.um26"));
        this.$http.post("/logout.json").then(result => {
          if (result.code === 0) {
            //退出成功！
            this.mMessage(this.$t("member.userMember.um27"), "success", 0.5);
            sessionStorage.removeItem(types.SESSION_TOKEN);

            if (this.calblackUri) {
              window.open(this.callbackUri, "_self");
            } else {
              this.$store.commit(types.SESSION_TOKEN);
              this.mLoading(false);
              this.$router.push({ name: "Home" });
            }
          }
        });
      });
    }
  },
  created() {
    // this.mInit();
  }
};
</script>
<style lang="less" scoped>
.safecenter {
  width: 351px;
  margin: 0 auto;
  .line.title {
    text-align: left;
    color: #303133;
    font-size: 16px;
    margin-top: 50px;
  }
  // .container {

  // }
  .wrap {
    width: 351px;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    border-bottom: 1px solid #f3f3f3;

    .name_left {
      // width: 72px;

      .icon_new {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin-right: 6px;
        vertical-align: middle;
        background-image: linear-gradient(126deg, #40afff 0%, #3572fa 100%),
          linear-gradient(#3a8dfc, #3a8dfc);
        background-blend-mode: normal, normal;
        box-shadow: 0px 4px 14px 0px rgba(79, 139, 248, 0.27);
      }

      .icon_new_white {
        background: white;
      }

      .text_name {
        font-family: PingFangSC-Regular;
        font-size: 15px;
        line-height: 50px;
        color: #606266;
      }
    }

    .link_right {
      .link_text {
        font-family: PingFangSC-Light;
        font-size: 12px;
        line-height: 42px;
        color: #606266;
      }

      .sanjiao {
        width: 10px;
        height: 10px;
        display: inline-block;
        border-top: 2px solid #e5e5e5;
        border-right: 2px solid #e5e5e5;
        transform: rotate(45deg);
      }
    }
  }

  .editpassword {
    width: 100%;
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      height: 55px;
      border-bottom: 1px solid #f3f3f3;
      /deep/ .el-input__inner {
          border:0;
      }
      & > span {
        min-width: 80px;
      }
    }
  }
  section {
    width: 351px;
    margin: 0 auto;
  }
  .save-btn {
    width: 335px;
    height: 40px;
    background-color: #3d7eff;
    border-radius: 20px;
    padding: 0
  }
  .setshipaddr>div {
      display: flex;
      justify-content: space-between;
      width: 100%
  }
  .setshipaddr>div:last-child{
      border-bottom: 0;
  }
}
</style>
