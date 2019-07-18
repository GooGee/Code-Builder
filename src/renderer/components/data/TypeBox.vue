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
        props: ['box', 'isProperty'],
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
                if (this.isProperty) {
                    this.tmData.kind = 'Property'
                } else {
                    this.tmData.kind = 'Method'
                }
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
