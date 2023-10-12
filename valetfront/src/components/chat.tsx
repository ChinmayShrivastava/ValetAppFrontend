'use client'

import { useEffect, useState } from 'react';
import Documentscontainer from './documentscontainer';

export default function Chat() {

    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const [messagequeue, setMessageQueue] = useState([
        {from: 'user', message: 'Find my notes on cybersecurity', type: 'query'},
        {from: 'valet', message: 'success', type: 'status'},
        {from: 'valet', message: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam eget aliquam ultricies, nisl nunc ultricies nunc, vitae ultrices nisl nunc eu nisl. Sed euismod, diam eget aliquam ultricies, nisl nunc ultricies nunc, vitae ultrices nisl nunc eu nisl.', type: 'response'},
        {from: 'valet', message: 'Hi', type: 'notes'},
    ]);
    // const socket = new WebSocket('wss://CLUSTER_ID.piesocket.com/v3/user_10?api_key=MRMr4opmD5PKqsL9lVHZz4hHXkiSXyQIVx4f7Dfb');
    const chatSocket = new WebSocket(
            'ws://'
            + '127.0.0.1:8000'
            + '/ws/query/'
            + 'user_10'
            + '/'
        );

    useEffect(() => {
        
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            setText(data.message);
        };

    }, []);

    const handleClick = () => {
        chatSocket.send(JSON.stringify({
            'message': message
        }));
    }

    return (
        <div className='flex flex-col space-between h-full p-2'>
            <div className='h-full bg-gray-200 mb-2 overflow-scroll px-4'>
                {messagequeue.map((message, index) => (
                    <>
                        { message.from === 'user' && message.type === 'query' &&
                        <>
                        <div key={index} className='text-[36px] text-black'>{message.message}</div>
                        </>
                        }
                        { message.from === 'valet' && message.type === 'status' &&
                        <>
                        <div key={index} className='text-[18px] text-black bg-gray-500 rounded-md w-min px-2 my-2'>{message.message}</div>
                        </>
                        }
                        { message.from === 'valet' && message.type === 'response' &&
                        <>
                        <div key={index} className='text-[18px] text-black'>{message.message}</div>
                        </>
                        }
                        { message.from === 'valet' && message.type === 'notes' &&
                        <>
                        <Documentscontainer />
                        </>
                        }
                    </>
                ))}
            </div>
            <form className='flex flex-row space-between bg-white rounded-2xl p-2'>
                <input className='focus:border-transparent w-full' type="text" value={message} onChange={e => setMessage(e.target.value)} />
                <button className='bg-blue-500 ml-2' onClick={handleClick}>Send</button>
            </form>
        </div>
    )
}