import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import TypeRoot from './TypeRoot'

interface Props {
    list: ts.NodeArray<ts.TypeNode> | undefined
    parent: ts.ExpressionWithTypeArguments | ts.TypeReferenceNode
}

export default function TypeArgumentxx({
    list,
    parent,
}: Props): ReactElement | null {
    if (list === undefined) {
        return null
    }
    if (list.length === 0) {
        return null
    }

    const uk = UniqueKey()
    return (
        <span onClick={(event) => event.stopPropagation()}>
            &lt;
            {list
                .map((node) => (
                    <TypeRoot
                        key={uk()}
                        node={node}
                        parent={node.parent}
                        required={true}
                    ></TypeRoot>
                ))
                .reduce((previousValue, currentValue): any => {
                    return [previousValue, ', ', currentValue]
                })}
            &gt;
        </span>
    )
}
