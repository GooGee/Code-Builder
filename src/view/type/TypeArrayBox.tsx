import React, { ReactElement, useContext, useState } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import Transformer from '../../helper/Transformer/Transformer'
import TypeNodeTransformer from '../../helper/Transformer/TypeNodeTransformer'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext from '../context/SourceFileContext'
import Button from '../control/Button'
import TypeMenu from '../control/TypeMenu'
import TypeNode from './TypeNode'
import TypeNodexx from './TypeNodexx'

interface Props {
    list: ts.NodeArray<ts.TypeNode>
    parent: ts.HeritageClause | ts.UnionTypeNode
    separator?: string
    onlyObjectType?: boolean
}

export default function TypeArrayBox({
    list,
    parent,
    separator = ', ',
    onlyObjectType = false,
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
                        <TypeMenu
                            factory={TypeMenuFactory}
                            node={item}
                            parent={item.parent}
                            required={true}
                            onlyObjectType={onlyObjectType}
                        >
                            <TypeNode node={item}></TypeNode>
                        </TypeMenu>
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
