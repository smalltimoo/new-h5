<template>
  <div id="app">
   <div class="publicpage">

    <div class="modifybankpass publicpage_view" >
     <div class="TopHeader">
      <div id="return" style="position: absolute;">
          <router-link :to="{name:'UserMember'}"><Icon type="ios-arrow-back" /></router-link>
      </div>
      {{$t("member.receiving.receive1")}}
     </div> <!-- 设定收货信息-->
     <div class="el-row">
      <div class="el-col el-col-24">
       <div class="grid-content">
        {{$t("member.receiving.receive2")}}
       </div><!-- 收货信息-->
      </div>
     </div>
     <form class="el-form el-form--label-right">
      <div class="el-form-item">
       <label class="el-form-item__label"style="width: 100px;" > {{$t("member.receiving.receive3")}}</label><!--收货人 -->
       <div class="el-form-item__content" style="margin-left: 120px;">
        <div class="el-input">
         <!---->
         <input ref="realName" v-model="vm.memberName" autocomplete="off" :placeholder="$t('member.receiving.receive4')" rows="2" validateevent="true" class="el-input__inner" /><!-- 请输入收货人-->
         <!---->
         <!---->
         <!---->
        </div>
        <!---->
       </div>
      </div>
      <div class="line-w"></div>
      <div class="el-form-item">
       <label class="el-form-item__label" style="width: 100px;">{{$t("member.receiving.receive5")}}</label><!--收货电话 -->
       <div class="el-form-item__content" style="margin-left: 120px;">
        <div class="el-input">
         <!---->
         <input ref="phone" v-model="vm.phone" autocomplete="off" :placeholder="$t('member.receiving.receive6')" rows="2" validateevent="true" class="el-input__inner" /><!-- 请输入正确的收货人电话-->
         <!---->
         <!---->
         <!---->
        </div>
        <!---->
       </div>
      </div>
      <div class="line-w"></div>
      <div class="el-form-item">
       <label class="el-form-item__label" style="width: 100px;">{{$t("member.receiving.receive7")}}</label><!--收货地址 -->
       <div class="el-form-item__content" style="margin-left: 120px;">
        <div class="el-input">
         <!---->
         <input ref="address" v-model="vm.address" autocomplete="off" :placeholder="$t('member.receiving.receive14')" rows="2" validateevent="true" class="el-input__inner" /><!--请输入正确的地址 -->
         <!---->
         <!---->
         <!---->
        </div>
        <!---->
       </div>
      </div>
     </form>
     <button type="button" class="el-button G-submit el-button--primary" @click="mSaveAdd" v-if="this.data==''">
      <!---->
      <!----><span>{{$t("member.receiving.receive8")}}</span></button><!--立即设置 -->
    </div>



   </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vm: {},
      data: ""
    };
  },
  mounted() {
    this.$http.get("/memberUser/getMemberAddress.json").then(result => {
      if (result.code == 0) {
        this.vm = !!result.data ? result.data : {};
        this.data = result.data;
        if (!!this.vm.id) {
          this.isDoing = true;
        } else {
          this.isDoing = false;
        }
      }
    });
  },
  methods: {
    mSaveAdd() {
      if (this.isDoing) {
          //如需修改，请联系客服！
        this.mAlert(this.$t("member.receiving.receive9"), () => {});
        return;
      }
      if (!this.vm.memberName) {
          //收货人姓名  必填！
        this.mAlert(this.$t("member.receiving.receive10"), () => {});
        return;
      }
      if (!this.vm.phone) {
          //收货人电话 必填！
        this.mAlert(this.$t("member.receiving.receive11"), () => {});
        return;
      }
      if (!this.vm.address) {
          //收货地址  必填！
        this.mAlert(this.$t("member.receiving.receive12"), () => {});
        return;
      }
      this.isDoing = true;
      this.mLoading(true);
      this.$http
        .post("/memberUser/saveMemberAddress.json", this.vm)
        .then(result => {
          this.isDoing = false;
          this.mLoading(false);
          if (result.code == 0) {
              //恭喜，设置成功！
            this.mAlert(this.$t("member.receiving.receive13"), () => {});
          } else {
            this.mAlert(result.message, () => {});
          }
        });
    }
  }
};
</script>
<style>
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

