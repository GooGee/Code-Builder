<template>
    <div>
        <div v-for="parameter in ctype.GenericManager.list">
            <span @click="remove(parameter)" class="button"> - </span>
            <span @click="change(parameter)" class="button">{{parameter.name}}</span>
            <span @click="constrain(parameter)" class="button">Extend</span>
            <TypeBox v-if="parameter.constraint" :box="parameter.constraint"></TypeBox>
        </div>

        <span @click="add" class="button"> + Generic </span>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { enter, look, sure } from '@/model/ui/Dialogue'
    import Menu from '@/model/ui/Menu'
    import TypeBox from './TypeBox'

    export default {
        name: 'GenericList',
        components: { TypeBox },
        props: ['ctype', 'editing'],
        data() {
            return {
            }
        },
        methods: {
            add() {
                enter('Please input the name').then(result => {
                    if (result.value) {
                        try {
                            let parameter = this.ctype.GenericManager.make(result.value)
                            this.ctype.GenericManager.add(parameter)
                            builder.module.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            },
            change(parameter) {
                enter('Please input the name', parameter.name).then(result => {
                    if (result.value) {
                        try {
                            // parameter.name = result.value
                            // builder.module.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            },
            constrain(parameter) {
                const menu = new Menu()
                menu.add('Remove constraint', label => {
                    sure('Are you sure?').then(result => {
                        if (result.value) {
                            parameter.removeConstraint()
                            builder.module.save()
                        }
                    })
                })
                menu.addSeparator()
                menu.add('Add constraint', label => {
                    parameter.addConstraint()
                    builder.module.save()
                })
                menu.show()
            },
            remove(parameter) {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.ctype.GenericManager.remove(parameter)
                        builder.module.save()
                    }
                })
            }
        }
    }
</script>
