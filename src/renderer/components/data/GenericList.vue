<template>
    <div>
        <div v-for="parameter in ctype.GenericManager.list">
            <span @click="remove(parameter)" class="button"> - </span>
            <span @click="change(parameter)" class="button">{{parameter.name}}</span>
        </div>

        <span @click="add" class="button"> + Generic </span>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { enter, look, sure } from '@/model/ui/Dialogue'

    export default {
        name: 'GenericList',
        props: ['ctype'],
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
                            parameter.name = result.value
                            builder.module.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
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
