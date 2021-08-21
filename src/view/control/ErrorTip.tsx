import React, { ReactElement } from 'react'
import Popup from 'reactjs-popup'
import ts from 'typescript'

interface Props {
    text?: string
    diagnostic: ts.Diagnostic
}

export default function ErrorTip({
    text = 'X',
    diagnostic,
}: Props): ReactElement {
    return (
        <Popup
            trigger={<span className="error cursor-pointer"> {text} </span>}
            closeOnDocumentClick
            position="bottom left"
        >
            <span>
                {typeof diagnostic.messageText === 'string'
                    ? diagnostic.messageText
                    : diagnostic.messageText.messageText}
            </span>
        </Popup>
    )
}
