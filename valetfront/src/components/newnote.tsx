'use client'

import React from 'react';
import { resetNote , setType , setTitle , setUrl , setContent , setTopics , submitNote } from '@/redux/features/note-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useAppSelector } from '@/redux/store';

const cols = 30;
const rows = 10;

export default function NewNote() {

    const dispatch = useDispatch<AppDispatch>();
    const type = useAppSelector((state) => state.noteReducer.value.type);
    const title = useAppSelector((state) => state.noteReducer.value.title);
    const url = useAppSelector((state) => state.noteReducer.value.url);
    const note = useAppSelector((state) => state.noteReducer.value.content);
    const topics = useAppSelector((state) => state.noteReducer.value.topics);

    const [documents, setDocuments] = React.useState('Article, Book, Video');
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [showDocumentOptions, setShowDocumentOptions] = React.useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(submitNote());
    }

    const handleDiscard = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(resetNote());
    }

    const handleRecord = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('record');
    }

    const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        dispatch(setTitle(e.target.value.toString()));
    }

    const handleNoteChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        dispatch(setContent(e.target.value.toString()));
    }

    const handleOverlayCancel = () => {
        setShowOverlay(false);
    }

    const handleDocumentOptionsCancel = () => {
        setShowDocumentOptions(false);
    }

    return (
        <div className='relative w-full'>
        <div className='p-8 bg-[#FAFAFA] rounded-lg w-full z-0 static'>
            {/* <h1>New Note</h1> */}
            <form className="w-full">
                <div className='flex flex-row px-2 py-2 bg-white rounded-lg border-[0.25px] border-black'>
                    <div className='flex flex-row justify-start align-middle hover:bg-[#FFF8ED] cursor-pointer px-2 rounded-md mr-2' onClick={()=>setShowDocumentOptions(true)}>
                        <label htmlFor="type" className='text-[#FFB23E]'>{type}</label>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="gray" className="w-4 h-4 align-middle my-auto pl-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <input type="text" name="title" id="title" className='bg-transparent focus:outline-none w-full text-black' onChange={handleTitleChange} value={title} />
                </div>
                <div className='flex flex-row'>
                    <label htmlFor="url" className='text-sm pl-4 pr-2 text-[#9D9D9D]'>url:</label>
                    <input type="text" name="url" id="url" className='bg-transparent w-full text-black hover:bg-transparent text-sm text-[#9D9D9D]' onChange={(e) => dispatch(setUrl(e.target.value))} value={url} />
                </div>
                <div className='flex flex-col px-4 py-2 bg-white rounded-lg border-[0.25px] border-black mb-2 md:mb-0 mt-4'>
                    <textarea name="content" id="content" cols={cols} rows={rows} className='bg-transparent focus:outline-none resize-none w-full text-black' onChange={handleNoteChange} value={note} />
                </div>
                <div className='flex flex-col justify-start mt-2 md:mt-6'>
                    <div className='flex flex-row justify-start flex-wrap'>
                        <label htmlFor="topics" className='px-4 text-sm text-[#9D9D9D]'>Related Topics:</label>
                        {topics.split(',').map((topic: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined) => {
                            return (
                                <div key={topic?.toString()} className='px-3 py-1 text-sm font-thin bg-[#FFEFD7] rounded-[10px] mr-2 mb-2 md:mb-0 text-black'>
                                    {topic}
                                </div>
                            )
                        })}
                        <div className='px-3 py-1 text-sm font-thin bg-[#FFEFD7] rounded-[10px] mr-2 mb-2 md:mb-0 text-black' onClick={() => setShowOverlay(true)}>
                            +
                        </div>
                    </div>
                    <div className='flex flex-row justify-start'>
                        <button type="submit" onClick={handleSubmit} >
                            <img className="h-8 w-8 rounded-full ml-2" src="submit.png" alt="" />
                        </button>
                        <button onClick={handleDiscard} >
                            <img className="h-8 w-8 rounded-full ml-2" src="discard.png" alt="" />
                        </button>
                        <button onClick={handleRecord} >
                            <img className="h-8 w-auto rounded-full ml-2" src="record.png" alt="" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
        {showOverlay && (
            <div className="flex justify-center align-middle h-screen absolute z-40 top-0 w-full items-center backdrop-blur-sm">
                <div className="drop-shadow-md">
                    <div className='flex flex-col justify-start p-8 bg-[#FAFAFA] rounded-lg'>
                        <label htmlFor="topics" className='text-sm text-[#9D9D9D]'>Related Topics:</label>
                        <input type="text" name="topics" id="topics" className='bg-white w-full text-black border-[0.25px] border-black p-2 rounded-md mt-4' onChange={(e) => dispatch(setTopics(e.target.value))} value={topics} />
                        <button type="submit" onClick={handleOverlayCancel} >
                            <img className="h-6 w-6 rounded-full mt-4" src="submit.png" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        )}
        {showDocumentOptions && (
            <div className="flex justify-center align-middle h-screen absolute z-40 top-0 w-full items-center backdrop-blur-sm">
                <div className="drop-shadow-md">
                    <div className='flex flex-col justify-start p-8 bg-[#FAFAFA] rounded-lg'>
                        <label htmlFor="documents" className='text-sm text-[#9D9D9D]'>Document Types:</label>
                        {documents.split(',').map((document: string) => {
                            return (
                                <div key={document?.toString()} className='px-3 py-1 text-sm font-thin bg-[#FFEFD7] rounded-[10px] mr-2 mb-2 md:mb-0 text-black cursor-pointer'
                                onClick={
                                    () => {
                                        dispatch(setType(document.toString()));
                                        setShowDocumentOptions(false);
                                    }
                                }
                                >
                                    {document}
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}