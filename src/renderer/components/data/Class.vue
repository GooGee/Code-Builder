<template>
    <div>
        <ImportList :cmodule="cmodule" :editing="editing"></ImportList>

        <div v-if="editing">
            <Modifier :modifier="ctype.modifier" kind="export"></Modifier>
            <Modifier :modifier="ctype.modifier" kind="abstract"></Modifier>
            <span class="syntax">Class</span>
            <span @click="setName" class="btn btn-default">{{ctype.name}}</span>

            <Generic :ctype="ctype"></Generic>

            <HeritageList :ctype="ctype"></HeritageList>
    
            <span @click="editing=false" class="btn btn-success ok">OK</span>
        </div>

        <div v-else @click="editing=true">
            <span class="syntax">{{ctype.modifier.text}}</span>
            <span class="syntax">Class</span>
            <span>{{ctype.name}}</span>
            <span v-if="ctype.GenericManager.list.length">&lt; {{ctype.GenericManager.text}} &gt;</span>

            <template v-if="ctype.HeritageManager.extendList.length">
                <span class="syntax">extends</span>
                <span>{{ctype.HeritageManager.extendText}}</span>
            </template>

            <template v-if="ctype.HeritageManager.implementList.length">
                <span class="syntax">implements</span>
                <span>{{ctype.HeritageManager.implementText}}</span>
            </template>
        </div>

        <MemberList :ctype="ctype" :cmodule="cmodule"></MemberList>
    </div>
</template>

<script>
    import { enter, look } from '@/model/ui/Dialogue'
    import Modifier from './Modifier'
    import ImportList from './ImportList'
    import MemberList from './MemberList'
    import HeritageList from './HeritageList'
    import Generic from './Generic'

    export default {
        name: 'Class',
        components: { Modifier, ImportList, MemberList, HeritageList, Generic },
        props: ['ctype', 'cmodule'],
        data() {
            return {
                editing: false
            }
        },
        methods: {
            setName() {
                enter('Please enter the name', this.ctype.name).then(result => {
                    if (result.value) {
                        try {
                            this.ctype.name = result.value
                            this.cmodule.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            }
        }
    }
</script>
