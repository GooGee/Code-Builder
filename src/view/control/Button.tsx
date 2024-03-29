import React, { ReactElement } from 'react'

interface Props {
    children: string | ReactElement
    color?: string
    onClick?: React.MouseEventHandler<HTMLSpanElement>
}

export default function Button({
    children,
    color = 'blue',
    onClick,
}: Props): ReactElement {
    const list = [
        `border-${color}-300`,
        `text-${color}-500`,
        `hover:bg-${color}-200`,
        'cursor-pointer px-2 mr-1 border rounded-md',
    ]
    return (
        <span onClick={onClick} className={list.join(' ')}>
            {children}
        </span>
    )
}
