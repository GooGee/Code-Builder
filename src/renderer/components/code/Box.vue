<template>
    <span>
        <Chain v-if="box.isChain" :chain="box.chain" :editing="editing"></Chain>

        <template v-else>
            <Box :box="box.left" :editing="editing"></Box>
            <span @click="operate" class="button">{{operator}}</span>
            <Box :box="box.right" :editing="editing"></Box>
        </template>
    </span>
</template>

<script>
    import Menu from '@/model/ui/Menu'
    import { AssignMap, CompareMap } from '@/model/code/Box'
    import Box from './Box'
    import Chain from './Chain'
    import Expression from './Expression'

    export default {
        name: 'Box',
        components: { Box, Chain, Expression },
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
