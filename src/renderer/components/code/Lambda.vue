<template>
    <span>
        <ParameterList :manager="box.ParameterManager" :editing="editing"></ParameterList>
        <span> => </span>
        <Box :box="box.body" :editing="editing"></Box>
    </span>
</template>

<script>
    export default {
        name: 'Lambda',
        beforeCreate() {
            this.$options.components.Box = require('./Box').default
            this.$options.components.ParameterList = require('../data/ParameterList').default
        },
        props: ['box', 'editing'],
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>
