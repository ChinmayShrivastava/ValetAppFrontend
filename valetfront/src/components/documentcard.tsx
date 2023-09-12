'use client'

import { type } from "os"

type DocumentInfo = {
    id: number,
    type: string,
    title: string,
    url: string,
    subdocs: number,
    dateadded: string,
    datemodified: string,
    totalnotes: number,
}

export default function DocumentCard({
    documentInfo,
}: {
    documentInfo: DocumentInfo
}) {
  return (
    <div className="flex flex-col w-[30%] mx-auto overflow-hidden bg-white rounded-lg shadow-md cursor-pointer mt-8">
        <div className="flex flex-col justify-start bg-cover p-4">
            <h5 className="text-xs p-0 text-[#FFB23E]">{documentInfo.type}</h5>
            <h1 className="text-black p-0">{documentInfo.title}</h1>
            <div className="flex flex-row justify-between mt-2">
                <p className="text-black text-xs">notes: {documentInfo.totalnotes}</p>
                <p className="text-black text-xs">sub-docs: {documentInfo.subdocs}</p>
            </div>
        </div>
    </div>
    )
}