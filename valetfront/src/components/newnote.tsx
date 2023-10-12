'use client'

import React, { use } from 'react';
import { resetNote , setType , setTitle , setDocTitle , setUrl , setContent , setTopics , submitNote, setDocId } from '@/redux/features/note-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useAppSelector } from '@/redux/store';
import { Link } from 'react-router-dom';
import { submitNoteAPI } from '@/functions/content';
import { useEffect } from 'react';

const cols = 30;
const rows = 10;

export default function NewNote() {

    const dispatch = useDispatch<AppDispatch>();
    const type = useAppSelector((state) => state.noteReducer.value.type);
    const docid = useAppSelector((state) => state.noteReducer.value.docid);
    const doctitle = useAppSelector((state) => state.noteReducer.value.doctitle);
    const title = useAppSelector((state) => state.noteReducer.value.title);
    const url = useAppSelector((state) => state.noteReducer.value.url);
    const note = useAppSelector((state) => state.noteReducer.value.content);
    const topics = useAppSelector((state) => state.noteReducer.value.topics);

    const [documenttypes, setDocumenttypes] = React.useState('Article,Book,Video,Topic,None');
    const [showOverlay, setShowOverlay] = React.useState(false);
    const [showDocumentOptions, setShowDocumentOptions] = React.useState(false);

    // get the url params
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id_ = urlParams.get('id');
        const name_ = urlParams.get('name');
        const url_ = urlParams.get('url');
        const type_ = urlParams.get('type');

        if (id_) {
            dispatch(setDocId(id_.toString()));
        }
        if (name_) {
            dispatch(setDocTitle(name_.toString()));
        }
        if (url_!=='undefined' && url_) {
            dispatch(setUrl(url_.toString()));
        }
        if (type_) {
            dispatch(setType(type_.toString()));
        }

    }, []);

    useEffect(() => {

        if (type === 'Topic') {
            dispatch(setTopics(doctitle));
        }

    }, [type, doctitle]);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        submitNoteAPI(
            docid,
            note,
            topics,
            doctitle,
            type,
            url,
            title
        ).then((res) => {
            if (res[0]) {
                dispatch(submitNote({
                    type: type,
                    docid: docid,
                    doctitle: doctitle,
                    title: title,
                    url: url,
                    content: note,
                    topics: topics
                }));
                if (res[1].newdoc===true) {
                    console.log(res[1].newdoc);
                    dispatch(setDocId(res[1].document));
                }
            }
        });
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

    const handleDocumentTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        dispatch(setDocTitle(e.target.value.toString()));
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
                <div className='flex justify-start text-white bg-[#0085FF] hover:bg-[#0061BA] cursor-pointer w-min px-2 rounded-md mb-2' onClick={()=>dispatch(resetNote())}>+</div>
                <div className='flex flex-col px-2 py-2 bg-white rounded-lg hover:bg-gray-200 cursor-pointer'  onClick={()=>setShowDocumentOptions(true)}>
                    <div className='flex flex-row'>
                        <div className='flex flex-row justify-start align-middle px-2 rounded-md mr-2'>
                            <label htmlFor="type" className='text-[#FFB23E]'>{type}</label>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="gray" className="w-4 h-4 align-middle my-auto pl-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg> */}
                        </div>
                        {/* <input type="text" name="title" id="title" className='bg-transparent focus:outline-none w-full text-black' value={doctitle} /> */}
                        <p className='text-black w-full'>{doctitle}</p>
                    </div>
                    <div className='flex flex-row'>
                        <label htmlFor="url" className='text-sm pl-2 pr-2 text-[#9D9D9D]'>url:</label>
                        {/* <input type="text" name="url" id="url" className='bg-transparent w-full text-black hover:bg-transparent text-sm text-[#9D9D9D]' onChange={(e) => dispatch(setUrl(e.target.value))} value={url} /> */}
                        <p className='w-full text-sm text-[#9D9D9D]'>{url}</p>
                    </div>
                </div>
                <div className='flex flex-col px-4 py-2 bg-white rounded-lg border-[0.25px] border-black mb-2 md:mb-0 mt-4'>
                    <input type="text" name="title" id="title" className='bg-transparent focus:outline-none font-bold w-full text-black' onChange={handleTitleChange} value={title} placeholder='title (optional)'/>
                    <textarea name="content" id="content" cols={cols} rows={rows} className='bg-transparent focus:outline-none resize-none w-full text-black' onChange={handleNoteChange} value={note} placeholder='note' />
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
                        {/* take to /documents */}
                        <a href='/documents' className='text-sm text-[#9D9D9D] cursor-pointer hover:text-black mt-2'>
                            Select an old Document!
                        </a>
                        <label htmlFor="documents" className='text-sm text-[#9D9D9D]'> Or add a new Document:</label>
                        {/* {documents.split(',').map((document: string) => {
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
                        )} */}
                        <div className='flex flex-col'>
                            {/* radio buttons to select document type */}
                            <div className='flex flex-row justify-start align-middle px-2 rounded-md mr-2'>
                                {
                                    documenttypes.split(',').map((documenttype: string) => {
                                        documenttype = documenttype.trim(); // add this line to remove extra spaces
                                        return (
                                            <>
                                            <input key={documenttype?.toString()} type="radio" name="type" id={documenttype.toString()} className='bg-transparent focus:outline-none w-full text-black' value={documenttype.toString()} onChange={(e) => dispatch(setType(e.target.value))} defaultChecked={documenttype === type}/>
                                            <label htmlFor={documenttype} className='text-[#FFB23E] mx-2'>{documenttype}</label>
                                            </>
                                        )
                                    }
                                    )
                                }
                            </div>
                            {/* set document title */}
                            <input type="text" name="title" id="title" className='w-full text-black my-2' value={doctitle} onChange={(e) => dispatch(setDocTitle(e.target.value))} placeholder='document title'/>
                            {/* update url */}
                            <input type="text" name="url" id="url" className='w-full text-black my-2' value={url} onChange={(e) => dispatch(setUrl(e.target.value))} placeholder='url'/>
                            {/* submit button */}
                            <button type="submit" onClick={handleDocumentOptionsCancel} >
                                <img className="h-6 w-6 rounded-full" src="submit.png" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}