<template>
    <div class="main-body">
        <header-component :showyue="true" :logo="logo" :showIcon="true" :showLogo="true"></header-component>
        <div class="container">
            <div class="info">
              <font>万豪国际</font>是一家集博彩、旅游、度假、休闲、餐饮、康体等综合娱乐城功能为一体的五星级酒店。网上经营注册于菲律宾首都马尼拉，是世界最具有规模且成长最快的在线娱乐场之一。
            </div>
        </div>
    </div>
</template>

<script>
    import headerComponent from '@/common/Header.vue';
    export default {
        data() {
            return {
                dataList: {},
                logo: "关于我们",
            };
        },
        components:{
            headerComponent
        },
        mounted() {
            this.mInit();
        },
        methods: {
            mInit() {
                this.mLoading(true);
                let params = Object.assign({}, this.searchVM);
                this.$http.post("/memberUser/getmessages.json", params).then(result => {
                    if (result.code == 0) {
                        this.dataList = !!result.data.list ? result.data.list : [];
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .container{
        width: 351px;
        margin: 0 auto;
        margin-top: 50px;
        .info {
          margin-top: 400px;
          font {
            font-size: 24px;
            color: #ccb57d;
          }
        }
    }


</style>
