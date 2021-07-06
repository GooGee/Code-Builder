import React, { ReactElement, useState } from 'react'
import Popup from 'reactjs-popup'
import Menu from '../../model/Menu'
import Button from './Button'
import MenuView from './MenuView'

interface Props {
    children?: ReactElement
    factory: () => Menu
    text?: string
    visible?: boolean
}

export default function MenuButton({
    children,
    factory,
    text = '*',
    visible = true,
}: Props): ReactElement | null {
    const [open, setOpen] = useState(false)
    const closeModal = () => setOpen(false)

    if (!visible) {
        if (open) {
            setOpen(false)
        }
        return null
    }

    return (
        <Popup
            onClose={closeModal}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <span>{children ? children : <Button>{text}</Button>}</span>
            }
            closeOnDocumentClick
            position="right center"
        >
            <MenuView
                closeModal={closeModal}
                factory={factory}
                open={open}
            ></MenuView>
        </Popup>
    )
}
