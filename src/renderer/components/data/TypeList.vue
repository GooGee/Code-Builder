<template>
    <div>
        <div v-for="type in manager.list">
            <span @click="remove(type)" class="button"> - </span>
            <TypeBox :box="type" kind="Type"></TypeBox>
        </div>
    </div>
</template>

<script>
    import TypeBox from './TypeBox'

    export default {
        name: 'TypeList',
        components: { TypeBox },
        props: ['manager'],
        data() {
            return {
            }
        },
        methods: {
            remove() {

            }
        }
    }
</script>
