<template>
    <span>
        <template v-if="expression.isAccess">
            <Expression :expression="expression.expression" :chain="chain" :editing="editing"></Expression>
            <span> ∙ </span>
            <span @click="change" class="btn btn-default">{{expression.name}}</span>
        </template>

        <template v-if="expression.isCall">
            <Expression :expression="expression.expression" :chain="chain" :editing="editing"></Expression>
            <Argument :manager="expression.ArgumentManager" :expression="expression" :editing="editing"></Argument>
        </template>

        <template v-if="expression.isIdentifier">
            <span @click="change" class="btn btn-default">{{expression.name}}</span>
        </template>

        <template v-if="expression.isNew">
            <span class="syntax">new</span>
            <Expression :expression="expression.expression" :chain="chain" :editing="editing"></Expression>
            <Argument :manager="expression.ArgumentManager" :expression="expression" :editing="editing"></Argument>
        </template>

        <template v-if="expression.isNot">
            <span class="syntax">Not</span>
            <Expression :expression="expression.expression" :chain="chain" :editing="editing"></Expression>
        </template>

        <template v-if="expression.isKeyword">
            <span @click="change" class="btn btn-default">{{expression.text}}</span>
        </template>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import ChainMenu from '@/model/ui/ChainMenu'
    import Argument from './Argument'
    import Expression from './Expression'

    export default {
        name: 'Expression',
        components: { Argument, Expression },
        props: ['chain', 'expression', 'editing'],
        data() {
            return {
            }
        },
        methods: {
            change() {
                let menu = new ChainMenu(this.chain, builder)
                menu.change(this.expression)
            }
        }
    }
</script>
