<template>
    <div>
        <template v-if="editing">
            <div v-for="ta in manager.list">
                <span @click="remove(ta)" class="button"> - </span>
                <span class="syntax">Type</span>
                <span @click="setName(ta)" class="btn btn-default">{{ta.name}}</span>
                <span> = </span>
                <TypeBox :box="ta.TypeBox" :editing="editing"></TypeBox>
            </div>
            <span @click="add" class="button">+ TypeAlias</span>
        </template>

        <template v-else>
            <div v-for="ta in manager.list">
                <span class="syntax">Type</span>
                <span>{{ta.name}}</span>
                <span> = </span>
                <span>{{ta.TypeBox.text}}</span>
            </div>
        </template>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { enter, look, sure } from '@/model/ui/Dialogue'
    import TypeBox from './TypeBox'

    export default {
        name: 'TypeAliasList',
        components: { TypeBox },
        props: ['manager', 'editing'],
        data() {
            return {
            }
        },
        methods: {
            add() {
                enter('Please enter the name').then(result => {
                    if (result.value) {
                        const ta = this.manager.make(result.value)
                        this.manager.add(ta)
                        builder.module.save()
                    }
                })
            },
            setName(ta) {
                enter('Please enter the name', ta.name).then(result => {
                    if (result.value) {
                        try {
                            // ta.name = result.value
                            // builder.module.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            },
            remove(ta) {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.manager.remove(ta)
                        builder.module.save()
                    }
                })
            }
        }
    }
</script>
