import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import Transformer from '../../helper/Transformer/Transformer'
import TypeNodeTransformer from '../../helper/Transformer/TypeNodeTransformer'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext from '../context/SourceFileContext'
import Button from '../control/Button'
import MenuButton from '../control/MenuButton'
import TypeNode from './TypeNode'

interface Props {
    children: ReactElement
    list: ts.NodeArray<ts.TypeNode>
    parent: ts.HeritageClause | ts.UnionTypeNode
}

export default function TypeArrayView({
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
                            TypeNodeTransformer.addType(parent, item)
                            context.update!()
                        }}
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
                    <MenuButton
                        factory={TypeMenuFactory(parent, item)}
                    ></MenuButton>
                    <TypeNode node={item}></TypeNode>
                </div>
            ))}
            <div>
                <Button
                    onClick={() => {
                        TypeNodeTransformer.addType(parent)
                        context.update!()
                    }}
                >
                    +
                </Button>
            </div>
        </div>
    )
}
