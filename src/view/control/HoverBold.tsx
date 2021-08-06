import React, { ReactElement } from 'react'

interface Props {
    children: string | ReactElement
}

export default function HoverBold({ children }: Props): ReactElement {
    return (
        <span className="HoverBold cursor-pointer hover:text-green-500">
            {children}
        </span>
    )
}
