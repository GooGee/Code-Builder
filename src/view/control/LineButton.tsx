import React, { ReactElement, useContext, useState } from 'react'
import Popup from 'reactjs-popup'
import UniqueKey from '../../helper/UniqueKey'
import Menu from '../../model/Menu'
import state from '../../state'
import SourceFileContext from '../context/SourceFileContext'

interface Props {
    factory: () => Menu
}

export default function LineButton({ factory }: Props): ReactElement {
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
                        context.update!(state.sf)
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

    return (
        <Popup
            onClose={closeModal}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <span className="cursor-pointer hover:bg-blue-200 px-2 border border-blue-300 rounded-md">
                    *
                </span>
            }
            closeOnDocumentClick
            position="right center"
        >
            {getList()}
        </Popup>
    )
}
