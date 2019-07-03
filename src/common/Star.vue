<template>
  <div>
    <div class="star mb-10" :class="starType">
      <div v-if="type == 'flor'" class="gou" v-for="(itemClass,index) in itemClassess" :key="index">
        <span class="star-item" :class="itemClass" :key="index"></span>
        <span class="week">{{week[index]}}</span>
      </div>

      <span
        class="star-item"
        v-if="type=='star'"
        v-for="(itemClass,index) in itemClassess"
        :class="itemClass"
        :key="index"
      >{{++index}}天</span>
    </div>
  </div>
</template>

<script>
const LENGTH = 7; //星星个数
const CLS_ON = "on"; //满星状态
const CLS_HALF = "half"; //半星状态
const CLS_OFF = "off"; //无星状态

export default {
  props: {
    type: {
      type: String
    },
    size: {
      type: Number //参数：尺寸
    }
    // score: {
    //     type : Array//参数：评分
    // }
  },
  data() {
    return {
      score: [],
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    };
  },
  computed: {
    starType() {
      //设置星星尺寸
      return "star-" + this.size;
    },
    itemClassess() {
      return this.score.map(item => {
        return Object.values(item)[0] ? CLS_ON : CLS_OFF;
      });
    }
  },
  methods: {
    getSignDays() {
      this.$http.get("/memberUser/getSignDays.json").then(result => {
        if (result.code == 0) {
          this.score = result.data.weekIsSign;
        }
      });
    }
  },
  created() {
    this.getSignDays();
  }
};
</script>

<style>
.star {
  display: flex;
  width: 275px;
  height: 33px;
  margin: 0 auto;
  justify-content: space-between;
}
.star-48 .star-item {
  width: 33px;
  height: 33px;
  margin-right: 6px;
  background-repeat: no-repeat;
  text-align: center;
  line-height: 0.88rem;
  /* background-size: 20px 20px; */
  border-radius: 50%;
  color: #dadada;
  border: 1px solid #dadada;
}
.star-48 .star-item:last-child {
  margin-right: 0px;
}
.star-48 .star-item.on {
  /* background-image: url("./on.png"); */
  color: #317cfd;
  border: 1px solid #317cfd;
}
.star-48 .gou {
  width: 28px;
  height: 46px;
}
.star-48 .gou .star-item {
  width: 28px;
  height: 28px;
  /* background-repeat: no-repeat; */
  /* text-align: center; */
  /* line-height: 0.88rem; */
  /* background-size: 20px 20px; */
  background: url("../assets/images/score/checkout.png") center center no-repeat;
  background-size: cover;
  /* border-radius: 50%; */
  /* color: #dadada; */
  /* border:1px solid #dadada; */
  /* color: white; */
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  /* font-size: 33px; */
}
.star-48 .gou .week {
  color: #909399;
}
.star-48 .gou .star-item.on {
  /* background-color: #317cfd; */
  border: 0;
  background: url("../assets/images/score/checkin.png") center center no-repeat;
  background-size: cover;
}
.star-48 .gou .star-item.on:before {
  /* content:'\2713';  */
  /*对号的 Unicode字符*/
  /* background: #fff; */
}
.star-48 .star-item.half {
  /* background-image: url("./half.png"); */
}
.star-48 .star-item.off {
  /* background-image: url("./off.png"); */
}

.star-36 .star-item {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  background-repeat: no-repeat;
  background-size: 15px 15px;
}
.star-36 .star-item:last-child {
  margin-right: 0px;
}
.star-36 .star-item:last-child {
  margin-right: 0px;
}
.star-36 .star-item.on {
  /* background-image: url("./on.png"); */
}
.star-36 .star-item.half {
  /* background-image: url("./half.png"); */
}
.star-36 .star-item.off {
  /* background-image: url("./off.png"); */
}
</style>