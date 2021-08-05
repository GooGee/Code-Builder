import React, { ReactElement, useState } from 'react'
import Popup from 'reactjs-popup'
import Menu from '../../model/Menu'
import Button from './Button'
import MenuView from './MenuView'

interface Props {
    children?: ReactElement
    factory: () => Menu
    text?: string
}

export default function MenuButton({
    children,
    factory,
    text = '*',
}: Props): ReactElement {
    const [open, setOpen] = useState(false)

    return (
        <Popup
            arrow={false}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <span>{children ? children : <Button>{text}</Button>}</span>
            }
            closeOnDocumentClick
            position="right center"
        >
            <MenuView factory={factory}></MenuView>
        </Popup>
    )
}
