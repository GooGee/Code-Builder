import React, { ReactElement, useState } from 'react'
import ReactModal from 'react-modal'
import Menu from '../../model/Menu'
import Button from './Button'
import Menuxx from './Menuxx'

ReactModal.setAppElement('#root')

function makeStyle(left: number) {
    return {
        content: {
            left,
            top: 0,
            height: '100%',
            width: '100%',
            padding: 0,
            border: 0,
            borderLeft: 'solid lightgray 1px',
            borderRadius: 0,
        },
    }
}

interface Props {
    children?: ReactElement
    factory: () => Menu
    onClose?: () => void
    onOpen?: () => void
    text?: string
}

export default function MenuModal({
    children,
    factory,
    onClose,
    onOpen,
    text = '*',
}: Props): ReactElement {
    const [visible, setVisible] = useState(false)
    const [left, setLeft] = useState(0)
    const [list, setList] = useState([])

    function closeModal() {
        setVisible(false)
        if (onClose) {
            onClose()
        }
    }

    return (
        <span>
            <span
                onClick={(event) => {
                    event.stopPropagation()
                    if (list.length === 0) {
                        setList(factory().list as any)
                    }
                    setLeft(event.screenX)
                    setVisible(true)
                    if (onOpen) {
                        onOpen()
                    }
                }}
            >
                <span>{children ? children : <Button>{text}</Button>}</span>
            </span>
            <span onClick={closeModal}>
                <ReactModal isOpen={visible} style={makeStyle(left)}>
                    <Menuxx list={list}></Menuxx>
                </ReactModal>
            </span>
        </span>
    )
}
