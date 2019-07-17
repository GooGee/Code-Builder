<template>
    <span>
        <label v-if="kind=='abstract'" class="syntax">
            <input v-model="modifier.hasAbstract" type="checkbox"> Abstract
        </label>
        <label v-if="kind=='export'" class="syntax">
            <input v-model="modifier.hasExport" type="checkbox"> Export
        </label>
        <label v-if="kind=='readonly'" class="syntax">
            <input v-model="modifier.hasReadonly" type="checkbox"> ReadOnly
        </label>
        <label v-if="kind=='static'" class="syntax">
            <input v-model="modifier.hasStatic" type="checkbox"> Static
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
