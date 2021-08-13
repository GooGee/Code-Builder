import React, { ReactElement } from 'react'
import ts from 'typescript'
import HeritageClauseMenuFactory from '../../helper/Menu/HeritageClauseMenuFactory'
import MenuButton from '../control/MenuButton'
import Keyword from '../text/Keyword'
import TypeArrayBox from '../type/TypeArrayBox'
import TypeRoot from '../type/TypeRoot'

interface Props {
    node: ts.HeritageClause
}

export default function HeritageClause({ node }: Props): ReactElement {
    function getTypes() {
        const parent = node.parent
        if (ts.isClassLike(parent)) {
            if (node.token === ts.SyntaxKind.ExtendsKeyword) {
                return (
                    <TypeRoot
                        node={node.types[0]}
                        parent={parent}
                        required={true}
                    ></TypeRoot>
                )
            }
        }
        return <TypeArrayBox list={node.types} parent={node}></TypeArrayBox>
    }

    return (
        <div>
            <MenuButton factory={HeritageClauseMenuFactory(node.parent, node)}>
                <Keyword kind={node.token} suffix=" "></Keyword>
            </MenuButton>
            {getTypes()}
        </div>
    )
}
