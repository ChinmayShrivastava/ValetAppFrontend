'use client'

import React from "react";
import { useState } from "react";
import { notesUploadAPI } from "@/functions/notesupload";

export default function UploadNotes() {
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('Dump your notes here and we’ll organize them for you for better retrieval.');

    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.target.value);
        setStatus('Dump your notes here and we’ll organize them for you for better retrieval.');
    }

    const handleNotesSubmit = () => {
        setStatus('Uploading notes...');
        notesUploadAPI(
            notes
            ).then((res) => {
                if(res) {
                    setStatus('Notes uploaded successfully, might take 10-15 minutes to process!');
                    setNotes('');
                }
            }
        ).catch((err) => {
            setStatus('error');
        }
        );
    }

    return (
        <div className="mb-2">
            <p className="text-black">{status}</p>
                <textarea cols={30} rows={10} className="text-black w-3/5 p-2 rounded-md mr-2" onChange={(e) => handleNotesChange(e)} value={notes} placeholder='note' />
                <button className="text-white bg-blue-500 rounded-md p-2" type="submit" onClick={handleNotesSubmit}>Submit</button>
            </div>
    )
}

