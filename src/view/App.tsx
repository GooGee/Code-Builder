import React, { ReactElement } from 'react'
import Vendor from '../model/Vendor'
import Builder from './Builder'

interface Props {
    state: Vendor
}

export default function App({ state }: Props): ReactElement {
    return (
        <div
            id="MenuBoundary"
            className="xl:flex flex-nowrap font-mono text-xl"
        >
            <a
                className="fixed top-2 right-11"
                href="https://github.com/GooGee/Code-Builder"
            >
                <img
                    alt="GitHub"
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    width="33"
                ></img>
            </a>
            <Builder state={state}></Builder>
            <hr />
        </div>
    )
}
