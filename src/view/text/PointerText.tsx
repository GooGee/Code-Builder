import React, { ReactElement } from 'react'

interface Props {
    children: string
}

export default function PointerText({ children }: Props): ReactElement {
    return <span className="keyword cursor-pointer">{children}</span>
}
