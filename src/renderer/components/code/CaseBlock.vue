<template>
    <div @click.stop="stop" class="row">
        <div class="col-xs-11 block">
            <div v-for="clause in block.ClauseManager.list" class="row">
                <Case :block="block" :clause="clause" @choose="choose"></Case>
            </div>
            <div class="row">
                <div class="col-xs-11">
                    <span class="syntax">default</span>
                    <LineList :block="block" :manager="block.defaultClause.LineManager"></LineList>
                    <br>
                    <span @click="add" class="button"> + Case</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { sure } from '@/model/ui/Dialogue'
    import Menu from '@/model/ui/Menu'
    import Case from './Case'

    export default {
        name: 'CaseBlock',
        beforeCreate() {
            this.$options.components.LineList = require('./LineList').default
        },
        components: { Case },
        props: ['block'],
        data() {
            return {
            }
        },
        methods: {
            add() {
                let clause = this.block.makeCase()
                this.block.ClauseManager.add(clause)
            },
            choose(clause) {
                let menu = new Menu()

                menu.add('Delete', label => {
                    sure('Are you sure?').then(result => {
                        if (result.value) {
                            this.block.ClauseManager.remove(clause)
                            builder.module.save()
                        }
                    })
                })

                menu.addSeparator()

                menu.add('Move Up', label => {
                    this.block.ClauseManager.moveUp(clause)
                })

                menu.add('Move Down', label => {
                    this.block.ClauseManager.moveDown(clause)
                })

                menu.show()
            },
            stop() {
                // console.log('stop passing event to parent')
            }
        }
    }
</script>
