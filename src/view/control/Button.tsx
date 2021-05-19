import React, { ReactElement } from 'react'

interface Props {
    children: string | ReactElement
    color?: string
}

export default function Button({
    children,
    color = 'blue',
}: Props): ReactElement {
    const list = [
        `border-${color}-300`,
        `hover:bg-${color}-200`,
        'cursor-pointer px-2 border rounded-md',
    ]
    return <span className={list.join(' ')}>{children}</span>
}
