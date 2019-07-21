<template>
    <div>
        <div class="row">
            <div class="col-xs-3">
                <ModuleList :project="builder.project"></ModuleList>
            </div>

            <div class="col-xs-9" v-if="builder.type">
                <br>
                <Class v-if="isClass" :cmodule="builder.module" :ctype="builder.type"></Class>
                <Enum v-if="isEnum" :cmodule="builder.module" :ctype="builder.type"></Enum>
                <Interface v-if="isInterface" :cmodule="builder.module" :ctype="builder.type"></Interface>
            </div>
        </div>
    </div>
</template>

<script>
    import builder from '@/model/builder'
    import Class from './data/Class'
    import Enum from './data/Enum'
    import Interface from './data/Interface'
    import ModuleList from './data/ModuleList'

    export default {
        name: 'Project',
        components: { Class, Enum, Interface, ModuleList },
        data() {
            return {
                builder: builder
            }
        },
        computed: {
            isClass() {
                if (builder.type) {
                    return builder.type.isClass
                }
                return false
            },
            isEnum() {
                if (builder.type) {
                    return builder.type.isEnum
                }
                return false
            },
            isInterface() {
                if (builder.type) {
                    return builder.type.isInterface
                }
                return false
            }
        }
    }
</script>
