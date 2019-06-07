<template>
  <div class="systemset">
    <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container">
      <el-switch
        class="line"
        v-for="(item,index) in switchList"
        :key="index"
        v-model="item.value"
        :inactive-text="item.text"
      ></el-switch>
      <div class="line set_sys" style="margin-top:50px;">
        <span>{{this.$t('member.systemSet.s5')}}</span>
      </div>
      <div class="line set_sys">
        <span>{{this.$t('member.systemSet.s6')}}</span>
        <span>{{version}}</span>
      </div>
      <div class="line set_sys">
        <span>{{this.$t('member.systemSet.s7')}}</span>
        <span class="rightsanjiao"></span>
      </div>
      <span class="button" @click="mLoginOut">{{this.$t('member.systemSet.s8')}}</span>
    </div>
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";
import types from "@/store/mutation-types";
import { mapState } from "vuex";
export default {
  name: "systemset",
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
      logo: this.$t("member.systemSet.s0"),
      version: "V1.6.0",
      switchList: [
        { text: this.$t("member.systemSet.s1"), value: true },
        { text: this.$t("member.systemSet.s2"), value: true },
        { text: this.$t("member.systemSet.s3"), value: true },
        { text: this.$t("member.systemSet.s4"), value: false }
      ]
    };
  },
  methods: {
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
    }
  },
  created() {
    // this.mInit();
  }
};
</script>
<style lang="less" scoped>
.systemset {
//   .container {
//     // dis
//   }
  /deep/ .line {
    width: 351px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    color: #606266;
    font-size: 15px;
  }

  /deep/ .el-switch {
    width: 351px;
    height: 32.5px;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    color: #606266;
    font-size: 15px;
  }
  /deep/ .el-switch:last-child {
    margin-bottom: 20px;
  }
  .set_sys {
    height: 51px;
    // line-height: 51px;
    display: flex;
    justify-content: space-between;
    padding-top: 21.5px;
    .rightsanjiao {
      width: 10px;
      height: 12.5px;
      display: inline-block;
      border-top: 2px solid #e5e5e5;
      border-right: 2px solid #e5e5e5;
      transform: rotate(45deg);
    }
  }
  .button {
    display: block;
    margin: 50px auto 0;
    width: 300px;
    height: 44px;
    background-color: #ffffff;
    box-shadow: 0px 1px 10px 0px rgba(152, 152, 152, 0.2);
    border-radius: 22px;

    font-family: SourceHanSansCN-Medium;
    font-size: 13.6px;
    line-height: 44px;
    color: #ec2829;
  }
}
</style>
