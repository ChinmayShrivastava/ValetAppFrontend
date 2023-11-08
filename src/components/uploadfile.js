import React from 'react';
import {useDropzone} from 'react-dropzone';
import { uploadfile , setType , setUploaded , setUploading } from '@/redux/features/file-upload-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useAppSelector } from '@/redux/store';
import { fileUploadAPI } from '@/functions/fileupload';

export default function FileUpload() {

    const dispatch = useDispatch();
    const type = useAppSelector(state => state.fileReducer.value.type);
    const file = useAppSelector(state => state.fileReducer.value.file);
    const isUploading = useAppSelector(state => state.fileReducer.value.isUploading);

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        onDrop: (acceptedFiles) => {
            acceptedFiles.forEach((file) => {
                const reader = new FileReader();

                reader.onload = () => {
                    const binaryStr = reader.result;
                    console.log(binaryStr);
                    // set file
                    dispatch(setType(file.type));
                    dispatch(uploadfile(binaryStr));
                };
                reader.readAsArrayBuffer(file);
            });
        },
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p className='text-white p-4 cursor-pointer bg-blue-500 rounded-md mb-4'>{file}</p>
            <p className='text-white p-4 cursor-pointer bg-blue-500 rounded-md mb-4'>Drag 'n' drop some files here, or click to select files</p>
        </div>
    );
};