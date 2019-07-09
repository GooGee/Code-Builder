<template>
    <span>
        <span v-if="name.isSingle" @click="setRootType" class="btn btn-default">{{name.name}}</span>
        <template v-else>
            <Name :name="name.left" :ctype="ctype"></Name>
            <span> ∙ </span>
            <span @click="setChildType" class="btn btn-default">{{name.right}}</span>
        </template>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import Menu from '@/model/ui/Menu'
    import TypeMenu from '@/model/ui/TypeMenu'
    import Name from './Name'

    export default {
        name: 'Name',
        components: { Name },
        props: ['ctype', 'name'],
        data() {
            return {
            }
        },
        methods: {
            setChildType() {
                let menu = new Menu()

                let list = builder.project.getExportList(this.name.left, builder)
                list.forEach(exported => {
                    menu.add(exported.name, label => {
                        this.name.right = label
                        builder.module.save()
                    })
                })

                menu.show()
            },
            setRootType() {
                let tm = new TypeMenu(builder)
                tm.show(name => {
                    this.ctype.setType(name)
                    builder.module.save()
                })
            }
        }
    }
</script>
