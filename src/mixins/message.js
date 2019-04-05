
export default {
    methods: {
        mMessage(content, okClose, type, duration) {
            let config = {
                content: content,
                duration:!!duration ? duration : 3,
                closable:true,
                onClose: () => {
                    if (typeof okClose == 'function') {
                        okClose();
                    }
                }
            };
            switch (type) {
                case 'success':
                    this.$Message.success(config);
                    break;
                case 'warning':
                    this.$Message.warning(config);
                    break;
                case 'error':
                    this.$Message.error(config);
                    break;
                default:
                    this.$Message.info(config);
                    break;
            }
        },
    }
}