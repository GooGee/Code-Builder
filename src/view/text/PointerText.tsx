import React, { ReactElement } from 'react'

interface Props {
    children: string
    onClick?: () => void
}

export default function PointerText({
    children,
    onClick,
}: Props): ReactElement {
    return (
        <span onClick={onClick} className="keyword cursor-pointer">
            {children}
        </span>
    )
}
