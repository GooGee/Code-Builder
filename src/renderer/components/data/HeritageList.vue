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

        <TypeMenu v-if="tmData" :tmData="tmData"></TypeMenu>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { sure } from '@/model/ui/Dialogue'
    import TypeMenu, { TypeMenuData } from '../common/TypeMenu'

    export default {
        name: 'HeritageList',
        components: { TypeMenu },
        props: ['ctype'],
        data() {
            return {
                tmData: null
            }
        },
        methods: {
            extend() {
                if (!this.tmData) {
                    this.tmData = new TypeMenuData(builder)
                }
                this.tmData.show(list => {
                    this.ctype.extend(list)
                    builder.module.save()
                })
            },
            implement() {
                if (!this.tmData) {
                    this.tmData = new TypeMenuData(builder)
                }
                this.tmData.show(list => {
                    this.ctype.implement(list)
                    builder.module.save()
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
