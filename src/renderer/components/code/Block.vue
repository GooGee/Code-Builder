<template>
    <LineList :block="block" :manager="block.LineManager"></LineList>
</template>

<script>
    import LineList from './LineList'

    export default {
        name: 'Block',
        components: { LineList },
        props: ['block'],
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style>
    .block {
        padding-left: 44px
    }

</style>
