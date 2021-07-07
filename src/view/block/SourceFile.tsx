import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Vendor from '../../model/Vendor'
import SourceFileContext, { ContextData } from '../context/SourceFileContext'
import MenuButton from '../control/MenuButton'
import Statementxx from '../statement/Statementxx'

interface Props {
    sf: ts.SourceFile
    state: Vendor
}

export default function SourceFile({ sf, state }: Props): ReactElement | null {
    const [ast, setSourceFile] = useState(sf)
    function update() {
        setSourceFile(state.sf)
    }
    const data = new ContextData(ast, update)
    return (
        <SourceFileContext.Provider value={data}>
            <div className="p-4">
                {sf.statements.length === 0 ? null : (
                    <Statementxx list={ast.statements}></Statementxx>
                )}
                <div>
                    <MenuButton
                        text="+"
                        visible={true}
                        factory={StatementMenuFactory(ast)}
                    ></MenuButton>
                </div>
            </div>
        </SourceFileContext.Provider>
    )
}
