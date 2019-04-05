<template>
    <div class="publicpage">
    <!-- 侧滑导航根容器 -->
    <div class="mui-off-canvas-wrap mui-scalable">
      <!-- 主页面容器 -->
      <div class="mui-inner-wrap">
        <!-- 主页面标题 -->
        <header ref="TopHeader" class="mui-bar mui-bar-nav">
          <router-link :to="{name:'UserMember'}">
            <i class="mui-icon mui-icon-back mui-pull-left"></i>
          </router-link>
          <h1 class="mui-title">{{ $t('member.messageList.ml1') }}</h1><!-- 会员消息-->
        </header>
        <!-- 主页面内容容器 -->
        <div class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 主界面具体展示内容 -->
            <div style="height:36px;color:#d3d3d3;font-size:16px;" class="text-center"  v-if="(!dataList||dataList.length==0)">{{ $t('member.messageList.ml2') }}</div><!--暂无数据 -->
            <Scroll height="6 00" v-if="dataList&&dataList.length>0">
              <div class="rowbg el-row" v-for="(item,i) in dataList" :key="i">
                <div class="el-col el-col-24" style="padding-bottom: 1.1rem;">
                  <div class="el-col el-col-6">
                    <div class="grid-content bg-purple-dark">
                      <span class="Save">{{item.msgTypeStr}}</span>
                    </div>
                  </div>
                  <div class="el-col el-col-12">
                    <div class="grid-content bg-purple-dark" style="text-align: center;">
                      <span class="status">{{item.createTimeStr}}</span>
                    </div>
                  </div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{item.msgTitle}}</div>
                  <div class="status"></div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">{{item.isRead? $t('member.messageList.ml3'):$t('member.messageList.ml4')}}</div><!-- 已读     未读 -->
                  <div class="status"></div>
                </div>
                <div class="el-col el-col-8">
                  <div class="Types">
                      <router-link :to="{name:'MessageInfo', query:{id:item.id}}">
                        <Button type="primary" size="small">{{ $t('member.messageList.ml5') }}</Button><!--查看信息 -->
                      </router-link>
                      </div>
                  <div class="status"></div>
                </div>
              </div>
            </Scroll>
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
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/memberUser/getmessages.json", params).then(result => {
        if (result.code == 0) {
          //   this.initData.total = result.data.total;
          this.dataList = !!result.data.list ? result.data.list : [];
        }
      });
    }
    // mMessageInfo(rows) {
    //   this.$router.push({
    //     path: "./messageinfo",
    //     query: { id: rows.id }
    //   });
    // }
  }
};
</script>

<style>
.publicpage {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #33334e;
  z-index: 10;
}
.mui-bar .mui-title {
  text-align: center;
}
.TopHeader {
  background-color: #545478;
  border-bottom: 1px solid #3a3a3a;
  color: #fff;
}
.filter {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  z-index: 15;
  color: #fff;
  font-weight: 800;
  padding: 13px 10px;
}
.publicpage_view {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

h1 {
  line-height: 1.8rem;
  font-size: 16px;
  text-align: left;
}

.rowbg {
  background: #545478;
  padding: 1rem;
  border-bottom: 1px solid #3a3a3a;
  margin-bottom: 10px;
}

.Save {
  display: block;
  padding: 0.05rem;
  text-align: center;
  background: #ff695a;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
}

.status {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #fff;
}

.data {
  line-height: 22px;
  font-size: 14px;
  padding-left: 2.1rem;
  text-align: center;
  color: #fff;
}

.Types {
  line-height: 22px;
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: 700;
}
</style>
