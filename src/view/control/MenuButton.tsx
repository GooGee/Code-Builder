import React, { ReactElement, useContext, useState } from 'react'
import Popup from 'reactjs-popup'
import UniqueKey from '../../helper/UniqueKey'
import Menu from '../../model/Menu'
import SourceFileContext from '../context/SourceFileContext'
import Button from './Button'

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
            return (
                <div
                    onClick={() => {
                        closeModal()
                        item.cb()
                        context.update!()
                    }}
                    key={uk()}
                    className={
                        item.disabled
                            ? 'pl-2'
                            : 'cursor-pointer hover:bg-blue-200 p-2'
                    }
                >
                    {item.title}
                </div>
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
