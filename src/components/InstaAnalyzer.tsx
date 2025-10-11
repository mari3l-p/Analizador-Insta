"use client" 

import JSZip from 'jszip';
import DropFiles from "./DropFiles"
import ResultsDisplay from "./ResultsDisplay"
import { useState } from 'react';
import NumbersResult from './NumbersResult';

export default function InstaAnalyzer() {

    const [notFollowingMe, setNotFollowingMe] = useState<{value: string; href: string}[]>([])
    const [meNotFollowing, setMeNotFollowing] = useState<{value: string; href: string}[]>([])
    const [numFollowers, setNumFollowers] = useState<number>(0)
    const [numFollowing, setNumFollowing] = useState<number>(0)
    const [numMutuos, setNumMutuos] = useState<number>(0)

    const [showResults, setShowResults] = useState<boolean>(false)

    function resetData() {
        setNotFollowingMe([]);
        setMeNotFollowing([]);
        setNumFollowers(0);
        setNumFollowing(0);
        setNumMutuos(0);
        setShowResults(false);
    }



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

            setNumFollowers(followers.length)
            setNumFollowing(following.length)

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

            // Siguiendo mutuamente
            const mutuos = followers.filter(user => followingSet.has(user.href))
            setNumMutuos(mutuos.length)
            console.log("Number of mutuals:", mutuos.length);

            setShowResults(true)

        } catch (error) {
            console.error("Fail to read the .zip file", error);
            resetData();
        }
    }

    return(
        <>
            <DropFiles analyzeZipFile={analyzeZipFile} setShowResults={setShowResults}></DropFiles>

            {showResults === true ? 
                <div>
                    <NumbersResult numFollowers={numFollowers} numFollowing={numFollowing} numMutuos={numMutuos}></NumbersResult>
                    <h3 className="text-xl font-medium mt-15 w-xs">Tablas de Usuarios</h3>
                    <ResultsDisplay data={meNotFollowing} title="Usuarios que me siguen y yo no sigo" color="border-purple" hoverColor="hover:purple" textColor="purple-text"></ResultsDisplay>
                    <ResultsDisplay data={notFollowingMe} title="Usuarios que sigo y no me siguen" color="border-turquoise" hoverColor="hover:turquoise" textColor="turquoise-text"></ResultsDisplay>
                </div>
                : null
            }
        </>
    )
}