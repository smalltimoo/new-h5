<template>
  <div class="helpcenter">
    <header-component :showyue="true" :logo="logo" :showIcon="true" :showLogo="true"></header-component>
    <div class="container" style="padding-top:18px;">
      <el-input :placeholder="$t('member.systemSet.placeh0')" v-model="inputValue">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div class="router-panel">
        <!-- <div class="title">{{this.$t('member.userMember.um7')}}</div> -->
        <div class="my-pay">
          <a
            href="#"
            v-for="(item,index) in routerPanelList"
            @click.prevent="helpcenterDrawer = true;"
            :key="index"
          >
            <div>
              <img :src="item.imgdef" width="35px">
            </div>
            <span>{{item.text}}</span>
          </a>
        </div>
      </div>
      <div class="question">
        <div class="line title">
          <span>{{$t("member.systemSet.h8")}}</span>
        </div>
        <div class="line" v-for="(item, index) in questionList" :key="index">
          <span>{{item.text}}</span>
          <router-link tag="span" class="rightsanjiao" :to="{name:item.toName}"></router-link>
        </div>
      </div>
    </div>
    <Drawer :closable="false" v-model="helpcenterDrawer" class="underline-drawer notback" width="100">
      <headerComponent
        :showIcon="true"
        :showLogo="true"
        :logo="$t('member.systemSet.h2')"
        @notgoback="notgoback"
      ></headerComponent>

      <div class="question">
        <div class="line title">
          <span>{{$t("member.systemSet.h8")}}</span>
        </div>
        <div class="line" v-for="(item, index) in questionList" :key="index">
          <span>{{item.text}}</span>
          <router-link tag="span" class="rightsanjiao" :to="{name:item.toName}"></router-link>
        </div>
      </div>
    </Drawer>
  </div>
</template>
<script>
import headerComponent from "@/common/Header.vue";
import types from "@/store/mutation-types";
import { mapState } from "vuex";
export default {
  name: "helpcenter",
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
      logo: this.$t("member.systemSet.h0"),
      inputValue: "",
      helpcenterDrawer: false,
      routerPanelList: [
        {
          text: this.$t("member.systemSet.h2"),
          imgdef: require("../../assets/images/helpcenter/bangzhu1@2x.png")
          //   toName: "logoin"
        },
        {
          text: this.$t("member.systemSet.h3"),
          imgdef: require("../../assets/images/helpcenter/bangzhu2@2x.png")
          //   toName: "logoin"
        },
        {
          text: this.$t("member.systemSet.h4"),
          imgdef: require("../../assets/images/helpcenter/bangzhu3@2x.png")
          //   toName: "logoin"
        },
        {
          text: this.$t("member.systemSet.h5"),
          imgdef: require("../../assets/images/helpcenter/bangzhu4@2x.png")
          //   toName: "logoin"
        },
        {
          text: this.$t("member.systemSet.h6"),
          imgdef: require("../../assets/images/helpcenter/bangzhu5@2x.png")
          //   toName: "logoin"
        },
        {
          text: this.$t("member.systemSet.h7"),
          imgdef: require("../../assets/images/helpcenter/bangzhu6@2x.png")
          //   toName: "logoin"
        }
      ],
      questionList: [
        {
          text: this.$t("member.systemSet.h2"),
          imgdef: require("../../assets/images/helpcenter/bangzhu1@2x.png"),
          toName: "logoin"
        },
        {
          text: this.$t("member.systemSet.h3"),
          imgdef: require("../../assets/images/helpcenter/bangzhu2@2x.png"),
          toName: "logoin"
        },
        {
          text: this.$t("member.systemSet.h4"),
          imgdef: require("../../assets/images/helpcenter/bangzhu3@2x.png"),
          toName: "logoin"
        },
        {
          text: this.$t("member.systemSet.h5"),
          imgdef: require("../../assets/images/helpcenter/bangzhu4@2x.png"),
          toName: "logoin"
        },
        {
          text: this.$t("member.systemSet.h6"),
          imgdef: require("../../assets/images/helpcenter/bangzhu5@2x.png"),
          toName: "logoin"
        },
        {
          text: this.$t("member.systemSet.h7"),
          imgdef: require("../../assets/images/helpcenter/bangzhu6@2x.png"),
          toName: "logoin"
        }
      ]
    };
  },
  methods: {
    notgoback(data) {
      this.helpcenterDrawer = data;
    }
  },
  created() {
    // this.mInit();
  }
};
</script>
<style lang="less" scoped>
.helpcenter {
//   .container {
//     // dis
//   }
  /deep/ .el-input {
    width: 351px;
    height: 26.5px;
    background-color: #ffffff;
    border-radius: 12.94px;
    border: solid 0.5px #cccccc;
    margin: 0 auto;
  }
  /deep/ .el-input__inner {
	width: 351px;
	height: 26px;
	background-color: #ffffff;
	border-radius: 13px;
	border: solid 1px #cccccc;
}
/deep/ .el-input__prefix {
  top:-6px;
}

  .router-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 10px;
    background-color: #fff;
    border-radius: 8px;

    .title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-weight: bold;
      text-align: left;
      padding: 0 10px;
      border-bottom: solid 1px #f3f3f3;
    }

    .my-pay {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      padding: 10px 4px;
      width: 100%;

      & > a {
        width: 33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #4c4c4c;

        & > div {
          // width: 43px;
          height: 44px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        & > span {
          padding-top: 5px;
          height: 40px;
          line-height: 16px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .question {
    .line {
      height: 42px;
      // line-height: 42px;
      width: 351px;
      // width:100%;
      display: flex;
      margin: 0 auto;
      font-size: 14px;
      color: #303313;
      border-bottom: 1px solid #e5e5e5;
      justify-content: space-between;
      align-items: center;
      // padding-top: 21.5px;
      .rightsanjiao {
        width: 10px;
        height: 12.5px;
        display: inline-block;
        border-top: 2px solid #e5e5e5;
        border-right: 2px solid #e5e5e5;
        transform: rotate(45deg);
      }
    }
    .title {
      color: #3d7eff;
    }
  }
}
</style>
