<template>
    <div>
        <span @click="$emit('remove', parameter)" class="button"> - </span>
        <Variable :variable="parameter" :editing="true"></Variable>
    </div>
</template>

<script>
    import Variable from './Variable'

    export default {
        name: 'Parameter',
        components: { Variable },
        props: ['parameter'],
        data() {
            return {
            }
        }
    }
</script>
