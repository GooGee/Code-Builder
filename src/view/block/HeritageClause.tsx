import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import TypeArrayBox from '../type/TypeArrayBox'

interface Props {
    node: ts.HeritageClause
}

export default function HeritageClause({ node }: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.token} suffix=" "></Keyword>
            <TypeArrayBox list={node.types} parent={node}></TypeArrayBox>
        </div>
    )
}
