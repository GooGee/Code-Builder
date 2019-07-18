<template>
    <span>
        <span v-if="editing" @click="$emit('remove', parameter)" class="button"> - </span>
        <Variable :variable="parameter" :editing="editing"></Variable>
    </span>
</template>

<script>
    import Variable from './Variable'

    export default {
        name: 'Parameter',
        components: { Variable },
        props: ['parameter', 'editing'],
        data() {
            return {
            }
        }
    }
</script>
