'use client'

import '../app/globals.css';
import DocumentCard from '@/components/documentcard';
import { use, useEffect , useState } from 'react';
import { resetDocuments , setDocuments , addDocument , removeDocumentById , updateDocumentById } from '@/redux/features/documents-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { checkAuthAPI } from '@/functions/auth';
import { login } from '@/redux/features/auth-slice';
import { getUserDocsAPI } from '@/functions/content';

function Documentscontainer() {
    
    const [navigator, setNavigator] = useState(['documents']);

    const dispatch = useDispatch<AppDispatch>();
    const documents = useAppSelector((state) => state.documentsReducer.value.documents);
    const auth = useAppSelector((state) => state.authReducer.value);

    useEffect(() => {

        setNavigator(['documents']);

        checkAuthAPI().then((res) => {
          if (res) {
              dispatch(login());
          }
          else {
              window.location.href = '/login';
          }
        });

        getUserDocsAPI().then((res) => {
            const docs = {
                documents: res,
            }
            dispatch(setDocuments(docs));
        }
        );

    }, []);

    if (auth.isLogged) {
    return (
        <div className="flex flex-col items-left justify-start w-full">
            <div className="flex flex-row pt-6 pl-8">
                {navigator.map((item, index) => {
                    return (
                        <p key={index} className="text-black hover:text-blue-500 text-xs mx-[2px]">{'/ '+item}</p>
                    )
                }
                )}
            </div>
            <div className="flex flex-row justify-start w-full flex-wrap px-4">
                {documents.map((item, index) => {
                    return (
                        // send the title and if in the url with key
                        <Link href={'/documents/notes'+'?name='+item.name+'&id='+item.id} key={index}>
                            <DocumentCard key={index} documentInfo={item}/>
                        </Link>
                    )
                }
                )}
                {/* <DocumentCard documentInfo={{
                    id: 1,
                    type: 'pdf',
                    title: 'My Document',
                    url: 'https://www.google.com',
                    subdocs: 0,
                    dateadded: '2021-07-01',
                    datemodified: '2021-07-01',
                    totalnotes: 0,
                }}/>
                <DocumentCard documentInfo={{
                    id: 1,
                    type: 'pdf',
                    title: 'My Document',
                    url: 'https://www.google.com',
                    subdocs: 0,
                    dateadded: '2021-07-01',
                    datemodified: '2021-07-01',
                    totalnotes: 0,
                }}/>
                <DocumentCard documentInfo={{
                    id: 1,
                    type: 'pdf',
                    title: 'My Document',
                    url: 'https://www.google.com',
                    subdocs: 0,
                    dateadded: '2021-07-01',
                    datemodified: '2021-07-01',
                    totalnotes: 0,
                }}/>
                <DocumentCard documentInfo={{
                    id: 1,
                    type: 'pdf',
                    title: 'My Document',
                    url: 'https://www.google.com',
                    subdocs: 0,
                    dateadded: '2021-07-01',
                    datemodified: '2021-07-01',
                    totalnotes: 0,
                }}/> */}
            </div>
        </div>
    )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default Documentscontainer;