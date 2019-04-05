<template>
  <div id="app">
    <div class="publicpage">
      <div class="userSettings publicpage_view">
        <div class="TopHeader">
          <div id="return" style="position: absolute;">
            <router-link :to="{name:'Exchange'}">
              <Icon type="ios-arrow-back"/>
            </router-link>
          </div>{{ $t('store.order.order1') }}
        </div><!-- 确认订单-->
        <div class="main" style="margin-top:20px;">
          <div class="keke_warning"></div>
          <div class="c tjbd">
            <div class="usinfo">
              <div class="goodssubject" style="text-align:center;">★{{vm.title}} ★</div>
              <div style="width:200px;height:250px;margin: 20px 30px;">
                <img :src="vm.img" style="width: 300px;height: 240px;">
              </div><!-- 本次购买应付-->
              <p class="bc">{{ $t('store.order.order2') }}
                <img
                  src="source/plugin/keke_integralmall/template/images/coin.png"
                  width="12"
                  height="13"
                >
                <span class="col">{{vm.currentPrice}}</span> {{ $t('store.order.order3') }}
              </p><!--积分 -->
              <p class="yuer" style="padding-bottom:0px !important;font-size: 16px;">
                <strong>{{ $t('store.order.order4') }}</strong><!-- 当前账户余额 :-->
                <img
                  src="source/plugin/keke_integralmall/template/images/coin.png"
                  width="12"
                  height="13"
                  style="margin:0 5px 0px 10px;"
                >
                <span class="col">{{integral/100}}</span>
              </p>
              <p class="fulladdr" style="margin-bottom:0px;border-bottom:none;font-size: 16px;">
                <strong>{{ $t('store.order.order5') }}</strong><!--联系信息 : -->
                <span style="color:#f60">{{user.memberName}}，{{user.phone}}</span>
              </p>
              <p class="fulladdr" style="font-size: 16px;margin-bottom:0px;border-bottom:none;">
                <strong>{{ $t('store.order.order6') }}</strong><!-- 收货地址 :-->
                <!-- <a style="text-decoration:none; color:#999" v-if="user.address == null">[设置]</a> -->
                <span style="color:#f60">{{user.address}}</span>
              </p>
              <p class="fulladdr" style="font-size: 16px;margin-bottom:0px;border-bottom:none;">
                <strong>{{ $t('store.order.order7') }}</strong><!--当前库存 : -->
                <span style="color:#f60">{{vm.stockquantity}}</span>
              </p>
              <p class="fulladdr" style="font-size: 16px;">
                <strong>{{ $t('store.order.order8') }}</strong><!-- 购买数量 :-->
                <Input :placeholder="$t('store.order.order9') " style="width: 120px" v-model="buyNum"/><!-- 默认数量为：1-->
              </p>
            </div>
            <textarea
              name="keke_integralmall_hf"
              class="keke_integralmall_hf"
              v-model="vm.title"
              readonly
            ></textarea>
          </div>
          <p class="submits" style="text-align:center;">
            <button type="submit" name="mallsub" id="mallsub" class="qrgm" value="true">
              <strong style="font-weight:normal;" @click="mSave">{{$t('store.order.order10') }}</strong><!--确认购买 -->
            </button>
            <!-- <button type="submit" name="sub" id="sub" class="qrgma" value="true" ><strong style="font-weight:normal;" >再逛逛</strong></button> -->
          </p>
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
        currentPrice: 0,
        title: "",
        content: "",
        stockquantity: 0,
        id: 0,
        img: ""
      },
      integral: 0,
      user: {},
      buyNum: 1
    };
  },
  props: {
    paramData: Object,
    defult: {}
  },
  mounted() {
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.integral = result.data.integral;
      }
    });
    this.$http.get("/memberUser/getMemberAddress.json").then(result => {
      if (result.code == 0) {
        this.user = !!result.data ? result.data : {};
        if (!!this.user.id) {
          this.isDoing = true;
        } else {
          this.isDoing = false;
        }
      } else if (result.code == -1) {
          //尚未设置收货地址
        this.mAlert(this.$t('store.order.order11') , () => {
          this.$router.push({ path: "./receiving" });
        });
      }
    });
    this.mInit();
  },
  methods: {
    mInit() {
      this.vm.currentPrice = this.$route.query.currentPrice;
      this.vm.title = this.$route.query.title;
      this.vm.content = this.$route.query.content;
      this.vm.stockquantity = this.$route.query.stockquantity;
      this.vm.img = this.$route.query.img;
      this.vm.id = this.$route.query.id;
    },
    mSave() {
      this.mLoading(true);
      this.$http
        .post("/imo/exchange.json", { id: this.vm.id, buyNum: this.buyNum })
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
              //兑换成功！
            this.mAlert(this.$t('store.order.order12'), () => {}, "success");
            this.$router.push({
              path: "./Exchange"
            });
          } else {
            this.mAlert(result.message, () => {}, "error");
          }
        });
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
#app {
  text-align: left;
}
.main {
  padding: 10px;
  font-size: 14px;
  margin-bottom: 70px;
}
.keke_warning {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 20%;
  z-index: 9999;
  top: 200px;
  padding: 10px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
}
.tjbd {
  font-size: 14px;
  line-height: 28px;
  width: 100%;
}
.goodssubject {
  font-size: 20px;
  color: #999;
}
.tjbd .usinfo p.bc {
  margin-top: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 3px;
}
.tjbd .usinfo p {
  padding: 10px 0px;
  color: #666;
}
.tjbd strong {
  color: #dcdee2;
}
.tjbd .usinfo p.fulladdr {
  border-bottom: 1px dotted #eee;
  border-top: 1px dotted #eee;
  margin-bottom: 15px;
  padding-right: 10px;
}
.tjbd .usinfo p {
  padding: 10px 0px;
  color: #666;
}
.tjbd span.col {
  color: #f60;
}
.keke_integralmall_hf {
  width: 100%;
  height: 70px;
  border: 1px solid #eee;
  color: #999;
  font-size: 14px;
  padding: 10px;
  -webkit-appearance: none;
  margin-top: 15px;
}
.submits {
  margin-bottom: 20px;
}
.qrgm,
.qrgma {
  width: 120px;
  height: 30px;
  text-align: center;
  border: 0;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
.qrgm {
  background: #ffe100;
}
.qrgm {
  margin: 0 10px;
}
.qrgma {
  background: #111;
  color: #fff;
}
</style>
