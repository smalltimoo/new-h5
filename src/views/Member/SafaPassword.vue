<template>
  <div id="app">
   <div class="publicpage">
    <div class="modifybankpass publicpage_view"  v-if="coinPassword == ''">
     <div class="TopHeader">
      <div id="return" style="position: absolute;">
          <router-link :to="{name:'UserSettings'}">
            <Icon type="ios-arrow-back" />
            </router-link></div>{{ $t('member.safePassword.sp1') }}
     </div>  <!--设定提款密码 -->
     <form class="el-form el-form--label-right">
      <div class="el-form-item">
       <label class="el-form-item__label" style="width: 80px;">{{ $t('member.safePassword.sp2') }}</label><!--新密码 -->
       <div class="el-form-item__content" style="margin-left: 80px;">
        <div class="el-input">
         <!---->
         <input v-model="vm.password" autocomplete="off" :placeholder="$t('member.safePassword.sp3')" maxlength="6" minlength="6" type="password" rows="2" validateevent="true" class="el-input__inner" /><!--密码必须为6位数字的组合 -->
         <!---->
         <!---->
         <!---->
        </div>
        <!---->
       </div>
      </div>
      <div class="line-w"></div>
      <div class="el-form-item">
       <label class="el-form-item__label" style="width: 80px;">{{ $t('member.safePassword.sp4') }}</label><!--确认密码 -->
       <div class="el-form-item__content" style="margin-left: 80px;">
        <div class="el-input">
         <!---->
         <input v-model="vm.truePassword" autocomplete="off" :placeholder="$t('member.safePassword.sp5')" maxlength="6" minlength="6" type="password" rows="2" validateevent="true" class="el-input__inner" /><!-- 请再次填写新密码-->
         <!---->
         <!---->
         <!---->
        </div>
        <!---->
       </div>
      </div>
     </form>
     <p class="A-text" style="text-align: center;">{{ $t('member.safePassword.sp6') }}<span class="Orgrise">{{ $t('member.safePassword.sp7') }}</span>{{ $t('member.safePassword.sp8') }}</p> <!--提款密码须为 --> <!--6位数字 --> <!-- 且符合0~9字元-->
     <button type="button" class="el-button G-submit el-button--primary" @click="mNewPswSave">
      <!---->
      <!----><span>{{ $t('member.safePassword.sp9') }}</span></button><!--立即设置 -->
    </div>

    <div class="modifybankpass publicpage_view" v-else>
     <div class="TopHeader">
      <div id="return" style="position: absolute;">
          <router-link :to="{name:'UserSettings'}">
            <Icon type="ios-arrow-back" />
            </router-link></div>{{ $t('member.safePassword.sp10') }}
     </div>  <!--设定提款密码 -->
     <form class="el-form el-form--label-right">
      <div class="el-form-item">
       <label class="el-form-item__label" style="width: 80px;">{{ $t('member.safePassword.sp11') }}</label><!--原密码 -->
       <div class="el-form-item__content" style="margin-left: 80px;">
        <div class="el-input">
         <!---->
         <input  v-model="vm.oldPass" ref="oldPass" autocomplete="off" maxlength="6" minlength="6" type="password" rows="2" validateevent="true" class="el-input__inner" />
         <!---->
         <!---->
         <!---->
        </div>
        <!---->
       </div>
      </div>
      <div class="line-w"></div>
      <div class="el-form-item">
       <label class="el-form-item__label" style="width: 80px;">{{ $t('member.safePassword.sp12') }}</label><!--新密码 -->
       <div class="el-form-item__content" style="margin-left: 80px;">
        <div class="el-input">
         <!---->
         <input v-model="vm.newPass" ref="newPass" autocomplete="off" :placeholder="$t('member.safePassword.sp3') " maxlength="6" minlength="6" type="password" rows="2" validateevent="true" class="el-input__inner" /><!-- 密码必须为6位数字的组合-->
         <!---->
         <!---->
         <!---->
        </div>
        <!---->
       </div>
      </div>
      <div class="line-w"></div>
      <div class="el-form-item">
       <label class="el-form-item__label" style="width: 80px;">{{ $t('member.safePassword.sp4') }}</label><!--确认密码 -->
       <div class="el-form-item__content" style="margin-left: 80px;">
        <div class="el-input">
         <!---->
         <input v-model="vm.truePass" ref="truePass" autocomplete="off" :placeholder="$t('member.safePassword.sp5')" maxlength="6" minlength="6" type="password" rows="2" validateevent="true" class="el-input__inner" /><!-- 请再次填写新密码-->
         <!---->
         <!---->
         <!---->
        </div>
        <!---->
       </div>
      </div>
     </form>
     <p class="A-text" style="text-align: center;">{{ $t('member.safePassword.sp6') }}<span class="Orgrise">{{ $t('member.safePassword.sp7') }}</span>{{ $t('member.safePassword.sp8') }}</p> <!-- 提款密码须为--> <!-- 6位数字--> <!--且符合0~9字元 -->
     <button type="button" class="el-button G-submit el-button--primary" @click="mSave">
      <!---->
      <!----><span>{{ $t('member.safePassword.sp9') }}</span></button><!--立即设置 -->
    </div>



   </div>
  </div>
</template>
<script>
export default {
  name: "SafePassword",
  data() {
    return {
      data: "",
      vm: {
        password: "",
        truePassword: ""
      },
      edit: {
        oldPass: "",
        newPass: "",
        truePass: ""
      },
      coinPassword: ""
    };
  },
  mounted() {
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.coinPassword = result.data.coinPassword;
      }
    });
    this.mInit();
  },
  methods: {
    mInit() {
      this.mLoading(true);
      this.$http.get("/memberUser/membercoin.json").then(result => {
        console.log(result.data);
        if (result.data == -1) {
          this.data = result.data;
          //请先设置资金密码
          this.mAlert(this.$t('member.safePassword.sp14'), () => {});
        }
      });
    },
    mNewPswSave() {
      if (this.vm.password == "") {
          //请输入资金密码！
        this.mAlert(this.$t('member.safePassword.sp15'));
        return;
      }
      if (this.vm.truePassword == "") {
          //请再次输入资金密码！
        this.mAlert(this.$t('member.safePassword.sp16'));
        return;
      }
      if (this.vm.truePassword != this.vm.password) {
          //两次输入的密码不一致！
        this.mAlert(this.$t('member.safePassword.sp17'));
        return;
      }
      if (this.vm.password.length != 6) {
          //请输入正确的6位数字资金密码！
        this.mAlert(this.$t('member.safePassword.sp18'));
        return;
      }
      this.mLoading(true);
      this.$http
        .post("/memberUser/setcoinpass.json", { newPass: this.vm.password })
        .then(result => {
          this.mLoading(false);
          console.log(result);
          if (result.code == 0) {
              //操作成功
            this.mAlert(this.$t('member.safePassword.sp19'), () => {});
            this.mInit();
          }
        });
    },
    mSave() {
      if (this.vm.oldPass == "") {
          //请输入原资金密码
        this.mAlert(this.$t('member.safePassword.sp20'), null, "warning");
        return;
      }
      if (this.vm.newPass == "") {
          //请输入新的资金密码
        this.mAlert(this.$t('member.safePassword.sp21'), null, "warning");
        return;
      }
      if (this.vm.truePass != this.vm.newPass) {
          //两次输入的密码不一致
        this.mAlert(this.$t('member.safePassword.sp22'), null, "warning");
        return;
      }
      if (this.vm.newPass.length != 6) {
          //请输入正确的6位数资金密码
        this.mAlert(this.$t('member.safePassword.sp23'));
        return;
      }
      this.mLoading(true);
      this.$http
        .post("/memberUser/updatecoinpass.json", this.vm)
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            this.mAlert(
                //修改成功
               this.$t('member.safePassword.sp24'),
              () => {
                this.vm = {};
              },
              "success"
            );
          } else {
            this.mAlert(result.message, () => {}, "error");
          }
        });
    }
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.publicpage_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px);
  transform: translate(30px);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px);
  transform: translate(-30px);
}
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
.modifybankpass {
  width: 100%;
  font-size: 0;
}
.modifybankpass .el-form {
  margin-top: 5px;
  background: #545478;
  padding: 5px 15px;
}
.modifybankpass input {
  outline: none;
  border: none;
}
.modifybankpass .el-form-item__label {
  font-weight: 900;
  color: #fff;
}
.modifybankpass .el-button--primary {
  background-color: #ffb301;
  border-color: #ffc501;
}
.modifybankpass .el-form-item {
  height: 56px;
  padding-top: 7px;
  margin-bottom: 0;
}
.modifybankpass .el-input__inner {
  background-color: #545478;
  color: #fff;
}
.modifybankpass .G-submit {
  font-size: 16px;
}
.modifybankpass .G-submit span {
  font-weight: 900;
}
.modifybankpass .A-text {
  font-size: 15px;
  text-align: left;
  line-height: 46px;
  color: #666;
}
</style>

