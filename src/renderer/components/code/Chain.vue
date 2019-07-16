<template>
    <span>
        <Expression :expression="chain.root" :chain="chain" :editing="editing"></Expression>
        <span v-if="editing" @click="access" class="button"> ∙ </span>
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
                menu.access()
            }
        }
    }
</script>
