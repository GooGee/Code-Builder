<template>
    <div>
        <div class="btn-group">
            <span @click="add('Method')" class="btn btn-default"> + Method</span>
            <!-- <span @click="add('Lambda')" class="btn btn-default"> + Lambda</span> -->
            <span @click="add('Property')" class="btn btn-default"> + Property</span>
        </div>

        <div v-for="member in ctype.MemberManager.list" :key="member.name">
            <Member :member="member" @remove="remove"></Member>
        </div>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { enter, look, sure } from '@/model/ui/Dialogue'
    import TypeMenu from '@/model/ui/TypeMenu'
    import Member from './Member'

    export default {
        name: 'MemberList',
        components: { Member },
        props: ['ctype', 'cmodule'],
        data() {
            return {
                kind: ''
            }
        },
        created() {
        },
        methods: {
            add(kind) {
                this.kind = kind
                let tm = new TypeMenu(builder)
                tm.show(this.make)
            },
            make(typeName) {
                let name = typeName.toLowerCase()
                enter('Please enter the name', name).then(result => {
                    if (result.value) {
                        try {
                            let manager = this.ctype.MemberManager
                            if (result.value === 'constructor') {
                                this.kind = 'Constructor'
                                let mmm = manager.makeConstructor()
                                manager.add(mmm)
                            }

                            if (this.kind === 'Method') {
                                let mmm = manager.makeMethod(result.value, typeName)
                                manager.add(mmm)
                            }

                            if (this.kind === 'Lambda') {
                                let mmm = manager.makeLambda(result.value, typeName)
                                manager.add(mmm)
                            }

                            if (this.kind === 'Property') {
                                let ppp = manager.makeProperty(result.value, typeName)
                                manager.add(ppp)
                            }
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
                        this.ctype.MemberManager.remove(member)
                        this.cmodule.save()
                    }
                })
            }
        }
    }
</script>
