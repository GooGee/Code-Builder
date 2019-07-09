<template>
    <div>
        <div v-for="cimport in cmodule.ImportManager.list" :key="cimport.name">
            <Import :cimport="cimport" @remove="remove"></Import>
        </div>
        <span v-if="editing" @click="add" class="button">+ Import</span>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { look, sure } from '@/model/ui/Dialogue'
    import Menu from '@/model/ui/Menu'
    import Import from './Import'

    export default {
        name: 'ImportList',
        components: { Import },
        props: ['cmodule', 'editing'],
        data() {
            return {
            }
        },
        methods: {
            add() {
                let menu = new Menu()

                let list = builder.project.ModuleManager.list
                list.forEach(mmm => {
                    menu.add(mmm.name, label => {
                        try {
                            let iii = this.cmodule.ImportManager.make(mmm.path)
                            this.cmodule.ImportManager.add(iii)
                            this.cmodule.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    })
                })

                menu.addSeparator()

                let aml = builder.project.AmbientModuleList
                aml.forEach(mmm => {
                    let name = mmm.name.slice(1, -1)
                    menu.add(name, label => {
                        try {
                            let iii = this.cmodule.ImportManager.make(label)
                            this.cmodule.ImportManager.add(iii)
                            this.cmodule.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    })
                })

                menu.show()
            },
            remove(cimport) {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.cmodule.ImportManager.remove(cimport)
                        this.cmodule.save()
                    }
                })
            }
        }
    }
</script>
