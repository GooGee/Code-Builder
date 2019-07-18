<template>
    <span>
        <!-- predicate lambda -->
        <template v-if="ctype.isArray">
            <TypeBox :box="ctype.type"></TypeBox>
        </template>

        <template v-if="ctype.isKeyWord">
            <span class="btn btn-default" @click="$emit('setType')">{{ctype.name}}</span>
        </template>

        <template v-if="ctype.isReference">
            <TypeName :name="ctype.type" @setType="$emit('setType')"></TypeName>

            <template v-if="argumentList.length">
                <span class="syntax">&lt;</span>
                <template v-for="(argument, index) in argumentList">
                    <span v-if="index > 0">, </span>
                    <TypeBox :box="argument"></TypeBox>
                </template>
                <span class="syntax">&gt;</span>
            </template>

            <span v-else @click="access" class="button"> ∙ </span>
        </template>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import Menu from '@/model/ui/Menu'
    import TypeName from './TypeName'

    export default {
        name: 'TypeNode',
        beforeCreate() {
            this.$options.components.TypeBox = require('./TypeBox').default
        },
        components: { TypeName },
        props: ['ctype'],
        data() {
            return {
            }
        },
        computed: {
            argumentList() {
                return this.ctype.ArgumentManager.list
            }
        },
        methods: {
            access() {
                let menu = new Menu()

                let GenericList = builder.project.getGenericList(this.ctype.type)
                if (GenericList.length) {
                    menu.add('+ Generic', label => {
                        this.ctype.addGeneric(GenericList.length)
                        builder.module.save()
                    })
                }

                menu.show()
            }
        }
    }
</script>
