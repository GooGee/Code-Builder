import React, { ReactElement, useContext } from 'react'
import Popup from 'reactjs-popup'
import ts from 'typescript'
import SourceFileContext from '../context/SourceFileContext'

interface Props {
    children: ReactElement
    node: ts.Node
}

export default function Diagnostic({ children, node }: Props): ReactElement {
    const context = useContext(SourceFileContext)
    const diagnostic = context.state?.worker.diagnosticMap.get(node.getStart())
    if (diagnostic === undefined) {
        return children
    }

    return (
        <span className="literal cursor-pointer">
            {children}
            <Popup
                trigger={<span className="error cursor-pointer"> X </span>}
                closeOnDocumentClick
                position="bottom left"
            >
                <span>
                    {typeof diagnostic.messageText === 'string'
                        ? diagnostic.messageText
                        : diagnostic.messageText.messageText}
                </span>
            </Popup>
        </span>
    )
}
