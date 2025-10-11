"use client"

import React, {useCallback, useState} from 'react'
import {useDropzone, FileRejection} from 'react-dropzone'
import JSZip from 'jszip';
import { CloudUpload} from "react-bootstrap-icons";



export default function DropZip() {

    const [fileName, setFileName] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [notFollowingMe, setNotFollowingMe] = useState<{value: string; href: string}[]>([])
    const [meNotFollowing, setMeNotFollowing] = useState<{value: string; href: string}[]>([])
    const [clickToShow, setClickToShow] = useState(false)

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
        }
    }, [])

    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, onDropRejected,
        accept: {
            'application/zip': ['.zip']
        },
        multiple: false // This is a good addition to ensure only one file is accepted
    });


    async function analyzeZipFile(file: File) {
        try {

            const zip = await JSZip.loadAsync(file)

            const paths: string[] = ["connections/followers_and_following/followers_1.json", "connections/followers_and_following/following.json"]
            
            async function readUsersFromFile(path: string): Promise<{value: string, href:string}[]> {

                const f = zip.file(path)

                const users: { value: string, href: string }[] = []

                if (f) {
                    const content = await f.async("text")
                    const jsonData = JSON.parse(content)

                    const dataArr = Array.isArray(jsonData) ? jsonData : jsonData.relationships_following || jsonData.relationships_followers || []
                    
                    dataArr.forEach((item: {string_list_data: {value: string; href: string}[] }) => {
                        item.string_list_data.forEach((user: {value: string, href: string}) => {
                            users.push(user)
                        })
                    })
                }

                return users
            }
            
            const [followers, following] = await Promise.all(
                paths.map(path => readUsersFromFile(path))
            )

            console.log("Followers:", followers)
            console.log("Following:", following)

            // Data that's gonna be display

            // Creamos sets basados en strings, no en objetos
            const followersSet = new Set(followers.map(u => u.href))
            const followingSet = new Set(following.map(u => u.href))

            // Los que yo sigo pero no me siguen
            const notFm = following.filter(user => !followersSet.has(user.href))
            setNotFollowingMe(notFm)

            // Los que me siguen pero yo no sigo
            const meNotFm = followers.filter(user => !followingSet.has(user.href))
            setMeNotFollowing(meNotFm)

        } catch (error) {
            console.error("Fail to read the .zip file", error)
        }
    }

    return ( <>
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
        
        

        {!error &&
            <div>
                <ol className='list-decimal'>{notFollowingMe.map(usr => <li key={usr.href}><a href={usr.href} target='_blank'>{usr.value}</a></li>)}</ol><br />
                <ol className='list-decimal'>{meNotFollowing.map(usr => <li key={usr.href}><a href={usr.href} target='_blank'>{usr.value}</a></li>)}</ol>
            </div>
        }
    </>)
}