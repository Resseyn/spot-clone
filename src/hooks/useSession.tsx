import { create } from "zustand";

type SessionType = {
    accessToken: string | null;
    refreshToken: string | null;
    isLoadingSession: boolean;
}

export interface Props {
    children: React.ReactNode
}
interface sessionContext  {
    session: SessionType | null,
    setSession: (session: SessionType) => void;
}

let session = JSON.parse(localStorage.getItem("session"));
if (session == null) {
    session = {
        accessToken: null,
        refreshToken: null,
        isLoadingSession: false,
    }
}
export const useSessionContext = create<sessionContext>(
    (set) => ({
    session: session,
    setSession: (session: SessionType | null) => set({ session : session}),
    })
)