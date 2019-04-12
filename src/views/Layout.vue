<template>
    <div class="page-body">
        <router-view></router-view>
        <page-footer></page-footer>
    </div>
</template>
<script>
    import types from "@/store/mutation-types";
    import PageFooter from "@/components/PageFooter";

    export default {
        name: "Layout",
        components: {
            PageFooter
        },
        data: () => ({}),
        created() {
            this.$store.dispatch(types.COMMON_GONGGAO, this);
        }
    };
</script>
