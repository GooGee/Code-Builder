<template>
    <div>
        <div>
            <Modifier :modifier="ctype.modifier" kind="export"></Modifier>
            <span class="syntax">{{ctype.label}}</span>
            <span @click="setName" class="button">{{ctype.name}}</span>
            <span @click="add" class="button"> + </span>
        </div>
        <ul class="list-unstyled">
            <li v-for="member in manager.list">
                <span @click="remove(member)" class="button"> - </span>
                <span @click="setItemName(member)" class="button">{{member.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import { enter, look, sure } from '@/model/ui/Dialogue'
    import Modifier from './Modifier'

    export default {
        name: 'Enum',
        components: { Modifier },
        props: ['ctype', 'cmodule'],
        data() {
            return {
                manager: this.ctype.MemberManager
            }
        },
        methods: {
            add() {
                enter('Please enter the name').then(result => {
                    if (result.value) {
                        try {
                            const member = this.manager.make(result.value)
                            this.manager.add(member)
                            this.cmodule.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            },
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
            },
            setItemName(member) {
                enter('Please enter the name', member.name).then(result => {
                    if (result.value) {
                        try {
                            member.name = result.value
                            this.cmodule.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            },
            remove(member) {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.manager.remove(member)
                        this.cmodule.save()
                    }
                })
            }
        }
    }
</script>
