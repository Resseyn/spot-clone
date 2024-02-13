import { FaPlay } from "react-icons/fa"

interface ListProps {
    image: string,
    name: string,
    href: string,
}

export default function ListItem({image, name, href}: ListProps) {
    function RunPlaylist(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        // play
        console.log(123123)
    } 
    return (
        <div
            className="
            flex
            overflow-hidden
            rounded-md
            group
            items-center
            gap-x-4
            bg-neutral-100/10
            hover:bg-neutral-100/20
            transition
            " 
            onClick={() => window.location.pathname = href}
        >
            <div
                className="
                min-w-[64px]
                min-h-[64px]
                max-h-[64px]
                max-w-[64px]"
            >
                <img src={image} alt="Liked"></img>
            </div>
            <div
                className="flex
                h-full
                w-full
                items-center
                justify-between
                overflow-hidden
                gap-2
                pr-2"
            >
                <p
                    className="
                    font-medium
                    truncate"
                >
                    {name}
                </p>
                <button 
                    onClick={(event) => RunPlaylist(event)}
                    className="
                    opacity-0
                    transition
                    flex
                    bg-green-500
                    p-3
                    drop-shadow-md
                    group-hover:opacity-100
                    hover:scale-110
                    rounded-full"
                >
                    <FaPlay
                        className="text-black
                        relative
                        left-[1px]"
                    />
                </button>
            </div>
        </div>
    )
}