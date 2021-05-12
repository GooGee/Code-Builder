import { createContext } from 'react'
import ts from 'typescript'

interface Update {
    (): void
}

export class ContextData {
    constructor(
        readonly sf: ts.SourceFile | undefined,
        readonly update: Update | undefined,
    ) {}
}

const SourceFileContext = createContext<ContextData>(
    new ContextData(undefined, undefined),
)

export default SourceFileContext
