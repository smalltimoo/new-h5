<template>
    <div>
        <div  class="codeContent" v-if="!isEnd">
            <div style='width: 247px; height: 247px; margin: 0 auto; padding-top: 10px;'>
                <img v-if="isShowQcode" :src="cApi+'/payQRCoder.do?payUrl='+qrcodePath" style="width:247px; height:247px;" />
            </div>
            <div style="font-weight:bold;color:red;text-align:center;padding-top:10px;">{{ $t('member.createQrCode.cqc1') }}</div><!--付款及时到账，二维码请勿重复使用 -->
            <div v-if="isTimer>0">
                <div style="font-weight:bold;text-align:left;padding-left:38px;padding-top:10px;" v-text="$t('member.createQrCode.cqc2')+orderNo"></div><!--订单号： --> <!--付款二维码有效时间: -->
                <div style="font-weight:bold;color:green;padding-left:38px;padding-top:10px;">{{ $t('member.createQrCode.cqc3') }}
                    <strong><s></s> {{minute}} {{ $t('member.createQrCode.cqc4') }}</strong><!--分 -->
                    <strong><s></s> {{second}} {{ $t('member.createQrCode.cqc5') }}</strong><!-- 秒-->
                </div>
            </div>
            <Spin fix v-if="isLoading">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>{{ $t('member.createQrCode.cqc6') }}</div><!--处理中... -->
            </Spin>
        </div>
         <div  class="codeContent" v-if="isEnd">
            <div style='margin:0 auto; width:340px;padding-top:20px; text-align:center; color:#ccc;font-weight:bold; font-size:32px;'><p>{{ $t('member.createQrCode.cqc7') }}</p><p>{{ $t('member.createQrCode.cqc8') }}</p></div><!--付款二维码已过期 --> <!--请重新生成付款码 -->
         </div>
    </div>
</template>
<script>
var _this;
let djs = null; //倒计时
let timerCheck = null;
export default {
  props: {
    paramData: Object,
    defult: {}
  },
  data() {
    return {
      isLoading: false,
      isShowQcode: false,
      isTimer: 0,
      orderNo: "",
      qrcodePath: "",
      minute: "",
      second: "",
      isEnd: false
    };
  },
  methods: {
    mInit() {
      let param = {
        apiid: this.paramData.apiid,
        serviceType: this.paramData.serviceType,
        apitypeid: this.paramData.apitypeid,
        orderAmount: this.paramData.orderAmount
      };
      this.isLoading = true;
      this.$http
        .post(this.paramData.url, param)
        .then(result => {
          this.mLoading(false);
          if (result.code == "0") {
            this.isTimer = result.data.isTimer;
            this.orderNo = result.data.orderNo;
            this.qrcodePath = result.data.qrcoDepath;
            this.isShowQcode = true;
            if (this.isTimer * 1 > 0) {
              this.timer();
            }
            this.timerCheck = setTimeout(() => {
              this.checkorder();
            }, 10000);
            //console.log(result.data);
          }
          this.isLoading = false;
        })
        .catch(error => {
          this.mClose();
        });
    },
    timer() {
      this.djs = window.setInterval(() => {
        var d = 0,
          h = 0;
        //minute = 0,
        // second = 0;//时间默认值
        if (this.isTimer > 0) {
          this.minute = Math.floor(this.isTimer / 60) - d * 24 * 60 - h * 60;
          this.second =
            Math.floor(this.isTimer) -
            d * 24 * 60 * 60 -
            h * 60 * 60 -
            this.minute * 60;
        }
        this.isTimer--;
        if (this.isTimer <= 0) {
          this.isEnd = true;
          if (this.djs != null) {
            window.clearInterval(this.djs);
          }
          if (this.timerCheck != null) {
            clearTimeout(this.timerCheck);
          }
        }
      }, 1000);
    },
    checkorder() {
      this.$http
        .post("/recharge/rechargeState.json?id=" + this.orderNo, {})
        .then(result => {
          if (result.code == 0) {
            if (result.data == 1 || result.data == 3) {
              this.mAlert(
                  //恭喜，充值成功！
                  this.$t('member.createQrCode.cqc9'),
                () => {
                  this.mClose();
                },
                "success"
              );
              if (this.timerCheck != null) {
                clearTimeout(this.timerCheck);
              }
            } else if (result.data == 2) {
              this.mAlert(
                  //抱歉，充值失败请联系客服！
                  this.$t('member.createQrCode.cqc10'),
                () => {
                  this.mClose();
                },
                "error"
              );
              if (this.timerCheck != null) {
                clearTimeout(this.timerCheck);
              }
            } else {
              this.timerCheck = setTimeout(() => {
                this.checkorder();
              }, 2000);
            }
          } else {
            this.timerCheck = setTimeout(() => {
              this.checkorder();
            }, 2000);
          }
        });
    },
    mClose() {
      this.$emit("closecallback");
    }
  },
  created() {
    _this = this;
    this.mInit();
  },
  destroyed() {
    _this = undefined;
    if (this.djs != null) {
      window.clearInterval(this.djs);
    }
    if (this.timerCheck != null) {
      clearTimeout(this.timerCheck);
    }
  }
};
</script>
