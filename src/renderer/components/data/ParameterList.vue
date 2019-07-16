<template>
    <span class="ParameterList">
        <template v-if="editing">
            <div v-for="parameter in manager.list" :key="parameter.name">
                <Parameter :parameter="parameter" @remove="remove" :editing="editing"></Parameter>
            </div>
            <div v-if="!noAdd">
                <span @click="add" class="button"> + Parameter</span>
            </div>
        </template>

        <span v-else>
            {{manager.text}}
        </span>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import { enter, look, sure } from '@/model/ui/Dialogue'
    import TypeMenu from '@/model/ui/TypeMenu'
    import Parameter from './Parameter'

    export default {
        name: 'ParameterList',
        components: { Parameter },
        props: ['manager', 'editing', 'noAdd'],
        data() {
            return {
            }
        },
        methods: {
            add() {
                let tm = new TypeMenu(builder)
                tm.show((typeName) => {
                    let name = typeName.toLowerCase()
                    enter('Please enter the name', name).then(result => {
                        if (result.value) {
                            try {
                                let manager = this.manager
                                let ppp = manager.make(result.value, typeName)
                                manager.add(ppp)
                                builder.module.save()
                            } catch (error) {
                                look(error, 400)
                            }
                        }
                    })
                })
            },
            remove(parameter) {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.manager.remove(parameter)
                        builder.module.save()
                    }
                })
            }
        }
    }
</script>

<style>
    .ParameterList {
        padding-left: 33px
    }

</style>
