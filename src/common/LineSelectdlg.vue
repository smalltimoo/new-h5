<template>

    <van-dialog
    class="main"
    v-model="isshow"
    title="线路选择"
    >
    <h3 >当前线路：<font>线路2</font></h3>
        <van-picker
            :columns="columns"
            @confirm="onConfirm"
          
        />
    </van-dialog>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      value: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    };
  },
  props:["isshow"],
  methods:{
      minit(){console.info('start:')
          this.$http.post('/memberApiList.json').then(result => {
        if (result.code == 0) {
          console.info(1111)
        }
      });
      },
      onConfirm(value) {
        this.value = value;
        },
  },
  created () {
      this.minit();
  }
}
</script>

<style lang="less" scoped>
.main {
	width: 300px;
    height: 416px;
    margin: 0 auto;
    /deep/ .van-dialog__header {
	height: 90px;
    background-image:linear-gradient(0deg, #7A88FF, #7AFFAF);
	font-family: Source Han Sans CN;
	font-size: 25px;
	color: #ffffff;
	box-shadow: 0px 3px 11px 0px 
		rgba(0, 123, 188, 0.75);

    }
    h3 {
	width: 300px;
    height: 40px;
    line-height:40px; 
    background-color: #f3f3f3;
	font-size: 14px;
    color: #303133;
    text-align: left;
    padding-left: 5px;
    font {
        color: #3d7eff;
    }
    }
}
</style>
