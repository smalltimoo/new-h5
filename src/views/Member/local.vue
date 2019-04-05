<template>
    <div id="app">
        <div class="publicpage">
            <div class="userSettings publicpage_view">
                <div class="TopHeader">
                    <div id="return" style="position: absolute;">
                        <router-link :to="{name:'UserMember'}">
                            <Icon type="ios-arrow-back"/>
                        </router-link>
                    </div>
                    {{ $t('member.local.local1') }}
                </div><!-- 代理中心-->
                <div class="el-row" style="margin-top: 5px;">
                    <div class="grid-content bg-purple-dark" @click="changeLocal('zh')">
                        <span>简体中文</span>
                        <i class="icon el-icon-check" v-if="$i18n.locale=='zh'"></i>
                    </div>
                </div>
                <div class="el-row" style="margin-top: 5px;">
                    <div class="grid-content bg-purple-dark" @click="changeLocal('en')">
                        <span>English</span>
                        <i class="icon el-icon-check" v-if="$i18n.locale=='en'"></i>
                    </div>
                </div>
                <div class="el-row" style="margin-top: 5px;">
                    <div class="grid-content bg-purple-dark" @click="changeLocal('th')">
                        <span>ไทย</span>
                        <i class="icon el-icon-check" v-if="$i18n.locale=='th'"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "local",
        data() {
            return {

            };
        },
        mounted() {

        },
        methods:{
            changeLocal(local){
                this.$i18n.locale=local;
                localStorage.setItem("lang",this.$i18n.locale)
            }
        },
        created(){

        }
    }
</script>

<style scoped>
    .icon{
        font-size: 18px;
    }
    .bg-purple-dark{
        height:40px;
        padding:0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
    }
</style>
