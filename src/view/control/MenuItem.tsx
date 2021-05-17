import React, { ReactElement } from 'react'

interface Props {
    callback?: () => void
    children: ReactElement | string | Array<ReactElement | string>
    disabled: boolean
}

export default function MenuItem({
    callback,
    children,
    disabled,
}: Props): ReactElement {
    return (
        <div
            onClick={callback}
            className={
                disabled ? 'pl-2' : 'cursor-pointer hover:bg-blue-200 p-2'
            }
        >
            {children}
        </div>
    )
}
