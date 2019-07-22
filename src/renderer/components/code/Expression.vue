<template>
    <span>
        <template v-if="expression.isAccess">
            <Expression :expression="owner" :chain="chain" :editing="editing"></Expression>
            <span> ∙ </span>
            <span v-if="editing" @click="change" class="btn btn-default">{{expression.value}}</span>
            <span v-else>{{expression.value}}</span>
        </template>

        <template v-if="expression.isCall">
            <Expression :expression="owner" :chain="chain" :editing="editing"></Expression>
            <ArgumentList @change="change" :expression="expression" :editing="editing"></ArgumentList>
        </template>

        <template v-if="expression.isIdentifier">
            <span v-if="editing" @click="change" class="btn btn-default">{{expression.value}}</span>
            <span v-else>{{expression.value}}</span>
        </template>

        <template v-if="expression.isNew">
            <span class="syntax">New</span>
            <Expression :expression="owner" :chain="chain" :editing="editing"></Expression>
            <ArgumentList @change="change" :expression="expression" :editing="editing"></ArgumentList>
        </template>

        <template v-if="expression.isNot">
            <Expression :expression="expression.operand" :chain="chain" :editing="editing"></Expression>
            <span v-if="editing" @click="change" class="btn btn-default syntax">is False</span>
            <span v-else class="syntax">is False</span>
        </template>

        <template v-if="expression.isKeyword || expression.isLiteral">
            <span v-if="editing" @click="change" class="btn btn-default">{{expression.value}}</span>
            <span v-else>{{expression.text}}</span>
        </template>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import ChainMenu from '@/model/ui/ChainMenu'
    import ArgumentList from './ArgumentList'
    import Expression from './Expression'

    export default {
        name: 'Expression',
        components: { ArgumentList, Expression },
        props: ['chain', 'expression', 'editing'],
        data() {
            return {
            }
        },
        computed: {
            owner() {
                return this.expression.expression
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
