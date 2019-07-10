<template>
  <div class="safecenter">
    <header-component :showyue="true" :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      <div class="line title">
        <span>密码设置</span>
      </div>
      <div v-for="(item, index) in passSet" :to="{name:item.routeName}" :key="index+'A'">
        <div class="wrap">
          <div class="name_left">
            <span class="text_name">{{item.name}}</span>
          </div>
          <div class="link_right">
            <span class="link_text" v-text="item.type?'已设置':'未设置'"></span>
            <span class="sanjiao" @click="routetodraw(item.routeName,item.type)"></span>
          </div>
        </div>
        <!-- <span>{{this.$t('member.userMember.um11')}}</span> -->
      </div>
      <div class="line title">
        <span>账户信息</span>
      </div>
      <div v-for="(item, idx) in userInfo" :to="{name:item.routeName}" :key="idx+'B'">
        <div class="wrap">
          <div class="name_left">
            <span class="text_name">{{item.name}}</span>
          </div>
          <div class="link_right">
            <span class="link_text" v-text="item.type?'已设置':'未设置'"></span>
            <span class="sanjiao" @click="routetodraw(item.routeName,item.type)"></span>
          </div>
        </div>
        <!-- <span>{{this.$t('member.userMember.um11')}}</span> -->
      </div>
    </div>
    <!-- 提款密码 -->
    <van-popup class="main-body" :value="show == 3" position="right" style="width:100%;height:100%">
      <headerComponent
        :showIcon="true"
        :showLogo="true"
        :logo="popuptitle"
        :showyue="true"
        @notgoback="notgoback"
      ></headerComponent>
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
    <van-popup class="main-body" :value="show == 8" position="right" style="width:100%;height:100%">
      <headerComponent
        :showIcon="true"
        :showLogo="true"
        :logo="popuptitle"
        :showyue="true"
        @notgoback="notgoback"
      ></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle}}</div>
        <div class="editpassword setshipaddr">
          <div>
            <span>收货人</span>
            <span v-text="addrVm.memberName"></span>
          </div>
          <div>
            <span>联系电话</span>
            <span v-text="addrVm.phone"></span>
          </div>
          <div>
            <span>配送地址</span>
            <span v-text="addrVm.address"></span>
          </div>
          <div>
            <!-- //todo -->
            <span></span>
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
    <van-popup class="main-body" :value="show == 7" position="right" style="width:100%;height:100%">
      <headerComponent
        :showIcon="true"
        :showLogo="true"
        :logo="popuptitle"
        :showyue="true"
        @notgoback="notgoback"
      ></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle}}</div>
        <div class="editpassword setshipaddr">
          <div>
            <span>收货人</span>
            <el-input placeholder="请填写姓名" v-model="addrVm.memberName"></el-input>
          </div>
          <div>
            <span>联系电话</span>
            <el-input placeholder="请填写电话" v-model="addrVm.phone"></el-input>
          </div>
          <div>
            <span>配送地址</span>
            <el-cascader
              v-model="addrVm.address"
              :options="provinces"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
          </div>
          <div>
            <el-input placeholder="请填写详细地址(街道,楼牌号等)" v-model="addrVm.detailAddr"></el-input>
          </div>
          <cube-button :active="true" @click="mSaveAdd" class="save-btn">
            <span>{{ $t('member.withdrawals.wa11') }}</span>
            <!--下一步 -->
          </cube-button>
        </div>
      </section>
    </van-popup>
    <!-- 我的银行卡 -->
    <van-popup class="main-body" :value="show ==6" position="right" style="width:100%;height:100%">
      <headerComponent
        :showIcon="true"
        :showLogo="true"
        :logo="popuptitle"
        :showyue="true"
        @notgoback="notgoback"
      ></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle}}</div>
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
    <van-popup class="main-body" :value="show == 5" position="right" style="width:100%;height:100%">
      <headerComponent
        :showIcon="true"
        :showLogo="true"
        :logo="popuptitle"
        :showyue="true"
        @notgoback="notgoback"
      ></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle}}</div>
        <div class="editpassword setshipaddr">
          <div>
            <span>真实姓名</span>
            <el-input placeholder="请填写姓名" v-model="bankAddVm.drawAccountName"></el-input>
          </div>
          <div>
            <span>银行卡号</span>
            <el-input placeholder="请填写银行卡号" v-model="bankAddVm.account"></el-input>
          </div>
          <div>
            <span>银行种类</span>
            <el-select v-model="bankAddVm.bankTypeName" placeholder="请选择">
              <el-option
                v-for="item in banktypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div>
            <span>开户行地址</span>
            <el-cascader
              v-model="bankAddVm.drawAddress"
              :options="provinces"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
          </div>
          <div>
            <span>手机号码</span>
            <el-input placeholder="请输入预留银行的手机号码" v-model="bankAddVm.mobile"></el-input>
          </div>
          <div>
            <span>资金密码</span>
            <el-input placeholder="请输入资金密码" v-model="bankAddVm.password" show-password></el-input>
          </div>
          <cube-button :active="true" @click="mSavebanks" class="save-btn">
            <span>{{ $t('member.withdrawals.wa11') }}</span>
            <!--下一步 -->
          </cube-button>
        </div>
      </section>
    </van-popup>
    <!-- 修改提款密码 -->
    <van-popup class="main-body" :value="show == 4" position="right" style="width:100%;height:100%">
      <headerComponent
        :showIcon="true"
        :showLogo="true"
        :logo="popuptitle"
        :showyue="true"
        @notgoback="notgoback"
      ></headerComponent>
      <section class="el-container is-vertical">
        <div class="line title">{{popuptitle}}</div>
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
    <van-popup
      class="main-body"
      :value="[9,10].indexOf(show) >-1"
      position="right"
      style="width:100%;height:100%"
    >
      <headerComponent
        :showIcon="true"
        :showLogo="true"
        :logo="popuptitle"
        :showyue="true"
        @notgoback="notgoback"
      ></headerComponent>
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
              <span v-text="userdatainfo.realName" v-if="userdatainfo.realName"></span>
              <span class="info" v-else>{{ $t('member.userLimit.ul17') }}</span>
            </div>
            <div>
              <span>手机号码</span>
              <span v-text="userdatainfo.mobile" v-if="userdatainfo.mobile"></span>
              <span class="info" v-else>{{ $t('member.userLimit.ul17') }}</span>
            </div>
            <div>
              <span>邮箱</span>
              <span v-text="userdatainfo.email"></span>
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
import { userInfo } from "os";
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
      show: "",
      hasCoinPassword: false,
      popuptitle: "设定提款密码",
      banktypes: [],
      provinces: [],
      getgoods: "",
      passwordVm: {
        password: "",
        truePassword: ""
      },
      addrVm: {
        address: [],
        memberName: "",
        phone: ""
      },
      bankAddVm: {
        drawAccountType: "",
        drawAddress: [],
        account: "",
        drawAccountName: "",
        mobile: "",
        remark: "",
        bankProvinceid: 0,
        bankCityid: 0,
        bankAreaid: 0,
        bankTypeName: "",
        password: ""
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
      addr: "",
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
          add: () => {
            this.show = 1;
            this.popuptitle = "登录密码";
          },
          edit: () => {
            this.show = 2;
            this.popuptitle = "修改登录密码";
          }
        },
        islist1: {
          add: () => {
            this.show = 3;
            this.popuptitle = "提款密码";
          },
          edit: () => {
            this.show = 4;
            this.popuptitle = "修改提款密码";
          }
        },
        islist2: {
          add: () => {
            this.show = 5;
            this.popuptitle = "绑定银行卡";
          },
          edit: () => {
            this.show = 6;
            this.popuptitle = "绑定银行卡";
          }
        },
        islist3: {
          add: () => {
            this.show = 7;
            this.popuptitle = "新建收货地址";
          },
          edit: () => {
            this.show = 8;
            this.popuptitle = "修改收货地址";
          }
        },
        islist4: {
          add: () => {
            this.show = 9;
            this.popuptitle = "账户信息";
          },
          edit: () => {
            this.show = 10;
            this.popuptitle = "账户信息";
          }
        }
      };
      let firstKey = `islist${[
        "loginpass",
        "withdrawpassword",
        "bank",
        "shipaddr",
        "UserLimit"
      ].indexOf(a[0])}`;
      console.info(firstKey);
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
    },
    mGetBanks() {
      let sysInfo = this.$store.getters.getSysInfo;
      return this.$http.post("/banktypes.json", {
        lineCountry: sysInfo.lineCountry
          ? sysInfo.lineCountry
          : this.$i18n.local == "th"
          ? "2"
          : "1"
      });
    },
    mGetProvinces() {
      return this.$http.post("/provinces.json");
    },
    mSavebanks() {
      if (this.sysInfo.lineCountry == "2") {
        this.vm.drawAddress = 0;
      }
      if (this.vm.drawAccountType <= 0) {
        //请选择银行类型
        this.mAlert(
          this.$t("member.userCapitalPassword.ucp18"),
          null,
          "warning"
        );
        return;
      }
      if (this.vm.bankProvinceid < 0) {
        //请选择所在省份
        this.mAlert(
          this.$t("member.userCapitalPassword.ucp19"),
          null,
          "warning"
        );
        return;
      }
      if (this.vm.bankCityid < 0) {
        //请选择所在城市
        this.mAlert(
          this.$t("member.userCapitalPassword.ucp20"),
          null,
          "warning"
        );
        return;
      }
      if (this.vm.bankAreaid < 0) {
        //请选择所在区县
        this.mAlert(
          this.$t("member.userCapitalPassword.ucp21"),
          null,
          "warning"
        );
        return;
      }
      if (this.vm.drawAddress.length <= 0) {
        //请填写开户行
        this.mAlert(
          this.$t("member.userCapitalPassword.ucp22"),
          null,
          "warning"
        );
        return;
      }
      if (this.vm.account == "") {
        //请填写银行账号
        this.mAlert(
          this.$t("member.userCapitalPassword.ucp23"),
          null,
          "warning"
        );
        return;
      }
      if (this.vm.drawAccountName == "") {
        //请填写开户人姓名
        this.mAlert(
          this.$t("member.userCapitalPassword.ucp24"),
          null,
          "warning"
        );
        return;
      }
      if (this.vm.mobile == "") {
        //请填写开户人手机号
        this.mAlert(
          this.$t("member.userCapitalPassword.ucp25"),
          null,
          "warning"
        );
        return;
      }
      this.mLoading(true);
      this.$http.post("/memberUser/bindbank.json", this.vm).then(result => {
        this.mLoading(false);
        if (result.code == 0) {
          this.mAlert(
            //操作成功
            this.$t("member.userCapitalPassword.ucp27"),
            () => {
              this.$router.push({ name: "UserBankCard" });
            },
            "success"
          );
        } else {
          this.mAlert(result.message, () => {}, "error");
        }
      });
    },
    mSaveAdd() {
      if (!this.vm.memberName) {
        this.$refs.tip1.show();
        return;
      }
      if (!this.vm.phone) {
        this.$refs.tip2.show();
        return;
      }
      if (!this.vm.address) {
        this.$refs.tip3.show();
        return;
      }
      this.mLoading(true);
      this.$http
        .post("/memberUser/saveMemberAddress.json", this.vm)
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            //恭喜，设置成功！
            this.$Message.success(this.$t("member.receiving.receive13"));
            this.mInit();
          } else {
            this.$Message.error(result.message);
          }
        });
    }
  },
  created() {
    // this.mInit();
  },
  mounted() {
    let params = this.$route.params;
    if (params) {
      switch (params.to) {
        case "accountInfo":
          this.routetodraw(this.userInfo[2].routeName, this.userInfo[2].type);
          break;
        case "bandBank":
          this.routetodraw(this.userInfo[0].routeName, this.userInfo[0].type);
          break;
        case "addaddress":
          this.routetodraw(this.userInfo[1].routeName, this.userInfo[1].type);
          break;
      }
    }
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
        this.passSet[1].type = result.data.coinPassword ? true : false;
        this.userInfo[2].type =
          result.data.weixin && result.data.qq && result.data.realName
            ? true
            : false;
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
          this.userInfo[0].type = rbindbank.data ? true : false;
        }
        this.mLoading(false);
      })
    );
    //收货地址
    this.$http.get("/memberUser/getMemberAddress.json").then(result => {
      if (result.code == 0) {
        this.addrVm = !!result.data ? result.data : {};
        // this.addr = result.data;
        this.userInfo[1].type = result.data ? true : false;
      }
    });

    // 绑定银行卡 银行卡下拉 省市县下拉
    this.$http
      .all([this.mGetBanks(), this.mGetBindBank(), this.mGetProvinces()])
      .then(
        this.$http.spread((rbanks, rbindbank, provincesRes) => {
          if (provincesRes.code === 0) {
            let list = provincesRes.data.list ? provincesRes.data.list : [];
            list.forEach(pro => {
              pro.value = pro.id;
              pro.label = pro.province;
              pro.citieVos &&
                pro.citieVos.forEach(city => {
                  city.value = city.id;
                  city.label = city.city;
                  city.areas &&
                    city.areas.forEach(area => {
                      area.value = area.id;
                      area.label = area.area;
                    });
                  city.children = city.areas;
                });
              pro.children = pro.citieVos;
            });
            this.provinces = list;
            // this.mInitProvincePicker();
          }
          if (rbanks.code == 0) {
            let list = rbanks.data.list ? rbanks.data.list : [];
            const ids = [2, 3, 21]; //支付宝 微信 财付通
            ids.forEach(ele => {
              list.splice(list.findIndex(item => item.id === ele), 1);
            });

            list.forEach(ele => {
              ele.value = ele.id;
              ele.label = ele.bankName;
            });
            this.banktypes = list;
            // this.mInitBankPicker();
          } else {
            this.mAlert(rbanks.message, () => {}, "error");
          }
          // if (rbindbank.code == 0) {
          //     this.vm = Object.assign(this.vm, rbindbank.data);
          // }
          this.mLoading(false);
        })
      );
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
        min-width: 85px;
        text-align: left;
      }
      & > span:nth-child(1) {
        text-align: left;
      }

      & > span:nth-child(2) {
        text-align: right;
      }
    }
    .info {
      border-bottom: 0;
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
