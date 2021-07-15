import { createContext } from 'react'
import Vendor from '../../model/Vendor'

interface Update {
    (): void
}

export class ContextData {
    constructor(
        readonly state: Vendor | undefined,
        readonly update: Update | undefined,
    ) {}
}

const SourceFileContext = createContext<ContextData>(
    new ContextData(undefined, undefined),
)

export default SourceFileContext
