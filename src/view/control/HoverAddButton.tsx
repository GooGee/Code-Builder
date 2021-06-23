import React, { ReactElement } from 'react'
import HoverButton from './HoverButton'

interface Props {
    children: ReactElement
}

export default function HoverAddButton({ children }: Props): ReactElement {
    return (
        <HoverButton
            viewFactory={(visible) =>
                visible ? (
                    children
                ) : (
                    <span className="cursor-pointer px-2 py-1 mr-1">+</span>
                )
            }
        ></HoverButton>
    )
}
