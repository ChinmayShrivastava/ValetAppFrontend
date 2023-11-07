import '../app/globals.css';
import { useEffect , useState } from 'react';
import NoteCard from './notecard';
import ReadNote from './readnote';
import { resetNotes , setNotes , addNote , removeNoteById , updateNoteById } from '@/redux/features/notes-slice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { checkAuthAPI } from '@/functions/auth';
import { login } from '@/redux/features/auth-slice';
import { getDocContentAPI } from '@/functions/content';



function Notescontainer({ documentid , documentname }) {

    const [navigator, setNavigator] = useState(['documents', 'notes-' + documentid]);
    const [selectednoteid, setSelectednoteid] = useState(null);

    const dispatch = useDispatch();
    const notes = useAppSelector((state) => state.notesReducer.value.notes);
    const auth = useAppSelector((state) => state.authReducer.value);

    useEffect(() => {

        setNavigator(['documents', 'notes-' + documentid]);

    }, [documentid]);

        checkAuthAPI().then((res) => {
          if (res) {
              dispatch(login());
          }
          else {
              window.location.href = '/login';
          }
        });

    }

    useEffect(() => {
        if ( auth.isLogged && documentid ) {
            getDocContentAPI(documentid).then((res) => {
                const notes_ = {
                    notes: res,
                }
                dispatch(setNotes(notes_));
            });
        }
    }, [documentid, auth]);

    const handleNoteClick = (id) => {
        setSelectednoteid(id);
    }

    if (auth.isLogged) {
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
            {/* <h1>{documentname}</h1> */}
            <div className="flex flex-row items-left justify-start w-full flex-wrap px-4">
                { notes.map((note, index) => {
                    return (
                        <div key={index} className='mr-4' onClick={() => handleNoteClick(index)}>
                            <NoteCard noteInfo={note} />
                        </div>
                    )
                }
                )}
            </div>
            { selectednoteid !== null &&
                <div className='ml-0 w-full flex justify-center align-middle h-screen absolute z-40 top-0 items-center backdrop-blur-sm' onClick={() => setSelectednoteid(null)}>
                    <ReadNote noteInfo={notes[selectednoteid]} />
                </div>
            }
        </div>
    )
    }
    else {
        return (
            <div></div>
        )
    }


export default Notescontainer;