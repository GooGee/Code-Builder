<template>
    <span>
        <Name :name="ctype.type" :ctype="ctype"></Name>

        <template v-if="argumentList.length">
            <span class="syntax">&lt;</span>
            <template v-for="(argument, index) in argumentList">
                <TypeChain :ctype="argument"></TypeChain>
                <span v-if="index < argumentList.length - 1">,</span>
            </template>
            <span class="syntax">&gt;</span>
        </template>
        <span @click="access" class="button"> ∙ </span>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import Menu from '@/model/ui/Menu'
    import Name from './Name'
    import TypeChain from './TypeChain'

    export default {
        name: 'TypeChain',
        components: { Name, TypeChain },
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

                let list = builder.project.getExportList(this.ctype.type, builder)
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
