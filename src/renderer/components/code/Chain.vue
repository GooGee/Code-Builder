<template>
    <span>
        <template v-if="editing">
            <Expression :expression="chain.root" :chain="chain" :editing="editing"></Expression>
            <span @click="access" class="button"> ∙ </span>
        </template>

        <template v-else>
            <span v-if="chain.root.isNew" class="syntax">new</span>
            <span>{{chain.text}}</span>
        </template>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import ChainMenu from '@/model/ui/ChainMenu'
    import Expression from './Expression'

    export default {
        name: 'Chain',
        components: { Expression },
        props: ['chain', 'block', 'editing'],
        data() {
            return {
            }
        },
        computed: {
        },
        methods: {
            access() {
                let menu = new ChainMenu(this.chain, builder)
                menu.show()
            }
        }
    }
</script>
