import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import SourceFileMenuFactory from '../../helper/Menu/SourceFileMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import Vendor from '../../model/Vendor'
import SourceFileContext, { ContextData } from '../context/SourceFileContext'
import LineButton from '../control/LineButton'
import Declaration from '../declaration/Declaration'

interface Props {
    sf: ts.SourceFile
    state: Vendor
}

export default function SourceFile({ sf, state }: Props): ReactElement | null {
    const [ast, setSourceFile] = useState(sf)
    function update() {
        setSourceFile(state.sf)
    }

    const uk = UniqueKey()
    function getList(sf: ts.SourceFile) {
        if (sf.statements.length === 0) {
            return null
        }
        return sf.statements
            .map((item) => (
                <Declaration node={item as any} key={uk()}></Declaration>
            ))
            .reduce((previousValue, currentValue): any => [
                previousValue,
                <hr key={uk()} />,
                currentValue,
            ])
    }

    const data = new ContextData(ast, update)
    return (
        <SourceFileContext.Provider value={data}>
            {getList(ast)}
            <div>
                <LineButton
                    visible={true}
                    factory={SourceFileMenuFactory()}
                ></LineButton>
            </div>
        </SourceFileContext.Provider>
    )
}
