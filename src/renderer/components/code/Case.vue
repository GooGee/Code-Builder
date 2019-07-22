<template>
    <div @click.stop="editing=true" class="col-xs-11">
        <span @click="$emit('choose', clause)" class="button"> . </span>
        <span class="syntax">Case</span>
        <Box :box="clause.box" :editing="editing"></Box>
        <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>

        <LineList :block="block" :manager="clause.LineManager"></LineList>
    </div>
</template>

<script>
    import Box from './Box'

    export default {
        name: 'Case',
        beforeCreate() {
            this.$options.components.LineList = require('./LineList').default
        },
        components: { Box },
        props: ['block', 'clause'],
        data() {
            return {
                editing: false
            }
        },
        methods: {
        }
    }
</script>
