<template>
    <span>
        <template v-if="name.isSingle">
            <span @click.stop="$emit('setType')" class="btn btn-default">{{name.name}}</span>
        </template>

        <template v-else>
            <TypeName :name="name.left" @setType="$emit('setType')"></TypeName>
            <span> ∙ </span>
            <span @click.stop="setType" class="btn btn-default">{{name.name}}</span>
        </template>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import Menu from '@/model/ui/Menu'
    import TypeName from './TypeName'

    export default {
        name: 'TypeName',
        components: { TypeName },
        props: ['name'],
        data() {
            return {
            }
        },
        methods: {
            setType() {
                const menu = new Menu()

                const list = builder.project.checker.getExportList(this.name.left.source, builder)
                list.forEach(exported => {
                    menu.add(exported.name, label => {
                        this.name.access(label)
                        builder.module.save()
                    })
                })

                menu.show()
            }
        }
    }
</script>
