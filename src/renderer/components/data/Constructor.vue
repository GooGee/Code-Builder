<template>
    <div>
        <div v-if="editing">
            <span @click="$emit('remove')" class="button"> - </span>
            <span class="syntax">Constructor</span>

            <ParameterList :manager="member.ParameterManager" :editing="editing"></ParameterList>

            <span @click="editing=false" class="btn btn-success ok">OK</span>
        </div>

        <template v-else>
            <span @click="editing=true">
                <span class="syntax">Constructor</span>
                <span>( {{member.ParameterManager.text}} )</span>
            </span>

            <span @click="visible=!visible" :class="{active: visible}" class="button"> * </span>
        </template>

        <Block v-if="visible" :block="member.block"></Block>
    </div>
</template>

<script>
    import Block from '../code/Block'
    import ParameterList from './ParameterList'

    export default {
        name: 'Constructor',
        components: { Block, ParameterList },
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
