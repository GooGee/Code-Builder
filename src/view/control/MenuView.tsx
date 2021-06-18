import Menu, { SubMenu, MenuItem, Divider } from 'rc-menu'
import React, { ReactElement, useContext, useState } from 'react'
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
    const [openKeys, setOpenKeys] = useState<string[]>([])
    if (open === false) {
        return null
    }

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
                className="hover:bg-blue-200 p-2"
                disabled={item.disabled}
                key={uk()}
            >
                {item.title}
            </MenuItem>
        )
    }

    const list = factory().list
    return (
        <Menu
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys([...keys] as string[])}
            mode="inline"
        >
            {list.length === 0 ? (
                <div className="text-gray-500 p-2">empty</div>
            ) : (
                list.map((item) => {
                    if (item.list.length === 0) {
                        return makeItem(item)
                    }

                    return (
                        <SubMenu
                            key={uk()}
                            title={'+ ' + item.title}
                            className="py-2"
                        >
                            {item.list.map((one) => makeItem(one))}
                        </SubMenu>
                    )
                })
            )}
        </Menu>
    )
}
