import React, { ReactElement } from 'react'
import Vendor from './model/Vendor'
import Builder from './view/Builder'

interface Props {
    state: Vendor
}

export default function App({ state }: Props): ReactElement {
    return (
        <div
            id="MenuBoundary"
            className="xl:flex flex-nowrap font-mono text-xl"
        >
            <Builder state={state}></Builder>
            <hr />
        </div>
    )
}
