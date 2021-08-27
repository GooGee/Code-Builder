import React, { ReactElement, useContext, useState } from 'react'
import ts from 'typescript'
import ObjectTypeMenuFactory from '../../helper/Menu/ObjectTypeMenuFactory'
import Transformer from '../../helper/Transformer/Transformer'
import TypeNodeTransformer from '../../helper/Transformer/TypeNodeTransformer'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext from '../context/SourceFileContext'
import Button from '../control/Button'
import ObjectTypeMenu from '../control/ObjectTypeMenu'
import TypeNode from './TypeNode'
import TypeNodexx from './TypeNodexx'

interface Props {
    list: ts.NodeArray<ts.TypeNode>
    parent: ts.HeritageClause | ts.UnionTypeNode
    separator?: string
}

export default function TypeArrayBox({
    list,
    parent,
    separator = ', ',
}: Props): ReactElement {
    const context = useContext(SourceFileContext)
    const [editing, setEditing] = useState(false)
    if (editing) {
        const uk = UniqueKey()
        return (
            <div
                onClick={(event) => event.stopPropagation()}
                className="ml-11 p-2 border-gray-200 border rounded-md"
            >
                <Button onClick={() => setEditing(false)}>x</Button>
                {list.map((item) => (
                    <div key={uk()}>
                        <Button
                            onClick={() => {
                                TypeNodeTransformer.addType(parent, item)
                                context.update()
                            }}
                            color="green"
                        >
                            +
                        </Button>
                        <Button
                            onClick={() => {
                                if (list.length === 1) {
                                    window.alert('Cannot delete all types!')
                                    return
                                }
                                if (window.confirm('Are you sure?')) {
                                    Transformer.replace(item, undefined)
                                    context.update()
                                }
                            }}
                            color="red"
                        >
                            -
                        </Button>
                        <ObjectTypeMenu
                            factory={ObjectTypeMenuFactory}
                            node={item}
                            parent={item.parent}
                            required={true}
                        >
                            <TypeNode node={item}></TypeNode>
                        </ObjectTypeMenu>
                    </div>
                ))}
                <div>
                    <Button
                        onClick={() => {
                            TypeNodeTransformer.addType(parent)
                            context.update()
                        }}
                        color="green"
                    >
                        +
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <span
            onClick={(event) => {
                event.stopPropagation()
                setEditing(true)
            }}
        >
            <TypeNodexx list={list} separator={separator}></TypeNodexx>
        </span>
    )
}
