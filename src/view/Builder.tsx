import React, { ReactElement } from 'react'
import Vendor from '../model/Vendor'
import SourceFile from './block/SourceFile'

interface Props {
    state: Vendor
}

export default function Builder({ state }: Props): ReactElement {
    return (
        <div>
            <SourceFile state={state}></SourceFile>
        </div>
    )
}
