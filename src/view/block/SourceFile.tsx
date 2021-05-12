import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import SourceFileMenuFactory from '../../helper/Menu/SourceFileMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext, { ContextData } from '../context/SourceFileContext'
import LineButton from '../control/LineButton'
import Declaration from '../declaration/Declaration'

interface Props {
    sf: ts.SourceFile
}

export default function SourceFile({ sf }: Props): ReactElement | null {
    const [state, setSourceFile] = useState(sf)
    function update(sf: ts.SourceFile) {
        setSourceFile(sf)
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

    const data = new ContextData(state, update)
    return (
        <SourceFileContext.Provider value={data}>
            {getList(state)}
            <div>
                <LineButton
                    visible={true}
                    factory={SourceFileMenuFactory()}
                ></LineButton>
            </div>
        </SourceFileContext.Provider>
    )
}
