import { useEffect, useState } from "react"
import { GetSongDetails } from "../methods/getSongs"
import { useSessionContext } from "../hooks/useSession"
import SongBox from "./SongBox"
import { Song } from "../../types/typesBD"


export default function SongList() {
    const sessionContext = useSessionContext()
    const [songs, setSongs] = useState<Song[]>([])

    useEffect(() => {
        Promise.allSettled<string>([GetSongDetails(sessionContext)]).then((results) =>
        {
            setSongs(results[0].value)
        })
    }, [sessionContext])

    return (
        <div className="px-5">
            <h1 className="text-2xl font-bold">Hen songs</h1>
            <div className="mt-4 flex gap-x-4">
                {songs && songs.map((song) => (
                <SongBox key={song.id} {...song}/>
            ))}
            </div>
        </div>
    )
}