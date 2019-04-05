<template>
  <div id="app">
   <div class="publicpage">
  <div class="TransferRecords publicpage_view" >
   <div class="TopHeader">
     <div id="return" style="position: absolute;">
          <router-link :to="{name:'AgentMember'}">
            <Icon type="ios-arrow-back" />
            </router-link></div>{{ $t('agent.linkManagement.linkManagement1')}}
     </div><!--链接管理 -->
     <!-- <div class="el-row">
      <div class="el-col el-col-24">
       <div class="grid-content bg-purple-dark norecording">
        <span class="el-icon-warning"></span> 暂无记录
       </div>
      </div>
     </div> -->
   <!-- <h1 style="padding-left: 15px; font-weight: 900;"> 本月 </h1>
   <div class="el-row"></div> -->
   <div class="rowbg el-row" v-for="(item,i) in dataList" :key="i">
    <div class="el-col el-col-24" >
     <div class="el-col el-col-12">
      <div class="grid-content bg-purple-dark">
       <span class="Save"> {{item.linkTypeStr}}</span>
      </div>
     </div>
     <div class="el-col el-col-12">
     <div class="Types">
         {{ $t('agent.linkManagement.linkManagement2')}}
     </div><!--注册人数 -->
     <div class="status">
      {{item.regNum}}
     </div>
    </div>
    </div>
    <div class="el-col el-col-12" style="padding-bottom: 1.1rem;">
     <div class="Types" style="width:240px; text-align:center;">
         {{ $t('agent.linkManagement.linkManagement3')}}
     </div><!-- 操作-->
     <div class="status" style="width:240px;">
      <Button type="primary" v-if="item.linkType==2" @click="mShow(item)">{{ $t('agent.linkManagement.linkManagement4')}}</Button><!--分红比例 -->
      <Button type="warning" style="margin-left:15px;" @click="mDelete(item)"> {{ $t('agent.linkManagement.linkManagement5')}} </Button><!--一键删除 -->
     </div>
    </div>
    <div class="el-col el-col-24" >
        <div class="el-col el-col-12" >
          <div class=" bg-purple-dark data" style="width:280px">
            {{item.linkUrl}}
          </div>
        </div>
    </div>
   </div>
  </div>
   </div>
  </div>
</template>
<script>
import window from "../../mixins/window";
var _this=this;
export default {
  mixins: [window],
  data() {
    return {
      dataList: []
    };
  },
  mounted() {
    this.mPullData();
  },
  methods: {
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/agentUser/agentliks.json", params).then(result => {
        if (result.code == 0) {
          this.dataList = !!result.rows ? result.rows : [];
        }
      });
    },
    mDelete(rows) {
        //确定要删除？
      this.mConfirm(_this.$t('agent.linkManagement.linkManagement6'), () => {
        this.mLoading(true);
        var params = Object.assign({}, rows);
        this.$http
          .post("/agentUser/delAgentlinks.json", params)
          .then(result => {
            if (result.code == 0) {
              this.mAlert(result.message, "success");
              this.mPullData();
            } else {
              this.mAlert(result.message, "error");
            }
          });
      });
    },
    mShow(rows) {
      this.mWinOpen(
          //分红比例详情
          _this.$t('agent.linkManagement.linkManagement7'),
        () => import("./Commission.vue"),
        {
          benefitAmountRebate: rows.benefitAmountRebate,
          profitRebate: rows.profitRebate,
          rakebackRebate: rows.rakebackRebate
        },
        300
      );
    }
  },created(){
      _this=this;
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
  padding-left: 0.1rem;
  text-align: left;
}
.TransferRecords .Types {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: 700;
}
</style>

