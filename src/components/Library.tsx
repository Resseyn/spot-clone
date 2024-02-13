import { ReactNode } from "react";
import SidebarItem from "./SidebarItem";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlineAccountBook, AiOutlinePlus } from "react-icons/ai";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import { useUploadModal } from "../hooks/useModal";

interface LibraryProps {
    children : ReactNode;
}


export default function Library(){
    const user = useUser()
    const modal = useUploadModal()
    function onClick() {
        if (user?.userDetails) {
            modal.onOpen()
        } else{
            toast.error("You need to be logged in!")
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex
            items-center
            justify-between
            px-6
            pt-4
            cursor-pointer
            "
            //onClick={}
            >
                <div className="inline-flex items-center text-neutral-400
                gap-x-2 
                hover:text-white transition">
                    <TbPlaylist size={26}/>
                    <p className="
                    font-medium
                    text-md"
                    >Your Library</p>
                </div>
                <AiOutlinePlus onClick={onClick}
                size={20} 
                className="text-neutral-400
                hover:text-white transition"
                />
            </div>
            <div className="flex flex-col
                gap-y-2
                px-3
                mt-4">
                    <p>Filters</p>
                    Library
            </div>
        </div>
    )

}