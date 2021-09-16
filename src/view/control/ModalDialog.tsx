import React, { ReactElement, useState } from 'react'
import ReactModal from 'react-modal'

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
    children: ReactElement
    closeModal?(): void
    onOpen?(): void
    trigger: ReactElement
}

export default function ModalDialog({
    children,
    closeModal,
    onOpen,
    trigger,
}: Props): ReactElement {
    const [visible, setVisible] = useState(false)
    const [style, setStyle] = useState(makeStyle(0))
    return (
        <span
            onClick={(event) => {
                event.stopPropagation()
                if (closeModal) {
                    closeModal()
                }
                setVisible(false)
            }}
        >
            <span
                onClick={(event) => {
                    event.stopPropagation()
                    setStyle(makeStyle(event.screenX))
                    if (onOpen) {
                        onOpen()
                    }
                    setVisible(true)
                }}
            >
                {trigger}
            </span>
            <ReactModal
                isOpen={visible}
                onAfterOpen={() => (document.body.style.overflow = 'hidden')}
                onAfterClose={() => (document.body.style.overflow = 'unset')}
                style={style}
            >
                {children}
            </ReactModal>
        </span>
    )
}
