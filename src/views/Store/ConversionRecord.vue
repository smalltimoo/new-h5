<template>
  <div>
    <div class="publicpage">
      <div class="TransferRecords publicpage_view">
        <div class="TopHeader">
          <div id="return" style="position: absolute;">
            <router-link :to="{name:'UserMember'}">
              <Icon type="ios-arrow-back" />
            </router-link>
          </div>{{ $t('store.conversionRecord.conversion1') }}
        </div><!-- 兑换记录-->
        <Scroll height="100%">
          <div class="rowbg el-row" v-for="(item,i) in dataList" :key="i">
            <div class="el-col el-col-24" style="padding-bottom: 1.1rem;">
              <div class="el-col el-col-6">
                <div class="grid-content bg-purple-dark">
                  <span class="Save"> {{item.shipStateStr}}</span>
                </div>
              </div>
              <div class="el-col el-col-12">
                <div class=" bg-purple-dark data">
                  {{item.payTimeStr}}
                </div>
              </div>
            </div>
            <div class="el-col el-col-8">
              <div class="Types">
                {{ $t('store.conversionRecord.conversion2') }}
              </div><!--联系人 -->
              <div class="status">
                {{item.memberName}}
              </div>
            </div>
            <div class="el-col el-col-8">
              <div class="Types">
                {{ $t('store.conversionRecord.conversion3') }}
              </div><!-- 联系电话-->
              <div class="status">
                {{item.phone}}
              </div>
            </div>
            <div class="el-col el-col-8">
              <div class="Types">
                {{ $t('store.conversionRecord.conversion4') }}
              </div><!--兑换积分 -->
              <div class="status">
                {{item.totalPrice}}
              </div>
            </div>
            <div class="el-col el-col-24">
              <div class="Types">
                {{ $t('store.conversionRecord.conversion5') }}
              </div><!--收货地址 -->
              <div class="status">
                {{item.address}}
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </div>
  </div>
</template>
<script>
import slist from "@/mixins/list";
import { dateFormat } from "@/utils/util";
export default {
  mixins: [slist],
  data() {
    return {
      showSearch: false,
      initData: {
        total: 0
      },
      dataList: [],
      searchVM: {
        orderBy: "id desc",
        rows: 20
      }
    };
  },
  mounted() {
    this.mPullData();
  },
  methods: {
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/imo/myOrders.json", params).then(result => {
        if (result.code == 0) {
          this.initData.total = result.total;
          this.dataList = !!result.data ? result.data : [];
        }
      });
    }
  },
  created() {}
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

.TopHeader {
  background-color: #545478;
  border-bottom: 1px solid #3a3a3a;
  color: #fff;
}

.TransferRecords .filter {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  z-index: 15;
  color: #fff;
  font-weight: 800;
  padding: 13px 10px;
}

.TransferRecords {
  width: 100%;
  font-size: 0;
}

.publicpage_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.TransferRecords h1 {
  line-height: 1.8rem;
  font-size: 16px;
  text-align: left;
}

.TransferRecords .rowbg {
  background: #545478;
  padding: 1rem;
  border-bottom: 1px solid #3a3a3a;
  margin-bottom: 10px;
}

.TransferRecords .Save {
  display: block;
  padding: 0.05rem;
  text-align: center;
  background: #ff695a;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
}

.TransferRecords .status {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #fff;
}

.TransferRecords .data {
  line-height: 22px;
  font-size: 14px;
  padding-left: 2.1rem;
  text-align: left;
  color: #fff;
}

.TransferRecords .Types {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: 700;
}
</style>
