// react router links have been commented out but could be uncommented when the links are set up

import React, { useEffect, useState } from 'react';
import DocumentCard from '@/components/documentcard';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkAuthAPI } from '@/functions/auth';
import { login } from '@/redux/features/auth-slice';
import { getUserDocsAPI } from '@/functions/content';
import { setDocuments } from '@/redux/features/documents-slice';

function Documentscontainer() {

    const [navigator, setNavigator] = useState(['documents']);

    const dispatch = useDispatch();
    const documents = useSelector((state) => state.documentsReducer.value.documents);
    const auth = useSelector((state) => state.authReducer.value);

    useEffect(() => {
        setNavigator(['documents']);

        checkAuthAPI().then((res) => {
            if (res) {
                dispatch(login());
            } else {
                window.location.href = '/login';
            }
        });

        getUserDocsAPI().then((res) => {
            const docs = {
                documents: res,
            };
            dispatch(setDocuments(docs));
        });

    }, []);

    if (auth.isLogged) {
        return (
            <div className="flex flex-col items-left justify-start w-full pb-32">
                <div className="flex flex-row pt-6 pl-8">
                    {navigator.map((item, index) => (
                        <p key={index} className="text-black hover:text-blue-500 text-xs mx-[2px]">{'/ '+item}</p>
                    ))}
                </div>
                <div className="flex flex-row justify-start w-full flex-wrap px-4">
                    {documents.map((item, index) => (
                        <DocumentCard key={index} documentInfo={item}/>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default Documentscontainer;
