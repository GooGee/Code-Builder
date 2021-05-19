import React, { ReactElement, useContext, useState } from 'react'
import Popup from 'reactjs-popup'
import UniqueKey from '../../helper/UniqueKey'
import Menu from '../../model/Menu'
import SourceFileContext from '../context/SourceFileContext'
import Button from './Button'
import MenuItem from './MenuItem'

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
    const context = useContext(SourceFileContext)
    const [open, setOpen] = useState(false)
    const closeModal = () => setOpen(false)
    const uk = UniqueKey()
    function getList() {
        if (open === false) {
            return null
        }
        return factory().list.map((item) => {
            if (item.list.length === 0) {
                return (
                    <MenuItem
                        callback={() => {
                            closeModal()
                            item.cb()
                            context.update!()
                        }}
                        disabled={item.disabled}
                        key={uk()}
                    >
                        {item.title}
                    </MenuItem>
                )
            }
            return (
                <span key={uk()}>
                    <MenuItem disabled={item.disabled} key={uk()}>
                        {item.title}
                    </MenuItem>
                    {item.list.map((one) => (
                        <MenuItem
                            callback={() => {
                                closeModal()
                                one.cb()
                                context.update!()
                            }}
                            key={uk()}
                            disabled={one.disabled}
                        >
                            {one.title}
                        </MenuItem>
                    ))}
                </span>
            )
        })
    }

    if (!visible) {
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
            {getList()}
        </Popup>
    )
}
