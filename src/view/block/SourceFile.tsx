import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import Declaration from '../declaration/Declaration'

interface Props {
    sf: ts.SourceFile | undefined
}

export default function SourceFile({ sf }: Props): ReactElement | null {
    if (sf === undefined) {
        return null
    }
    if (sf.statements.length === 0) {
        return null
    }

    const uk = UniqueKey()
    return (
        <div>
            {sf.statements
                .map((item) => {
                    return (
                        <Declaration
                            node={item as any}
                            key={uk()}
                        ></Declaration>
                    )
                })
                .reduce((previousValue, currentValue): any => {
                    return [previousValue, <hr key={uk()} />, currentValue]
                })}
        </div>
    )
}
