<template>
    <span>
        <template v-if="ctype.isArray">
            <TypeNode :ctype="ctype.type"></TypeNode>
        </template>

        <template v-if="ctype.isKeyWord">
            <span @click="$emit('changeType')" class="btn btn-default">{{ctype.name}}</span>
        </template>

        <template v-if="ctype.isReference">
            <Name :name="ctype.type" :ctype="ctype"></Name>

            <template v-if="argumentList.length">
                <span class="syntax">&lt;</span>
                <template v-for="(argument, index) in argumentList">
                    <TypeNode :ctype="argument"></TypeNode>
                    <span v-if="index < argumentList.length - 1">,</span>
                </template>
                <span class="syntax">&gt;</span>
            </template>

            <span @click="access" class="button"> ∙ </span>
        </template>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import Menu from '@/model/ui/Menu'
    import Name from './Name'
    import TypeNode from './TypeNode'

    export default {
        name: 'TypeNode',
        components: { Name, TypeNode },
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

                let list = builder.project.getExportList(this.ctype.type)
                if (list.length) {
                    list.forEach(exported => {
                        menu.add(exported.name, label => {
                            this.ctype.access(label)
                            builder.module.save()
                        })
                    })

                    menu.addSeparator()
                }

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
