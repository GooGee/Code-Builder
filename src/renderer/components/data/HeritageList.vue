<template>
    <div>
        <div v-if="ctype.isClass">
            <span @click="extend" class="button">extends</span>
            <span v-for="heritage in ctype.HeritageManager.extendList">
                <span @click="remove(heritage)" class="button"> - </span>
                <span>{{heritage.type.text}}</span>
            </span>
            <br>
            <span @click="implement" class="button">implements</span>
            <div v-for="heritage in ctype.HeritageManager.implementList">
                <span @click="remove(heritage)" class="button"> - </span>
                <span>{{heritage.type.text}}</span>
            </div>
        </div>

        <div v-else>
            <span @click="extend" class="button">extends</span>
            <div v-for="heritage in ctype.HeritageManager.list">
                <span @click="remove(heritage)" class="button"> - </span>
                <span>{{heritage.type.text}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { look, sure } from '@/model/ui/Dialogue'
    import TypeMenu from '@/model/ui/TypeMenu'

    export default {
        name: 'HeritageList',
        props: ['ctype'],
        data() {
            return {
            }
        },
        methods: {
            extend() {
                let tm = new TypeMenu(builder)
                tm.show((typeName) => {
                    try {
                        this.ctype.extend(typeName)
                        builder.module.save()
                    } catch (error) {
                        look(error, 400)
                    }
                })
            },
            implement() {
                let tm = new TypeMenu(builder)
                tm.show((typeName) => {
                    try {
                        this.ctype.implement(typeName)
                        builder.module.save()
                    } catch (error) {
                        look(error, 400)
                    }
                })
            },
            remove(heritage) {
                sure('Are you sure you want to remove it?').then(result => {
                    if (result.value) {
                        this.ctype.HeritageManager.remove(heritage)
                        builder.module.save()
                    }
                })
            }
        }
    }
</script>
