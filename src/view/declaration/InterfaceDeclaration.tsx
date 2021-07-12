import React, { ReactElement } from 'react'
import ts from 'typescript'
import InterfaceMenuFactory from '../../helper/Menu/InterfaceMenuFactory'
import SourceFileMenuFactory from '../../helper/Menu/SourceFileMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import MenuButton from '../control/MenuButton'
import StatementLine from '../control/StatementLine'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import Heritagexx from './Heritagexx'
import MethodSignature from './MethodSignature'
import PropertySignature from './PropertySignature'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.InterfaceDeclaration
}

export default function InterfaceDeclaration({ node }: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <div>
            <StatementLine
                menuFactory={SourceFileMenuFactory(node)}
                viewFactory={(editing) => (
                    <span>
                        <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                        <Keyword kind={node.kind} suffix=" "></Keyword>
                        <IdentifierDeclaration
                            node={node.name}
                        ></IdentifierDeclaration>
                        <TypeParameterDeclarationxx
                            list={node.typeParameters}
                        ></TypeParameterDeclarationxx>
                        <Heritagexx
                            editing={editing}
                            list={node.heritageClauses}
                            parent={node}
                        ></Heritagexx>
                    </span>
                )}
            ></StatementLine>

            {'{'}
            <div className="pl-11">
                {node.members.map((item) => (
                    <StatementLine
                        key={uk()}
                        menuFactory={InterfaceMenuFactory(node, item)}
                        viewFactory={(editing) => (
                            <span>
                                {ts.isMethodSignature(item) ? (
                                    <MethodSignature
                                        editing={editing}
                                        node={item}
                                    ></MethodSignature>
                                ) : ts.isPropertySignature(item) ? (
                                    <PropertySignature
                                        editing={editing}
                                        node={item}
                                    ></PropertySignature>
                                ) : null}
                            </span>
                        )}
                    ></StatementLine>
                ))}
                <MenuButton
                    visible={true}
                    factory={InterfaceMenuFactory(node)}
                ></MenuButton>
            </div>
            {'}'}
        </div>
    )
}
