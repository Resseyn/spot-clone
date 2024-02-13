import { FaPause, FaPlay } from "react-icons/fa";
import { Song } from "../../types/typesBD";
import Button from "./Button";
import { useRef, useState } from "react";
import { usePlayerContext } from "../hooks/usePlayer";


export default function SongBox(songData: Song) {
    const audioRef = useRef<HTMLAudioElement>();
    const playerContext = usePlayerContext()
    const [isPlaying, setPlaying] = useState(false)

    function playSong() {
       if (isPlaying) {
            playerContext.onPause()
            playerContext.setDuration(audioRef.current?.duration)
            playerContext.setSong(songData)
            audioRef.current.pause()
            setPlaying(false)
       } else {
            audioRef.current.play()
            playerContext.onPlay()
            playerContext.setDuration(audioRef.current?.duration)
            playerContext.setSong(songData)
            setPlaying(true)
       }
    }
    return(
        <div onClick={playSong}
        className="bg-neutral-800
        group
        relative
        flex
        flex-col
        items-center
        justify-center
        p-3
        rounded-md
        hover:bg-neutral-100/20
        transition
        ">
            <div className="flex justify-end
            items-end">
                <img src={songData.image_path}
                className="
                max-h-[128px]
                max-w-[128px]
                min-h-[128px]
                min-w-[128px]
                "></img>
                <button 
                        className="
                        absolute
                        opacity-0
                        transition
                        flex
                        bg-green-500
                        p-3
                        m-1
                        shadow-md
                        shadow-neutral-800
                        group-hover:opacity-100
                        hover:scale-110
                        rounded-full"
                    >
                        {!isPlaying ?
                            <FaPlay
                            className="text-black
                            relative
                            left-[1px]"
                        /> : 
                        <FaPause className="text-black"/>}
                    </button>
            </div>
            <div className="size-full">
                <h1 className="text-center">{songData.title}</h1>
                <p className="text-neutral-500/85 text-sm">Creator: {songData.author_id}</p>
            </div>
            <audio src={songData.song_path} ref={audioRef}/>
        </div>
    )
}