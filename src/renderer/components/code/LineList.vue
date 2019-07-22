<template>
    <div @click.stop="stop" class="row">
        <div class="col-xs-11 block">
            <div v-for="line in manager.list" class="row">
                <div class="col-xs-11">
                    <span @click="show(line)" class="button"> . </span>
                    <Statement v-if="line.statement" :statement="line.statement" :block="block"></Statement>
                    <template v-else>
                        <span v-if="line.isDefine" @click="define(line)" class="btn btn-default syntax">Let</span>
                    </template>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-11">
                    <span @click="add" class="button"> + </span>
                </div>
            </div>
        </div>

        <TypeMenu v-if="tmData" :tmData="tmData"></TypeMenu>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { enter, look } from '@/model/ui/Dialogue'
    import { OwnerKind } from '@/model/data/TypeBox'
    import StatementMenu from '@/model/ui/StatementMenu'
    import Statement from './Statement'
    import TypeMenu, { TypeMenuData } from '../common/TypeMenu'

    export default {
        name: 'LineList',
        components: { Statement, TypeMenu },
        props: ['block', 'manager'],
        data() {
            return {
                line: null,
                tmData: null
            }
        },
        methods: {
            add() {
                this.manager.add(this.manager.make())
                this.manager.add(this.manager.make())
            },
            show(line) {
                let menu = new StatementMenu(line, this.manager, this.block, builder)
                menu.show()
            },
            define(line) {
                this.line = line
                if (!this.tmData) {
                    this.tmData = new TypeMenuData(builder, OwnerKind.Variable)
                }
                this.tmData.show(this.make.bind(this))
            },
            make(list) {
                if (list.length === 0) {
                    return
                }

                const last = list[list.length - 1]
                const name = last.toLowerCase()
                enter('Please enter the name', name).then(result => {
                    if (result.value) {
                        try {
                            this.line.makeVariableStatement(result.value, list)
                            builder.module.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            },
            stop() {
                // console.log('stop passing event to parent')
            }
        }
    }
</script>
