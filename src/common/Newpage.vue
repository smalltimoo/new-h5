<template>
    <div class="bg_newpage">
        <header-component :logo="logo" :showIcon="true" :showLogo="true"></header-component>
        <img :src="getbg()" />
            <p>{{des}}</p>
            <button>{{btn}}</button>
    </div>
</template>
<script>

import headerComponent from "@/common/Header.vue"
export default {
    name:'newPage',
    components:{
        headerComponent
    },
    data(){
        return {
            logo:'',
            pageType:'',
            bgdef:'',
            des:'',
            btn:''
        }
    },
    created (){
        let params = this.$router.params
        if(params&& params.type){
             switch(params.type){
                 default:
                     break;
             }
        }else{
            this.bgdef = '404'
            this.des = '找不到资源'
            this.btn = '检查网络'
        }
    },
    methods:{
        getbg(){
            return require(`../assets/images/default/${this.bgdef}@2x.png`)
        }
    }
}
</script>
<style lang="less">
    .bg_newpage{
        width: 100%;
        height: 100%
    }
</style>

