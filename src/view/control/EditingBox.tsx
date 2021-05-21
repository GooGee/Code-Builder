import React, { ReactElement } from 'react'
import Button from './Button'
import { Hide } from './StatementLine'

interface Props {
    children: any
    hide: Hide
}

export default function EditingBox({ children, hide }: Props): ReactElement {
    return (
        <div>
            {children}

            <div>
                <Button color="red">
                    <span
                        onClick={(event) => {
                            event.stopPropagation()
                            hide()
                        }}
                        className="text-red-600"
                    >
                        x
                    </span>
                </Button>
            </div>
        </div>
    )
}
