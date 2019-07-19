import * as fs from 'fs'
import Project, { ProjectPath } from './Project'
import Module from './data/Module'
import Structure from './data/Structure'
import { Statement } from './code/Statement'

export class Builder {
    project: Project | null = null
    module: Module | null = null
    type: Structure | null = null
    statement: Statement | null = null

    get projectList() {
        if (!fs.existsSync(ProjectPath)) {
            fs.mkdirSync(ProjectPath)
        }
        return fs.readdirSync(ProjectPath)
    }

    makeProject(name: string) {
        this.project = new Project(name)
        return this.project
    }

    loadProject(name: string) {
        return this.project = Project.load(name)
    }

    show(module: Module, type: Structure) {
        this.module = module
        this.type = type
        this.type.open()
    }
}

const builder = new Builder

export default builder
