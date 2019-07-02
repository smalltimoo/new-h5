<template>
  <div class="main-body">
    <!-- 侧滑导航根容器 -->
    <div class="mui-off-canvas-wrap mui-scalable">
      <!-- 主页面容器 -->
      <div class="mui-inner-wrap">
        <div class="header hasApp">
          <div class="header-left">
            <Icon type="ios-arrow-back" class="icon-menu" @click.stop="goBack"/>
            <span class="logo">{{logo}}</span>
          </div>
          <div class="header-right">
            <div class="yue">余额:{{yue}}</div>
            <span class="shaixuan-room" @click="showSearch = !showSearch">
              筛选
              <span class="icon-shaixuan"></span>
            </span>
          </div>
        </div>
        <section class="el-container is-vertical" v-show="showSearch">
          <div class="searchVm">
            <el-select
              v-model="searchVm.actionType"
              placeholder="请选择"
              class="type"
              @change="mSearch"
            >
              <el-option
                v-for="item in initData.actionTypes"
                :key="item.id"
                :label="item.value"
                :value="item.id"
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
                v-model="searchVm.startDate"
                readonly
                @click="showDatePicker($event,0)"
              >
              <font>~</font>
              <input
                type="text"
                v-model="searchVm.endDate"
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
        <div class="no-list" v-if="!dataList||dataList.length==0"></div>
        <!-- 主页面内容容器 -->
        <Scroll
          v-if="dataList&&dataList.length>0"
          ref="ivuScrollContainer"
          :on-reach-bottom="mReachBottom"
          :height="ivuScrollContainerHeight"
        >
          <div v-for="(item,i) in dataList" :key="i" style="background-color:#f3f3f3">
            <!-- <div style="font-size: 12px">{{item.createTimeStr}}</div> -->
            <div class="rowbg el-row">
              <div class="grid-content grid-content1">
                <div>
                  <span class="num">{{item.amount / 100}}</span>
                  <span class="user">{{$t('agent.transactionsdetailList.transactionsdetailList9')}}</span>
                </div>
                <div style="align-items:flex-end">
                  <span class="btn success" style="margin-bottom:9px;">{{item.actionTypeStr}}</span>
                  <span class="user">{{item.createTimeStr}}</span>
                </div>
              </div>
              <div class="grid-content grid-content3">
                <span
                  class="num"
                >{{ $t("member.rechargeRecord.rr6") }}&nbsp;&nbsp;￥{{item.beforeAmount/100}}</span>
                <span>
                  {{ $t("member.rechargeRecord.rr7") }}&nbsp;&nbsp;
                  <font
                    style="color:#3d7eff"
                  >￥{{item.afterAmount/100}}</font>
                </span>
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
import { dateFormat } from "../../assets/lib/util";
import headerComponent from "@/common/Header.vue";
require("../../style/mui/index.less");
var vue;
let currenttime;
export default {
  mixins: [slist],
  data() {
    return {
      logo: "交易记录",
      yue: Number,
      initData: {
        actionTypes: [],
        total: 0
      },
      showSearch: false,
      dataList: [],
      searchVm: {
        startDate: "",
        endDate: "",
        actionType: '-1',
      },
      activeClass: -1,
      jifenoptions: [],
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
      },
      ivuScrollContainerHeight: 620
    };
  },
  components: {
    headerComponent
  },
  mounted() {
    this.mPullData();
    this.getamount();
  },
  methods: {
    mInit() {
      this.$http.get("/memberCoin/coinindex.json").then(result => {
        if (result.code == 0) {
          let gcs = result.data.actionTypes;
          gcs.unshift({ id: '-1', value: this.$t("member.rechargeRecord.rr9") });
          gcs.forEach((ele, i) => {
            ele.checked = i === 0;
            ele.id = String(ele.id)
            // ele.label = ele.value;
            // ele.value = +ele.id;
          });
          this.initData.actionTypes = result.data.actionTypes;
        }
      });
    },
    getamount() {
      this.$http.post("/memberUser/memberamount.json").then(result => {
        if (result.code == 0) {
          console.info(result.data);
          this.yue = (result.data / 100).toFixed(2);
        }
      });
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVm);
      this.$http.post("/memberCoin/coinlist.json", params).then(result => {
        if (result.code == 0) {
          this.initData.total = result.total;
          this.dataList = !!result.rows ? result.rows : [];
        }
        this.mLoading(false);
      });
    },
    mReachBottom() {
      return new Promise(resolve => {
        this.mLoading(true);
        if (
          parseInt(
            this.initData.total / (this.searchVm.rows * this.searchVm.page)
          ) > 0
        ) {
          ++this.searchVm.page;
          this.searchVm.start = (this.searchVm.page - 1) * this.searchVm.rows;
          this.searchVm.limit = this.searchVm.rows;
          var params = Object.assign({}, this.searchVm);
          this.$http.post("/memberCoin/coinlist.json", params).then(result => {
            if (result.code == 0) {
              this.initData.total = result.total;
              if (!!result.rows && result.rows.length > 0) {
                this.dataList = this.dataList.concat(result.rows);
              }
              resolve();
            }
          });
        } else {
          this.mLoading(false);
          this.$Message.warning(this.$t("member.rechargeRecord.rr10")); //没有更多记录了
          resolve();
        }
      });
    },
    mOnResize() {
      setTimeout(() => {
        this.ivuScrollContainerHeight =
          window.innerHeight - this.$refs.TopHeader.offsetHeight;
      }, 500);
    },
    clickBtn(value, index) {
      this.activeClass = index;
      const end = new Date();
      const start = new Date();
      // start = ();
      this.searchVm.startDate = this.getMyDate(
        start.getTime() - 3600 * 1000 * 24 * value
      );
      this.searchVm.endDate = this.getMyDate(end);
      // let picker = this.$refs.time.$options;
      // start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
      // picker.$emit('pick', [start, end]);
      this.$nextTick(vm=>{
          this.mSearch();
      })
    },
    mSearch() {
      this.$http
        .post("/memberCoin/coinlist.json", this.searchVm)
        .then(result => {
          if (result.code == 0) {
            this.dataList = result.rows;
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
      if (currenttime == 1) {
        this.searchVm.endDate = selectedVal.join("/");
      } else {
        this.searchVm.startDate = selectedVal.join("/");
      }
      this.mSearch();
      // this.$set(this.searchVm.time, currenttime, selectedVal.join("/"));
    }
  },
  created() {
    vue = this;
    this.mInit();
  }
};
</script>

<style lang="less" scoped>
.header-right {
  .yue {
    margin-right: 80px;
  }
}
.mui-bar .mui-title {
  margin-top: 10px;
  text-align: center;
}

.mui-content {
  margin-top: 0px;
}

.mui-scalable {
  background-color: #efeff4 !important;
}

.rowbg {
  margin: 5px 10px 10px 10px;
  padding: 10px;
  border-bottom: 1px solid #f3f3f3;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px 0px rgba(201, 201, 201, 0.8);
  border-radius: 3px;
}

.Save {
  display: block;
  padding: 0 10px;
  text-align: center;
  border-radius: 2px;
  font-size: 14px;
  color: #fff;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  min-width: 76px;
}

.status {
  height: 28px;
  line-height: 28px;
  text-align: center;
  font-weight: bold;
  font-family: Consolas, "Courier New", Courier, FreeMono, monospace;
}

.Types {
  line-height: 22px;
  text-align: center;
  color: #333;
  padding-bottom: 5px;
}

.ivu-divider-inner-text {
  color: #4c4c4c;
}

.mui-off-canvas-left,
.mui-off-canvas-right {
  background-color: #fff;
  color: #4c4c4c;
}

.grid-content {
  width: 100%;
  display: flex;
  margin-top: 3px;
  justify-content: space-between;
}

.success {
  background-color: #2d8cf0;
}

.info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}

.rowbg {
  // width: 375px;
  // height: 110px;
  // background-color: #ffffff;
  // border-radius: 2px;
  // display: flex;
  margin: 5px 0 10px;
  padding: 10px 15px;
  // display: flex;

  // width: 375px;
  // height: 149px;
  background-color: #fff;
  border-radius: 2px;
  /deep/ .ivu-btn {
    border-radius: 2px;
    width: 60px;
    height: 19px;
  }
  /deep/ .ivu-btn-info {
    border-color: #377eff;
    background-color: #3d7eff;
  }
  /deep/ .ratio {
    border-color: #fb9736;
    background-color: #fb9736;
  }
  /deep/ .delete {
    border-color: #3d7eff;
    background-color: #3d7eff;
  }
}
.grid-content {
  width: 100%;
  display: flex;
  //   margin-top: 3px;
  justify-content: space-between;
  border-bottom: 1px solid #f3f3f3;
  .time {
    color: #606266;
    font-size: 9px;
  }
  .btn {
    width: 96px;
    height: 18px;
    line-height: 18px;
    background-color: #3d7eff;
    border-radius: 2px;
    line-height: 18px;
    font-size: 11px;
    color: #f5f5f5;
  }
  .user {
    font-size: 12px;
    color: #606266;
  }
}
.grid-content1 {
  height: 72px;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .num {
    width: 60px;
    // height: 15px;
    // font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #3d7eff;
    text-align: center;
  }
}
.grid-content2 {
  height: 38px;
  color: #377eff;
  display: flex;
  align-items: center;
}
.grid-content3 {
  height: 38px;
  display: flex;
  align-items: center;
  border: none;
  justify-content: space-between;
}
.el-container {
  background: #fff;
  width: 100%;
  height: 100px;
}
.searchVm {
  width: 351px;
  margin: 0 auto;
  display: flex;
  // padding: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  z-index: 99;

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
