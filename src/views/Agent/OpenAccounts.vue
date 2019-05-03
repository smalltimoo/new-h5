<template>
    <div class="main-body option">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{ $t('agent.openAccounts.openAccounts1')}}
            </div>
            <div class="header-right"></div>
        </div>
        <div style="margin-top: 44px">
            <div class="mui-input-group">
                <div style="width: 30%;text-align: left">{{ $t('agent.openAccounts.openAccounts2')}}</div>
                <div style="width: 40%">
                    <el-radio v-model="vm.memberType" :label="1">{{ $t('agent.openAccounts.openAccounts3')}}</el-radio>
                </div>
                <div style="width: 40%">
                    <el-radio v-model="vm.memberType" :label="2">{{ $t('agent.openAccounts.openAccounts4')}}</el-radio>
                </div>
            </div>
            <div class="title">{{ $t('agent.openAccounts.openAccounts5')}}</div>
            <div class="panel">
                <span>{{ $t('agent.openAccounts.openAccounts6')}}</span>
                <input v-model="vm.username" :placeholder="$t('agent.openAccounts.openAccounts7')" class="ipt"/>
            </div>
            <div class="panel">
                <span>{{ $t('agent.openAccounts.openAccounts8')}}</span>
                <input v-model="vm.password" :placeholder="$t('agent.openAccounts.openAccounts9')" class="ipt"/>
            </div>
            <div class="panel" v-if="vm.linkType==2">
                <span>{{ $t('agent.openInvitation.openInvitation8')}}</span>
                <input v-model="vm.benefitAmountRebate" :placeholder="'优惠金额扣除不能小于'+dataList.benefitAmountRebate+'%'"
                       class="ipt"/>
            </div>
            <div class="panel" v-if="vm.memberType==2"><!--分红比例： -->
                <span>{{ $t('agent.openAccounts.openAccounts10')}} </span>
                <input v-model="vm.profitRebate" type="number" :placeholder="'分红比例不能大于'+dataList.profitRebate+'%'" class="ipt"/>
            </div>
            <div class="panel" v-if="vm.memberType==2"><!--分红比例： -->
                <span>{{ $t('agent.openAccounts.openAccounts11')}} </span>
                <input v-model="vm.rakebackRebate" type="number"  :placeholder="'返水扣除不能小于'+dataList.rakebackRebate+'%'"
                       class="ipt"/>
            </div>
            <div class="panel" v-if="vm.memberType==2"><!--优惠扣除： -->
                <span>{{ $t('agent.openAccounts.openAccounts12')}}</span>
                <input v-model="vm.benefitAmountRebate" type="number"  :placeholder="'优惠金额扣除不能小于'+dataList.benefitAmountRebate+'%'" class="ipt"/>
            </div>
            <cube-button :active="true" @click="mSave" class="save-btn">
                {{ $t('agent.openInvitation.openInvitation9')}} <!--立即设置 -->
            </cube-button>
        </div>

        <!--<div class="publicpage">-->
        <!--<div class="TransferRecords publicpage_view">-->
        <!--<div class="data-time animated slideInUp">-->
        <!--<Divider>{{ $t('agent.openInvitation.openInvitation2')}}</Divider>&lt;!&ndash;用户类型 &ndash;&gt;-->
        <!--<div class="mui-input-group" style="width:50%; margin-left:24%;">-->
        <!--<div class="mui-input-row mui-radio mui-left" style="margin-bottom: 10px">-->
        <!--<el-radio v-model="vm.linkType" :label="1">{{$t('agent.openInvitation.openInvitation3')}}</el-radio>-->
        <!--</div>-->
        <!--<div class="mui-input-row mui-radio mui-left">-->
        <!--<el-radio v-model="vm.linkType" :label="2">{{$t('agent.openInvitation.openInvitation4')}}</el-radio>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="data-time animated slideInUp">-->
        <!--<div>{{ $t('agent.openInvitation.openInvitation5')}}</div>&lt;!&ndash;开户信息 &ndash;&gt;-->
        <!--<div v-if="vm.linkType==2">&lt;!&ndash; 分红比例：&ndash;&gt;-->
        <!--<div span="24" style="border-bottom: solid 1px #f3f3f3;">-->
        <!--{{ $t('agent.openInvitation.openInvitation6')}}-->
        <!--<input v-model="vm.profitRebate" :placeholder="'分红比例不能大于'+dataList.profitRebate+'%'" class="ipt"/>-->
        <!--</div>&lt;!&ndash;返水扣除： &ndash;&gt;-->
        <!--<div span="24" style="border-bottom: solid 1px #f3f3f3;">-->
        <!--{{ $t('agent.openInvitation.openInvitation7')}}-->
        <!--<input v-model="vm.rakebackRebate" :placeholder="'返水扣除不能小于'+dataList.rakebackRebate+'%'" class="ipt" />-->
        <!--</div>&lt;!&ndash;优惠扣除： &ndash;&gt;-->
        <!--<div span="24" style="border-bottom: solid 1px #f3f3f3;">-->
        <!--{{ $t('agent.openInvitation.openInvitation8')}}-->
        <!--<input v-model="vm.benefitAmountRebate" :placeholder="'优惠金额扣除不能小于'+dataList.benefitAmountRebate+'%'" class="ipt" />-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
    var _this;
    export default {
        data() {
            return {
                memberTypes: [{id: 1, value: "会员"}, {id: 2, value: "代理"}],
                dataList: {profitRebate: '', rakebackRebate: '', benefitAmountRebate: ''},
                vm: {
                    memberType: "",
                    username: "",
                    password: "",
                    profitRebate: "",
                    rakebackRebate: "",
                    benefitAmountRebate: "",
                    activeAmountRebate: ""
                }
            };
        },
        mounted() {
            this.mInit();
        },
        methods: {
            mInit() {
                this.$http.get("/agentUser/getprofitRebate.json").then(result => {
                    if (result.code == 0) {
                        this.dataList = result.data.memberUser;
                    } else {
                        //加载分红比例失败
                        this.mAlert(_this.$t('agent.openAccounts.openAccounts14'));
                    }
                });
            },
            mSave() {
                if (this.vm.memberType <= 0) {
                    //请选择开户类型
                    this.mAlert(_this.$t('agent.openAccounts.openAccounts15'), null, "warning");
                    return;
                }
                if (this.vm.username.trim() == "") {
                    //请填写登陆账号
                    this.mAlert(_this.$t('agent.openAccounts.openAccounts16'), null, "warning");
                    return;
                }
                if (this.vm.password.trim() == "") {
                    //请填写登陆密码
                    this.mAlert(_this.$t('agent.openAccounts.openAccounts17'), null, "warning");
                    return;
                }
                if (this.vm.memberType == 2 && this.vm.profitRebate > this.profitRebate) {
                    this.mAlert(
                        //下级分红比例不能高于
                        _this.$t('agent.openAccounts.openAccounts18') + this.profitRebate + "%",
                        null,
                        "warning"
                    );
                    return;
                }
                this.$http.post("/agentUser/addMemberUser.json", this.vm).then(result => {
                    this.mLoading(false);
                    if (result.code == 0) {
                        //操作成功
                        this.mAlert(_this.$t('agent.openAccounts.openAccounts19'), () => {
                        }, "success");
                    } else {
                        //操作失败
                        this.mAlert(result.message, () => {
                        }, "error");
                    }
                });
            }
        }, created() {
            _this = this;
        }
    };
</script>


<style scoped>
    .mui-input-group {
        padding: 20px;
        width: 100%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 10px;
    }

    .panel {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: solid 1px #f3f3f3;
        background-color: #fff;
        padding: 0 10px;
    }

    .ipt {
        height: 39px;
    }
</style>

