<template>
    <div class="main-body">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{ $t('member.userCapitalPassword.ucp1') }}
            </div>
            <div class="header-right"></div>
        </div>
        <div class="userCapitalPwd G_Form publicpage_view">
            <div class="row Carpittitle" style="margin-top: 10px">{{ $t('member.userCapitalPassword.ucp2') }}</div>
            <!-- 为了您账户安全，真实姓名需要与绑定银行卡姓名一致-->
            <form class="el-form el-form--label-right">
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 90px;">
                        {{ $t('member.userCapitalPassword.ucp3')}}</label><!--真实姓名 -->
                    <div class="el-form-item__content" style="margin-left: 90px;">
                        <div class="el-input">
                            <input v-model="vm.drawAccountName"
                                   ref="drawAccountName"
                                   :placeholder="$t('member.userCapitalPassword.ucp4')"
                                   maxlength="10"
                                   minlength="2"
                                   type="text"
                                   class="el-input__inner"
                            ><!--请输入持卡人名字 -->
                        </div>
                    </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 90px;">{{
                        $t('member.userCapitalPassword.ucp5')}}</label><!--银行卡号 -->
                    <div class="el-form-item__content" style="margin-left: 90px;">
                        <div class="el-input">
                            <input
                                    v-model="vm.account"
                                    ref="account"
                                    :placeholder="$t('member.userCapitalPassword.ucp6')"
                                    maxlength="20"
                                    minlength="14"
                                    type="number"
                                    class="el-input__inner"
                            ><!--请输入银行卡号 -->
                        </div>
                    </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item" v-if="sysInfo.lineCountry==1">
                    <label class="el-form-item__label" style="width: 90px;">
                        {{ $t('member.userCapitalPassword.ucp7')}}
                    </label><!--省市县(区) -->
                    <div class="el-form-item__content" style="margin-left: 90px;">
                        <div class="el-input">
                            <input
                                    @tap="mShowpcaPicker"
                                    :placeholder="$t('member.userCapitalPassword.ucp8')"
                                    readonly
                                    :value="cPcaText"
                                    type="text"
                                    class="el-input__inner"
                            ><!--请选择省份 -->
                        </div>
                    </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 90px;">
                        {{ $t('member.userCapitalPassword.ucp9')}}
                    </label><!--银行种类 -->
                    <div class="el-form-item__content" style="margin-left: 90px;">
                        <div class="el-input">
                            <input
                                    @tap="mShowBankPicker"
                                    :placeholder="$t('member.userCapitalPassword.ucp10')"
                                    readonly
                                    :value="cBankText"
                                    type="text"
                                    class="el-input__inner"
                            ><!--请选择银行 -->
                        </div>
                    </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item"  v-if="sysInfo.lineCountry==1">
                    <label class="el-form-item__label" style="width: 90px;">
                        {{ $t('member.userCapitalPassword.ucp11')}}
                    </label><!-- 开户行名称-->
                    <div class="el-form-item__content" style="margin-left: 90px;">
                        <div class="el-input">
                            <input
                                    onchange="listen"
                                    v-model="vm.drawAddress"
                                    ref="drawAddress"
                                    :placeholder="$t('member.userCapitalPassword.ucp12')"
                                    maxlength="50"
                                    minlength="0"
                                    type="text"
                                    class="el-input__inner"
                            ><!--请输入开户支行名称 -->
                        </div>
                    </div>
                </div>
                <div class="line-w"></div>
                <div class="el-form-item">
                    <label class="el-form-item__label" style="width: 90px;">
                        {{ $t('member.userCapitalPassword.ucp13')}}
                    </label><!--手机号 -->
                    <div class="el-form-item__content" style="margin-left: 90px;">
                        <div class="el-input">
                            <input
                                    v-model="vm.mobile"
                                    maxlength="11"
                                    ref="mobile"
                                    :placeholder="$t('member.userCapitalPassword.ucp14')"
                                    class="el-input__inner"
                                    type="number"
                            ><!--手机号码 -->
                        </div>
                    </div>
                </div>
            </form>
            <p class="A-text" style="">  <!--请绑定持卡人本人的银行卡并确认卡号,避免后期提款无法到账 -->
                <Icon type="md-information-circle" style="font-size: 20px"/>&nbsp;
                <span>{{$t('member.userCapitalPassword.ucp15')}}</span>
            </p>
            <cube-button :active="true" @click="mSave" class="save-btn">
                {{ $t('member.userCapitalPassword.ucp16') }} <!--立即设置 -->
            </cube-button>
        </div>
    </div>
</template>

<script>
    import {isPoneNumber} from "../../assets/lib/util";

    require('../../style/mui/index.less')
    var vue;
    export default {
        data() {
            return {
                banktypes: [],
                provinces: [],
                vmVild: {
                    requiredRule: [
                        v => (v != undefined && v != null && v != "") || "必填项！"
                    ]
                },
                vm: {
                    drawAccountType: "",
                    drawAddress: "",
                    account: "",
                    drawAccountName: "",
                    mobile: "",
                    remark: "",
                    bankProvinceid: 0,
                    bankCityid: 0,
                    bankAreaid: 0
                },
                sltProvince: {},
                sltCity: {},
                sltArea: {},
                pcaPicker: {},
                bankPicker: {},
                sltBank: {}
            };
        },
        computed: {
            cPcaText() {
                return (
                    (this.sltProvince.text ? this.sltProvince.text + "-" : "") +
                    (this.sltCity.text ? this.sltCity.text + "-" : "") +
                    (this.sltArea.text ? this.sltArea.text : "")
                );
            },
            cBankText() {
                return this.sltBank.text ? this.sltBank.text : "";
            }
        },
        mounted() {
        },
        methods: {
            mInit() {
                this.mLoading(true);
                this.$http
                    .all([this.mGetBanks(), this.mGetBindBank(), this.mGetProvinces()])
                    .then(
                        this.$http.spread((rbanks, rbindbank, provincesRes) => {
                            if (provincesRes.code === 0) {
                                let list = provincesRes.data.list ? provincesRes.data.list : [];
                                list.forEach(pro => {
                                    pro.value = pro.id;
                                    pro.text = pro.province;
                                    pro.citieVos &&
                                    pro.citieVos.forEach(city => {
                                        city.value = city.id;
                                        city.text = city.city;
                                        city.areas &&
                                        city.areas.forEach(area => {
                                            area.value = area.id;
                                            area.text = area.area;
                                        });
                                        city.children = city.areas;
                                    });
                                    pro.children = pro.citieVos;
                                });
                                this.provinces = list;
                                this.mInitProvincePicker();
                            }
                            if (rbanks.code == 0) {
                                let list = rbanks.data.list ? rbanks.data.list : [];
                                list.forEach(ele => {
                                    ele.value = ele.id;
                                    ele.text = ele.bankName;
                                });
                                this.banktypes = list;
                                this.mInitBankPicker();
                            } else {
                                this.mAlert(rbanks.message, () => {
                                }, "error");
                            }
                            if (rbindbank.code == 0) {
                                this.vm = Object.assign(this.vm, rbindbank.data);
                            }
                            this.mLoading(false);
                        })
                    );
            },
            mGetBanks() {
                let sysInfo = this.$store.getters.getSysInfo;
                return this.$http.post("/banktypes.json", {lineCountry: sysInfo.lineCountry ? sysInfo.lineCountry : this.$i18n.local == 'th' ? '2' : '1'});
            },
            mGetBindBank() {
                return this.$http.get("/memberUser/getbindbank.json");
            },
            mGetProvinces() {
                return this.$http.post("/provinces.json");
            },
            mSave() {
                if(this.sysInfo.lineCountry=='2'){
                    this.vm.drawAddress=0;
                }
                if (this.vm.drawAccountType <= 0) {
                    //请选择银行类型
                    this.mAlert(this.$t('member.userCapitalPassword.ucp18'), null, "warning");
                    return;
                }
                if (this.vm.bankProvinceid < 0) {
                    //请选择所在省份
                    this.mAlert(this.$t('member.userCapitalPassword.ucp19'), null, "warning");
                    return;
                }
                if (this.vm.bankCityid < 0) {
                    //请选择所在城市
                    this.mAlert(this.$t('member.userCapitalPassword.ucp20'), null, "warning");
                    return;
                }
                if (this.vm.bankAreaid < 0) {
                    //请选择所在区县
                    this.mAlert(this.$t('member.userCapitalPassword.ucp21'), null, "warning");
                    return;
                }
                if (this.vm.drawAddress.length<=0) {
                    //请填写开户行
                    this.mAlert(this.$t('member.userCapitalPassword.ucp22'), null, "warning");
                    return;
                }
                if (this.vm.account == "") {
                    //请填写银行账号
                    this.mAlert(this.$t('member.userCapitalPassword.ucp23'), null, "warning");
                    return;
                }
                if (this.vm.drawAccountName == "") {
                    //请填写开户人姓名
                    this.mAlert(this.$t('member.userCapitalPassword.ucp24'), null, "warning");
                    return;
                }
                if (this.vm.mobile == "") {
                    //请填写开户人手机号
                    this.mAlert(this.$t('member.userCapitalPassword.ucp25'), null, "warning");
                    return;
                }
                this.mLoading(true);
                this.$http.post("/memberUser/bindbank.json", this.vm).then(result => {
                    this.mLoading(false);
                    if (result.code == 0) {
                        this.mAlert(
                            //操作成功
                            this.$t('member.userCapitalPassword.ucp27'),
                            () => {
                                this.$router.push({name: "UserBankCard"});
                            },
                            "success"
                        );
                    } else {
                        this.mAlert(result.message, () => {
                        }, "error");
                    }
                });
            },
            mVildPhoneNumber(v) {
                return isPoneNumber(v);
            },
            mInitProvincePicker() {
                this.pcaPicker = new mui.PopPicker({layer: 3});
                this.pcaPicker.setData(this.provinces);
            },
            mInitBankPicker() {
                this.bankPicker = new mui.PopPicker();
                this.bankPicker.setData(this.banktypes);
            },
            mShowpcaPicker() {
                this.pcaPicker.show(function (selectItems) {
                    vue.sltProvince = selectItems[0];
                    vue.sltCity = selectItems[1];
                    vue.sltArea = selectItems[2];
                    vue.vm.bankProvinceid = vue.sltProvince.id;
                    vue.vm.bankCityid = vue.sltCity.id ? vue.sltCity.id : 0;
                    vue.vm.bankAreaid = vue.sltArea.id ? vue.sltCity.id : 0;
                });
            },
            mShowBankPicker() {
                this.bankPicker.show(function (sltItem) {
                    vue.sltBank = sltItem[0];
                    vue.vm.drawAccountType = sltItem[0].value;
                });
            }
        },
        created() {
            vue = this;
            this.vmVild = {
                requiredRule: [
                    v => (v != undefined && v != null && v != "") || this.$t('member.userCapitalPassword.ucp17')
                ]
            },
                this.mInit();
        }
    };
</script>

<style scoped>

    .userCapitalPwd {
        width: 100%;
        font-size: 0;
        margin-top: 44px;
    }

    .publicpage_view {
        position: absolute;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .userCapitalPwd .el-form {
        background: #fff;
    }

    .userCapitalPwd .Item span {
        position: absolute;
        right: 7px;
        top: 7px;
        font-size: 24px;
    }

    .userCapitalPwd .Carpittitle {
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        color: #b3b3b3;
        text-align: left;
        padding-left: 15px;
        overflow: hidden;
    }

    .userCapitalPwd .Text {
        margin-top: 16px;
        padding: 0 15px;
        line-height: 22px;
        text-align: left;
        font-size: 14px;
    }

    .userCapitalPwd .Item {
        text-align: left;
        padding-left: 15px;
        position: relative;
    }

    .ivu-select-single .ivu-select-selection {
        /*background-color: #545478;*/
        border: none;
    }

    .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
        font-size: 14px;
        margin-top: -5px;
        margin-right: 167px;
    }

    .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        font-size: 14px;
        margin-top: -5px;
        margin-right: 153px;
        color: #fff;
    }

    .userCapitalPwd .el-form-item {
        margin-bottom: 0;
        border-bottom: solid 1px #f3f3f3;
    }

    .userCapitalPwd .el-input__inner {
        margin-bottom: 0;
        border: 0;
    }

    .userCapitalPwd .A-text {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 10px;
        font-size: 13px;
        margin-top: 10px;
        text-align: left;
        line-height: 20px;
        color: #666;
    }
</style>
