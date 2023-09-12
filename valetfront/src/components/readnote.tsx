import React from 'react';
import { setType , setUrl , setTopics} from '@/redux/features/note-slice';

interface NoteInfo {
    topics: string,
    title: string,
    content: string,
}

export default function ReadNote({ noteInfo }: { noteInfo: NoteInfo }) {

    return (
        <div className='p-8 bg-[#FAFAFA] rounded-lg w-4/5 drop-shadow-md'>
            {/* <h1>New Note</h1> */}
            <div className='flex flex-col justify-start mb-4'>
                <div className='flex flex-row justify-start flex-wrap px-4'>
                    {noteInfo.topics.split(',').map((topic: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined) => {
                        return (
                            <div key={topic?.toString()} className='px-2 py-1 text-sm font-thin bg-[#FFEFD7] rounded-[10px] mr-2 mb-2 md:mb-0 text-black'>
                                {topic}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='px-4 py-2 font-bold text-black'>
                {noteInfo.title}
            </div>
            <div className='px-4 py-2 text-black'>
                {noteInfo.content}
            </div>
        </div>
    );
}