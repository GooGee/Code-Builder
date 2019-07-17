<template>
    <div>
        <span class="syntax">Each</span>
        <Variable :variable="statement.item" :editing="editing"></Variable>

        <div>
            <span class="syntax">In</span>
            <Box :box="statement.list" :editing="editing"></Box>
        </div>

        <span v-if="editing" @click.stop="$emit('ok')" class="btn btn-success ok">OK</span>

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
