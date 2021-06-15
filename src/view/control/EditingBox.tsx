import React, { ReactElement } from 'react'
import Button from './Button'
import { Hide } from './StatementLine'

interface Props {
    children: any
    hide: Hide
}

export default function EditingBox({ children, hide }: Props): ReactElement {
    return (
        <span>
            <Button
                onClick={(event) => {
                    event.stopPropagation()
                    hide()
                }}
                color="red"
            >
                <span className="text-red-600">x</span>
            </Button>

            {children}
        </span>
    )
}
