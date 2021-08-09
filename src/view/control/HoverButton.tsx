import React, { ReactElement } from 'react'

interface Props {
    children: string | ReactElement
}

export default function HoverButton({ children }: Props): ReactElement {
    return (
        <span className="cursor-pointer hover:text-green-500">
            {children}
        </span>
    )
}
