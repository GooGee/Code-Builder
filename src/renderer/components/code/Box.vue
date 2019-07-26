<template>
    <span>
        <template v-if="box.BoxItem.isTwin">
            <Chain v-if="box.BoxItem.isAssign" :chain="box.BoxItem.left" :editing="editing"></Chain>
            <Box v-else :box="box.BoxItem.left" :editing="editing"></Box>
            <span v-if="editing" @click="operate" class="button">{{operator}}</span>
            <span v-else>{{operator}}</span>
            <Box :box="box.BoxItem.right" :editing="editing"></Box>
        </template>

        <Chain v-if="box.BoxItem.isChain" :chain="box.BoxItem" :editing="editing"></Chain>

        <Lambda v-if="box.BoxItem.isLambda" :box="box" :editing="editing"></Lambda>
    </span>
</template>

<script>
    import Menu from '@/model/ui/Menu'
    import { AssignTokenMap, CompareTokenMap } from '@/model/code/Box'
    import Box from './Box'
    import Chain from './Chain'
    import Expression from './Expression'
    import Lambda from './Lambda'

    export default {
        name: 'Box',
        components: { Box, Chain, Expression, Lambda },
        props: ['box', 'editing'],
        data() {
            return {
            }
        },
        computed: {
            operator() {
                let map = CompareTokenMap
                if (this.box.BoxItem.isAssign) {
                    map = AssignTokenMap
                }
                return map.get(this.box.BoxItem.operator)
            }
        },
        methods: {
            operate() {
                let menu = new Menu()

                let map = CompareTokenMap
                if (this.box.BoxItem.isAssign) {
                    map = AssignTokenMap
                }

                map.forEach((value, key) => {
                    menu.add(value, label => {
                        this.box.BoxItem.operator = key
                    })
                })

                menu.show()
            }
        }
    }
</script>
