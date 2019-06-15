<template>
  <div class="safecenter">
    <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      <div class="line title">
        <span>密码设置</span>
      </div>
      <div v-for="(item, index) in passSet" :to="{name:item.routeName}" :key="index">
        <div class="wrap">
          <div class="name_left">
            <span class="text_name">{{item.name}}</span>
          </div>
          <div class="link_right">
            <span class="link_text" v-text="item.type?'已设置':'未设置'"></span>
            <span class="sanjiao"  @click="routetodraw(item.routeName,item.type)"></span>
          </div>
        </div>
        <!-- <span>{{this.$t('member.userMember.um11')}}</span> -->
      </div>
      <div class="line title">
        <span>账户信息</span>
      </div>
      <div v-for="(item, idx) in userInfo" :to="{name:item.routeName}" :key="idx">
        <div class="wrap">
          <div class="name_left">
            <span class="text_name">{{item.name}}</span>
          </div>
          <div class="link_right">
            <span class="link_text"  v-text="item.type?'已设置':'未设置'"></span>
            <span class="sanjiao" @click="routetodraw(item.routeName,item.type)"></span>
          </div>
        </div>
        <!-- <span>{{this.$t('member.userMember.um11')}}</span> -->
      </div>
    </div>
    <!-- 提款密码 -->
    <van-popup v-model="show1" position="right" style="width:100%;height:100%">
      <headerComponent :showIcon="true" :showLogo="true" :logo="popuptitle" @notgoback="notgoback"></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle}}</div>
        <div class="editpassword">
          <div>
            <span>{{ $t('member.safePassword.sp2') }}</span>
            <el-input
              :placeholder="$t('member.safePassword.sp3')"
              v-model="passwordVm.password"
              show-password
            ></el-input>
          </div>
          <div>
            <span>{{ $t('member.safePassword.sp4') }}</span>
            <el-input
              :placeholder="$t('member.safePassword.sp5')"
              v-model="passwordVm.truePassword"
              show-password
            ></el-input>
          </div>
          <cube-button :active="true" @click="mNewPswSave" class="save-btn">
            <span>{{ $t('member.withdrawals.wa11') }}</span>
            <!--下一步 -->
          </cube-button>
          <div class="info" style="margin-top: 20px;font-size:12px;">
            <!--  温馨提示 ： 如需修改绑定银行卡信息，请联系-->
            {{ $t('member.userBankCard.ubc10') }}
            <a
              href="javascript:void(0)"
              @tap="mOpenCService"
              style="color: #3d7eff"
            >{{ $t('member.userBankCard.ubc11') }}</a>
            <!-- 在线客服-->
          </div>
        </div>
      </section>
    </van-popup>
    <!-- 我的收货地址 -->
    <van-popup v-model="show2" position="right" style="width:100%;height:100%">
      <headerComponent :showIcon="true" :showLogo="true" :logo="popuptitle2" @notgoback="notgoback"></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle2}}</div>
        <div class="editpassword setshipaddr">
          <div>
            <span>收货人</span>
            <span v-text="getgoods"></span>
          </div>
          <div>
            <span>联系电话</span>
            <span v-text="getgoods"></span>
          </div>
          <div>
            <span>配送地址</span>
            <span v-text="getgoods"></span>
          </div>

          <div class="info" style="margin-top: 20px;font-size:12px;">
            <!--  温馨提示 ： 如需修改绑定银行卡信息，请联系-->
            {{ $t('member.userBankCard.ubc10') }}
            <a
              href="javascript:void(0)"
              @tap="mOpenCService"
              style="color: #3d7eff"
            >{{ $t('member.userBankCard.ubc11') }}</a>
            <!-- 在线客服-->
          </div>
        </div>
      </section>
    </van-popup>
    <!-- 新增收货地址 -->
    <van-popup v-model="show3" position="right" style="width:100%;height:100%">
      <headerComponent :showIcon="true" :showLogo="true" :logo="popuptitle3" @notgoback="notgoback"></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle3}}</div>
        <div class="editpassword setshipaddr">
          <div>
            <span>收货人</span>
            <el-input placeholder="请填写姓名" v-model="passwordVm.password" show-password></el-input>
          </div>
          <div>
            <span>联系电话</span>
            <el-input placeholder="请填写电话" v-model="passwordVm.password" show-password></el-input>
          </div>
          <div>
            <span>配送地址</span>
            <el-cascader
              v-model="shipaddr.addr"
              :options="shiplist"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
          </div>
          <div>
            <el-input placeholder="请填写详细地址(街道,楼牌号等)" v-model="passwordVm.password" show-password></el-input>
          </div>
          <cube-button :active="true" @click="mSave" class="save-btn">
            <span>{{ $t('member.withdrawals.wa11') }}</span>
            <!--下一步 -->
          </cube-button>
        </div>
      </section>
    </van-popup>
    <!-- 我的银行卡 -->
    <van-popup v-model="show4" position="right" style="width:100%;height:100%">
      <headerComponent :showIcon="true" :showLogo="true" :logo="popuptitle4" @notgoback="notgoback"></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle4}}</div>
        <div class="editpassword setshipaddr">
          <div>
            <span>{{ $t('member.userBankCard.ubc4') }}</span>
            <span v-text="mycard.drawAccountName"></span>
          </div>
          <div>
            <span>{{ $t('member.userBankCard.ubc5') }}</span>
            <span v-text="mycard.mobile"></span>
          </div>
          <div>
            <span>银行种类</span>
            <span v-text="mycard.bankTypeName"></span>
          </div>
          <div>
            <span>{{ $t('member.userBankCard.ubc7') }}</span>
            <span v-text="mycard.account"></span>
          </div>
          <div>
            <span>{{ $t('member.userBankCard.ubc9') }}</span>
            <span v-text="mycard.drawAddress"></span>
          </div>

          <div class="info" style="margin-top: 20px;font-size:12px;">
            <!--  温馨提示 ： 如需修改绑定银行卡信息，请联系-->
            {{ $t('member.userBankCard.ubc10') }}
            <a
              href="javascript:void(0)"
              @tap="mOpenCService"
              style="color: #3d7eff"
            >{{ $t('member.userBankCard.ubc11') }}</a>
            <!-- 在线客服-->
          </div>
        </div>
      </section>
    </van-popup>
    <!-- 新增银行卡信息 -->
    <van-popup v-model="show5" position="right" style="width:100%;height:100%">
      <headerComponent :showIcon="true" :showLogo="true" :logo="popuptitle5" @notgoback="notgoback"></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle5}}</div>
        <div class="editpassword setshipaddr">
          <div>
            <span>真实姓名</span>
            <el-input placeholder="请填写姓名" v-model="passwordVm.password" show-password></el-input>
          </div>
          <div>
            <span>银行卡号</span>
            <el-input placeholder="请填写电话" v-model="passwordVm.password" show-password></el-input>
          </div>
          <div>
            <span>银行种类</span>
            <el-cascader
              v-model="shipaddr.addr"
              :options="shiplist"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
          </div>
          <div>
            <span>开户行地址</span>
            <el-input placeholder="请填写电话" v-model="passwordVm.password" show-password></el-input>
          </div>
          <div>
            <span>手机号码</span>
            <el-input placeholder="请填写电话" v-model="passwordVm.password" show-password></el-input>
          </div>
          <div>
            <span>资金密码</span>
            <el-input placeholder="请填写电话" v-model="passwordVm.password" show-password></el-input>
          </div>
          <cube-button :active="true" @click="mSave" class="save-btn">
            <span>{{ $t('member.withdrawals.wa11') }}</span>
            <!--下一步 -->
          </cube-button>
        </div>
      </section>
    </van-popup>
    <!-- 修改提款密码 -->
    <van-popup v-model="show6" position="right" style="width:100%;height:100%">
      <headerComponent :showIcon="true" :showLogo="true" :logo="popuptitle6" @notgoback="notgoback"></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle6}}</div>
        <div class="editpassword">
          <div>
            <span>原提款密码</span>
            <el-input placeholder="请输入4位数字密码" v-model="editpassword.oldPass" show-password></el-input>
          </div>
          <div>
            <span>新提款密码</span>
            <el-input placeholder="请输入4位数字密码" v-model="editpassword.newPass" show-password></el-input>
          </div>
          <div>
            <span>确认提款密码</span>
            <el-input placeholder="请再次输入密码" v-model="editpassword.truePass" show-password></el-input>
          </div>
          <cube-button :active="true" @click="mSaveeditpassword" class="save-btn">
            <span>{{ $t('member.withdrawals.wa11') }}</span>
            <!--下一步 -->
          </cube-button>
          <div class="info" style="margin-top: 20px;font-size:12px;">
            <!--  温馨提示 ： 如需修改绑定银行卡信息，请联系-->
            {{ $t('member.userBankCard.ubc10') }}
            <a
              href="javascript:void(0)"
              @tap="mOpenCService"
              style="color: #3d7eff"
            >{{ $t('member.userBankCard.ubc11') }}</a>
            <!-- 在线客服-->
          </div>
        </div>
      </section>
    </van-popup>
    <!-- 账户信息 -->
    <van-popup :value="show == 7" position="right" style="width:100%;height:100%">
      <headerComponent :showIcon="true" :showLogo="true" :logo="popuptitle7" @notgoback="notgoback"></headerComponent>
      <section class="el-container is-vertical">
        <div class="container">
          <div class="line title">
            <span>个人信息</span>
          </div>
          <div class="editpassword setshipaddr">
            <div>
              <span>账号</span>
              <span v-text="userdatainfo.username"></span>
            </div>
            <div>
              <span>真实姓名</span>
              <span v-text="userdatainfo.realName"></span>
            </div>
            <div>
              <span>手机号码</span>
              <span v-text="userdatainfo.mobile" v-if="userdatainfo.mobile"></span>
              <span class="info" v-else>{{ $t('member.userLimit.ul17') }}</span>
            </div>
            <div>
              <span>邮箱</span>
              <span v-text="userdatainfo.createTimeStr"></span>
            </div>
            <div>
              <span>qq</span>
              <span v-text="userdatainfo.qq" v-if="userdatainfo.qq"></span>
              <span class="info" v-else>{{ $t('member.userLimit.ul17') }}</span>
            </div>
            <div>
              <span>微信</span>
              <span v-text="userdatainfo.weixin" v-if="userdatainfo.weixin"></span>
              <span class="info" v-else>{{ $t('member.userLimit.ul17') }}</span>
            </div>
          </div>
          <div class="line title">
            <span>账户信息</span>
          </div>

          <div class="editpassword setshipaddr">
            <div>
              <span>注册时间</span>
              <span v-text="userdatainfo.createTimeStr"></span>
            </div>
            <div>
              <span>最后登陆时间</span>
              <span v-text="userdatainfo.lastLoginStr"></span>
            </div>
          </div>
        </div>
      </section>
    </van-popup>
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";
import types from "@/store/mutation-types";
import { mapState } from "vuex";
import { userInfo } from 'os';
export default {
  name: "safecenter",
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
      logo: this.$t("member.userMember.um21"),
      show:'',
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      hasCoinPassword:false,
      popuptitle: "设定提款密码",
      popuptitle2: "收货地址信息",
      popuptitle3: "新增收获地址",
      popuptitle4: "设定提款密码",
      popuptitle5: "收货地址信息",
      popuptitle6: "新增收获地址",
      popuptitle7: "新增收获地址",
      getgoods: "",
      passwordVm: {
        password: "",
        truePassword: ""
      },
      editpassword: {
        oldPass: "",
        newPass: "",
        truePass: ""
      },
      mycard: {
        account: "", //银行卡号
        bankTypeName: "", //开户行
        drawAccountName: "", //开户人姓名
        drawAddress: "", // 开户地址
        mobile: "" //开户人手机号码
      },
      shiplist: [],
      shipaddr: {},
      addr:'',
      passSet: [
        {
          name: "登录密码",
          type: "已设置",
          routeName: "loginpass"
        },
        {
          name: "提款密码",
          type: "",
          routeName: "withdrawpassword"
        }
      ],
      userInfo: [
        {
          name: "银行卡",
          type: "",
          routeName: "bank"
        },
        {
          name: "收货地址",
          type: "",
          routeName: "shipaddr"
        },
        {
          name: "我的账户",
          type: "",
          routeName: "UserLimit"
        }
      ],
      userdatainfo: {
        username: "",
        realName: "",
        mobile: "",
        qq: "",
        weixin: "",
        createTimeStr: "",
        lastLoginStr: "",
        id: 0
      }
    };
  },
  methods: {
    routetodraw(...a) {
       let map = {
        islist0: {
          add: () => (this.show = 1),
          edit: () => (this.show = 0)
        },
        islist1: {
          add: () => (this.show = 2),
          edit: () => (this.show = 0)
        },
        islist2: {
          add: () => (this.show = 2),
          edit: () => (this.show = 0)
        },
        islist3: {
          add: () => (this.show = 2),
          edit: () => (this.show = 0)
        },
        islist4: {
          add: () => (this.show = 7),
          edit: () => (this.show = 7)
        }
      };
      console.info(a)
      let firstKey = `islist${["loginpass","withdrawpassword","bank","shipaddr","UserLimit"].indexOf(a[0])}`
      console.info(firstKey)
      let lastKey = a[1] ? "edit" : "add";
      return map[firstKey][lastKey]();
    },
    handleChange(value) {
      console.log(value);
    },
    notgoback(data) {
      this.show1 = data;
    },
    mSave() {},
    mLoginOut() {
      //确定要退出账号吗
      this.mConfirm(this.$t("member.userMember.um25"), () => {
        //请稍等...
        this.mLoading(true, this.$t("member.userMember.um26"));
        this.$http.post("/logout.json").then(result => {
          if (result.code === 0) {
            //退出成功！
            this.mMessage(this.$t("member.userMember.um27"), "success", 0.5);
            sessionStorage.removeItem(types.SESSION_TOKEN);

            if (this.calblackUri) {
              window.open(this.callbackUri, "_self");
            } else {
              this.$store.commit(types.SESSION_TOKEN);
              this.mLoading(false);
              this.$router.push({ name: "Home" });
            }
          }
        });
      });
    },
    mNewPswSave() {
      if (this.passwordVm.password == "") {
        //请输入资金密码！
        this.mAlert(this.$t("member.safePassword.sp15"));
        return;
      }
      if (this.passwordVm.truePassword == "") {
        //请再次输入资金密码！
        this.mAlert(this.$t("member.safePassword.sp16"));
        return;
      }
      if (this.passwordVm.truePassword != this.passwordVm.password) {
        //两次输入的密码不一致！
        this.mAlert(this.$t("member.safePassword.sp17"));
        return;
      }
      if (this.passwordVm.password.length != 6) {
        //请输入正确的6位数字资金密码！
        this.mAlert(this.$t("member.safePassword.sp18"));
        return;
      }
      this.mLoading(true);
      this.$http
        .post("/memberUser/setcoinpass.json", {
          newPass: this.passwordVm.password
        })
        .then(result => {
          this.mLoading(false);
          console.log(result);
          if (result.code == 0) {
            //操作成功
            this.mAlert(this.$t("member.safePassword.sp19"), () => {});
            this.mInit();
          }
        });
    },
    mSaveeditpassword() {
      if (this.editpassword.oldPass == "") {
        //请输入原资金密码
        this.mAlert(this.$t("member.safePassword.sp20"), null, "warning");
        return;
      }
      if (this.editpassword.newPass == "") {
        //请输入新的资金密码
        this.mAlert(this.$t("member.safePassword.sp21"), null, "warning");
        return;
      }
      if (this.editpassword.truePass != this.editpassword.newPass) {
        //两次输入的密码不一致
        this.mAlert(this.$t("member.safePassword.sp22"), null, "warning");
        return;
      }
      if (this.editpassword.newPass.length != 6) {
        //请输入正确的6位数资金密码
        this.mAlert(this.$t("member.safePassword.sp23"));
        return;
      }
      this.mLoading(true);
      this.$http
        .post("/memberUser/updatecoinpass.json", this.editpassword)
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            this.mAlert(
              //修改成功
              this.$t("member.safePassword.sp24"),
              () => {
                this.editpassword = {};
              },
              "success"
            );
          } else {
            this.mAlert(result.message, () => {}, "error");
          }
        });
    },
    mGetMembercoin() {
      return this.$http.get("/memberUser/membercoin.json");
    },
    mGetBindBank() {
      return this.$http.get("/memberUser/getbindbank.json");
    }
  },
  created() {
    // this.mInit();
  },
  mounted() {
    /*账户信息数据 */
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.userdatainfo.username = result.data.username;
        this.userdatainfo.realName = result.data.realName;
        this.userdatainfo.mobile = result.data.mobile;
        this.userdatainfo.qq = result.data.qq;
        this.userdatainfo.weixin = result.data.weixin;
        this.userdatainfo.createTimeStr = result.data.createTimeStr;
        this.userdatainfo.lastLoginStr = result.data.lastLoginStr;
        this.userdatainfo.id = result.data.id;
        //提款密码
        this.passSet[1].type =  result.data.coinPassword?true:false;
        this.userInfo[2].type =  result.data.weixin&&result.data.qq&&result.data.realName?true:false;
      }
    });
    // 我的银行卡数据
    this.$http.all([this.mGetMembercoin(), this.mGetBindBank()]).then(
      this.$http.spread((resCoin, rbindbank) => {
        if (resCoin.data == -1) {
          this.data = resCoin.data;
          //请先设置资金密码
          this.mAlert(this.$t("member.userBankCard.ubc12"), () => {
            this.$router.push({ name: "SafaPassword" });
          });
        }
        if (rbindbank.code == 0) {
          this.mycard = Object.assign(this.mycard, rbindbank.data);
          this.userInfo[0].type = rbindbank.data?true:false;
        }
        this.mLoading(false);
      })
    );
    //收货地址
    this.$http.get("/memberUser/getMemberAddress.json").then(result => {
          if (result.code == 0) {
              this.vm = !!result.data ? result.data : {};
              // this.addr = result.data;
              this.userInfo[1].type = result.data?true:false;
          }
      });
  }
};
</script>
<style lang="less" scoped>

.safecenter {
  width: 351px;
  margin: 0 auto;
  .line.title {
    text-align: left;
    color: #303133;
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    
    // margin-top: 50px;
  }
  // .container {

  // }
  .wrap {
    width: 351px;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding-left: 10px;
    border-bottom: 1px solid #f3f3f3;

    .name_left {
      // width: 72px;

      .icon_new {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin-right: 6px;
        vertical-align: middle;
        background-image: linear-gradient(126deg, #40afff 0%, #3572fa 100%),
          linear-gradient(#3a8dfc, #3a8dfc);
        background-blend-mode: normal, normal;
        box-shadow: 0px 4px 14px 0px rgba(79, 139, 248, 0.27);
      }

      .icon_new_white {
        background: white;
      }

      .text_name {
        font-family: PingFangSC-Regular;
        font-size: 15px;
        line-height: 50px;
        color: #606266;
      }
    }

    .link_right {
      .link_text {
        font-family: PingFangSC-Light;
        font-size: 12px;
        line-height: 42px;
        color: #606266;
      }

      .sanjiao {
        width: 10px;
        height: 10px;
        display: inline-block;
        border-top: 2px solid #e5e5e5;
        border-right: 2px solid #e5e5e5;
        transform: rotate(45deg);
      }
    }
  }

  .editpassword {
    width: 100%;
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      height: 55px;
      border-bottom: 1px solid #f3f3f3;
      /deep/ .el-input__inner {
        border: 0;
      }
      & > span {
        min-width: 80px;
      }
    }
  }
  section {
    width: 351px;
    margin: 0 auto;
  }
  .save-btn {
    width: 335px;
    height: 40px;
    background-color: #3d7eff;
    border-radius: 20px;
    padding: 0;
  }
  .setshipaddr > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .setshipaddr > div:last-child {
    border-bottom: 0;
  }
}
</style>
