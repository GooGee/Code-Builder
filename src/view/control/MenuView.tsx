import Menu, { SubMenu, MenuItem } from 'rc-menu'
import React, { ReactElement, useContext } from 'react'
import UniqueKey from '../../helper/UniqueKey'
import MenuData from '../../model/Menu'
import SourceFileContext from '../context/SourceFileContext'

interface Props {
    closeModal: () => void
    factory: () => MenuData
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
    function makeItem(item: MenuData) {
        return (
            <MenuItem
                onClick={() => {
                    closeModal()
                    item.cb()
                    context.update!()
                }}
                className="cursor-pointer hover:bg-blue-200 p-2"
                disabled={item.disabled}
                key={uk()}
            >
                {item.title}
            </MenuItem>
        )
    }
    return (
        <Menu>
            {factory().list.map((item) => {
                if (item.list.length === 0) {
                    return makeItem(item)
                }

                return (
                    <SubMenu key={uk()} title={item.title}>
                        {item.list.map((one) => makeItem(one))}
                    </SubMenu>
                )
            })}
        </Menu>
    )
}
