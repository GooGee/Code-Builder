<template>
    <div>
        <ImportList :cmodule="cmodule" :editing="editing"></ImportList>

        <div v-if="editing">
            <Modifier :modifier="ctype.modifier" kind="export"></Modifier>
            <span class="syntax">{{ctype.label}}</span>
            <span @click="setName" class="button">{{ctype.name}}</span>

            <GenericList :ctype="ctype" :editing="editing"></GenericList>

            <HeritageList :manager="ctype.HeritageManager" :editing="editing"></HeritageList>

            <span @click="editing=false" class="btn btn-success ok">OK</span>
        </div>

        <div v-else @click="editing=true">
            <span class="syntax">{{ctype.modifier.text}}</span>
            <span class="syntax">{{ctype.label}}</span>
            <span>{{ctype.name}}</span>
            <span v-if="ctype.GenericManager.list.length">&lt; {{ctype.GenericManager.text}} &gt;</span>

            <template v-if="ctype.HeritageManager.extendList.length">
                <span class="syntax">Extend</span>
                <span>{{ctype.HeritageManager.extendText}}</span>
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
    import GenericList from './GenericList'

    export default {
        name: 'Interface',
        components: { Modifier, ImportList, MemberList, HeritageList, GenericList },
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
                            // this.ctype.name = result.value
                            // this.cmodule.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            }
        }
    }
</script>
