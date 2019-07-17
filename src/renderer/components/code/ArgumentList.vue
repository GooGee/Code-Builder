<template>
    <span>
        <template v-if="editing">
            <span @click="$emit('change')" class="btn btn-default syntax">(</span>
            <div v-if="manager.list" v-for="box in manager.list" class="argument">
                <span @click="remove(box)" class="button"> - </span>
                <Box :box="box" :editing="editing"></Box>
            </div>
            <span class="syntax">)</span>
        </template>

        <span v-else>
            <span class="syntax">(</span>
            <span>{{manager.text}}</span>
            <span class="syntax">)</span>
        </span>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import { sure } from '@/model/ui/Dialogue'

    export default {
        name: 'ArgumentList',
        beforeCreate() {
            this.$options.components.Box = require('./Box').default
        },
        props: ['expression', 'editing'],
        data() {
            return {
                manager: this.expression.ArgumentManager
            }
        },
        methods: {
            remove(box) {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.manager.remove(box)
                        builder.module.save()
                    }
                })
            }
        }
    }
</script>

<style>
    .argument {
        padding-left: 44px
    }

</style>
