<template>
    <div>
        <template v-if="manager.extendClause">
            <span @click="extend" class="button">Extend</span>
            <TypeList :manager="manager.extendClause.TypeManager" :editing="editing"></TypeList>
        </template>

        <template v-if="manager.implementClause">
            <span @click="implement" class="button">Implement</span>
            <TypeList :manager="manager.implementClause.TypeManager" :editing="editing"></TypeList>
        </template>

        <TypeMenu v-if="tmData" :tmData="tmData"></TypeMenu>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import TypeMenu, { TypeMenuData } from '../common/TypeMenu'
    import TypeList from './TypeList'

    export default {
        name: 'HeritageList',
        components: { TypeMenu, TypeList },
        props: ['manager', 'editing'],
        data() {
            return {
                tmData: null
            }
        },
        methods: {
            extend() {
                if (!this.tmData) {
                    this.tmData = new TypeMenuData(builder, 'Type')
                }
                this.tmData.show(list => {
                    this.manager.extend(list)
                    builder.module.save()
                })
            },
            implement() {
                if (!this.tmData) {
                    this.tmData = new TypeMenuData(builder, 'Type')
                }
                this.tmData.show(list => {
                    this.manager.implement(list)
                    builder.module.save()
                })
            }
        }
    }
</script>
