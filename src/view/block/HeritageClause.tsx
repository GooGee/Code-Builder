import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import ExpressionWithTypeArguments from '../expression/ExpressionWithTypeArguments'
import Keyword from '../text/Keyword'

interface Props {
    editing: boolean
    node: ts.HeritageClause | undefined
}

export default function HeritageClause({
    editing,
    node,
}: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    const uk = UniqueKey()
    return (
        <div>
            <Keyword kind={node.token}></Keyword>{' '}
            {node.types.map((type) => {
                return (
                    <ExpressionWithTypeArguments
                        editing={editing}
                        node={type}
                        key={uk()}
                    ></ExpressionWithTypeArguments>
                )
            })}
        </div>
    )
}
