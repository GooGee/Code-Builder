<template>
    <span>
        <label v-if="kind=='abstract'" class="syntax">
            <input v-model="modifier.hasAbstract" type="checkbox"> abstract
        </label>
        <label v-if="kind=='export'" class="syntax">
            <input v-model="modifier.hasExport" type="checkbox"> export
        </label>
        <label v-if="kind=='readonly'" class="syntax">
            <input v-model="modifier.hasReadonly" type="checkbox"> readonly
        </label>
        <label v-if="kind=='static'" class="syntax">
            <input v-model="modifier.hasStatic" type="checkbox"> static
        </label>
    </span>
</template>

<script>
    export default {
        name: 'Modifier',
        props: ['modifier', 'kind'],
        data() {
            return {
            }
        }
    }
</script>
