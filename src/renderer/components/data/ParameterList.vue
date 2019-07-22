<template>
    <span>
        <template v-if="editing">
            <span v-if="manager.inLambda">
                <span>(</span>
                <template v-for="(parameter, index) in manager.list">
                    <span v-if="index > 0">, </span>
                    <Parameter :parameter="parameter" @remove="remove" :editing="editing"></Parameter>
                </template>
                <span>)</span>
            </span>

            <template v-else>
                <div>(</div>
                <div class="ParameterList">
                    <div v-for="parameter in manager.list" :key="parameter.name">
                        <Parameter :parameter="parameter" @remove="remove" :editing="editing"></Parameter>
                    </div>
                    <div>
                        <span @click="add" class="button"> + Parameter</span>
                    </div>
                </div>
                <div>)</div>
            </template>
        </template>

        <span v-else>
            {{manager.text}}
        </span>

        <TypeMenu v-if="tmData" :tmData="tmData"></TypeMenu>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import { enter, look, sure } from '@/model/ui/Dialogue'
    import { OwnerKind } from '@/model/data/TypeBox'
    import Parameter from './Parameter'
    import TypeMenu, { TypeMenuData } from '../common/TypeMenu'

    export default {
        name: 'ParameterList',
        components: { Parameter, TypeMenu },
        props: ['manager', 'editing'],
        data() {
            return {
                tmData: null
            }
        },
        methods: {
            add() {
                if (!this.tmData) {
                    this.tmData = new TypeMenuData(builder, OwnerKind.Variable)
                }
                this.tmData.show(this.make.bind(this))
            },
            make(list) {
                if (list.length === 0) {
                    return
                }

                const last = list[list.length - 1]
                const name = last.toLowerCase()
                enter('Please enter the name', name).then(result => {
                    if (result.value) {
                        try {
                            const ppp = this.manager.make(result.value, list)
                            this.manager.add(ppp)
                            builder.module.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            },
            remove(parameter) {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.manager.remove(parameter)
                        builder.module.save()
                    }
                })
            }
        }
    }
</script>

<style>
    .ParameterList {
        padding-left: 44px
    }

</style>
