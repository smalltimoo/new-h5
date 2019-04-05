
export default {
    methods: {
        mNotice(content, okClose, type, title, duration) {
            let config = {
                title: !!title ? title : "通知消息",
                desc: content,
                duration:!!duration ? duration : 3,
                onClose: () => {
                    if (typeof okClose == 'function') {
                        okClose();
                    }
                }
            };
            switch (type) {
                case 'success':
                    this.$Notice.success(config);
                    break;
                case 'warning':
                    this.$Notice.warning(config);
                    break;
                case 'error':
                    this.$Notice.error(config);
                    break;
                default:
                    this.$Notice.info(config);
                    break;
            }
        },
    }
}