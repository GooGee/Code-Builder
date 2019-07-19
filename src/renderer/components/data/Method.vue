<template>
    <div>
        <div v-if="editing">
            <span @click="$emit('remove')" class="button"> - </span>

            <Variable :variable="member" :editing="true" inClass="true"></Variable>

            <ParameterList :manager="member.ParameterManager" :editing="editing"></ParameterList>

            <span @click="editing=false" class="btn btn-success ok">OK</span>
        </div>

        <template v-else>
            <span @click="editing=true">
                <span class="syntax">Method</span>
                <Variable :variable="member" :editing="false">
                    <span slot="parameter">( {{member.ParameterManager.text}} )</span>
                </Variable>
            </span>

            <span v-if="member.hasBlock" @click="visible=!visible" class="button"> * </span>
        </template>

        <Block v-if="visible && member.hasBlock" :block="member.block"></Block>
        <hr v-if="visible && member.hasBlock">
    </div>
</template>

<script>
    import Block from '../code/Block'
    import ParameterList from './ParameterList'
    import Variable from './Variable'

    export default {
        name: 'Method',
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
