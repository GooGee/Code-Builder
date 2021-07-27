import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import TypeArrayView from '../type/TypeArrayView'

interface Props {
    node: ts.HeritageClause
}

export default function HeritageClause({ node }: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.token} suffix=" "></Keyword>
            <TypeArrayView list={node.types} parent={node}></TypeArrayView>
        </div>
    )
}
