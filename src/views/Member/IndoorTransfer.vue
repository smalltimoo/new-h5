<template>
  <div id="app">
    <div class="publicpage">
      <div class="interchange">
        <div class="TopHeader">
          <div id="return" style="position: absolute;">
            <router-link :to="{name:'UserMember'}">
              <Icon type="ios-arrow-back"/>
            </router-link>
          </div> {{ $t('member.indoorTransfer.it1') }}
        </div><!--额度转换 -->
        <router-link
          :to="{name:'OnlineDeposit'}"
          class
          style="font-size: 14px; position: absolute; top: 0px; right: 10px; z-index: 20; color: rgb(255, 255, 255); line-height: 40px; font-weight: 900;"
        >
          {{ $t('member.indoorTransfer.it1') }}
        </router-link><!--先去存款 -->
        <form class="el-form el-form--label-right" style="margin-top: 10px;">
          <div class="line-w"></div>
          <div class="el-form-item">
            <label class="el-form-item__label" style="width: 80px;">{{ $t('member.indoorTransfer.it2') }}</label><!--模式 -->
            <Select style="width: 60%;" class="el-form-item__content" v-model="transferType">
              <Option value="0">{{ $t('member.indoorTransfer.it3') }}</Option><!--转入 -->
              <Option value="1">{{ $t('member.indoorTransfer.it4') }}</Option><!--转出 -->
            </Select>
          </div>
          <div class="line-w"></div>
          <div class="el-form-item">
            <label class="el-form-item__label" style="width: 80px;">{{ $t('member.indoorTransfer.it5') }}</label><!--平台 -->
            <div class="el-form-item__content" style="margin-left: 80px;">
              <div class="el-input">
                <!---->
                <input
                  @tap="mShowWalletPicker"
                  :placeholder="$t('member.indoorTransfer.it6')"
                  readonly
                  :value="cBankText"
                  type="text"
                  style="width: 80%;"
                  class="el-input__inner"
                ><!--请选择钱包 -->
                <!---->
                <!---->
                <!---->
              </div>
              <!-- <span class="All">全部转入</span> -->
              <!---->
            </div>
          </div>
          <div class="line-w"></div>
          <div class="el-form-item">
            <label class="el-form-item__label" style="width: 80px;">{{ $t('member.indoorTransfer.it7') }}</label><!--金额-->
            <div class="el-form-item__content" style="margin-left: 80px;">
              <div class="el-input">
                <!---->
                <input
                  v-model="vm.dealCoin"
                  :placeholder="$t('member.indoorTransfer.it7')"
                  maxlength="8"
                  type="number"
                  step="1"
                  min="1"
                  class="el-input__inner"
                  style="width: 80%;"
                ><!-- 金额-->
                <!---->
                <!---->
                <!---->
              </div>
              <!-- <span class="All">全部转入</span> -->
              <!---->
            </div>
          </div>
          <div class="line-w"></div>
        </form>
        <button
          type="button"
          class="el-button G-submit el-button--primary el-button--default"
          @click="mSave"
        >
          <!---->
          <!---->
          <span>{{ $t('member.indoorTransfer.it8') }}</span><!--确定转账 -->
        </button>
      </div>
    </div>
  </div>
</template>
<script>
var vue
export default {
  data() {
    return {
      walletlist: [],
      transferType: '',
      wallet: '',
      vm: {
        walletIn: '',
        walletOut: '',
        dealCoin: ''
      },
      walletPicker: {},
      sltwallet: {},
      coin: {}
    }
  },
  computed: {
    cBankText() {
      return this.sltwallet.text ? this.sltwallet.text : ''
    }
  },
  mounted() {
    this.$nextTick(this.mInit)
  },
  methods: {
    mInit() {
      this.mLoading(true)
      this.mGetBanks().then(rbanks => {
        console.log('00000')
        if (rbanks.code == 0) {
          let list = rbanks.data.walletlist ? rbanks.data.walletlist : []
          list.forEach(ele => {
            ele.value = ele.gameCompanyId
            ele.text = ele.gameCompanyName + '(' + ele.coin / 100 + ')'
          })
          this.walletlist = list
          this.mInitWalletPicker()
          this.mLoading(false)
        } else {
          this.mLoading(false)
          this.mAlert(rbanks.message, () => {}, 'error')
        }
      })
    },
    mGetBanks() {
      return this.$http.post('/managerGame/getWalletCoins.json')
    },
    mSave() {
      if (this.transferType == '') {
          //请选择操作方式
        this.mAlert( this.$t('member.indoorTransfer.it9') )
        return
      }
      if (this.wallet == '' || this.wallet <= 0) {
          //请选择要操作的钱包
        this.mAlert(this.$t('member.indoorTransfer.it10'))
        return
      }
      if (this.vm.dealCoin%1!=0) {
        //请输入整数
        this.mAlert(this.$t("member.indoorTransfer.inputNumber"));
        return;
      }
      if (this.vm.dealCoin < 1) {
          //转账金额必须大于1元
        this.mAlert(this.$t('member.indoorTransfer.it11'))
        return
      }
      if (this.transferType == 0) {
        //转入
        this.vm.walletIn = this.wallet
        this.vm.walletOut = 0
      } else if (this.transferType == 1) {
        this.vm.walletIn = 0
        this.vm.walletOut = this.wallet
      }
      this.mLoading(true)
      this.$http
        .post('/managerGame/wallettransfer.json', this.vm)
        .then(result => {
          this.mLoading(false)
          if (result.code == 0) {
            this.mRefreshAccountInfo()
            this.mAlert(
                //操作成功
                    this.$t('member.indoorTransfer.it12'),
              () => {
                this.mInit()
              },
              'success'
            )
            if (result.data < 0) {
                //记录转账记录失败
              this.mAlert( this.$t('member.indoorTransfer.it13'), () => {})
            } else if (result.data == 2) {
                //操作中心账户失败
              this.mAlert(this.$t('member.indoorTransfer.it14'), () => {})
            } else if (result.data == 3) {
                //游戏厅操作失败
              this.mAlert(this.$t('member.indoorTransfer.it15'), () => {})
            } else if (result.data == 4) {
                //游戏厅未返回，请联系客服
              this.mAlert(this.$t('member.indoorTransfer.it16'), () => {})
            }
          } else {
            this.mAlert(result.message, () => {})
          }
        })
    },
    mInitWalletPicker() {
      this.walletPicker = new mui.PopPicker()
      this.walletPicker.setData(this.walletlist)
    },
    mShowWalletPicker() {
      this.walletPicker.show(function(sltItem) {
        vue.coin = sltItem[0]
        vue.sltwallet = sltItem[0]
        vue.wallet = sltItem[0].value
      })
    }
  },
  created() {
    vue = this
  }
}
</script>

<style>
.HomeWrapper {
  /*background-color: #33334e;*/
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
.interchange {
  position: relative;
  width: 100%;
  font-size: 0;
  padding-bottom: 80px;
}
.interchange .el-form-item {
  position: relative;
  background: #545478;
  height: 56px;
  padding-top: 7px;
  margin-bottom: 0;
}
.interchange .el-form-item__label {
  font-weight: 900;
  color: #fff;
}
.interchange .el-form-item__content .error {
  position: absolute;
  right: 15px;
  top: 15px;
}
.interchange .el-input__inner {
  background-color: #545478;
  color: #fff;
}
.el-input__inner:hover {
  border-color: #c0c4cc;
}
.interchange input {
  outline: none;
  border: none;
}
.interchange .All {
  position: absolute;
  top: 0;
  right: 15px;
  color: #a5a5a5;
}
.interchange .el-button--primary {
  background-color: #ffb301;
  border-color: #ffc501;
}
.ivu-select {
  width: 200px;
  margin-top: 6px;
}
.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  float: left;
  font-size: 15px;
  color: #fff;
  background-color: inherit!important;
}
.ivu-select-single .ivu-select-selection {
  background-color: #545478;
  border: none;
}
.ivu-select-arrow {
  font-size: 26px;
  color: #fff;
}
.ivu-select-item {
  font-size: 15px !important;
}
</style>
