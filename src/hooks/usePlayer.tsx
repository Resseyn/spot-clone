import { create } from "zustand";
import { Song } from "../../types/typesBD";


export interface Props {
    children: React.ReactNode
}
interface playerContext  {
    song: Song | null,
    duration: number | null,
    isPaused: boolean,
    currentTime: number,
    setSong: (song: Song | null) => void,
    setDuration: (duration: number) => void,
    onPause: () => void,
    onPlay: () => void,
    setCurrentTime: (currentTime: number) => void,
}

export const usePlayerContext = create<playerContext>(
    (set) => ({
    song: null,
    duration: 0,
    isPaused: true,
    currentTime: 0,
    setSong: (song) => set({ song : song}),
    setDuration: (duration) => set({duration: duration}),
    onPause: () => set({ isPaused : true}),
    onPlay: () => set({ isPaused : false}),
    setCurrentTime: (currentTime) => set({ currentTime : currentTime})
    })
)