<template>
  <div class="pointdetails">
    <header-component :showyue="true" :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      <section class="info">
        <div>
          <img src alt class="pointimg">
          <span class="curcount" v-text="count"></span>
          <span class="curpoint">当前积分</span>
          <span class="addpoint">本月新增积分：{{count}}</span>
        </div>
      </section>
      <section class="rooms">
        <h2 class="title">
          <span>积分记录</span>
          <span class="shaixuan-room" @click="showSearch = !showSearch">
            筛选
            <span class="icon-shaixuan"></span>
          </span>
        </h2>
        <section class="el-container is-vertical" v-show="showSearch">
          <div class="searchVm">
            <el-select v-model="searchVm.integralType" placeholder="请选择" class="type" @change="searchpoint">
              <el-option
                v-for="item in jifenoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <el-date-picker
             ref="time"
             class="time"
              v-model="searchVm.time"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>-->
            <div class="time">
              <input
                type="text"
                v-model="searchVm.startOperateTime"
                readonly
                @click="showDatePicker($event,0)"
              >
              <font>~</font>
              <input
                type="text"
                v-model="searchVm.endOperateTime"
                readonly
                @click="showDatePicker($event,1)"
              >
            </div>
            <!-- <Date-picker
              ref="time"
              class="time"
              :value="searchVm.time"
              format="yyyy/MM/dd"
              type="daterange"
              placement="center-end"
              placeholder="选择日期"
            ></Date-picker>-->
            <el-button
              class="btns"
              :class="activeClass == index ? 'active':''"
              v-for="(item,index) in pickerOptions.shortcuts"
              :key="index"
              @click="clickBtn(item.value,index)"
            >{{item.text}}</el-button>
          </div>
        </section>
        <div class="pri" v-for="(item,index) in integralLog" :key="index">
          <div class="pri_img">
            <img :src="getpaysrc(item.img)" alt height="18px">
          </div>
          <div class="pri_main">
            <div>
              <p class="pri_title">{{item.remark}}</p>
              <p class="pri_desc">{{item.exchangeRate}}</p>
            </div>
            <div>
              <p class="pri_title">{{item.operateTimeStr}}</p>
              <p class="pri_desc">{{item.integralTypeStr}}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";
import star from "@/common/Star.vue";
import types from "@/store/mutation-types";
import { mapState } from "vuex";
let currenttime;
export default {
  name: "pointdetails",
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
      logo: "积分明细",
      integralLog: [],
      showSearch: false,
      count: 8888,
      jifenoptions: [],
      activeClass: -1,
      searchVm: {
        startOperateTime: "",
        endOperateTime: "", 
        memberId: 0,
        integralType: 0,
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            value: 1
          },
          {
            text: "最近三天",
            value: 3
          },
          {
            text: "最近一周",
            value: 7
          },
          {
            text: "最近一个月",
            value: 30
          }
        ]
      }
    };
  },
  methods: {
    mInit() {
      this.record = true;
      this.mLoading(true);
      let params = {
        sysId: this.cLoginUser.sysId,
        memberId: this.cLoginUser.id
      };
      this.$http
        .post("/memberCoin/queryIntegralLogs.json", params)
        .then(result => {
          if (result.code == 0) {
            this.integralLog = result.rows;
          }
        });
    },
    clickBtn(value, index) {
      this.activeClass = index;
      const end = new Date();
      const start = new Date();
      // start = ();
      this.searchVm.startOperateTime = this.getMyDate(start.getTime() - 3600 * 1000 * 24 * value)
      this.searchVm.endOperateTime = this.getMyDate(end)
      this.searchpoint()
      // let picker = this.$refs.time.$options;
      // start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
      // picker.$emit('pick', [start, end]);
    },
    getjifenoptions (){
 this.$http
        .post("/memberCoin/integralTypes.json", {})
        .then(result => {
          if (result.code == 0) {
            console.info(result)
            this.jifenoptions = result.data.integralTypes
          }
        });
    },
    searchpoint() {
      this.$http
        .post("/memberCoin/queryIntegralLogs.json", this.searchVm)
        .then(result => {
          if (result.code == 0) {
            this.integralLog = result.rows;
          }
        });
    },
    getpaysrc(a) {
      // return require(`../../assets/images/membercentre/${a}@2x.png`);
      return "";
    },
    showDatePicker(event, index) {
      currenttime = index;
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "请选择开始时间",
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.selectHandle,
          format: { year: "YY年", month: "MM月", date: "第 D 日" }
        });
      }
      this.datePicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      // console.info(date, selectedVal, selectedText);
      if(currenttime == 1) {
        this.searchVm.endOperateTime =  selectedVal.join("/")
      }else{
        this.searchVm.startOperateTime =  selectedVal.join("/")
      }
      this.searchpoint();
      // this.$set(this.searchVm.time, currenttime, selectedVal.join("/"));
    }
  },
  created() {
    this.mInit();
    this.getjifenoptions();
    this.searchVm.memberId = this.cLoginUser.id
  }
};
</script>
<style lang="less" scoped>
.pointdetails {
  .info {
    width: 100%;
    height: 200px;
    & > div {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .pointimg {
        width: 50px;
        height: 70px;
      }
      .curcount {
        font-size: 34px;
        letter-spacing: 0px;
        color: #3d7eff;
      }
    }
    .curpoint {
      font-size: 12px;
      line-height: 10px;
      letter-spacing: 0px;
      color: #909399;
      opacity: 0.5;
    }
    .addpoint {
      font-family: PingFang SC;
      font-size: 12px;
      letter-spacing: 0px;
      color: #606266;
    }
  }
  .title {
    height: 80px;
    width: 351px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title_name {
      font-size: 15px;
      color: #303133;
      .title_desc {
        font-size: 12px;
        color: #909399;
      }
    }
    .howup {
      color: #3d7eff;
      font-size: 12px;
    }
  }
  .pri {
    width: 351px;
    height: 64px;
    align-items: center;
    margin: 0 auto;
    display: flex;
    .pri_img {
      width: 40px;
      text-align: left;
    }
    .pri_main {
      width: 311px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      div {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        .pri_title {
          font-size: 15px;
          color: #606266;
        }
        .pri_desc {
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }
  button.btn {
    width: 250px;
    height: 42px;
    margin-top: 50px;
    background-color: #ffffff;
    border-radius: 21px;
    border: solid 1px #dadada;
    font-family: SourceHanSansCN-Normal;
    font-size: 12px;
    line-height: 42px;
    color: #303133;
    text-align: center;
  }
}
.searchVm {
  width: 351px;
  margin: 0 auto;
  display: flex;
  // padding: 10px;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    & > span {
      min-width: 80px;
    }
  }
  .type {
    /deep/ .el-input--suffix,
    .el-date-editor--daterange {
      background-color: #e2e2e2;
      border-radius: 4px;
    }
    /deep/ .el-input__inner {
      width: 90px;
      background-color: #ededed;
      height: 34px;
    }
  }
  /deep/ .time {
    width: 245px;
    height: 34px;
    background-color: #ededed;
    input {
      width: 118px;
      background-color: #ededed;
    }
  }
  .btns {
    width: 80px;
    height: 34px;
    background-color: #ededed;
    border-radius: 4px;
    // color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: inherit;
  }
  .btns.active {
    background-color: #3d7eff;
    color: #f5f5f5;
  }
  .search_buttons {
    padding-left: 80px;
    display: flex;
    justify-content: space-between;
    /deep/ & > button {
      width: 136px;
      height: 25px;
      line-height: 25px;
      background-color: #3d7eff;
      border-radius: 6px;
      color: #f3f3f3;
      padding: 0;
      text-align: center;
    }
  }
  /deep/ .el-input__inner {
    width: 260px;
  }
}
</style>
