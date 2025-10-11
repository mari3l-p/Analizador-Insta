"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

// declaring the type of the array
    type navlink = {
        href: string;
        text: string;
    }

export default function NavLinks() {


    // setting the array with the links for the navbar
    const navbar: navlink[] = [
        {href: '/guia', text: 'Guía de uso'},
        {href: '/', text: 'Análizar'},
        {href: '/privacidad', text: 'Privacidad'},
    ]

    // store the current url in a variable
    const currentURL = usePathname()

    return <>
        <div className="h-25 pt-14 flex justify-around bg-[#26282C] fixed top-0 right-0 left-0 border-b border-b-[#787D87]  z-50">

            {navbar.map((link) => {
                const isActive = currentURL === link.href;

                return <Link 
                    key={link.href} 
                    href={link.href} 
                    className={`px-6 pb-2 text-center border-b-4 hover:blue ${isActive ? "blue-border" : "border-none"}`}
                >
                    {link.text}
                </Link>
            })}
        </div>
    </>


}