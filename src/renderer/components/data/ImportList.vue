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
    import ModuleMenu from '@/model/ui/ModuleMenu'
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
                const menu = new ModuleMenu(builder)

                menu.show(path => {
                    try {
                        const iii = this.cmodule.ImportManager.make(path)
                        this.cmodule.ImportManager.add(iii)
                        this.cmodule.save()
                    } catch (error) {
                        look(error, 400)
                    }
                })
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
