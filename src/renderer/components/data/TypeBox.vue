<template>
    <span>
        <TypeNode :ctype="box.type" @setType="setType"></TypeNode>

        <TypeMenu v-if="tmData" :tmData="tmData"></TypeMenu>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import TypeNode from './TypeNode'
    import TypeMenu, { TypeMenuData } from '../common/TypeMenu'

    export default {
        name: 'TypeBox',
        components: { TypeNode, TypeMenu },
        props: ['box', 'kind'],
        data() {
            return {
                tmData: null
            }
        },
        methods: {
            setType() {
                if (!this.tmData) {
                    this.tmData = new TypeMenuData(builder)
                }
                this.tmData.kind = this.kind
                this.tmData.show(list => {
                    if (list.length === 0) {
                        return
                    }

                    this.box.setType(list)
                    builder.module.save()
                })
            }
        }
    }
</script>
