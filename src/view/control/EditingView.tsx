import React, { ReactElement, useState } from 'react'
import Menu from '../../model/Menu'
import Button from './Button'
import MenuButton from './MenuButton'

interface Props {
    menuFactory?: () => Menu
    viewFactory: (
        editing: boolean,
        setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    ) => any
}

export default function EditingView({
    menuFactory,
    viewFactory,
}: Props): ReactElement {
    const [editing, setEditing] = useState(false)
    if (editing) {
        return (
            <span onClick={(event) => event.stopPropagation()}>
                {menuFactory === undefined ? null : (
                    <MenuButton
                        visible={true}
                        factory={menuFactory}
                    ></MenuButton>
                )}

                <Button onClick={() => setEditing(false)}>x</Button>

                {viewFactory(true, setEditing)}
            </span>
        )
    }

    return (
        <span
            onClick={(event) => {
                event.stopPropagation()
                setEditing(true)
            }}
        >
            {viewFactory(false, setEditing)}
        </span>
    )
}
