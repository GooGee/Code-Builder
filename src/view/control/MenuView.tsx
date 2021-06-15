import React, { ReactElement, useContext } from 'react'
import UniqueKey from '../../helper/UniqueKey'
import Menu from '../../model/Menu'
import SourceFileContext from '../context/SourceFileContext'
import MenuItem from './MenuItem'

interface Props {
    closeModal: () => void
    factory: () => Menu
    open: boolean
}

export default function MenuView({
    open,
    factory,
    closeModal,
}: Props): ReactElement | null {
    const context = useContext(SourceFileContext)
    if (open === false) {
        return null
    }

    const uk = UniqueKey()
    return (
        <span>
            {factory().list.map((item) => {
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
                    <span>
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
            })}
        </span>
    )
}
