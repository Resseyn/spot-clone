import React, { useMemo } from "react";
import { ReactNode } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";


interface SidebarProps {
    children : ReactNode;
}


export default function Sidebar({children}: SidebarProps) {
    const pathname = window.location.pathname
    
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: "Home",
            active: pathname !== "/search",
            href: "/",
        },
        {
            icon: BiSearch,
            label: "Search",
            active: pathname === "/search",
            href: "/search", 
        }
    ], [pathname])

    const buttons = routes.map(route => {
        return (
            <SidebarItem icon={route.icon} 
            label={route.label} 
            active={route.active} 
            href={route.href} />
        )
    })

    return (
        <div className="flex h-full">
            <div className="hidden 
                md:flex
                flex-col
                gap-y-2
                bg-black
                h-full
                w-[300px]
                py-2
                px-1">
                <Box>
                    <div className="
                    flex
                    flex-col
                    gap-y-4
                    px-5
                    py-4
                    ">
                        {buttons}
                    </div>
               </Box>
                <Box className=
                "overflow-y-auto h-full">
                    <Library/>
                </Box>
            </div>
        </div>
    )
}