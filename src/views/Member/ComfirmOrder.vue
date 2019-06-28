<template>
    <Drawer :closable="false" v-model="underlineDrawer" width="100" class="underline-drawer">
      <div class="header">
        <div class="header-left">
          <Icon type="ios-arrow-back" class="icon-menu" @click="underlineDrawer=false"/>
        </div>
        <div class="header-middle" style="font-size: 14px; font-weight: bold">
          {{selectData.drawAccountTypeStr ? selectData.drawAccountTypeStr :
          this.$t('member.onlineDeposit.od11')}}
        </div>
        <div class="header-right"></div>
      </div>
      <div class="drawer-top">
        <span>{{$t('member.onlineDeposit.od44')}}</span>
        <span style="font-size: 20px;margin-top: 8px">
          <span style="font-size:18px">{{$t('symbol.t1')}}</span>
          <span>
            <span v-text="amount"></span>
            <span style="color: rgb(247, 246, 28)" v-if="minAmount">.{{minAmount}}</span>
          </span>
        </span>
      </div>
      <div class="code-pay" v-if="selectData.accountType==1 || selectData.accountType==2">
        <div class="title">{{$t('member.onlineDeposit.od45')}}</div>
        <div>
          <div>
            <img :src="selectData.payAddress" width="125px">
          </div>
          <div style="margin-top: 10px">{{$t('member.onlineDeposit.od46')}}</div>
          <div v-if="selectData.accountType==1">{{$t('member.onlineDeposit.od47')}}</div>
          <div v-if="selectData.accountType==2">{{$t('member.onlineDeposit.od48')}}</div>
          <div style="color: #2d8cf0">{{$t('member.onlineDeposit.od49')}}</div>
        </div>
      </div>
      <div class="panel" v-else>
        <div class="title">{{$t('member.onlineDeposit.od50')}}</div>
        <div>
          <span>{{$t('member.onlineDeposit.od51')}}：{{selectData.drawAccountTypeStr}}</span>
          <span
            class="clipboard"
            @click="copy"
            :data-clipboard-text="selectData.drawAccountTypeStr"
          >复制</span>
        </div>
        <div>
          <span>{{$t('member.onlineDeposit.od52')}}：{{selectData.account}}</span>
          <span class="clipboard" @click="copy" :data-clipboard-text="selectData.account">复制</span>
        </div>
        <div>
          <span>{{$t('member.onlineDeposit.od53')}}：{{selectData.bankAddress}}</span>
          <span class="clipboard" @click="copy" :data-clipboard-text="selectData.bankAddress">复制</span>
        </div>
        <div>
          <span>{{$t('member.onlineDeposit.od54')}}：{{selectData.bankAccountName}}</span>
          <span class="clipboard" @click="copy" :data-clipboard-text="selectData.bankAccountName">复制</span>
        </div>
      </div>
      <div class="panel" style="margin-top: 10px">
        <div class="title">{{$t('member.onlineDeposit.od55')}}</div>
        <div class="deposit" style="justify-content: flex-start;padding: 0 10px">
          <span
            style="margin-left: 10px;white-space: nowrap;min-width: 80px"
          >{{$t('member.onlineDeposit.od57')}}</span>
          <input
            type="text"
            v-if="selectData.accountType==1 || selectData.accountType==2"
            v-model="payName"
            :placeholder="$t('member.onlineDeposit.od58')"
            readonly
          >
          <input
            type="text"
            v-model="underlineText"
            :placeholder="$t('member.onlineDeposit.od58')"
            readonly
            v-else
            @click="showPicker"
          >
          <Icon type="ios-arrow-forward" class="icon-menu"/>
        </div>
        <div class="deposit" style="justify-content: flex-start;padding: 0 10px">
          <span
            style="margin-left: 10px;white-space: nowrap;min-width: 80px"
          >{{$t('member.onlineDeposit.od59')}}</span>
          <input
            type="text"
            v-if="selectData.accountType==1 || selectData.accountType==2"
            v-model="payBank"
            :placeholder="$t('member.onlineDeposit.od59')"
            readonly
          >
          <input
            type="text"
            v-model="underlineBank"
            :placeholder="$t('member.onlineDeposit.od59')"
            readonly
            v-else
            @click="showBankPicker"
          >
          <Icon type="ios-arrow-forward" class="icon-menu"/>
        </div>
        <div class="deposit" style="justify-content: flex-start;padding: 0 10px;border: 0">
          <span
            style="margin-left: 10px;white-space: nowrap;min-width: 80px"
          >{{$t('member.onlineDeposit.od60')}}</span>
          <input
            type="text"
            :placeholder="$t('member.onlineDeposit.od61')"
            v-model="vmunderline.underlineAccountName"
          >
        </div>
      </div>
      <div class="panel" style="margin-top: 10px">
        <div class="title">{{$t('member.onlineDeposit.od62')}}</div>
        <div class="detail">
          <span>{{$t('member.onlineDeposit.od63')}}</span>
          <span>{{ now}}</span>
        </div>
        <div class="detail" style="border: 0">
          <span>{{$t('member.onlineDeposit.od64')}}</span>
          <span>{{selectData.bankAccountName}} : {{selectData.account}}</span>
        </div>
      </div>
      <cube-button
        :active="true"
        @click="saveUnderline"
        class="save-btn"
        :disabled="isdisable"
      >{{$t('member.onlineDeposit.od65')}}</cube-button>
    </Drawer>
</template>

<script>
export default {
    name:'confirmOrder',
    data(){
        return {
            
        }
    },
    
}
</script>

