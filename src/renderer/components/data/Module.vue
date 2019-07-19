<template>
    <div>
        <div class="form-inline">
            <span @click="$emit('remove', cmodule)" class="button"> - </span>
            <span class="syntax">{{cmodule.name}}</span>
            <span @click="add" class="button"> + </span>
        </div>
        <StructureList :cmodule="cmodule"></StructureList>
    </div>
</template>

<script>
    import { enter } from '@/model/ui/Dialogue'
    import Menu from '@/model/ui/Menu'
    import StructureList from './StructureList'

    const BasicStructureList = ['Class', 'Enum', 'Interface']

    export default {
        name: 'Module',
        components: { StructureList },
        props: ['cmodule'],
        data() {
            return {
            }
        },
        methods: {
            add() {
                let menu = new Menu()
                BasicStructureList.forEach(kind => {
                    menu.add(kind, label => this.make(label))
                })
                menu.show()
            },
            make(kind) {
                enter('Please enter the name').then(result => {
                    if (result.value) {
                        let manager = this.cmodule.StructureManager
                        if (kind === 'Class') {
                            let member = manager.makeClass(result.value)
                            manager.add(member)
                        }
                        if (kind === 'Enum') {
                            let member = manager.makeEnum(result.value)
                            manager.add(member)
                        }
                        if (kind === 'Interface') {
                            let member = manager.makeInterface(result.value)
                            manager.add(member)
                        }
                        this.cmodule.save()
                    }
                })
            }
        }
    }
</script>
