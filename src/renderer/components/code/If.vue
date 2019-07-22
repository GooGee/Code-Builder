<template>
    <div>
        <span class="syntax">If</span>
        <Box :box="statement.box" :editing="editing"></Box>
        <Block v-if="!editing" :block="statement.block"></Block>

        <div v-if="editing">
            <label class="syntax"><input v-model="statement.hasElse" type="checkbox"> Else</label>
        </div>

        <template v-else>
            <template v-if="statement.hasElse">
                <div class="syntax">Else</div>
                <Block :block="statement.elseBlock"></Block>
            </template>
        </template>

        <span v-if="editing" @click.stop="$emit('ok')" class="btn btn-success ok">OK</span>
    </div>
</template>

<script>
    import Box from './Box'

    export default {
        name: 'If',
        beforeCreate() {
            this.$options.components.Block = require('./Block').default
        },
        components: { Box },
        props: ['statement', 'editing'],
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>
