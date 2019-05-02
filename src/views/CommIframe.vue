<template>
  <div v-resize="mOnResize">
    <div class="header">
      <div class="header-left">
        <Icon type="ios-arrow-back" class="icon-menu" @click="goBack"/>
      </div>
      <div class="header-middle">
         {{title ? title : $i18n.locale=='zh' ? '在线客服' : 'Customer Service'}}
      </div>
      <div class="header-right">
      </div>
    </div>
    <div class="publicpage">
      <div class="userSettings publicpage_view">
        <div class="TopHeader" ref="TopHeader">
          <div id="return" style="position: absolute;">
            <Icon type="md-close" @click="mClose"/>
          </div>
        </div>
        <div :style="cGCStyles" class="game-container">
          <iframe :src="url" frameborder="0" style="width: 100%;height: 100%;padding: 45px" v-if="title"></iframe>
          <iframe :src="url" frameborder="0" style="width: 100%;height: 100%;" v-else></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBrowserType } from '../assets/lib/util'

export default {
  data() {
    return {
      url: '',
      title:'',
      width: 0,
      height: 0,
      comeSource: ''
    }
  },
  computed: {
    cGCStyles() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  },
  mounted() {
    this.comeSource = this.$route.name
    this.mInit()
    this.$nextTick(this.mGCStyles)
  },
  methods: {
    goBack(){
      this.$router.back();
    },
    mInit() {
      let params = this.$route.params
      this.url = params.cUrl;
      this.title = params.title ? params.title : '';
      if (params.aType === 'cs') {
        if (!this.url) {
            //客服休息中...
          this.mAlert(this.$t('commiframe.com1'), () => {
            this.mClose()
          })
        }
      } else if (params.aType === 'cz') {
        if (!this.url) {
            //存款渠道测试中，暂不可用
          this.mAlert(this.$t('commiframe.com2'), () => {
            this.mClose()
          })
        }
      } else {
          //服务配置不正确
        this.mAlert(this.$t('commiframe.com3'), () => {
          this.mClose()
        })
      }
    },
    mGCStyles() {
      let w = window.innerWidth
      let h = window.innerHeight
      h = h - this.$refs.TopHeader.clientHeight
      this.width = w
      this.height = h
    },
    mOnResize() {
      this.mGCStyles()
    },
    mClose() {
      this.$router.push({
        name: this.comeSource.name ? this.comeSource.name : 'Home',
        params: this.comeSource.params
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.comeSource = from
    })
  }
}
</script>

<style>
.userSettings {
  width: 100%;
  font-size: 0;
}
.userSettings .bg-purple-dark {
  background: #fff;
}
.userSettings .bg-purple-dark .texts,
.userSettings .bg-purple-dark a {
  display: block;
  padding: 18px 10px;
  text-align: left;
  font-size: 14px;
  color: #fff;
}
.publicpage_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.publicpage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  z-index: 10;
}
.game-container {
  border: 0;
  overflow-y: auto;
}
iframe img{
  width: 100%;
}
</style>
