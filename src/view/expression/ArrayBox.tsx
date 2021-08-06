import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import ExpressionTransformer from '../../helper/Transformer/ExpressionTransformer'
import Transformer from '../../helper/Transformer/Transformer'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext from '../context/SourceFileContext'
import Button from '../control/Button'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    children: ReactElement
    list: ts.NodeArray<ts.Expression>
    parent: ts.ArrayLiteralExpression
}

export default function ArrayBox({
    children,
    list,
    parent,
}: Props): ReactElement {
    const context = useContext(SourceFileContext)
    const uk = UniqueKey()
    return (
        <div className="ml-11 p-2 border-gray-200 border rounded-md">
            {children}
            {list.map((item) => (
                <div key={uk()}>
                    <Button
                        onClick={() => {
                            ExpressionTransformer.addNode(parent, item)
                            context.update!()
                        }}
                        color="green"
                    >
                        +
                    </Button>
                    <Button
                        onClick={() => {
                            if (window.confirm('Are you sure?')) {
                                Transformer.replace(item, undefined)
                                context.update!()
                            }
                        }}
                        color="red"
                    >
                        -
                    </Button>
                    <ExpressionRoot
                        node={item}
                        parent={item.parent}
                        visible={true}
                    ></ExpressionRoot>
                </div>
            ))}
            <div>
                <Button
                    onClick={() => {
                        ExpressionTransformer.addNode(parent)
                        context.update!()
                    }}
                    color="green"
                >
                    +
                </Button>
            </div>
        </div>
    )
}
