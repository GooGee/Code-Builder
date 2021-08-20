import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import Transformer from '../../helper/Transformer/Transformer'
import TypeParameterTransformer from '../../helper/Transformer/TypeParameterTransformer'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext from '../context/SourceFileContext'
import Button from '../control/Button'
import TypeParameterDeclaration from './TypeParameterDeclaration'

interface Props {
    children: ReactElement
    list: ts.NodeArray<ts.TypeParameterDeclaration> | undefined
    parent:
        | ts.ClassDeclaration
        | ts.InterfaceDeclaration
        | ts.FunctionDeclaration
        | ts.MethodDeclaration
        | ts.MethodSignature
        | ts.TypeAliasDeclaration
}

export default function TypeParameterBox({
    children,
    list,
    parent,
}: Props): ReactElement {
    const context = useContext(SourceFileContext)
    const uk = UniqueKey()
    return (
        <div className="ml-11 p-2 border-gray-200 border rounded-md">
            {children}
            {list === undefined
                ? null
                : list.map((item) => (
                      <div key={uk()}>
                          <Button
                              onClick={() => {
                                  TypeParameterTransformer.addNode(parent, item)
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
                          <TypeParameterDeclaration
                              node={item}
                          ></TypeParameterDeclaration>
                      </div>
                  ))}
            <div>
                <Button
                    onClick={() => {
                        TypeParameterTransformer.addNode(parent)
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
