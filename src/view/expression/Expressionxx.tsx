import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    list: ts.NodeArray<ts.Expression>
}

export default function Expressionxx({ list }: Props): ReactElement | null {
    if (list === undefined) {
        return null
    }
    if (list.length === 0) {
        return null
    }

    const uk = UniqueKey()
    return (
        <span>
            {list
                .map((item) => {
                    return (
                        <ExpressionRoot
                            key={uk()}
                            node={item}
                            parent={item.parent}
                        ></ExpressionRoot>
                    )
                })
                .reduce((previousValue, currentValue): any => {
                    return [previousValue, ', ', currentValue]
                })}
        </span>
    )
}
