'use client'

import '../app/globals.css';
import { useEffect , useState } from 'react';
import NoteCard from './notecard';
import ReadNote from './readnote';
import { resetNotes , setNotes , addNote , removeNoteById , updateNoteById } from '@/redux/features/notes-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useAppSelector } from '@/redux/store';

interface DocumentProps {
    documentid: string | string[] | undefined
}

// const notes = [
//     {
//         id: 1,
//         title: 'topic1',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam eget aliquam ultricies, nisl nunc ultricies nunc, vitae ultrices nisl nunc eu nisl. Sed euismod, diam eget aliquam ultricies, nisl nunc ultricies nunc, vitae ultrices nisl nunc eu nisl.',
//         topics: 'topic1, topic2, topic3',
//     },
//     {
//         id: 2,
//         title: 'topic2',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam eget aliquam ultricies, nisl nunc ultricies nunc, vitae ultrices nisl nunc eu nisl. Sed euismod, diam eget aliquam ultricies, nisl nunc ultricies nunc, vitae ultrices nisl nunc eu nisl.',
//         topics: 'topic1, topic2, topic3',
//     },
//     {
//         id: 3,
//         title: 'topic3',
//         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam eget aliquam ultricies, nisl nunc ultricies nunc, vitae ultrices nisl nunc eu nisl. Sed euismod, diam eget aliquam ultricies, nisl nunc ultricies nunc, vitae ultrices nisl nunc eu nisl.',
//         topics: 'topic1, topic2, topic3',
//     }];

type idType = number | null;

function Notescontainer({ documentid }: DocumentProps) {

    const [navigator, setNavigator] = useState(['documents', 'notes-' + documentid]);
    const [selectednoteid, setSelectednoteid] = useState<idType>(null);

    const dispatch = useDispatch<AppDispatch>();
    const notes = useAppSelector((state) => state.notesReducer.value.notes);

    useEffect(() => {
        setNavigator(['documents', 'notes-' + documentid]);
    }, [documentid]);

    const handleNoteClick = (id: idType) => {
        setSelectednoteid(id);
    }

    return (
        <div className="flex flex-col items-left justify-start w-full relative">
            <div className="flex flex-row pt-6 pl-8">
                {navigator.map((item, index) => {
                    return (
                        <p key={index} className="text-black hover:text-blue-500 text-xs mx-[2px]">{'/ '+item}</p>
                    )
                }
                )}
            </div>
            <div className="flex flex-row items-left justify-start w-full flex-wrap px-4">
                { notes.map((note, index) => {
                    return (
                        <div key={index} className='w-[30%] mx-auto' onClick={() => handleNoteClick(index)}>
                            <NoteCard noteInfo={note} />
                        </div>
                    )
                }
                )}
            </div>
            { selectednoteid !== null &&
                <div className='ml-0 w-full flex justify-center align-middle h-screen absolute z-40 top-0 items-center backdrop-blur-sm' onClick={() => setSelectednoteid(null)}>
                    <ReadNote noteInfo={notes[selectednoteid-1]} />
                </div>
            }
        </div>
    )
    }

export default Notescontainer;