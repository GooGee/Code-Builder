import { createContext } from 'react'
import Vendor from '../../model/Vendor'

export class ContextData {
    constructor(
        readonly state: Vendor | undefined,
        readonly update: () => void,
    ) {}
}

const SourceFileContext = createContext<ContextData>(
    new ContextData(undefined, () => {}),
)

export default SourceFileContext
