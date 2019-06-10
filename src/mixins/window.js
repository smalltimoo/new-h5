import Vue from 'vue'
import types from '../store/mutation-types'

export default {
    methods: {
        // 参数必须 当传入了callback的时候，需要调用 this.$emit("callback"); 来出发 callback 执行
        // 例content:() => import("@/components/lottery/zhuihao")
        // 注意：width 不需要带 px/% 单位，小于 100 自动使用百分比
        mWinOpen(title, content, params, width, callback, onclose) {
            this.$store.commit(types.OPEN_WIN_MODEL, {
                visible: true,
                title: title,
                view: content,
                width: !!width?width:300,
                paramData: params,
                callback: (backparams) => {
                    if (typeof callback == 'function') {
                        callback(backparams);
                    }
                },
                onclose: () => {
                    if (typeof onclose == 'function') {
                        onclose();
                    }
                    this.mWinClose();
                },
            });
        },
        mWinClose() {
            this.$store.commit(types.OPEN_WIN_MODEL, {
                visible: false,
                title: "提示",
                view: "",
                width: 280,
                paramData: {},
                callback: undefined,
                onclose: undefined
            });
        },
    }
}
