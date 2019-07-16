<template>
    <div @click.stop="edit">
        <span v-if="statement.isSimple" class="syntax">{{statement.label}}</span>

        <template v-if="statement.isAssign">
            <Box :box="statement.box" :editing="editing"></Box>
            <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>
        </template>

        <template v-if="statement.isCall">
            <Box :box="statement.box" :editing="editing"></Box>
            <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>
        </template>

        <template v-if="statement.isDefine">
            <span class="syntax">let</span>
            <Variable :variable="statement.vdl.variable" :editing="editing"></Variable>
            <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>
        </template>

        <Each v-if="statement.isEach" :statement="statement" :editing="editing">
            <template slot="ok">
                <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>
            </template>
        </Each>

        <From v-if="statement.isFrom" :statement="statement" :editing="editing">
            <template slot="ok">
                <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>
            </template>
        </From>

        <If v-if="statement.isIf" :statement="statement" :editing="editing" @ok="editing=false"></If>

        <template v-if="statement.isReturn">
            <span class="syntax">return</span>
            <span v-if="editing" @click="emptyBox" class="btn btn-danger"> X </span>
            <Box v-if="statement.box" :box="statement.box" :editing="editing"></Box>
            <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>
        </template>

        <template v-if="statement.isSwitch">
            <span class="syntax">switch</span>
            <Box :box="statement.box" :editing="editing"></Box>
            <span v-if="editing" @click.stop="editing=false" class="btn btn-success ok">OK</span>

            <CaseBlock :block="statement.block"></CaseBlock>
        </template>

        <Try v-if="statement.isTry" :statement="statement" :editing="editing" @ok="editing=false"></Try>

        <template v-if="statement.isWhile">
            <span class="syntax">while</span>
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
            emptyBox() {
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
