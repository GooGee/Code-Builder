<template>
    <div>
        <span class="syntax">Each</span>
        <Variable :variable="statement.item" noValue="true" :editing="editing"></Variable>

        <div>
            <span class="syntax">In</span>
            <Box :box="statement.list" :editing="editing"></Box>
        </div>

        <slot name="ok"></slot>

        <Block :block="statement.block"></Block>
    </div>
</template>

<script>
    import Box from './Box'
    import Variable from '../data/Variable'

    export default {
        name: 'Each',
        beforeCreate() {
            this.$options.components.Block = require('./Block').default
        },
        components: { Box, Variable },
        props: ['statement', 'editing'],
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>
