import * as ts from 'typescript'
import * as fs from 'fs'
import NameManager from './NameManager'
import Module, { ModuleChange } from './Module'
import Project from '../Project'
import { EventListener } from '../Event'

export default class ModuleManager extends NameManager<Module> {
    readonly project: Project
    readonly ModuleChangeListener = new EventListener<ModuleChange>(ea => {
        this.project.update()
    })

    constructor(project: Project) {
        super()
        this.project = project
    }

    findPath(path: string): Module | undefined {
        return this.list.find(mmm => mmm.path == path)
    }

    make(name: string) {
        const path = Module.makeFileName(name, this.project.codePath)
        const sf = ts.createSourceFile(
            path,
            '',
            ts.ScriptTarget.ES2015,
            undefined,
            ts.ScriptKind.TS
        )
        const mmm = new Module(sf)
        mmm.save()
        return mmm
    }

    load(list: Array<string>) {
        list.forEach(file => {
            const sf = this.project.getSourceFile(file)
            if (sf) {
                const mmm = new Module(sf)
                this.add(mmm)
                mmm.load()
            }
        })
    }

    update(list: Array<string>) {
        list.forEach(file => {
            const sf = this.project.getSourceFile(file)
            if (sf) {
                const mmm = this.findPath(sf.fileName)
                if (mmm) {
                    mmm.update(sf)
                }
            }
        })
    }

    save() {
        this.list.forEach(mmm => {
            mmm.save()
        })
    }

    insertAt(index: number, item: Module) {
        if (index > -1) {
            super.insertAt(index, item)
            this.ModuleChangeListener.listen(item.AfterModuleChange)
        }
    }

    remove(item: Module) {
        super.remove(item)
        this.ModuleChangeListener.ignore(item.AfterModuleChange)
        fs.unlinkSync(item.path)
        this.project.update()
    }

}
