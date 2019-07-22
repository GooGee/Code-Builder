<template>
    <div>
        <div>
            <span @click="extend" class="button">Extend</span>
        </div>
        <template v-if="manager.extendClause">
            <TypeList :manager="manager.extendClause.TypeManager" :editing="false"></TypeList>
        </template>

        <div>
            <span @click="implement" class="button">Implement</span>
        </div>
        <template v-if="manager.implementClause">
            <TypeList :manager="manager.implementClause.TypeManager" :editing="false"></TypeList>
        </template>

        <TypeMenu v-if="tmData" :tmData="tmData"></TypeMenu>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import TypeMenu, { TypeMenuData } from '../common/TypeMenu'
    import TypeList from './TypeList'
    import { OwnerKind } from '@/model/data/TypeBox'

    export default {
        name: 'HeritageList',
        components: { TypeMenu, TypeList },
        props: ['manager', 'editing'],
        data() {
            return {
                tmData: null,
                kind: OwnerKind.Type
            }
        },
        methods: {
            extend() {
                if (!this.tmData) {
                    this.tmData = new TypeMenuData(builder, this.kind)
                }
                this.tmData.show(list => {
                    this.manager.extend(list)
                    builder.module.save()
                })
            },
            implement() {
                if (!this.tmData) {
                    this.tmData = new TypeMenuData(builder, this.kind)
                }
                this.tmData.show(list => {
                    this.manager.implement(list)
                    builder.module.save()
                })
            }
        }
    }
</script>
