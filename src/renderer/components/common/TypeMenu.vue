<template>
    <Dialogue :dData="tmData.dData">
        <template slot="title">Select a type</template>
        <template slot="body">
            <div>
                <template v-for="(name, index) in tmData.list">
                    <span v-if="index > 0"> ∙ </span>
                    <span class="btn btn-default syntax">{{name}}</span>
                </template>
            </div>

            <List v-if="tmData.lData" :lData="tmData.lData"></List>
        </template>
        <template slot="footer">
            <span @click="ok" class="btn btn-success">OK</span>
            <span @click="close" class="btn btn-default">Cancel</span>
        </template>
    </Dialogue>
</template>

<script>
    import builder from '@/model/builder'
    import TypeMenu from '@/model/ui/TypeMenu'
    import { Dialogue, DialogueData } from './Dialogue'
    import { List, ListData } from './List'

    export class TypeMenuData {
        constructor(builder, kind) {
            this.builder = builder
            this.kind = kind
            this.list = []
            this.CallBack = null
            this.lData = null
            this.dData = new DialogueData(true, true)
        }

        moduleList() {
            return builder.module.ImportManager.list
        }

        aliasNode(item) {
            const node = {
                source: item.clause.source.namedBindings.name
            }
            return node
        }

        selectModule(item) {
            this.list.push(item.name)
            const list = builder.project.getExportList(this.aliasNode(item))
            this.lData = new ListData(list,
                'name',
                null,
                this.selectType.bind(this)
            )
        }

        selectType(item) {
            this.lData = null
            this.list.push(item.name)
        }

        showModuleList() {
            this.lData = new ListData(
                this.moduleList(),
                'name',
                null,
                this.selectModule.bind(this)
            )

            this.dData.show()
        }

        checkResult(label) {
            if (label === '$Module') {
                this.showModuleList()
                return
            }

            const list = [label]
            this.CallBack(list)
        }

        show(CallBack) {
            this.CallBack = CallBack
            this.list.splice(0, this.list.length)
            const menu = new TypeMenu(this.builder, this.kind)
            menu.show(this.checkResult.bind(this))
        }
    }

    export default {
        name: 'TypeMenu',
        components: { Dialogue, List },
        props: ['tmData'],
        data() {
            return {
            }
        },
        methods: {
            ok() {
                this.tmData.CallBack(this.tmData.list)
                this.tmData.dData.close()
            },
            close() {
                this.tmData.dData.close()
            }
        }
    }
</script>
