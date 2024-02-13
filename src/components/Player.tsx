import { usePlayerContext } from "../hooks/usePlayer";

export default function Player() {
    const playerContext = usePlayerContext()
    return (
        <>{playerContext.song && 
        <div className="bg-black 
        absolute w-full
        h-[120px]
        bottom-0">
            {playerContext.song.title}
            {playerContext.isPaused ? <p>На паузе</p> : <p>Играет</p>}
        </div>}</>
    )
}