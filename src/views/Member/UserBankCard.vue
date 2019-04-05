<template>
  <div id="app">
    <div class="publicpage">
      <div class="userBankCard publicpage_view">
        <div class="TopHeader">
          <div id="return" style="position: absolute;">
            <router-link :to="{name:'UserSettings'}">
              <Icon type="ios-arrow-back"/>
            </router-link>
          </div>{{ $t('member.userBankCard.ubc1') }}
        </div><!-- 银行卡-->
        <section class="el-container" v-if="vm.account==''">
          <main class="el-main" style="background: transparent;">
            <div class="el-row">
              <div class="el-col el-col-24">
                <div class="el-card">
                  <div class="el-card__body" style="padding: 0px;">
                    <router-link :to="{name:'UserCapitalPassword'}" class="Addcard">
                      <span class="el-icon-circle-plus-outline add"></span>{{ $t('member.userBankCard.ubc2') }}
                    </router-link><!--点击此处新增银行卡 -->
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
        <div v-else>
          <div class="el-row">
            <div class="el-col el-col-24">
              <div class="grid-content">{{ $t('member.userBankCard.ubc3') }}</div><!--银行卡开户信息 -->
            </div>
          </div>
          <div class="el-row">
            <div class="el-col el-col-24">
              <div class="grid-content bg-purple-dark">
                {{ $t('member.userBankCard.ubc4') }}
                <span class="info" name><!--开户人姓名 -->
                  &nbsp; {{vm.drawAccountName}}
                  <span style="padding-left: 15px;" name></span>
                </span>
              </div>
            </div>
          </div>
          <div class="el-row">
            <div class="el-col el-col-24">
              <div class="grid-content bg-purple-dark">
                <div to="/modify" class="bg-purple-dark">
                  {{ $t('member.userBankCard.ubc5') }}
                  <span class="info"><!--联系号码 -->
                    {{vm.mobile}}
                    <span style="padding-left: 15px;"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="el-row">
            <div class="el-col el-col-24">
              <div class="grid-content bg-purple-dark">
                {{ $t('member.userBankCard.ubc6') }}
                <span class="info"><!--开户银行卡 -->
                  {{vm.bankTypeName}}
                  <span style="padding-left: 15px;"></span>
                </span>
              </div>
            </div>
          </div>
          <div class="el-row">
            <div class="el-col el-col-24">
              <div class="grid-content bg-purple-dark">
                {{ $t('member.userBankCard.ubc7') }}
                <span class="info"><!-- 银行卡号 -->
                  {{vm.account}}
                  <span style="padding-left: 15px;"></span>
                </span>
              </div>
            </div>
          </div>
          <div class="el-row">
            <div class="el-col el-col-24">
              <div class="grid-content bg-purple-dark">
                {{ $t('member.userBankCard.ubc8') }}
                <span class="info"><!-- 省市县(区) -->
                  {{(this.vm.provinceStr?this.vm.provinceStr+" ":"")+(this.vm.cityStr?this.vm.cityStr+" ":"")+(this.vm.areaStr?this.vm.areaStr+" ":"")}}
                  <span
                    style="padding-left: 15px;"
                  ></span>
                </span>
              </div>
            </div>
          </div>
          <div class="el-row">
            <div class="el-col el-col-24">
              <div class="grid-content bg-purple-dark">
                {{ $t('member.userBankCard.ubc9') }}
                <span class="info"><!--开户地址 -->
                  {{vm.drawAddress}}
                  <span style="padding-left: 15px;"></span>
                </span>
              </div>
            </div>
          </div>
          <div class="title"><!--  温馨提示 ： 如需修改绑定银行卡信息，请联系-->
            {{ $t('member.userBankCard.ubc10') }}
            <a
              href="javascript:void(0)"
              @tap="mOpenCService"
              style="color: rgb(184, 17, 9);"
            >{{ $t('member.userBankCard.ubc11') }}</a><!-- 在线客服-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vm: {
        account: "", //银行卡号
        bankTypeName: "", //开户行
        drawAccountName: "", //开户人姓名
        drawAddress: "", // 开户地址
        mobile: "" //开户人手机号码
      }
    };
  },
  mounted() {
    this.mInit();
  },
  methods: {
    mInit() {
      this.mLoading(true);
      this.$http.all([this.mGetMembercoin(), this.mGetBindBank()]).then(
        this.$http.spread((resCoin, rbindbank) => {
          if (resCoin.data == -1) {
            this.data = resCoin.data;
            //请先设置资金密码
            this.mAlert(this.$t('member.userBankCard.ubc12'), () => {
              this.$router.push({ name: "SafaPassword" });
            });
          }
          if (rbindbank.code == 0) {
            this.vm = Object.assign(this.vm, rbindbank.data);
          }
          this.mLoading(false);
        })
      );
    },
    mGetMembercoin() {
      return this.$http.get("/memberUser/membercoin.json");
    },
    mGetBindBank() {
      return this.$http.get("/memberUser/getbindbank.json");
    }
  }
};
</script>
<style scoped>
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
.HomeWrapper {
  /* height: 100%; */
  /*background-color: #33334e;*/
}
.userBankCard {
  font-size: 0;
  width: 100%;
}
.userBankCard .Addcard {
  display: block;
  width: 100%;
  padding: 50px;
  color: #c8a675;
  font-size: 15px;
}
.userBankCard .Addcard .add {
  font-size: 60px;
  display: block;
  color: #c8a675;
  margin-bottom: 15px;
}
.userBankCard .el-main {
  margin-top: 5px;
  background: #545478;
}
.userBankCard .grid-bank {
  position: relative;
}
/* .userBankCard .bg-purple-dark {
  line-height: 30px;
  font-size: 20px;
  text-align: left;
  font-weight: 600;
} */
.title {
  font-size: 12px;
  margin-top: 8px;
  line-height: 17px;
  padding: 0 7px;
}
.title a {
  color: red;
}
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  font-size: 22px;
  background-color: #545478;
  border: none;
  color: #fff;
}
.gameLimit {
  font-size: 0;
  width: 100%;
}
.TopHeader {
  position: relative;
  z-index: 8;
  background: #545478;
  font-size: 17px;
  height: 40px;
  font-weight: 900;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
.grid-content {
  height: 35px;
  line-height: 35px;
  text-align: left;
  padding-left: 16px;
  font-size: 14px;
}
.bg-purple-dark {
  display: block;
  position: relative;
  /*background: #545478;*/
  height: 44px;
  line-height: 44px;
  color: #fff;
  font-weight: 700;
  border-bottom: 1px solid #33334e;
}
.el-button--primary {
  background-color: #ffb301;
  border-color: #ffc501;
}
.info {
  position: absolute;
  right: 16px;
  top: 0;
  text-align: right;
  min-width: 90px;
}
.x-icon-game-logo {
  width: 58px;
  height: 58px;
  background-position: -336px -388px;
}
</style>
