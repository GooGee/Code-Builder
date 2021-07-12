import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import TypeNodexx from '../type/TypeNodexx'

interface Props {
    
    node: ts.HeritageClause
}

export default function HeritageClause({  node }: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.token} suffix=" "></Keyword>
            <TypeNodexx
               
                list={node.types}
                separator=", "
            ></TypeNodexx>
        </div>
    )
}
