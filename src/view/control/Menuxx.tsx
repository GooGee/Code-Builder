import React, { ReactElement, useContext, useState } from 'react'
import UniqueKey from '../../helper/UniqueKey'
import Menu from '../../model/Menu'
import SourceFileContext from '../context/SourceFileContext'

interface Props {
    closeModal: () => void
    list: Menu[]
}

export default function Menuxx({ closeModal, list }: Props): ReactElement {
    const context = useContext(SourceFileContext)
    const [childxx, setChildxx] = useState([])

    if (list.length === 0) {
        return <div className="text-gray-500 p-2">empty</div>
    }

    const uk = UniqueKey()
    function makeItem(item: Menu) {
        if (item.isDivider) {
            return <li key={uk()} className="bg-gray-300 px-2 h-px"></li>
        }

        let className = 'cursor-pointer p-2'
        if (item.disabled) {
            className += ' text-gray'
        } else {
            if (item.list.length === 0) {
                className += ' hover:bg-blue-200'
            }
        }
        return (
            <li
                onClick={() => {
                    if (item.disabled) {
                        return
                    }
                    if (item.list.length) {
                        setChildxx(item.list as any)
                        return
                    }
                    closeModal()
                    item.cb()
                    context.update!()
                }}
                className={className}
                key={uk()}
            >
                {item.list.length ? '* ' : ''}
                {item.title}
            </li>
        )
    }

    return (
        <div className="inline-block menu">
            <ul className="inline-block">
                {list.map((item) => makeItem(item))}
            </ul>
            <div className="inline-block submenu">
                {childxx.length === 0 ? null : (
                    <Menuxx closeModal={closeModal} list={childxx}></Menuxx>
                )}
            </div>
        </div>
    )
}
