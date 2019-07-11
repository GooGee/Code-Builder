<template>
    <div>
        <Constructor v-if="member.isConstructor" :member="member" @remove="$emit('remove', member)"></Constructor>

        <Method v-if="member.isMethod" :member="member" @remove="$emit('remove', member)"></Method>

        <template v-if="member.isProperty">
            <div v-if="editing">
                <span @click="$emit('remove', member)" class="button"> - </span>
                <Variable :variable="member" :editing="true" isProperty="true"></Variable>
                <span @click="editing=false" class="btn btn-success ok">OK</span>
            </div>

            <div v-else @click="editing=true">
                <span class="syntax">Property</span>
                <Variable :variable="member" :editing="false"></Variable>
            </div>
        </template>
    </div>
</template>

<script>
    import Constructor from './Constructor'
    import Lambda from './Lambda'
    import Method from './Method'
    import Variable from './Variable'

    export default {
        name: 'Member',
        components: { Constructor, Lambda, Method, Variable },
        props: ['member'],
        data() {
            return {
                editing: false
            }
        },
        computed: {
        },
        methods: {
        }
    }
</script>
