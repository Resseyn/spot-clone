import { IconBase, IconType } from "react-icons"
import { twMerge } from "tailwind-merge"


interface SidebarItemProps {
    icon: IconType,
    label: string,
    active: boolean,
    href: string,
}

export default function SidebarItem(
    {icon: Icon, label, active, href}: SidebarItemProps){

    return (
        <a href={href}>
            <div className={twMerge(`
            flex justify-center w-full h-auto text-neutral-400
            py-1 px-1 rounded-lg  gap-x-2
            hover:text-white transition`, 
            active ? "text-white": "")}>
                <Icon size={26}></Icon>
                <p className="truncate w-full">{label}</p>
            </div>
        </a>
    )
}