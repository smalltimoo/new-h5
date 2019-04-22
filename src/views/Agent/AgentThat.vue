<template>
    <div class="main-body">
        <div class="header">
            <div class="header-left">
                <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
            </div>
            <div class="header-middle">
                {{ $t('agent.agentThat.agentThatText1')}}
            </div>
            <div class="header-right"></div>
        </div>
        <div class="publicpage">
            <div class="userSettings publicpage_view">
                <div class="line-w"></div>
                <div class="el-row">
                    <div class="el-col el-col-24">
                        <div class="grid-content bg-purple-dark">
                            <a>
                                <h2 style="text-align: center;font-size: 16px;">{{$t('agent.agentThat.agentThatText2')}}</h2><!-- 如何计算团队分红金额？-->
                                <p>{{ $t('agent.agentThat.agentThatText3')}}</p>
                                <!-- 1、团队分红金额 = 分红总额 - 优惠总额*扣除比例- 返水总额* 扣除比例-->
                                <p>{{ $t('agent.agentThat.agentThatText4')}}</p><!--2、分红总额=有效下注或输赢总额*分红比例 -->
                                <p>{{ $t('agent.agentThat.agentThatText5')}}</p><!-- 如：-->
                                <p>{{ $t('agent.agentThat.agentThatText6')}}</p>
                                <!-- (1)、代理获得分红比例=自身分红比例-下级分红比例，如自身分红比例5%，下级分红比例3%，你将能获得2%的分红比例-->
                                <p>{{ $t('agent.agentThat.agentThatText7')}}</p><!--(2)、优惠总额为：代理的所有下级参加活动赠送的金额 -->
                                <p>{{ $t('agent.agentThat.agentThatText8')}}</p><!--(3)、返水总额为：根据下级的下注流水，按一定比例返给代理的金额 -->
                                <div style="height:80px;border: 2px solid #eda6b9;border-radius: 23px;line-height: 40px;">
                                    <p style="margin-left:10px;">{{ $t('agent.agentThat.agentThatText9')}}</p>
                                    <!-- 团队分红金额=分红金额-优惠*扣除比例-返水*扣除比例：240=500-200*50%-100*60%-->
                                    <p style="margin-left:10px"></p>
                                </div>
                                <h2 style="text-align: center;font-size: 16px;">{{
                                    $t('agent.agentThat.agentThatText10')}}</h2><!-- 如何计算个人分红金额？-->
                                <p>{{ $t('agent.agentThat.agentThatText11')}}</p>
                                <!--1、个人分红金额=个人代理的团队分红金额-他所发展下级代理的分红金额 -->
                                <p>{{ $t('agent.agentThat.agentThatText12')}}</p><!-- 如：-->
                                <p>{{ $t('agent.agentThat.agentThatText13')}}</p><!--(1)、1级代理分红金额=团队分红金额-所有2级代理的分红金额 -->
                                <p>{{ $t('agent.agentThat.agentThatText14')}}</p>
                                <!--(2)、2级代理分红金额=该2级代理的团队分红金额-他所发展3级代理的分红金额 -->
                                <h2 style="text-align: center;font-size: 16px;">{{
                                    $t('agent.agentThat.agentThatText15')}}</h2><!--如何为下级开户？ -->
                                <p>{{ $t('agent.agentThat.agentThatText16')}}</p>
                                <!--1、点击下级开户，先为您的下级设置分红比例，设置成功后会生成注册链接，将注册链接发送给下级注册，注册后他就是您的下级，点击下级报表，就能查看他注册的账号 -->
                                <p>{{ $t('agent.agentThat.agentThatText17')}}</p>
                                <!--2、如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级，如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心； -->

                                <h2 style="color:red;">{{ $t('agent.agentThat.agentThatText18')}}</h2><!--温馨提示 -->
                                <p>{{ $t('agent.agentThat.agentThatText19')}}</p><!--建议开设的下级也是代理类型，无论发展了几级，您都能获得分红。 -->

                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .userSettings {
        width: 100%;
        font-size: 0;
    }

    .userSettings .bg-purple-dark .texts,
    .userSettings .bg-purple-dark a {
        display: block;
        padding: 10px;
        text-align: left;
        color: #4c4c4c;
        font-size: 13px;
    }

    .bg-purple-dark{
        background-color: #fff;
    }

    .bg-purple-dark h2{
        width: 100%;
        text-align: left!important;
        padding: 15px 0 10px 0;
        font-weight: bold;
    }
    .el-message .el-icon-error,
    .el-message .el-icon-success,
    .el-message .el-icon-warning {
        font-size: 14px;
    }

    .Bnner,
    .Bnner .swiper-container,
    .Bnner .swiper-container .swiper-wrapper,
    .Bnner .swiper-container .swiper-wrapper .swiper-slide {
        height: 3rem;
    }

    .Bnner .swiper-container .swiper-wrapper .swiper-slide img {
        height: 100%;
    }

    .Home-content {
        width: 100%;
    }

    img {
        display: inline-block;
    }

    .uploadApp .content {
        line-height: 30px;
        height: 30px;
        background: #fff;
        position: relative;
    }

    .uploadApp .dowload {
        padding-left: 10px;
    }

    .uploadApp .content:after {
        content: " ";
        position: absolute;
        left: 62px;
        bottom: -10px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 10px 0;
        border-color: #fff transparent transparent;
    }

    .App-box .in-center {
        width: 95%;
        margin: 0 auto;
        background: #fff;
        height: 160px;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #d1dbe5;
    }

    .App-box .title {
        width: 100%;
        padding: 8px;
        color: #fff;
        background: #33334e;
        border-radius: 5px;
        text-align: left;
    }

    .App-box .text {
        font-size: 12px;
        line-height: 18px;
        text-align: left;
    }

    .App-box .load {
        padding: 3px 7px;
        font-size: 14px;
        color: #fff;
        margin-right: 15px;
        border-radius: 3px;
        background: linear-gradient(90deg, #a01f0a, #e91e1e);
        -webkit-animation: gradientChange 2s infinite;
        animation: gradientChange 2s infinite;
    }

    @-webkit-keyframes gradientChange {
        to {
            background: linear-gradient(90deg, #e91e1e, #6f27b0);
        }
    }

    @keyframes gradientChange {
        to {
            background: linear-gradient(90deg, #e91e1e, #6f27b0);
        }
    }


    .publicpage_view {
        position: absolute;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .publicpage {
        width: 100%;
        height: 100%;
        overflow: auto;
        margin-top: 44px;
        background: #ffffff;
        z-index: 10;
    }
</style>
