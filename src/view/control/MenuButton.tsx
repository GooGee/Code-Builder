import React, { ReactElement, useContext, useState } from 'react'
import Popup from 'reactjs-popup'
import UniqueKey from '../../helper/UniqueKey'
import Menu from '../../model/Menu'
import SourceFileContext from '../context/SourceFileContext'
import Button from './Button'
import MenuItem from './MenuItem'

interface Props {
    factory: () => Menu
    visible: boolean
}

export default function MenuButton({
    factory,
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
                <Popup
                    on="hover"
                    position="right center"
                    key={uk()}
                    trigger={
                        <span>
                            <MenuItem disabled={item.disabled} key={uk()}>
                                {item.title}
                            </MenuItem>
                        </span>
                    }
                >
                    {item.list.map((one) => (
                        <MenuItem
                            callback={() => {
                                closeModal()
                                one.cb()
                            }}
                            key={uk()}
                            disabled={one.disabled}
                        >
                            {one.title}
                        </MenuItem>
                    ))}
                </Popup>
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
                    <Button>*</Button>
                </span>
            }
            closeOnDocumentClick
            position="right center"
        >
            {getList()}
        </Popup>
    )
}
