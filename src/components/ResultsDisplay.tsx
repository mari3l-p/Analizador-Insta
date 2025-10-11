"use client"

import {  useState } from "react";

type usersProp = {
        data: { value: string; href: string }[];
        title: string;
        color: string;
        hoverColor: string;
        textColor: string;
    }

export default function ResultsDisplay({data, title, color, hoverColor, textColor}: usersProp) {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [usersToShow, setUsersToShow] = useState<number>(10);

    const totalPages = Math.ceil(data.length / usersToShow);

    const startIndex = (currentPage - 1) * usersToShow // (2 - 1) * 10 = 10
    const endIndex = startIndex + usersToShow // 2 * 10 = 20

    const usersShowing = data.slice(startIndex, endIndex)

    const prevPage = () => {
        setCurrentPage(current => Math.max(current - 1, 1))
    }

    const nextPage = () => {
        setCurrentPage(current => Math.min(current + 1, totalPages))
    }

    return (
        <div className="w-xs">
            <div className={`center-element text-xl font-light border mt-9 ${color} rounded-xl `}>
                <p className={`my-10 text-center ${textColor} w-2xs`}>{title}</p>
                <div className="w-2xs px-4">
                {usersShowing.map(usr => <li key={usr.href} className="list-none">
                    <a className={`pl-4 ${hoverColor}`} href={usr.href} target="_blank" rel="noopener noreferrer">{usr.value} </a> 
                    <hr className=" gray-dark my-2" /></li>)}
                </div>
            </div>
            <div className="w-full mb-12 py-3 rounded-b-xl text-center">
                <button onClick={prevPage} className={`${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} `}> &lt;</button>
                <span className="mx-4">{currentPage} de  {totalPages}</span>
                <button onClick={nextPage} className={`${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'} `}> &gt;</button>
            </div>
        </div>
    )

}