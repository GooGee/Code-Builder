<template>
    <div>
        <Project v-if="builder.project"></Project>

        <div v-else class="row">
            <div class="col-xs-6 col-xs-offset-3">
                <br>
                <br>
                <br>
                <div class="list-group">
                    <button type="button" class="list-group-item disabled">Open Project</button>
                    <template v-for="project in builder.projectList">
                        <button type="button" @click="open(project)" class="list-group-item">{{project}}</button>
                    </template>
                    <button type="button" @click="add" class="list-group-item"> + New Project</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import { enter, look } from '@/model/ui/Dialogue'
    import Project from './Project'

    export default {
        name: 'Home',
        components: { Project },
        data() {
            return {
                builder: builder
            }
        },
        created() {
        },
        methods: {
            add() {
                enter('Please enter the name').then(result => {
                    if (result.value) {
                        try {
                            builder.makeProject(result.value)
                        } catch (error) {
                            look(error, 400)
                        }
                    }
                })
            },
            open(cbp) {
                try {
                    builder.loadProject(cbp)
                } catch (error) {
                    look(error, 400)
                }
            }
        }
    }
</script>
