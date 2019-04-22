<template>
    <div class="main-body">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{ $t('agent.linkManagement.linkManagement1')}}
            </div>
            <div class="header-right"></div>
        </div>
        <div class="no-list" v-if="(!dataList||dataList.length==0)&&!showSearch"></div>
        <div class="mui-content">
            <div class="rowbg el-row" v-for="(item,i) in dataList" :key="i">
                <div class="el-col el-col-24">
                    <div class="el-col el-col-24">
                        <div class="el-col el-col-24">
                            <div class="grid-content">
                                <span class="Save success">{{item.linkTypeStr}}</span>
                                <span style="height: 30px;line-height: 30px">{{ $t('agent.linkManagement.linkManagement2')}}:{{item.regNum}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="el-col el-col-24">
                    <div class="el-col el-col-24">
                        <div class=" bg-purple-dark data">
                            地址：{{item.linkUrl}}
                        </div>
                    </div>
                </div>
                <div class="el-col el-col-24" style="margin-top: 10px;text-align: right">
                    <Button type="primary" v-if="item.linkType==2" @click="mShow(item)">{{
                        $t('agent.linkManagement.linkManagement4')}}
                    </Button><!--分红比例 -->
                    <Button type="warning" style="margin-left:15px;" @click="mDelete(item)"> {{
                        $t('agent.linkManagement.linkManagement5')}}
                    </Button><!--一键删除 -->
                </div>

            </div>
        </div>
    </div>

</template>
<script>
    import window from "../../mixins/window";

    var _this = this;
    export default {
        mixins: [window],
        data() {
            return {
                dataList: []
            };
        },
        mounted() {
            this.mPullData();
        },
        methods: {
            mPullData() {
                this.mLoading(true);
                var params = Object.assign({}, this.searchVM);
                this.$http.post("/agentUser/agentliks.json", params).then(result => {
                    if (result.code == 0) {
                        this.dataList = !!result.rows ? result.rows : [];
                    }
                });
            },
            mDelete(rows) {
                //确定要删除？
                this.mConfirm(_this.$t('agent.linkManagement.linkManagement6'), () => {
                    this.mLoading(true);
                    var params = Object.assign({}, rows);
                    this.$http
                        .post("/agentUser/delAgentlinks.json", params)
                        .then(result => {
                            if (result.code == 0) {
                                this.mAlert(result.message, "success");
                                this.mPullData();
                            } else {
                                this.mAlert(result.message, "error");
                            }
                        });
                });
            },
            mShow(rows) {
                this.mWinOpen(
                    //分红比例详情
                    _this.$t('agent.linkManagement.linkManagement7'),
                    () => import("./Commission.vue"),
                    {
                        benefitAmountRebate: rows.benefitAmountRebate,
                        profitRebate: rows.profitRebate,
                        rakebackRebate: rows.rakebackRebate
                    },
                    300
                );
            }
        }, created() {
            _this = this;
        }
    };
</script>

<style scoped>
    .mui-bar .mui-title {
        margin-top: 10px;
        text-align: center;
    }

    .mui-content {
        margin-top: 50px;
    }

    .mui-scalable {
        background-color: #efeff4 !important;
    }

    .rowbg {
        margin: 5px 10px 10px 10px;
        padding: 10px 15px;
        border-bottom: 1px solid #f3f3f3;
        background-color: #ffffff;
        box-shadow: 0px 1px 5px 0px rgba(201, 201, 201, 0.8);
        border-radius: 3px;
    }

    .Save {
        display: block;
        padding: 0 10px;
        text-align: center;
        border-radius: 2px;
        font-size: 14px;
        color: #fff;
        height: 28px;
        line-height: 28px;
        margin-bottom: 10px;
        min-width: 76px;
    }

    .status {
        height: 28px;
        line-height: 28px;
        text-align: center;
        font-weight: bold;
        font-family: Consolas, "Courier New", Courier, FreeMono, monospace;
    }

    .Types {
        line-height: 22px;
        text-align: center;
        color: #333;
        padding-bottom: 5px;
    }

    .ivu-divider-inner-text {
        color: #4c4c4c;
    }

    .mui-off-canvas-left, .mui-off-canvas-right {
        background-color: #fff;
        color: #4c4c4c;
    }

    .grid-content {
        width: 100%;
        display: flex;
        margin-top: 3px;
        justify-content: space-between;
    }

    .success {
        background-color: #cd0005;
        color: #fff;
    }

    .wait {
        background-color: #b58c2a;
    }

    .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
    }
</style>

