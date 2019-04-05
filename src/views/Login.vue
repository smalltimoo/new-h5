<template>
  <div id="app">
    <div class="publicpage">
      <div class="LogIn G_Form login_bg">
        <div class="el-row">
          <div class="el-col el-col-4">
            <div class="grid-content bg-purple-dark" style="height:55px;">
              <router-link
                :to="{name:'Home'}"
                class="el-icon-close router-link-active"
                id="G-Login-return"
              ></router-link>
            </div>
          </div>
          <div class="el-col el-col-20">
            <div class="grid-content bg-purple-dark">&nbsp;</div>
          </div>
        </div>
        <div class="reg-header">
          <div class="loginLogo"  :style="getmobilelongLogoStyle"></div>
          <div
            class="item"
            style="font-size: 1.4rem; font-weight: 900; color: rgb(255, 255, 255); margin-top: 40px;"
          >
            <span>{{$t('login.userLogin')}}</span><!-- 账号登录-->
          </div>
        </div>
        <div class="el-col">
          <form class="el-form el-form--label-right">
            <div class="el-form-item">
              <!---->
              <div class="el-form-item__content">
                <div class="el-input el-input--prefix">
                  <!---->
                  <input
                    autocomplete="off"
                    ref="username"
                    v-model="username"
                    :placeholder="$t('login.neterUserName')"
                    maxlength="16"
                    minlength="6"
                    type="text"
                    validateevent="true"
                    class="el-input__inner"
                  ><!--请输入用户名 -->
                  <span class="el-input__prefix icon icon-me">
                    <Icon type="ios-contact"/>
                  </span>
                  <!---->
                  <!---->
                </div>
                <!---->
              </div>
            </div>
            <div
              style="background-color: rgb(200, 199, 204); height: 1px; transform-origin: 50% 100% 0px; transform: scaleY(0.5);"
            ></div>
            <div class="el-form-item">
              <!---->
              <div class="el-form-item__content">
                <div class="el-input el-input--prefix">
                  <!---->
                  <input
                    autocomplete="off"
                    ref="password"
                    v-model="password"
                    :placeholder="$t('login.pwd')"
                    maxlength="12"
                    minlength="6"
                    type="password"
                    validateevent="true"
                    class="el-input__inner"
                  ><!--密码 -->
                  <span class="el-input__prefix">
                    <Icon type="ios-lock"/>
                    <!---->
                  </span>
                  <!---->
                  <!---->
                </div>
                <!---->
                <!---->
              </div>
            </div>
            <div
              style="background-color: rgb(200, 199, 204); height: 1px; transform-origin: 50% 100% 0px; transform: scaleY(0.5);"
            ></div>

            <div class="el-form-item">
              <!---->
              <div class="el-form-item__content">
                <div class="el-input el-input--prefix">
                  <!---->
                  <input
                    autocomplete="off"
                    ref="checkcode"
                    v-model="checkcode"
                    :placeholder="$t('login.code')"
                    maxlength="4"
                    type="text"
                    validateevent="true"
                    class="el-input__inner"
                  ><!-- 验证码-->
                  <span class="el-input__prefix">
                    <Icon type="ios-key"/>
                  </span>
                  <!---->
                  <!---->
                </div>
                <span class="eye">
                  <img :src="cgetCodeUrl" @click="mVCode()">
                </span>
                <!---->
              </div>
            </div>
            <div
              style="background-color: rgb(200, 199, 204); height: 1px; transform-origin: 50% 100% 0px; transform: scaleY(0.5);"
            ></div>
          </form>
          <button
            type="button"
            class="el-button G-submit el-button--primary el-button--default"
            style="width: 85%; height: 50px;"
            @click="mLogin"
          >
            <span>{{$t('login.login')}}</span><!--登录 -->
          </button>
        </div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <div
              style="line-height: 20px; height: 20px; font-size: 14px; text-align: right; width: 85%; margin: 20px auto;"
            >
              <Checkbox v-model="savenp" style="float:left;">{{$t('login.rememberAccount')}}</Checkbox><!-- 记住账号密码-->
              <router-link :to="{name:'Reg'}" style="color: rgb(183, 183, 183);">{{$t('login.quickRegister')}}</router-link><!-- 快速注册-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import types from '@/store/mutation-types'
import message from '@/mixins/message'
export default {
  mixins: [message],
  data() {
    return {
      vcodeurl: '',
      username: '',
      password: '',
      checkcode: '',
      random: 0,
      savenp: false
    }
  },
   computed: {
       getmobilelongLogoStyle: function() {
         // background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
         var sysobj = this.$store.getters.getSysPicObj;
         if(sysobj.mobilelongLogo != undefined){
         var style = "background:url('"+sysobj.mobilelongLogo
                    +"'); background-size:100%; height:52px;width:166px;"
                      return style;
         }
             },
      cgetCodeUrl() {
         return this.$store.getters.getBaseUrl + '/checkCode.json?t='+this.random+'&token='+
            this.$store.getters.getSessionToken
         },
     },
  methods: {
    mInit() {
      this.mVCode()
      let saveuser = JSON.parse(localStorage.getItem('s') || '{}')
      if (saveuser.s) {
        this.savenp = true
        this.username = saveuser.u
        this.password = saveuser.p
      } else {
        this.savenp = false
      }
    },
    mVCode() {
      this.checkcode = ''
       this.random = Math.random();
    },
    mLogin() {
      if (!this.username) {
          //请输入用户名和密码！
        this.mAlert(this.$t('login.alert1'), () => {
          this.$refs.username.focus()
        })
        return
      }
      if (!this.password) {
          //请输入用户名和密码！
        this.mAlert(this.$t('login.alert1'), () => {
          this.$refs.password.focus()
        })
        return
      }
      if (!this.checkcode) {
          //请输入验证码
        this.mAlert(this.$t('login.alert3'), () => {
          this.$refs.checkcode.focus()
        })
        return
      }
      //登陆中...
      this.mLoading(true, this.$t('login.alert4'))
      this.mmLogin(this.username, this.password, this.checkcode)
        .then(res => {
          if (this.savenp) {
            let a = {
              s: true,
              u: this.username,
              p: this.password
            }
            localStorage.setItem('s', JSON.stringify(a))
          } else {
            localStorage.removeItem('s')
          }
          this.mLoading(false)
        })
        .catch(result => {
          this.mLoading(false)
          this.mAlert(
            result.message,
            () => {
              this.isLogining = false
              this.mVCode()
            },
            'error',
            null,
            null,
            1
          )
        })
    }
  },
  created() {
    this.mInit()
  }
}
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
#app {
  height: 108%;
}
.el-row {
  height: 55px;
}
.el-col-4 {
  height: 55px;
}
.LogIn #G-Login-return {
  margin-top: 25px;
  color: #fff;
}
.LogIn .el-button--primary {
  margin-top: 30px;
}
</style>


