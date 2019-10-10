<template>
    <div>
        hello,world
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {}
    },
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
        go(val) {
            if (val == 1) {
                this.$router.push({ path: '/detail' })
            } else if (val == 2) {
                this.$router.push({ path: '/nutui' })
            }
        }
    }
}   
</script>
