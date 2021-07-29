import React, { ReactElement } from 'react'

interface Props {
    text?: string
}

export default function HoverStar({ text = '*' }: Props): ReactElement {
    return (
        <span className="cursor-pointer px-2 text-white hover:text-green-500">
            {text}
        </span>
    )
}
