import React, { ReactElement } from 'react'
import ts from 'typescript'
import HeritageClauseMenuFactory from '../../helper/Menu/HeritageClauseMenuFactory'
import MenuButton from '../control/MenuButton'
import Keyword from '../text/Keyword'
import TypeArrayBox from '../type/TypeArrayBox'

interface Props {
    node: ts.HeritageClause
}

export default function HeritageClause({ node }: Props): ReactElement {
    return (
        <div>
            <MenuButton factory={HeritageClauseMenuFactory(node.parent, node)}>
                <Keyword kind={node.token} suffix=" "></Keyword>
            </MenuButton>
            <TypeArrayBox list={node.types} parent={node}></TypeArrayBox>
        </div>
    )
}
