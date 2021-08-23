import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import ObjectChildMenuFactory from '../../helper/Menu/ObjectChildMenuFactory'
import SourceFileContext from '../context/SourceFileContext'
import ErrorTip from '../control/ErrorTip'
import ObjectChildMenu from '../control/ObjectChildMenu'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ThisExpression
}

export default function ThisExpression({ node }: Props): ReactElement {
    const context = useContext(SourceFileContext)
    if (context.state?.worker.diagnosticMap.has(node.getStart())) {
        const diagnostic = context.state?.worker.diagnosticMap.get(
            node.getStart(),
        )
        return (
            <span>
                <ObjectChildMenu factory={ObjectChildMenuFactory} node={node}>
                    <Keyword kind={node.kind as any}></Keyword>
                </ObjectChildMenu>

                <span className="identifier cursor-pointer">
                    <ErrorTip diagnostic={diagnostic!}></ErrorTip>
                </span>
            </span>
        )
    }
    return (
        <ObjectChildMenu factory={ObjectChildMenuFactory} node={node}>
            <Keyword kind={node.kind as any}></Keyword>
        </ObjectChildMenu>
    )
}
