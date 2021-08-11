import React, { ReactElement } from 'react'

interface Props {
    children: string | ReactElement
    color?: string
}

export default function HoverButton({
    children,
    color = 'gray',
}: Props): ReactElement {
    const className = `cursor-pointer text-${color}-300 hover:text-green-500`
    return <span className={className}>{children}</span>
}
