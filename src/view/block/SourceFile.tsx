import React, { ReactElement, useState } from 'react'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Vendor from '../../model/Vendor'
import SourceFileContext, { ContextData } from '../context/SourceFileContext'
import MenuModal from '../control/MenuModal'
import Statementxx from '../statement/Statementxx'

interface Props {
    state: Vendor
}

export default function SourceFile({ state }: Props): ReactElement | null {
    const [ast, setSourceFile] = useState(state.sf)
    function update() {
        setSourceFile(state.sf)
    }
    const data = new ContextData(state, update)
    return (
        <SourceFileContext.Provider value={data}>
            <div className="p-4">
                {ast.statements.length === 0 ? null : (
                    <Statementxx list={ast.statements}></Statementxx>
                )}
                <div>
                    <MenuModal factory={StatementMenuFactory(ast)}>
                        <span className="cursor-pointer px-2 py-1 mr-1">+</span>
                    </MenuModal>
                </div>
            </div>
        </SourceFileContext.Provider>
    )
}
