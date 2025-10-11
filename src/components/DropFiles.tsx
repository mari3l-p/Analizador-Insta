"use client"

import {useDropzone, FileRejection} from 'react-dropzone'
import { CloudUpload} from "react-bootstrap-icons";
import { useState, useCallback } from 'react';

type DropFilesProps = {
  analyzeZipFile: (file: File) => void;
  setShowResults: (show: boolean) => void
};

export default function DropFiles({analyzeZipFile, setShowResults}: DropFilesProps) {
     
    const [error, setError] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
         if (acceptedFiles.length > 0) {
            
            setError(null)
            setFileName(acceptedFiles[0].name);
            analyzeZipFile(acceptedFiles[0])
        }
    }, [])

    const onDropRejected = useCallback((fileRejections: FileRejection[]) => {

        if (fileRejections.length > 0 && fileRejections[0].errors[0].code === 'file-invalid-type') {
            setFileName(null)
            setError(`Error: Unicamente se aceptan archivos .zip`)
            setShowResults(false)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop, onDropRejected,
            accept: {
                'application/zip': ['.zip']
            },
            multiple: false // This is a good addition to ensure only one file is accepted
    });

    return(
        <>
            <div {...getRootProps()}>
                <div className="w-xs py-2 text-xl font-medium pl-6 blue-bg rounded-t-lg ">Ingreso de datos</div>
                <input {...getInputProps()} />
                <div className="w-xs py-12 center-element border border-t-0 blue-border border-dashed rounded-b-lg cursor-pointer">
                    {
                        isDragActive ?
                        <CloudUpload size={50} color={"var(--gray)"}></CloudUpload> :
                        <p className="w-3xs mt-2 text-center cursor-pointer">Arrastra tu archivo <span className="blue-text">ZIP</span> o haz click para seleccionarlo.</p>
                    }
                </div>
                    
                <div>{fileName ? <p className='w-xs gray-text mt-2 text-center'>Archivo subido: <span className='blue-text'>{fileName}</span></p> : null}</div>
                <div>{error && <p className='red-text text-center mt-2'>{error}</p>}</div>
        </div>
        </>
    )
}