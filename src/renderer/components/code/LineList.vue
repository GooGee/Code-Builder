<template>
    <div @click.stop="stop" class="row">
        <div class="col-xs-11 block">
            <div v-for="line in manager.list" class="row">
                <div class="col-xs-11">
                    <span @click="show(line)" class="button"> . </span>
                    <Statement v-if="line.statement" :statement="line.statement" :block="block"></Statement>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-11">
                    <span @click="add" class="button"> + </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import StatementMenu from '@/model/ui/StatementMenu'
    import Statement from './Statement'

    export default {
        name: 'LineList',
        components: { Statement },
        props: ['block', 'manager'],
        data() {
            return {
                line: null
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
            stop() {
                // console.log('stop passing event to parent')
            }
        }
    }
</script>
