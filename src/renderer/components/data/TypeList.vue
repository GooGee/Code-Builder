<template>
    <div>
        <div v-for="type in manager.list">
            <span @click="remove(type)" class="button"> - </span>
            <TypeBox :box="type" :editing="editing"></TypeBox>
        </div>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { sure } from '@/model/ui/Dialogue'
    import TypeBox from './TypeBox'

    export default {
        name: 'TypeList',
        components: { TypeBox },
        props: ['manager', 'editing'],
        data() {
            return {
            }
        },
        methods: {
            remove(type) {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.manager.remove(type)
                        builder.module.save()
                    }
                })
            }
        }
    }
</script>
