import Menu, { MenuItem, Divider } from 'rc-menu'
import React, { ReactElement, useContext } from 'react'
import UniqueKey from '../../helper/UniqueKey'
import MenuData from '../../model/Menu'
import SourceFileContext from '../context/SourceFileContext'

interface Props {
    closeModal: () => void
    factory: () => MenuData
}

export default function MenuBox({ factory, closeModal }: Props): ReactElement {
    const context = useContext(SourceFileContext)

    const uk = UniqueKey()
    function makeItem(item: MenuData) {
        if (item.isDivider) {
            return (
                <Divider key={uk()} className="bg-gray-300 px-2 h-px"></Divider>
            )
        }

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

    const list = factory().list
    return (
        <Menu>
            {list.length === 0 ? (
                <div className="text-gray-500 p-2">empty</div>
            ) : (
                list.map((item) => makeItem(item))
            )}
        </Menu>
    )
}
