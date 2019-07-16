<template>
    <span>
        <template v-if="editing">
            <span @click="$emit('change')" class="btn btn-default syntax">(</span>
            <div v-if="manager.list" v-for="box in manager.list" class="argument">
                <Box :box="box" :editing="editing"></Box>
            </div>
            <span class="syntax">)</span>
        </template>

        <span v-else>
            <span class="syntax">(</span>
            <span>{{manager.text}}</span>
            <span class="syntax">)</span>
        </span>
    </span>
</template>

<script>
    export default {
        name: 'Argument',
        beforeCreate() {
            this.$options.components.Box = require('./Box').default
        },
        props: ['expression', 'editing'],
        data() {
            return {
                manager: this.expression.ArgumentManager
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
