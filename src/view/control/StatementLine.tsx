import React, { ReactElement } from 'react'
import Menu from '../../model/Menu'
import EditingView from './EditingView'

export interface Hide {
    (): void
}

interface Props {
    menuFactory: () => Menu
    viewFactory: (
        editing: boolean,
        setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    ) => any
}

export default function StatementLine({
    menuFactory,
    viewFactory,
}: Props): ReactElement {
    return (
        <div className="my-2">
            <EditingView
                menuFactory={menuFactory}
                viewFactory={viewFactory}
            ></EditingView>
        </div>
    )
}
