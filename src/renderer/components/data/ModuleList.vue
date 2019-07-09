<template>
    <div>
        <div>
            <h3 class="inline">{{project.name}}</h3>
            <span @click="add" class="button"> + Module</span>
        </div>
        <div v-for="cmodule in project.ModuleManager.list" :key="cmodule.name">
            <Module :cmodule="cmodule" @remove="remove"></Module>
        </div>
    </div>
</template>

<script>
    import { enter, look, sure } from '@/model/ui/Dialogue'
    import Module from './Module'

    export default {
        name: 'ModuleList',
        components: { Module },
        props: ['project'],
        data() {
            return {
            }
        },
        methods: {
            add() {
                enter('Please enter the name').then(result => {
                    if (result.value) {
                        try {
                            let mmm = this.project.ModuleManager.make(result.value)
                            this.project.ModuleManager.add(mmm)
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            },
            remove(cmodule) {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.project.ModuleManager.remove(cmodule)
                    }
                })
            }
        }
    }
</script>
