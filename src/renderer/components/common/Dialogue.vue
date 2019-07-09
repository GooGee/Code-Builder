<template>
    <div v-if="dData.visible" class="modal" tabindex="-1" role="dialog" style="display: block">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span v-show="dData.canClose" @click="close" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </span>
                    <h4 class="modal-title">
                        <slot name="title"></slot>
                    </h4>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div v-show="dData.hasFooter" class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
</template>

<script>
    export class DialogueData {
        constructor(canClose = true, hasFooter = false) {
            this.visible = false
            this.canClose = canClose
            this.hasFooter = hasFooter
        }

        show() {
            this.visible = true
        }

        close() {
            this.visible = false
        }
    }

    export const Dialogue = {
        name: 'Dialogue',
        props: ['dData'],
        methods: {
            close() {
                this.dData.close()
            }
        }
    }

    export default Dialogue
</script>
