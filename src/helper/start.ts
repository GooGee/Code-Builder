import { createSystem } from '@typescript/vfs'
import ts from 'typescript'
import CodeMap from '../asset/CodeMap'
import options from '../asset/CompilerOptions'
import LibraryMap from '../asset/LibraryMap'
import Checker from '../model/TS/Checker'
import Host from '../model/TS/Host'
import Worker from '../model/TS/Worker'
import Vendor from '../model/Vendor'

const fileMap: Map<string, string> = new Map()

for (const key in LibraryMap) {
    if (Object.prototype.hasOwnProperty.call(LibraryMap, key)) {
        fileMap.set(key, LibraryMap[key])
    }
}

const file = 'index.ts'
fileMap.set(file, CodeMap.statement)

export default function start() {
    const fs = createSystem(fileMap)
    const host = new Host(fs, options, [file])
    const ls = ts.createLanguageService(host)
    const checker = new Checker(ls.getProgram()!)
    const worker = new Worker(checker, fs, host, ls)
    return new Vendor(worker, file)
}
