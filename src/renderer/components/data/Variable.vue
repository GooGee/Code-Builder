<template>
    <span>
        <template v-if="editing">
            <template v-if="isProperty">
                <Modifier :modifier="variable.modifier" kind="abstract"></Modifier>
                <Modifier :modifier="variable.modifier" kind="readonly"></Modifier>
            </template>
            <Modifier v-if="inClass || isProperty" :modifier="variable.modifier" kind="static"></Modifier>

            <span @click="setName" class="btn btn-default">{{variable.name}}</span>

            <template v-if="variable.hasType">
                <span class="syntax">as</span>
                <TypeNode @changeType="changeType" :ctype="variable.type"></TypeNode>
            </template>

            <template v-if="hasValue">
                <span @click="setValue" class="button"> = </span>
                <Box v-if="variable.initializer" :box="variable.initializer" :editing="true"></Box>
            </template>
        </template>

        <template v-else>
            <span class="syntax">{{variable.modifier.text}}</span>
            <span>{{variable.name}}</span>
            <slot name="parameter"></slot>

            <template v-if="variable.hasType">
                <span class="syntax">as</span>
                <span>{{variable.type.text}}</span>
            </template>

            <template v-if="hasValue && variable.initializer">
                <span> = </span>
                <Box :box="variable.initializer" :editing="false"></Box>
            </template>
        </template>
    </span>
</template>

<script>
    import builder from '@/model/builder'
    import { enter, look } from '@/model/ui/Dialogue'
    import Menu from '@/model/ui/Menu'
    import TypeMenu from '@/model/ui/TypeMenu'
    import Box from '../code/Box'
    import Modifier from './Modifier'
    import TypeNode from './TypeNode'

    export default {
        name: 'Variable',
        components: { Box, Modifier, TypeNode },
        props: ['variable', 'noValue', 'editing', 'inClass', 'isProperty'],
        data() {
            return {
                hasValue: !this.noValue
            }
        },
        methods: {
            setName() {
                enter('Please enter the name', this.variable.name).then(result => {
                    if (result.value) {
                        try {
                            this.variable.name = result.value
                            builder.module.save()
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            },
            setValue() {
                let menu = new Menu()

                menu.add('Remove value', label => {
                    this.variable.clearValue()
                    builder.module.save()
                })

                menu.addSeparator()

                let list = builder.project.getTypeSignatureList(this.variable.type.type)
                list.forEach(signature => {
                    const list = []
                    signature.parameters.forEach(parameter => list.push(parameter.name))
                    const label = 'new ( ' + list.join(', ') + ' )'
                    menu.add(label, label => {
                        this.variable.makeNew(signature.parameters)
                        builder.module.save()
                    })
                })

                menu.add('null', label => {
                    this.variable.setValue(label)
                    builder.module.save()
                })

                menu.show()
            },
            changeType() {
                let tm = new TypeMenu(builder)
                tm.show(name => {
                    this.variable.setType(name)
                    builder.module.save()
                })
            }
        }
    }
</script>
