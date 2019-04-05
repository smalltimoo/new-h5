
export default {
    methods: {
        mAlert(content, okClose, type, title, width, duration) {
            let config = {
                title: !!title ? title : this.$t('alert.tip'),
                content: content,
                width: !!width?width:400,
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
                title: this.$t('alert.confirm'),
                content: content,
                okText:  this.$t('alert.okText'),
                cancelText: this.$t('alert.cancelText'),
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
