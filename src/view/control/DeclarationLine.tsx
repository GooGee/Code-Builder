import React, { ReactElement, useState } from 'react'
import Menu from '../../model/Menu'
import LineButton from './LineButton'

interface Props {
    children?: Array<ReactElement | string>
    factory: () => Menu
}

export default function DeclarationLine({
    children,
    factory,
}: Props): ReactElement {
    const [visible, setVisible] = useState(false)
    return (
        <div
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <LineButton visible={visible} factory={factory}></LineButton>
            {children}
        </div>
    )
}
