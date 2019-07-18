<template>
  <div class="main-body">
    <header-component :showyue="true" :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      <div class="manage-type">
        <div :class="{active: manageType=='1'}" @click="changeTab('1')">流水</div>
        <div :class="{active: manageType=='2'}" @click="changeTab('2')">充值</div>
        <div :class="{active: manageType=='3'}" @click="changeTab('3')">提现</div>
        <div :class="{active: manageType=='4'}" @click="changeTab('4')">转账</div>
        <span class="shaixuan-room" :class="{active:manageTypesearch}" @click="changsearch" style="top:16px;">
          筛选
          <span class="icon-shaixuan"></span>
        </span>
        <!-- </div> -->
      </div>
      <div class="mui-content" v-if="manageType == '1'">
        <div class="mui-content2">
          <section class="el-container is-vertical" v-show="manageTypesearch==1">
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
              <div class="time">
                <input
                  type="text"
                  v-model="searchVm.startTime"
                  readonly
                  @click="showDatePicker($event,0)"
                />
                <font>~</font>
                <input
                  type="text"
                  v-model="searchVm.endTime"
                  readonly
                  @click="showDatePicker($event,1)"
                />
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
          <div class="no-list" v-if="!datalist1||datalist1.length==0">
            <span class="desc">暂无记录</span>
            <router-link :to="{name:'Home'}" class="btn">去打码</router-link>
          </div>
          <Scroll
            v-if="datalist1&&datalist1.length>0"
            ref="ivuScrollContainer"
            :on-reach-bottom="mReachBottom"
            :height="ivuScrollContainerHeight"
          >
            <div v-for="(item,i) in datalist1" :key="i" style="background-color:#f3f3f3">
              <!-- <div style="font-size: 12px">{{item.createTimeStr}}</div> -->
              <div class="rowbg el-row">
                <div class="grid-content grid-content1">
                  <div>
                    <span class="num">{{item.amount / 100}}</span>
                    <span
                      class="user"
                    >{{$t('agent.transactionsdetailList.transactionsdetailList9')}}</span>
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
      <div class="mui-content" v-if="manageType == '2'">
        <div class="mui-content2">
          <section class="el-container is-vertical" v-show="manageTypesearch==2">
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
              <div class="time">
                <input
                  type="text"
                  v-model="searchVm.startTime"
                  readonly
                  @click="showDatePicker($event,0)"
                />
                <font>~</font>
                <input
                  type="text"
                  v-model="searchVm.endTime"
                  readonly
                  @click="showDatePicker($event,1)"
                />
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
          <div class="no-list" v-if="!datalist2||datalist2.length==0">
            <span class="desc">暂无记录</span>
            <router-link :to="{name:'Home'}" class="btn">去打码</router-link>
          </div>
          <Scroll
            v-if="datalist2&&datalist2.length>0"
            ref="ivuScrollContainer"
            :on-reach-bottom="mReachBottom"
            :height="ivuScrollContainerHeight"
          >
            <div v-for="(item,i) in datalist2" :key="i" style="background-color:#f3f3f3">
              <!-- <div style="font-size: 12px">{{item.createTimeStr}}</div> -->
              <div class="rowbg el-row">
                <div class="grid-content grid-content1">
                  <div>
                    <span class="num">{{item.depositAmount / 100}}</span>
                    <span
                      class="user"
                    >充值金额</span>
                  </div>
                  <div style="align-items:flex-end">
                    <span class="btn" :class="{success:[1,3].includes(item.depositState),priamy:!([1,3].includes(item.depositState))}" style="margin-bottom:9px;">{{item.depositStateStr}}</span>
                    <span class="user">{{item.createTimeStr}}</span>
                  </div>
                </div>
                <div class="grid-content grid-content3">
                  <span
                    class="num"
                  >赠送金额&nbsp;&nbsp;￥{{item.benefitAmount/100}}</span>
                  <span>
                    结算&nbsp;&nbsp;
                    <font
                      style="color:#3d7eff"
                    >￥{{item.realAmount / 100}}</font>
                  </span>
                </div>
              </div>
            </div>
          </Scroll>
        </div>
      </div>
      <div class="mui-content" v-if="manageType == '3'">
        <div class="mui-content2">
          <section class="el-container is-vertical" v-show="manageTypesearch==3">
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
              <div class="time">
                <input
                  type="text"
                  v-model="searchVm.startTime"
                  readonly
                  @click="showDatePicker($event,0)"
                />
                <font>~</font>
                <input
                  type="text"
                  v-model="searchVm.endTime"
                  readonly
                  @click="showDatePicker($event,1)"
                />
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
          <div class="no-list" v-if="!datalist3||datalist3.length==0">
            <span class="desc">暂无记录</span>
            <router-link :to="{name:'Home'}" class="btn">去打码</router-link>
          </div>
          <Scroll
            v-if="datalist3&&datalist3.length>0"
            ref="ivuScrollContainer"
            :on-reach-bottom="mReachBottom"
            :height="ivuScrollContainerHeight"
          >
            <div v-for="(item,i) in datalist3" :key="i" style="background-color:#f3f3f3">
              <!-- <div style="font-size: 12px">{{item.createTimeStr}}</div> -->
              <div class="rowbg el-row">
                <div class="grid-content grid-content1">
                  <div>
                    <span class="num">{{item.drawAmount / 100}}</span>
                    <span
                      class="user"
                    >提现金额</span>
                  </div>
                  <div style="align-items:flex-end">
                    <span class="btn success" :class="{success:item.state == 1||item.state == 3,priamy:item.state==2||item.state==4,faile:!([1,2,3,4].includes(item.state)) }" style="margin-bottom:9px;">{{item.stateStr}}</span>
                    <span class="user">{{item.createTimeStr}}</span>
                  </div>
                </div>
                <div class="grid-content grid-content3">
                  <span
                    class="num"
                  >手续费&nbsp;&nbsp;￥{{item.commissionAmount/100}}</span>
                  <span>
                    结算&nbsp;&nbsp;
                    <font
                      style="color:#3d7eff"
                    >￥{{item.realAmount/100}}</font>
                  </span>
                </div>
              </div>
            </div>
          </Scroll>
        </div>
      </div>
      <div class="mui-content" v-if="manageType == '4'">
        <div class="mui-content2">
          <section class="el-container is-vertical" v-show="manageTypesearch==4">
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
              <div class="time">
                <input
                  type="text"
                  v-model="searchVm.startTime"
                  readonly
                  @click="showDatePicker($event,0)"
                />
                <font>~</font>
                <input
                  type="text"
                  v-model="searchVm.endTime"
                  readonly
                  @click="showDatePicker($event,1)"
                />
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
          <div class="no-list" v-if="!datalist4||datalist4.length==0">
            <span class="desc">暂无记录</span>
            <router-link :to="{name:'Home'}" class="btn">去打码</router-link>
          </div>
          <Scroll
            v-if="datalist4&&datalist4.length>0"
            ref="ivuScrollContainer"
            :on-reach-bottom="mReachBottom"
            :height="ivuScrollContainerHeight"
          >
            <div v-for="(item,i) in datalist4" :key="i" style="background-color:#f3f3f3">
              <!-- <div style="font-size: 12px">{{item.createTimeStr}}</div> -->
              <div class="rowbg el-row">
                <div class="grid-content grid-content1">
                  <div>
                    <span class="num">{{item.transferAmount / 100}}</span>
                    <span
                      class="user"
                    >提现金额</span>
                  </div>
                  <div style="align-items:flex-end">
                    <span class="btn" :class="{success:item.transType == 2,priamy:item.transType == 1}" style="margin-bottom:9px;">{{item.transTypeStr}}</span>
                    <span class="user">{{item.createTimeStr}}</span>
                  </div>
                </div>
                <div class="grid-content grid-content3">
                  <span
                    class="num"
                  >转前金额&nbsp;&nbsp;￥{{item.beforeTransfer/100}}</span>
                  <span>
                    转入金额&nbsp;&nbsp;
                    <font
                      style="color:#3d7eff"
                    >￥{{item.afterTransfer/100}}</font>
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
import window from "@/mixins/window";
import slist from "@/mixins/list";
// require('../../style/mui/index.less')
import headerComponent from "@/common/Header.vue";
import { betweenday } from "@/global";
import { swap } from "../../global";
var _this = this;
let currenttime;
export default {
  mixins: [window, slist],
  data() {
    return {
      logo: "交易记录",
      datalist1: [],
      datalist2: [],
      datalist3: [],
      datalist4: [],
      show: false,
      initData: {
        actionTypes: [],
        total: 0
      },
      currenttime: 1,
      manageType: "1",
      manageTypesearch: 0,
      ivuScrollContainerHeight: 620,

      activeClass: -1,
      jifenoptions: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            value: 0
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
      options: [
        {
          label: this.$t("agent.AgentrEportforms.all"),
          value: "-1"
        },
        {
          label: this.$t("agent.AgentrEportforms.memberUser"),
          value: "1"
        },
        {
          label: this.$t("agent.AgentrEportforms.proxy"),
          value: "2"
        }
      ],
      showSearch: false,
      searchVm: {
        startTime: "",
        endTime: "",
        actionType: "-1"
      }
    };
  },
  mounted() {
    this.changeTab('1');
  },
  components: {
    headerComponent
  },
  methods: {
    mInit() {
      let url;
      let params = {};
      let type = "get";
      let data;
      if (this.manageType == 4) {
        let gcs = [{ id: "1", value: "转出" }, { id: "2", value: "转入" }];
        gcs.unshift({
          id: "-1",
          value: this.$t("member.rechargeRecord.rr9")
        });
        this.initData.actionTypes = gcs;
      } else {
        switch (this.manageType) {
          case "1":
            url = "/managerGame/gameBetInit.json";
            data = "gamecompays";
            break;
          case "2":
            url = "/memberCoin/rechargeindex.json";
            data = "depositStates"
            break;

          case "3":
            url = "/memberCoin/cashindex.json";
            data="drawStates";
            params = {
              lineCountry: this.$store.getters.getSysInfo.lineCountry
            };
            type = "post";
            break;
        }
        this.$http[type](url, params).then(result => {
          if (result.code == 0) {
            console.info(result.data);
            let gcs = result.data[data];
            gcs.unshift({
              id: "-1",
              value: this.$t("member.rechargeRecord.rr9")
            });
            gcs.forEach((ele, i) => {
              ele.checked = i === 0;
              ele.id = String(ele.id);
            });
            this.initData.actionTypes = result.data[data];
          }
        });
      }

      // if (localStorage.getItem("walletcoinsList")) {
      //   this.initData.actionTypes = JSON.parse(
      //     localStorage.getItem("walletcoinsList")
      //   );
      //   this.initData.actionTypes.unshift({
      //     id: "-1",
      //     value: this.$t("member.rechargeRecord.rr9")
      //   });
      // } else {
      //   this.$http
      //     .get("/managerGame/getWalletCoinsForLoad.json")
      //     .then(result => {
      //       if (result.code == 0) {
      //         let gcs = result.data.gamecompays;
      //         gcs.unshift({
      //           id: "-1",
      //           value: this.$t("member.rechargeRecord.rr9")
      //         });
      //         gcs.forEach((ele, i) => {
      //           ele.checked = i === 0;
      //           ele.id = String(ele.id);
      //         });
      //         this.initData.actionTypes = result.data.gamecompays;
      //       }
      //     });
      // }
    },
    changeTab(tabIndex) {
      this.manageType = tabIndex;
      this.manageTypesearch = false;
      this.searchVm.actionType = '-1';
      this.mInit();
      this.mSearch();
    },
    changsearch() {
      let map = {
        islist1: {
          show: () => (this.manageTypesearch = 1),
          not: () => (this.manageTypesearch = 0)
        },
        islist2: {
          show: () => (this.manageTypesearch = 2),
          not: () => (this.manageTypesearch = 0)
        },
        islist3: {
          show: () => (this.manageTypesearch = 3),
          not: () => (this.manageTypesearch = 0)
        },
        islist4: {
          show: () => (this.manageTypesearch = 4),
          not: () => (this.manageTypesearch = 0)
        }
      };
      let firstKey = `islist${this.manageType}`;
      let lastKey = !this.manageTypesearch ? "show" : "not";
      return map[firstKey][lastKey]();
    },
    mOnResize() {
      this.ivuScrollContainerHeight =
        window.innerHeight - this.$refs.TopHeader.offsetHeight;
    },
    mTouzhu(rows) {
      this.$router.push({
        path: "./mjiaoyi",
        query: { username: rows.username, name: "BettingdetailList" }
      });
    },
    mJiaoyi(rows) {
      // this.$router.push({
      //     path: "./transactionsdetaillist",
      //     query: {username: rows.username}
      // });
      this.$router.push({
        path: "./mjiaoyi",
        query: { username: rows.username, name: "" }
      });
    },
    mShow(rows) {
      this.show = true;
    },
    mClose(rows) {},
    showDatePicker(event, index) {
      this.currenttime = index;
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "请选择开始时间",
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.selectHandle,
          format: { year: "YYYY", month: "MM", date: "DD" }
        });
      }
      this.datePicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      console.info(date, selectedVal, selectedText);
      this.$set(this.searchVm.time, this.currenttime, selectedVal.join("-"));
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
          this.mSearch();
        } else {
          this.mLoading(false);
          //没有更多记录了
          this.mAlert(_this.$t("agent.AgentrEportforms.noMoreRecords"));
          resolve();
        }
      });
    },
    clickBtn(value, index) {
      this.activeClass = index;
      const end = new Date();
      const start = new Date();
      // start = ();
      this.searchVm.startTime = this.getMyDate(
        start.getTime() - 3600 * 1000 * 24 * value
      );
      this.searchVm.endTime = this.getMyDate(end);
      // let picker = this.$refs.time.$options;
      // start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
      // picker.$emit('pick', [start, end]);
      this.$nextTick(vm => {
        this.mSearch();
      });
    },
    mSearch() {
      let tid = ["actionType", "state", "state", "transType"];
      let url;
      let params = Object.assign({},this.searchVm);
      if (params.actionType == "-1") params.actionType = "";
      params[tid[this.manageType - 1]] = params.actionType;

      switch (this.manageType) {
        case "1":
          params.startDate = params.startTime;
          params.endDate = params.endTime;
          url = "/memberCoin/coinlist.json";
          break;
        case "2":
          url = "/memberCoin/rechargelist.json";
          break;
        case "4":
          url = "/memberCoin/queryTransfer.json";
          break;
        case "3":
          url = "/memberCoin/cashlist.json";
          break;
      }
      this.$http.post(url, params).then(result => {
        if (result.code == 0) {
          this[`datalist${this.manageType}`] = result.rows;
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
          format: { year: "YYYY", month: "MM", date: "DD" }
        });
      }
      this.datePicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      // console.info(date, selectedVal, selectedText);
      if (currenttime == 1) {
        this.searchVm.endTime = selectedVal.join("-");
      } else {
        this.searchVm.startTime = selectedVal.join("-");
      }
      this.mSearch();
      // this.$set(this.searchVm.time, currenttime, selectedVal.join("-"));
    }
  },
  created() {
    _this = this;
    this.mInit();
    [this.searchVm.startTime, this.searchVm.endTime] = betweenday();
    let from_name = this.$route.query.name;
    switch (from_name) {
      case "AgentrEportforms":
        this.manageType = "2";
        break;
    }
  }
};
</script>

<style lang="less" scoped>
.mui-bar .mui-title {
  margin-top: 10px;
  text-align: center;
}

.mui-content {
  margin: 44px 0;
}

.rowbg {
  // width: 375px;
  // height: 110px;
  // background-color: #ffffff;
  // border-radius: 2px;
  // display: flex;
  margin: 5px 0 10px;
  padding: 10px 15px;
  border-bottom: 1px solid #f3f3f3;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px 0px rgba(201, 201, 201, 0.8);
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

.Save {
  display: block;
  //   padding: 0 10px;
  text-align: center;
  border-radius: 2px;
  font-size: 11px;
  color: #f5f5f5;
  height: 17px;
  line-height: 17px;
  //   margin-bottom: 10px;
  min-width: 96px;
}
.bg-purple-dark {
  text-align: left;
  width: 100%;
  height: 40px;
  font-size: 12px;
  line-height: 40px;
  margin-top: 17px;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
}
.grid-content {
  width: 100%;
  display: flex;
  //   margin-top: 3px;
  justify-content: space-between;
}
.grid-content1 {
  height: 20px;
  .num {
    width: 60px;
    // height: 15px;
    // font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #3d7eff;
    text-align: center;
  }
}

.success {
  background-color: #3d7eff!important;
  color: #fff!important;
}
.priamy {
 background-color: #C6C6C6!important;
 color: #fff!important;
}
.faile {
 background-color: #DD9D43!important;
 color: #fff!important;
}

.manage-type {
  overflow: hidden;
  overflow-x: scroll;
  white-space: nowrap;
  display: flex;
  position: fixed;
  background-color: white;
  padding-left: 10px;
  z-index: 999;
  width: 100%;
  justify-content: flex-start;
  align-items: center;

  & > div {
    float: left;
    min-width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    font-size: 16px;
    height: 40px;
  }
  .active {
    border-bottom: 2px solid #3d7eff;
    color: #3d7eff;
  }
}
.buttonsgroup {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  /deep/ & > button {
    padding: inherit;
  }
}
.mui-content2 {
  padding-top: 50px;
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
  padding-top: 10px;
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
    padding: 0;
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

/deep/ .van-dialog {
  width: 300px;
  height: 300px;

  background-image: url("../../assets/images/agent/tangchuang@2x.png");
  background-size: 100% 100%;
  .userbasic_body {
    padding-top: 50px;
    padding-left: 23px;
  }
  .van-dialog__header {
    padding-top: 32px;
    font-size: 24px;
    color: #fff;
  }
  ul li {
    text-align: left;
    color: #606266;
    height: 30px;
    line-height: 30px;
    & > span {
      font-size: 15px;
    }
  }
}
/deep/.el-container {
  background-color: #fff;
}
/deep/ .time {
  width: 245px;
  height: 34px;
  line-height: 34px;
  background-color: #ededed;
  input {
    width: 118px;
    background-color: #ededed;
  }
}
</style>

