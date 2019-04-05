const listMixin = {
  methods: {
    mSearch(pageIndex) {
      this.mLoading(true)
      if (!!pageIndex) {
        this.searchVM.page = pageIndex
      }
      if (!this.searchVM.page) {
        this.searchVM.page = 1
      }
      this.searchVM.start = (this.searchVM.page - 1) * this.searchVM.rows;
      this.searchVM.limit = this.searchVM.rows;
      this.mPullData()
    },
    mHandleSizeChange(val) {
      if (!val)
        return;
      this.searchVM.rows = val;
      this.mSearch(1);
    },
    mHandleCurrentChange(val) {
      this.mSearch(val);
    }
  }
}

export default listMixin;
