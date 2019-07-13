<template>
    <span>
        <span class="syntax">(</span>
        <div v-if="manager.list" v-for="box in manager.list" class="argument">
            <Box :box="box" :editing="editing"></Box>
        </div>
        <span class="syntax">)</span>
    </span>
</template>

<script>
    export default {
        name: 'Argument',
        beforeCreate() {
            this.$options.components.Box = require('./Box').default
        },
        props: ['manager', 'expression', 'editing'],
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style>
    .argument {
        padding-left: 44px
    }

</style>
