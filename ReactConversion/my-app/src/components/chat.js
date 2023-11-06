// chat.js
import React, { useEffect, useState } from 'react';
import Documentscontainer from './documentscontainer';
import { askvectorquestionAPI, askgraphquestionAPI } from '@/functions/content';
import Markdown from 'react-markdown';

export default function Chat() {

    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const [vectororgraph, setVectorOrGraph] = useState("vector");
    const [messagequeue, setMessageQueue] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();

        setMessageQueue([...messagequeue, {from: 'user', message: message, type: 'query'}]);
        setMessageQueue((prevMessageQueue) => [...prevMessageQueue, {from: 'valet', message: 'loading', type: 'status'}]);

        askvectorquestionAPI(message).then((response) => {
            setMessageQueue((prevMessageQueue) => [...prevMessageQueue.slice(0, -1), {from: 'valet', message: 'success', type: 'status'}]);
            setMessageQueue((prevMessageQueue) => [...prevMessageQueue, {from: 'valet', message: response.answer, type: 'response'}]);
        });
    }

    return (
        <div className='flex flex-col space-between h-full p-2'>
            <div className='h-full bg-gray-200 mb-2 overflow-scroll p-4 rounded-md'>
                {messagequeue.map((message, index) => (
                    <>
                        {message.from === 'user' && message.type === 'query' &&
                        <div key={index} className='text-[36px] text-black whitespace-pre-wrap'>{message.message}</div>
                        }
                        {message.from === 'valet' && message.type === 'status' &&
                        <div key={index} className='text-[18px] text-black bg-gray-300 rounded-md w-min px-2 my-2 whitespace-pre-wrap'>{message.message}</div>
                        }
                        {message.from === 'valet' && message.type === 'response' &&
                        <div key={index} className='text-[18px] text-black'>
                            <Markdown
                                components={{
                                    a: ({node, ...props}) => <a className='underline' target='_blank' rel='noreferrer' {...props} />,
                                    h1: ({node, ...props}) => <h1 className='text-[24px]' {...props} />,
                                    h2: ({node, ...props}) => <h2 className='text-[20px]' {...props} />,
                                    h3: ({node, ...props}) => <h3 className='text-[16px]' {...props} />,
                                    h4: ({node, ...props}) => <h4 className='text-[14px]' {...props} />,
                                    h5: ({node, ...props}) => <h5 className='text-[12px]' {...props} />,
                                    h6: ({node, ...props}) => <h6 className='text-[10px]' {...props} />,
                                    // if citations [^n^] are used, make them superscript
                                    sup: ({node, ...props}) => <sup className='text-[8px]' {...props} />,
                                }}
                            >
                                {message.message}
                            </Markdown>
                        </div>
                        }
                        {message.from === 'valet' && message.type === 'notes' &&
                        <Documentscontainer />
                        }
                    </>
                ))}
            </div>
            <form className='flex flex-row space-between bg-white rounded-2xl p-2'>
                <input className='focus:border-transparent w-full text-black' type="text" value={message} onChange={e => setMessage(e.target.value)} />
                <button className='bg-blue-500 ml-2 p-2 text-white' onClick={e => handleClick(e)}>Send</button>
            </form>
        </div>
    );
}
