'use client'

import { useEffect, useState } from 'react';
import Documentscontainer from './documentscontainer';
import { askvectorquestionAPI , askgraphquestionAPI } from '@/functions/content';
import Markdown from 'react-markdown';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useAppSelector } from '@/redux/store';
import { checkAuthAPI } from '@/functions/auth';
import { login } from '@/redux/features/auth-slice';

interface Message {
  from: string;
//   make message string or list
  message: string;
  type: string;
}

export default function Chat() {

    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const [vectororgraph, setVectorOrGraph] = useState("vector");
    const [messagequeue, setMessageQueue] = useState<Message[]>([
        // {from: 'user', message: 'Find my notes on cybersecurity', type: 'query'},
        // {from: 'valet', message: 'success', type: 'status'},
        // {from: 'valet', message: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam eget aliquam ultricies, nisl nunc ultricies nunc, vitae ultrices nisl nunc eu nisl. Sed euismod, diam eget aliquam ultricies, nisl nunc ultricies nunc, vitae ultrices nisl nunc eu nisl.', type: 'response'},
        // {from: 'valet', message: 'Hi', type: 'notes'},
    ]);
    const auth = useAppSelector((state) => state.authReducer.value);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {

        checkAuthAPI().then((res) => {
          if (res) {
              dispatch(login());
          }
          else {
              window.location.href = '/login';
          }
        });

    }, [dispatch]);

    const handleClick = (e: any) => {
        e.preventDefault();

        // add the message to the message queue
        setMessageQueue([...messagequeue, {from: 'user', message: message, type: 'query'}]);

        // add loading status to the message queue
        setMessageQueue((prevMessageQueue) => [...prevMessageQueue, {from: 'valet', message: 'loading', type: 'status'}]);

        // send the message to the backend
        askgraphquestionAPI(message).then((response) => {
            console.log(response)
            // change the loading status to success
            setMessageQueue((prevMessageQueue) => [...prevMessageQueue.slice(0, -1), {from: 'valet', message: 'success', type: 'status'}]);
            // add the response to the message queue
            setMessageQueue((prevMessageQueue) => [...prevMessageQueue, {from: 'valet', message: response.answer, type: 'response'}]);
            // add notes to the response if any
            if (response.notes) {
                setMessageQueue((prevMessageQueue) => [...prevMessageQueue, {from: 'valet', message: JSON.stringify(response.notes), type: 'notes'}]);
            }
        });
    }

    return (
        <>{ auth.isLogged &&
        <div className='flex flex-col space-between h-full p-2'>
            <div className='h-full bg-white drop-shadow-lg mb-2 overflow-scroll p-4 rounded-md'>
                {messagequeue.map((message, index) => (
                    <>
                        { message.from === 'user' && message.type === 'query' &&
                        <>
                        <div key={index} className='text-[36px] text-black whitespace-pre-wrap'>{message.message}</div>
                        </>
                        }
                        { message.from === 'valet' && message.type === 'status' &&
                        <>
                        <div key={index} className='text-[18px] text-black bg-gray-300 rounded-md w-min px-2 my-2 whitespace-pre-wrap'>{message.message}</div>
                        </>
                        }
                        { message.from === 'valet' && message.type === 'response' &&
                        <>
                        <div key={index} className='text-[18px] text-black'>
                            <Markdown
                            components={
                                // make links open in a new tab and also decorate them
                                // define all headings with decreased font size
                                {
                                    a: ({node, ...props}) => <a className='underline' target='_blank' rel='noreferrer' {...props} />,
                                    h1: ({node, ...props}) => <h1 className='text-[24px]' {...props} />,
                                    h2: ({node, ...props}) => <h2 className='text-[20px]' {...props} />,
                                    h3: ({node, ...props}) => <h3 className='text-[16px]' {...props} />,
                                    h4: ({node, ...props}) => <h4 className='text-[14px]' {...props} />,
                                    h5: ({node, ...props}) => <h5 className='text-[12px]' {...props} />,
                                    h6: ({node, ...props}) => <h6 className='text-[10px]' {...props} />,
                                    // if citations [^n^] are used, make them superscript
                                    sup: ({node, ...props}) => <sup className='text-[8px]' {...props} />,
                                }
                            }
                            >{message.message}</Markdown>
                            {/* {message.message} */}
                        </div>
                        </>
                        }
                        { message.from === 'valet' && message.type === 'notes' &&
                        <>
                        {JSON.parse(message.message).map((item: any, index: any) => (
                            <p className='text-black bg-gray-300 rounded-md p-2 m-2 truncate hover:text-clip hover:whitespace-pre-wrap cursor-pointer' key={index}>{item}</p>
                        ))}
                        </>
                        }
                    </>
                ))}
            </div>
            <form className='flex flex-row space-between bg-white rounded-2xl p-2'>
                <input className='focus:border-transparent w-full text-black' type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder='Ask something from your notes' />
                <button className='bg-blue-500 ml-2 p-2 text-white rounded-md' onClick={e => handleClick(e)}>Send</button>
            </form>
        </div>
        }</>
    )
}