<template>
    <div>
        <div class="syntax">Try</div>
        <Block v-if="!editing" :block="statement.tryBlock"></Block>

        <span class="syntax">Catch</span>
        <Variable :variable="statement.clause.variable" :editing="false"></Variable>
        <Block v-if="!editing" :block="statement.clause.block"></Block>

        <div v-if="editing">
            <label class="syntax"><input v-model="statement.hasFinally" type="checkbox"> Finally</label>
        </div>

        <template v-else>
            <template v-if="statement.hasFinally">
                <div class="syntax">Finally</div>
                <Block :block="statement.finallyBlock"></Block>
            </template>
        </template>

        <span v-if="editing" @click.stop="$emit('ok')" class="btn btn-success ok">OK</span>
    </div>
</template>

<script>
    import Box from './Box'
    import Variable from '../data/Variable'

    export default {
        name: 'Try',
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
