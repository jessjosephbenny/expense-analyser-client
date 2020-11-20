import React, { useState } from 'react'
import noData from '../../styles/images/no-data.svg'
import { Button } from 'evergreen-ui'
import UploadDialog from './uploadDialog'

export default function () {
    const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
    return (
        <>
            <div className="d-flex justify-content-center row mt-5">
                <img src={noData} className="w-50" />
            </div>
            <div className="d-flex justify-content-center row mt-3">
                <Button
                    iconBefore="upload"
                    className="mr-2"
                    intent="success"
                    appearance="primary"
                    height={48}
                    onClick={() => setUploadDialogOpen(true)}>Data</Button>
                <Button
                    iconBefore="add"
                    intent="warning"
                    appearance="primary"
                    height={48}>Pattern</Button>
            </div>
            <UploadDialog
                isShown={isUploadDialogOpen}
                closeModal={() => setUploadDialogOpen(false)} />
        </>
    )
}