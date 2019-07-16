<template>
    <span>
        <template v-if="box.isBinary">
            <Box :box="box.left" :editing="editing"></Box>
            <span v-if="editing" @click="operate" class="button">{{operator}}</span>
            <span v-else>{{operator}}</span>
            <Box :box="box.right" :editing="editing"></Box>
        </template>

        <Chain v-if="box.isChain" :chain="box.chain" :editing="editing"></Chain>

        <Lambda v-if="box.isLambda" :box="box" :editing="editing"></Lambda>
    </span>
</template>

<script>
    import Menu from '@/model/ui/Menu'
    import { AssignMap, CompareMap } from '@/model/code/Box'
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
                let map = CompareMap
                if (this.box.isAssign) {
                    map = AssignMap
                }
                return map.get(this.box.operator)
            }
        },
        methods: {
            operate() {
                let menu = new Menu()

                let map = CompareMap
                if (this.box.isAssign) {
                    map = AssignMap
                }

                map.forEach((value, key) => {
                    menu.add(value, label => {
                        this.box.operator = key
                    })
                })

                menu.show()
            }
        }
    }
</script>
