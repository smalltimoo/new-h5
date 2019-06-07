<template>
    <div class="bg_newpage">
        <img :src="`../assets/images/default/${bgdef}.png`" />>
            <p>{{des}}</p>
            <button>{{btn}}</button>
    </div>
</template>
<script>
export default {
    name:'newPage',
    data(){
        return {
            bgdef:'',
            des:'',
            btn:''
        }
    },
    created (){console.info(this.$router)
        if(this.$router.path == '404'){
            this.bgdef = ''
            this.des = '找不到资源'
            this.btn = '检查网络'
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

