<template>
    <div class="main-body">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{$t('member.messageList.ml1')}}
            </div>
            <div class="header-right"></div>
        </div>
        <div  class="no-list" v-if="!dataList||dataList.length==0"></div>
        <div class="message">
            <div v-for="item in dataList" :key="item.id" class="msg-panel">
                <span v-text="item.createTimeStr" style="font-size: 12px"></span>
                <div class="msg-content">
                    <span class="title">《{{item.msgTitle}}》</span>
                    <div  class="info" v-text="item.msgInfo"></div>
                    <!--// -->
                    <div class="open" onclick="$(this).prev().toggleClass('ht');$(this).toggle();$(this).next().toggle()">
                        <span>{{$t('member.messageList.ml2')}}</span>
                        <Icon type="ios-arrow-down" />
                    </div>
                    <div class="open" style="display: none" onclick="$(this).prev().prev().toggleClass('ht');$(this).toggle();$(this).prev().toggle()">
                        <span>{{$t('member.messageList.ml3')}}</span>
                        <Icon type="ios-arrow-up" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataList: {}
            };
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

<style scoped>
    .message{
        width: 100%;
        margin-top: 50px;
    }
    .msg-panel{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex-direction: column;
        margin-top: 20px;
    }

    .msg-content{
        width: 95%;
        height: auto;
        margin-top: 5px;
        padding: 8px;
        background-color: #ffffff;
        box-shadow: 0px 1px 5px 0px rgba(201, 201, 201, 0.8);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        font-size: 12px;
        border-radius: 4px;
    }

    .title{
        font-weight: bold;
        color: #000;
        font-size: 14px;
        padding-bottom: 8px;
    }

    .info{
        height: 22px;
        line-height: 20px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
    }

    .open{
        color: #007bc9;
        text-align: right;
        width: 100%;
        font-size: 12px;
        padding-top: 5px;
    }

    .ht{
        height: auto;
        white-space: inherit;
        text-align: left;
    }

</style>
