import React, { ReactElement } from 'react'

interface Props {
    children: string | ReactElement
}

export default function Button({ children }: Props): ReactElement {
    return (
        <span className="cursor-pointer hover:bg-blue-200 px-2 border border-blue-300 rounded-md">
            {children}
        </span>
    )
}
