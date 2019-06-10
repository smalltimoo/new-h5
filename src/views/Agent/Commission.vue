<template>
    <div class="userbasic_body">
        <ul class="bank_list">
            <li style="font-size: 30px;">
                <span class="tit">{{ $t('agent.commission.commission1')}}</span><!--分红比例： -->
                <span>{{vm.profitRebate}}%</span>
            </li>
            <li style="font-size: 30px;">
                <span class="tit">{{ $t('agent.commission.commission2')}}</span><!-- 优惠扣除比例：-->
                <span>{{vm.benefitAmountRebate}}%</span></li>
            <li style="font-size: 30px;">
                <span class="tit">{{ $t('agent.commission.commission3')}}</span><!--返水扣除比例： -->
                <span>{{vm.rakebackRebate}}%</span>
            </li>
        </ul>
        <br><br>
        <div>
      <Button type="error" long style="height:50px; font-size:20px" @click="mClose">{{ $t('agent.commission.commission4')}}</Button><!--关闭 -->
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      vm: {
        benefitAmountRebate: 0,
        profitRebate: 0,
        rakebackRebate: 0
      }
    };
  },
  props: {
    paramData: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.vm = Object.assign({}, this.paramData);
  },
  methods: {
    mClose() {
      this.$emit("closecallback");
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-modal-header {
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  background-color: #adadc3;
}
/deep/ .model-alert .ivu-modal-content {
   background-image: url('../../assets/images/agent/tangchuang@2x.png')
}
.userbasic_body {
  /* width: 300px;
  height: 300px; */
  /* background-image: url('../../assets/images/agent/tangchuang@2x.png') */
}
</style>

