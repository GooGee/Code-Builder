import React, { ReactElement, useState } from 'react'

interface Props {
    viewFactory: (
        visible: boolean,
        setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    ) => any
}

export default function HoverButton({ viewFactory }: Props): ReactElement {
    const [visible, setVisible] = useState(false)
    return (
        <div
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {viewFactory(visible, setVisible)}
        </div>
    )
}
