import React, { ReactElement } from 'react'

interface Props {
    text?: string
}

export default function TextButton({ text = '*' }: Props): ReactElement {
    return <span className="cursor-pointer px-2 text-green-500">{text}</span>
}
