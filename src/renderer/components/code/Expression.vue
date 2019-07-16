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
            <Argument @change="change" :expression="expression" :editing="editing"></Argument>
        </template>

        <template v-if="expression.isIdentifier">
            <span v-if="editing" @click="change" class="btn btn-default">{{expression.value}}</span>
            <span v-else>{{expression.value}}</span>
        </template>

        <template v-if="expression.isNew">
            <span class="syntax">New</span>
            <Expression :expression="owner" :chain="chain" :editing="editing"></Expression>
            <Argument @change="change" :expression="expression" :editing="editing"></Argument>
        </template>

        <template v-if="expression.isNot">
            <span class="syntax">Not</span>
            <Expression :expression="owner" :chain="chain" :editing="editing"></Expression>
        </template>

        <template v-if="expression.isKeyword">
            <span v-if="editing" @click="change" class="btn btn-default">{{expression.value}}</span>
            <span v-else>{{expression.value}}</span>
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
