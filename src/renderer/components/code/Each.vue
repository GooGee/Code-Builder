<template>
    <div>
        <span class="syntax">Each</span>
        <Variable :variable="statement.item" :editing="editing"></Variable>

        <div>
            <span class="syntax">In</span>
            <Chain :chain="statement.chain" :editing="editing"></Chain>
        </div>

        <span v-if="editing" @click.stop="$emit('ok')" class="btn btn-success ok">OK</span>

        <Block :block="statement.block"></Block>
    </div>
</template>

<script>
    import Chain from './Chain'
    import Variable from '../data/Variable'

    export default {
        name: 'Each',
        beforeCreate() {
            this.$options.components.Block = require('./Block').default
        },
        components: { Chain, Variable },
        props: ['statement', 'editing'],
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>
