'use client'

import { type } from "os"
import { deleteDocAPI } from "@/functions/content"
import Link from "next/link"

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

    const handleDelete = () => {
        deleteDocAPI(documentInfo.id.toString()).then((res) => {
            if (res) {
                // refresh page
                window.location.reload();
            }
        }
        )
    }

    return (
        <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md mt-8 mr-4 h-30">
            <div className="flex flex-col justify-start bg-cover p-4">
                <h5 className="text-xs p-0 text-[#FFB23E]">{documentInfo.type ? documentInfo.type : 'N/A'}</h5>
                <Link href={'/documents/notes'+'?name='+documentInfo.name+'&id='+documentInfo.id}>
                    <h1 className="text-black p-0">{documentInfo.name}</h1>
                </Link>
                <div className="flex flex-row justify-start mt-2">
                    <p className="text-black text-xs">notes: {documentInfo.totalnotes ? documentInfo.totalnotes : 0}</p>
                    {/* <p className="text-black text-xs">sub-docs: {documentInfo.subdocs ? documentInfo.subdocs : 0}</p> */}
                </div>
                <div className="flex flex-row justify-between mt-2 w-full">
                    <button className="text-gray-700 text-xs hover:text-black bg-gray-300 rounded-md p-[2px]" onClick={handleDelete}>delete</button>
                    <Link href={'/'+'?name='+documentInfo.name+'&id='+documentInfo.id+'&type='+documentInfo.type+'&url='+documentInfo.url} className="text-gray-700 hover:text-black text-xs bg-gray-300 rounded-md p-[2px]">
                        add note
                    </Link>
                </div>
            </div>
        </div>
    )
}