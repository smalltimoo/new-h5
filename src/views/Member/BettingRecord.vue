<template>
  <div class="main-body">
    <!-- 侧滑导航根容器 -->
    <div class="mui-off-canvas-wrap mui-scalable">
      <!-- 主页面容器 -->
      <div class="mui-inner-wrap">
        <!-- <header-component :showyue="true" :logo="logo" :showIcon="true" :showLogo="true" ></header-component> -->
        <!-- 主页面内容容器 -->
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
        <div class="container">
        <section class="el-container is-vertical" v-show="showSearch">
          <div class="searchVM">
            <el-select
              v-model="searchVM.gameCompanyId"
              placeholder="请选择"
              class="type"
              @change="mSearch"
            >
              <el-option
                v-for="item in initData.gamecompays"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
            <div class="time">
              <input
                type="text"
                v-model="searchVM.startDate"
                readonly
                @click="showDatePicker($event,0)"
              >
              <font>~</font>
              <input
                type="text"
                v-model="searchVM.endDate"
                readonly
                @click="showDatePicker($event,1)"
              >
            </div>
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
            <Scroll
              v-if="dataList&&dataList.length>0"
              :on-reach-bottom="mReachBottom"
              :height="ivuScrollContainerHeight"
              style="margin-bottom: 30px"
            >
              <div v-for="(item,i) in dataList" :key="i" style="background-color:#f3f3f3">
                <!-- <div style="font-size: 12px">{{item.createTimeStr}}</div> -->
                <div class="rowbg el-row">
                  <div class="grid-content grid-content1">
                    <div>
                      <span class="num">{{item.investAmount / 100}}</span>
                      <span class="user">{{ $t('member.bettingRecord.br8') }}</span>
                    </div>
                    <div style="align-items:flex-end">
                      <span class="btn success" style="margin-bottom:9px;">{{item.gameCompanyName}}</span>
                      <span class="user">{{item.createTimeStr}}</span>
                    </div>
                  </div>
                  <div class="grid-content grid-content3">
                    <span
                      class="num"
                    >{{ $t("member.rechargeRecord.rr6") }}&nbsp;&nbsp;￥{{item.validAmount / 100}}</span>
                    <span>
                      {{ $t("member.rechargeRecord.rr7") }}&nbsp;&nbsp;
                      <font
                        style="color:#3d7eff"
                      >￥{{item.bunkoAmount / 100}}</font>
                    </span>
                  </div>
                </div>
              </div>
            </Scroll>
          
      </div>
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
      logo: "投注记录",
      yue: Number,
      showSearch: false,
      initData: {
        gamecompays: [],
        gametypes: [],
        games: [],
        total: 0
      },
      showSearch: false,
      activeClass: -1,
      dataList: [],
      searchVM: {
        gameCompanyId: -1,
        orderBy: "id desc",
        rows: 20,
        startTime: "", //查询起始时间
        endTime: "" //查询结束时间
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
      },
      totalDama: 0,
      ivuScrollContainerHeight: 620
    };
  },
  computed: {
    gameRoomName() {
      let rooms = this.initData.gamecompays.filter(
        item => this.searchVM.gameCompanyId == item.id
      );
      if (rooms.length > 0) {
        return rooms[0].value;
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.mPullData();
  },
  components: {
    headerComponent
  },
  methods: {
    mInit() {
      this.$http.get("/managerGame/gameBetInit.json").then(result => {
        if (result.code == 0) {
          let gcs = result.data.gamecompays;
          gcs.unshift({ id: -1, value: this.$t("member.bettingRecord.br13") });
          gcs.forEach((ele, i) => {
            ele.checked = i === 0;
          });
          this.initData.gamecompays = gcs;
          this.initData.gametypes = result.data.gametypes;
          this.mSearch(1);
        }
      });
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http
        .post("/managerGame/memberGameOrders.json", params)
        .then(result => {
          if (result.code == 0) {
            this.initData.total = result.total;
            this.dataList = !!result.rows ? result.rows : [];
            this.totalDama = this.dataList.reduce((sum, current) => {
              return sum + current.validAmount / 100;
            }, 0);
          } else {
            this.mLoading(false);
          }
        })
        .catch(error => {
          this.mLoading(false);
        });
    },
    mReachBottom() {
      return new Promise(resolve => {
        this.mLoading(true);
        if (
          parseInt(
            this.initData.total / (this.searchVM.rows * this.searchVM.page)
          ) > 0
        ) {
          ++this.searchVM.page;
          this.searchVM.start = (this.searchVM.page - 1) * this.searchVM.rows;
          this.searchVM.limit = this.searchVM.rows;
          var params = Object.assign({}, this.searchVM);
          this.$http
            .post("/managerGame/memberGameOrders.json", params)
            .then(result => {
              if (result.code == 0) {
                this.initData.total = result.total;
                if (!!result.rows && result.rows.length > 0) {
                  this.dataList = this.dataList.concat(result.rows);
                  this.totalDama = this.dataList.reduce((sum, current) => {
                    return sum + current.validAmount / 100;
                  }, 0);
                }
                resolve();
              }
            });
        } else {
          this.mLoading(false);
          this.$Message.warning(this.$t("member.bettingRecord.br14")); //没有更多记录了
          resolve();
        }
      });
    },

    mShowSearch(operate) {
      if (operate == "open") {
        mui(".mui-off-canvas-wrap")
          .offCanvas()
          .show();

        this.open = true;
      } else {
        mui(".mui-off-canvas-wrap")
          .offCanvas()
          .close();
        this.open = false;
      }

      $(".mui-content").click(() => {
        if (this.open) {
          mui(".mui-off-canvas-wrap")
            .offCanvas()
            .close();
          this.open = false;
        }
      });
    },
    clickBtn(value, index) {
      this.activeClass = index;
      const end = new Date();
      const start = new Date();
      // start = ();
      this.searchVM.startDate = this.getMyDate(
        start.getTime() - 3600 * 1000 * 24 * value
      );
      this.searchVM.endDate = this.getMyDate(end);
      // let picker = this.$refs.time.$options;
      // start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
      // picker.$emit('pick', [start, end]);
      this.$nextTick(vm => {
        this.mSearch();
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
        this.searchVM.endDate = selectedVal.join("/");
      } else {
        this.searchVM.startDate = selectedVal.join("/");
      }
      this.mSearch();
      // this.$set(this.searchVM.time, currenttime, selectedVal.join("/"));
    }
  },
  created() {
    vue = this;
    this.mInit();
    this.getamount();
  }
};
</script>

<style lang="less" scoped>
.mui-bar .mui-title {
  margin-top: 10px;
  text-align: center;
}

// .mui-content {
//     margin-top: 80px;
// }

.mui-scalable {
  background-color: #efeff4 !important;
}

.rowbg {
  margin: 5px 10px 10px 10px;
  padding: 10px 15px;
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
  height: 28px;
  line-height: 28px;
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

.failed {
  background-color: #b58c2a;
}

.wait {
  background-color: #007bc9;
}

.info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}

.dama {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: 43px;
  font-size: 14px;
  background-color: #2d8cf0;
  height: 40px;
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  z-index: 99;
}

.rowbg {
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

.searchVM { padding-top:10px;
  width: 100%;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  background-color: #f3f3f3;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    & > span {
      min-width: 80px;
    }
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
.el-container {
  background: #fff;
  width: 100%;
  height: 100px;
}
.searchVM { padding-top:10px;
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
.header-right {
  .yue {
    margin-right: 80px;
  }
}
</style>
