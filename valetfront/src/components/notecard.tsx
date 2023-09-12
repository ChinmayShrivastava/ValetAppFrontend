type NoteInfo = {
    id: number,
    content: string,
    topics: string,
}

export default function NoteCard({
    noteInfo,
}: {
    noteInfo: NoteInfo
}) {

    return (
        <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md cursor-pointer mt-8">
            <div className="flex flex-col justify-start bg-cover p-4">
                <div className="flex flex-row justify-start flex-wrap">
                    { noteInfo.topics.split(',').map((topic) => {
                        return <h5 className="text-xs p-0 text-gray-500 bg-[#FFB23E] px-2 py-1 rounded-md mr-2">{topic}</h5>
                    }
                    )}
                </div>
                <h1 className="text-black p-0 mt-4">{noteInfo.content.length > 90 ? noteInfo.content.substring(0, 90) + '...' : noteInfo.content}</h1>
            </div>
        </div>
        )
    }