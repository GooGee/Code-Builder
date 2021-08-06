import React, { ReactElement, useState } from 'react'
import Popup from 'reactjs-popup'
import Menu from '../../model/Menu'
import Button from './Button'
import MenuBox from './MenuBox'

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
    const closeModal = () => setOpen(false)

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
            <MenuBox closeModal={closeModal} factory={factory}></MenuBox>
        </Popup>
    )
}
