<template>
    <Dialogue :dData="ldData.dData">
        <template slot="title">{{ldData.message}}</template>
        <template slot="body">
            <List :lData="ldData.lData" @select="close"></List>
        </template>
    </Dialogue>
</template>

<script>
    import { Dialogue, DialogueData } from './Dialogue'
    import { List, ListData } from './List'

    export class ListDialogueData {
        /**
         * message
         * item list
         * member name of item, for displaying
         * member name of item, for displaying extra info
         * call back function
         **/
        constructor(message, list, textName, infoName, CallBack) {
            this.message = message
            this.lData = new ListData(list, textName, infoName, CallBack)
            this.dData = new DialogueData()
        }

        show() {
            this.dData.show()
        }
    }

    export const ListDialogue = {
        name: 'ListDialogue',
        components: { Dialogue, List },
        props: ['ldData'],
        methods: {
            close() {
                this.ldData.dData.close()
            }
        }
    }

    export default ListDialogue
</script>
