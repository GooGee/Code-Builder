import React, { ReactElement } from 'react'
import ts from 'typescript'
import ParameterMenuFactory from '../../helper/Menu/ParameterMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import MenuButton from '../control/MenuButton'
import ParameterDeclaration from './ParameterDeclaration'

interface Props {
    list: ts.NodeArray<ts.ParameterDeclaration>
    parent: ts.SignatureDeclarationBase
}

export default function ParameterDeclarationxx({
    list,
    parent,
}: Props): ReactElement {
    const editing = false
    const uk = UniqueKey()
    return (
        <span>
            (
            {list.length === 0
                ? null
                : list.map((item) => (
                      <span key={uk()}>
                          {editing === false ? null : (
                              <MenuButton
                                  factory={ParameterMenuFactory(parent, item)}
                              ></MenuButton>
                          )}
                          <ParameterDeclaration
                              node={item}
                          ></ParameterDeclaration>
                      </span>
                  ))}
            {editing === false ? null : (
                <span>
                    {', '}
                    <MenuButton
                        text="+"
                        factory={ParameterMenuFactory(parent)}
                    ></MenuButton>
                </span>
            )}
            )
        </span>
    )
}
