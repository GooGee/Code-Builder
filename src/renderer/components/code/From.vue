<template>
    <div>
        <span class="syntax">From</span>
        <Box :box="statement.start" :editing="editing"></Box>

        <div>
            <span class="syntax">To</span>
            <Box :box="statement.end" :editing="editing"></Box>
            <label v-if="editing" class="code"><input v-model="statement.less" type="checkbox"> - 1 </label>
            <span v-else>
                <span v-if="statement.less"> - 1 </span>
            </span>
        </div>

        <div>
            <span class="syntax">Step</span>
            <Box :box="statement.step" :editing="editing"></Box>
        </div>

        <div>
            <span class="syntax">Index</span>
            <Variable :variable="statement.index" :editing="editing"></Variable>
        </div>

        <span v-if="editing" @click.stop="$emit('ok')" class="btn btn-success ok">OK</span>

        <Block :block="statement.block"></Block>
    </div>
</template>

<script>
    import Box from './Box'
    import Variable from '../data/Variable'

    export default {
        name: 'From',
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
