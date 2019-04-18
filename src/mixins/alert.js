
export default {
    methods: {
        mAlert(content, okClose, type, title, width, duration) {
            let config = {
                title: !!title ? title : localStorage.getItem('lang')=='zh' ? '提示消息' : 'Tips',
                content: content,
                width: !!width?width:250,
                closable: false,
                scrollable: false,
                onOk: () => {
                    if (typeof okClose == 'function') {
                        okClose();
                    }
                }
            };
            switch (type) {
                case 'success':
                    this.$Modal.success(config);
                    break;
                case 'warning':
                    this.$Modal.warning(config);
                    break;
                case 'error':
                    this.$Modal.error(config);
                    break;
                default:
                    this.$Modal.info(config);
                    break;
            }
            duration = !!duration ? duration * 1000 : 0;
            if (duration > 0) {
                setTimeout(() => {
                    if (typeof okClose == 'function') {
                        okClose();
                    }
                    this.$Modal.remove();
                }, duration);
            }
        },
        mConfirm(content,okClose,cancel){
            this.$Modal.confirm({
                title: localStorage.getItem('lang')=='zh' ? '请确认' : 'Confirm',
                content: content,
                width: 250,
                okText:  localStorage.getItem('lang')=='zh' ? '确定' : 'OK',
                cancelText: localStorage.getItem('lang')=='zh' ? '取消' : 'Cancel',
                onOk: () => {
                    if (typeof okClose == 'function') {
                        okClose();
                    }
                },
                onCancel: () => {
                    if (typeof cancel == 'function') {
                        cancel();
                    }
                }
            });
        },
    }
}
