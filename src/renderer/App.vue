<template>
    <div id="app">
        <router-view class="container"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'code-builder'
    }
</script>

<style>
    body {
        font-size: 16px;
    }

    .inline {
        display: inline-block;
    }

    .syntax {
        color: dodgerblue;
    }

    label.code {
        font-weight: normal;
    }

    label.syntax {
        font-weight: normal;
    }

    .name {
        color: black;
        font-weight: bold;
    }

    .ok {
        width: 100%;
    }

    .button {
        cursor: pointer;
        color: gray;
        padding: 6px;
        text-align: center;
    }

    .button.active {
        color: dodgerblue;
        border: solid 1px #ccc;
        border-radius: 4px;
        padding: 6px 12px;
    }

    .button:hover {
        border: solid 1px #ccc;
        border-radius: 4px;
        padding: 6px 12px;
    }

    .table.no-border td {
        border: 0;
    }

</style>
