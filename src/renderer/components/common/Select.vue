<template>
    <select @change="change" v-model="data.value" class="form-control">
        <option disabled value="">...</option>
        <option v-for="item in data.list" :value="item" :key="text(item)">{{text(item)}}</option>
    </select>
</template>

<script>
    export class SelectData {
        /**
         * item list
         * default value
         * member name of item, for displaying
         * call back function
         **/
        constructor(list, value, textName, onChange) {
            this.list = list
            if (value) {
                this.value = value
            } else {
                this.value = ''
            }
            this.textName = textName
            this.onChange = onChange
        }
    }

    export default {
        name: 'CSelect',
        props: ['data'],
        methods: {
            text(item) {
                if (this.data.textName) {
                    return item[this.data.textName]
                }
                return item
            },
            change(event) {
                if (this.data.onChange) {
                    this.data.onChange(event.target.value)
                }
            }
        }
    }
</script>
