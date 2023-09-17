'use client'

import { type } from "os"

type DocumentInfo = {
    id: number | string,
    type?: string,
    name: string,
    url?: string,
    subdocs?: number,
    dateadded?: string,
    datemodified?: string,
    totalnotes?: number,
}

export default function DocumentCard({
    documentInfo,
}: {
    documentInfo: DocumentInfo
}) {
  return (
    <div className="flex flex-col mx-auto overflow-hidden bg-white rounded-lg shadow-md cursor-pointer mt-8 mr-4 h-24">
        <div className="flex flex-col justify-start bg-cover p-4">
            <h5 className="text-xs p-0 text-[#FFB23E]">{documentInfo.type ? documentInfo.type : 'N/A'}</h5>
            <h1 className="text-black p-0">{documentInfo.name}</h1>
            <div className="flex flex-row justify-between mt-2">
                <p className="text-black text-xs">notes: {documentInfo.totalnotes ? documentInfo.totalnotes : 0}</p>
                <p className="text-black text-xs">sub-docs: {documentInfo.subdocs ? documentInfo.subdocs : 0}</p>
            </div>
        </div>
    </div>
    )
}