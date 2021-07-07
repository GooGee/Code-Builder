import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import SourceFileMenuFactory from '../../helper/Menu/SourceFileMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import StatementLine from '../control/StatementLine'
import MenuButton from '../control/MenuButton'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import ConstructorDeclaration from './ConstructorDeclaration'
import MethodDeclaration from './MethodDeclaration'
import PropertyDeclaration from './PropertyDeclaration'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'
import Heritagexx from './Heritagexx'

interface Props {
    node: ts.ClassDeclaration
}

export default function ClassDeclaration({ node }: Props): ReactElement {
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
                            editing={editing}
                            node={node.name!}
                        ></IdentifierDeclaration>
                        <TypeParameterDeclarationxx
                            editing={editing}
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
                        menuFactory={ClassMenuFactory(node, item)}
                        viewFactory={(editing) =>
                            ts.isConstructorDeclaration(item) ? (
                                <ConstructorDeclaration
                                    editing={editing}
                                    node={item}
                                ></ConstructorDeclaration>
                            ) : ts.isMethodDeclaration(item) ? (
                                <MethodDeclaration
                                    editing={editing}
                                    node={item}
                                ></MethodDeclaration>
                            ) : ts.isPropertyDeclaration(item) ? (
                                <PropertyDeclaration
                                    editing={editing}
                                    node={item}
                                ></PropertyDeclaration>
                            ) : null
                        }
                    ></StatementLine>
                ))}
                <MenuButton
                    visible={true}
                    factory={ClassMenuFactory(node)}
                ></MenuButton>
            </div>
            {'}'}
        </div>
    )
}
