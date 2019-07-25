<template>
    <div @click.stop="edit">
        <span v-if="statement.isSimple" class="syntax">{{statement.label}}</span>

        <template v-if="statement.isAssign">
            <span class="syntax">Set</span>
            <Box :box="statement.box" :editing="editing"></Box>
            <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>
        </template>

        <template v-if="statement.isCall">
            <span class="syntax">Call</span>
            <Box :box="statement.box" :editing="editing"></Box>
            <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>
        </template>

        <template v-if="statement.isDefine">
            <span class="syntax">Let</span>
            <Variable :variable="statement.vdl.variable" :editing="editing"></Variable>
            <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>
        </template>

        <Each v-if="statement.isEach" :statement="statement" :editing="editing" @ok="editing=false"></Each>

        <From v-if="statement.isFrom" :statement="statement" :editing="editing" @ok="editing=false"></From>

        <If v-if="statement.isIf" :statement="statement" :editing="editing" @ok="editing=false"></If>

        <template v-if="statement.isReturn">
            <span class="syntax">Return</span>
            <template v-if="statement.box">
                <span v-if="editing" @click="removeBox" class="btn btn-default"> - </span>
                <Box :box="statement.box" :editing="editing"></Box>
            </template>
            <template v-else>
                <span v-if="editing" @click="addBox" class="btn btn-default"> + </span>
            </template>
            <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>
        </template>

        <template v-if="statement.isSwitch">
            <span class="syntax">Select</span>
            <Box :box="statement.box" :editing="editing"></Box>
            <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>

            <CaseBlock :block="statement.block"></CaseBlock>
        </template>

        <Try v-if="statement.isTry" :statement="statement" :editing="editing" @ok="editing=false"></Try>

        <template v-if="statement.isWhile">
            <span class="syntax">Repeat If</span>
            <Box :box="statement.box" :editing="editing"></Box>
            <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>

            <Block :block="statement.block"></Block>
        </template>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { sure } from '@/model/ui/Dialogue'
    import Box from './Box'
    import CaseBlock from './CaseBlock'
    import Each from './Each'
    import From from './From'
    import If from './If'
    import Try from './Try'
    import Variable from '../data/Variable'

    export default {
        name: 'Statement',
        beforeCreate() {
            this.$options.components.Block = require('./Block').default
        },
        components: { Box, CaseBlock, Each, From, If, Try, Variable },
        props: ['statement', 'block'],
        data() {
            return {
                editing: false
            }
        },
        methods: {
            edit() {
                builder.statement = this.statement
                this.editing = true
            },
            addBox() {
                this.statement.addBox()
                builder.module.save()
            },
            removeBox() {
                sure('Empty return!\nAre you sure?').then(result => {
                    if (result.value) {
                        this.statement.empty()
                        builder.module.save()
                    }
                })
            }
        }
    }
</script>
