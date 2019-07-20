<template>
    <div>
        <span v-if="editing" @click="$emit('remove', cimport)" class="button"> - </span>
        <span class="syntax">import</span>
        <span class="name">*</span>
        <span class="syntax">as</span>
        <span v-if="editing" @click="alias" class="button">{{cimport.name}}</span>
        <span v-else>{{cimport.name}}</span>
        <span class="syntax">from</span>
        <span>'{{cimport.path}}'</span>
    </div>
</template>

<script>
    import { enter, look } from '@/model/ui/Dialogue'

    export default {
        name: 'Import',
        props: ['cimport', 'editing'],
        data() {
            return {
            }
        },
        methods: {
            alias() {
                enter('Please enter the name', this.cimport.name).then(result => {
                    if (result.value) {
                        try {
                            this.cimport.name = result.value
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            }
        }
    }
</script>
