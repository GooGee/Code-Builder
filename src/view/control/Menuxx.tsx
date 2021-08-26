import React, { ReactElement, useContext, useState } from 'react'
import UniqueKey from '../../helper/UniqueKey'
import Menu from '../../model/Menu'
import SourceFileContext from '../context/SourceFileContext'

interface Props {
    list: Menu[]
}

export default function Menuxx({ list }: Props): ReactElement {
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
        if (item.isParent && item.empty) {
            className += ' text-gray-300'
        } else {
            if (item.disabled) {
                className += ' text-gray-300'
            } else {
                className += ' hover:bg-blue-200'
            }
        }
        return (
            <li
                onClick={(event) => {
                    if (item.disabled) {
                        return
                    }
                    if (item.isParent) {
                        event.stopPropagation()
                        setChildxx(item.list as any)
                        return
                    }
                    item.cb()
                    context.update()
                }}
                className={className}
                key={uk()}
            >
                {item.isParent ? '* ' : ''}
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
                {childxx.length === 0 ? null : <Menuxx list={childxx}></Menuxx>}
            </div>
        </div>
    )
}
