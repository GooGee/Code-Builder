<template>
    <div>
        <div class="btn-group">
            <span @click="add('Method')" class="btn btn-default"> + Method</span>
            <span @click="add('Property')" class="btn btn-default"> + Property</span>
        </div>

        <div v-for="member in ctype.MemberManager.list" :key="member.name">
            <Member :member="member" @remove="remove"></Member>
        </div>

        <TypeMenu v-if="tmData" :tmData="tmData"></TypeMenu>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { enter, look, sure } from '@/model/ui/Dialogue'
    import { OwnerKind } from '@/model/data/TypeBox'
    import Member from './Member'
    import TypeMenu, { TypeMenuData } from '../common/TypeMenu'

    export default {
        name: 'MemberList',
        components: { Member, TypeMenu },
        props: ['ctype', 'cmodule'],
        data() {
            return {
                kind: 0,
                tmData: null
            }
        },
        created() {
        },
        methods: {
            add(kind) {
                if (kind === 'Method') {
                    kind = OwnerKind.Function
                }
                if (kind === 'Property') {
                    kind = OwnerKind.Variable
                }
                this.kind = kind

                if (!this.tmData) {
                    this.tmData = new TypeMenuData(builder, kind)
                }
                this.tmData.kind = kind
                this.tmData.show(this.make.bind(this))
            },
            make(list) {
                if (list.length === 0) {
                    return
                }

                const last = list[list.length - 1]
                const name = last.toLowerCase()
                enter('Please enter the name', name).then(result => {
                    if (result.value) {
                        try {
                            const manager = this.ctype.MemberManager
                            if (result.value === 'constructor') {
                                this.kind = OwnerKind.Type
                                const mmm = manager.makeConstructor()
                                manager.add(mmm)
                            }

                            if (this.kind === OwnerKind.Function) {
                                const mmm = manager.makeMethod(result.value, list)
                                manager.add(mmm)
                            }

                            if (this.kind === OwnerKind.Variable) {
                                const ppp = manager.makeProperty(result.value, list)
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
