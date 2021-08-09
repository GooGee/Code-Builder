import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import ParameterTransformer from '../../helper/Transformer/ParameterTransformer'
import Transformer from '../../helper/Transformer/Transformer'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext from '../context/SourceFileContext'
import Button from '../control/Button'
import ExpressionRootEdit from '../expression/ExpressionRootEdit'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import TypeRoot from '../type/TypeRoot'

interface Props {
    children: ReactElement
    list: ts.NodeArray<ts.ParameterDeclaration>
    parent: ts.SignatureDeclarationBase
}

export default function ParameterTable({
    children,
    list,
    parent,
}: Props): ReactElement {
    const context = useContext(SourceFileContext)
    const uk = UniqueKey()
    return (
        <table className="ml-11 table">
            <thead>
                <tr>
                    <th>{children}</th>
                    <th className="text-right">name</th>
                    <th>type</th>
                    <th>value</th>
                </tr>
            </thead>
            <tbody>
                {list.map((node) => (
                    <tr key={uk()}>
                        <td>
                            <Button
                                onClick={() => {
                                    ParameterTransformer.addNode(parent, node)
                                    context.update!()
                                }}
                                color="green"
                            >
                                +
                            </Button>
                            <Button
                                onClick={() => {
                                    if (window.confirm('Are you sure?')) {
                                        Transformer.replace(node, undefined)
                                        context.update!()
                                    }
                                }}
                                color="red"
                            >
                                -
                            </Button>
                        </td>
                        <td className="text-right">
                            <IdentifierDeclaration
                                node={node.name as any}
                            ></IdentifierDeclaration>
                        </td>
                        <td>
                            <TypeRoot
                                node={node.type}
                                parent={node}
                                visible={true}
                            ></TypeRoot>
                        </td>
                        <td>
                            <ExpressionRootEdit
                                node={node.initializer}
                                parent={node}
                                propertyName="initializer"
                            ></ExpressionRootEdit>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <Button
                            onClick={() => {
                                ParameterTransformer.addNode(parent)
                                context.update!()
                            }}
                            color="green"
                        >
                            +
                        </Button>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}
