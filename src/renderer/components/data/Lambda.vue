<template>
    <div>
        <div v-if="editing">
            <span @click="$emit('remove')" class="button"> - </span>
            <Variable :variable="member" :editing="true"></Variable>

            <ParameterList :manager="member.lambda.ParameterManager"></ParameterList>

            <span @click="editing=false" class="btn btn-success ok">OK</span>
        </div>

        <template v-else>
            <span @click="visible=!visible" class="button"> * </span>

            <span @click="editing=true">
                <Variable :variable="member" :editing="false">
                    <span slot="parameter">( {{member.lambda.ParameterManager.text}} )</span>
                </Variable>
            </span>
        </template>

        <Block v-if="visible" :block="member.lambda.body"></Block>
    </div>
</template>

<script>
    import Block from '../code/Block'
    import ParameterList from './ParameterList'
    import Variable from './Variable'

    export default {
        name: 'Lambda',
        components: { Block, ParameterList, Variable },
        props: ['member'],
        data() {
            return {
                editing: false,
                visible: false
            }
        },
        computed: {
        },
        methods: {
        }
    }
</script>
