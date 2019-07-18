<template>
    <span>
        <template v-if="name.isSingle">
            <span @click.stop="$emit('setType')" class="btn btn-default">{{name.name}}</span>
        </template>

        <template v-else>
            <Name :name="name.left" @setType="$emit('setType')"></Name>
            <span> ∙ </span>
            <span @click.stop="setType" class="btn btn-default">{{name.name}}</span>
        </template>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import Menu from '@/model/ui/Menu'
    import Name from './Name'

    export default {
        name: 'Name',
        components: { Name },
        props: ['name'],
        data() {
            return {
            }
        },
        methods: {
            setType() {
                const menu = new Menu()

                const list = builder.project.getExportList(this.name.left, builder)
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
