<template>
    <div>
        <div v-for="ctype in cmodule.TypeManager.list" :key="ctype.name" class="type-list">
            <span @click="remove(ctype)" class="button"> - </span>
            <span v-if="ctype.isClass" class="syntax">Class</span>
            <span v-if="ctype.isEnum" class="syntax">Enum</span>
            <span v-if="ctype.isInterface" class="syntax">Interface</span>
            <span @click="show(ctype)" class="button">{{ctype.name}}</span>
        </div>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { sure } from '@/model/ui/Dialogue'

    export default {
        name: 'TypeList',
        props: ['cmodule'],
        data() {
            return {
            }
        },
        methods: {
            show(ctype) {
                builder.show(this.cmodule, ctype)
            },
            remove(ctype) {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.cmodule.TypeManager.remove(ctype)
                        this.cmodule.save()
                    }
                })
            }
        }
    }
</script>

<style>
    .type-list {
        padding-left: 33px;
    }

</style>
