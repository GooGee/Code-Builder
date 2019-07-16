<template>
    <span>
        <div v-if="editing">
            (
            <ParameterList :manager="box.ParameterManager" noAdd="true"></ParameterList>
            )
            <span> => </span>
            <Box :box="box.body" :editing="editing"></Box>
        </div>

        <template v-else>
            (
            <span>{{member.ParameterManager.text}}</span>
            )
            <span> => </span>
            <Box :box="box.body" :editing="editing"></Box>
        </template>
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
