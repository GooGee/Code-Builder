import React, { ReactElement, useState } from 'react'
import Popup from 'reactjs-popup'
import Menu from '../../model/Menu'
import Button from './Button'
import MenuView from './MenuView'

interface Props {
    factory: () => Menu
    text?: string
    visible: boolean
}

export default function MenuButton({
    factory,
    text = '*',
    visible,
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
                <span>
                    <Button>{text}</Button>
                </span>
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
