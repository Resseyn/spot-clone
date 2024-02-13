import { create } from "zustand";
interface AuthModalStore  {
    isOpen: boolean;
    isLogin: boolean;
    onOpen: () => void;
    onClose: () => void;
    onLogin: () => void;
    onSign: () => void;
}

const useAuthModal = create<AuthModalStore>(
    (set) => ({
        isOpen: false,
        isLogin: false,
        //whoooopsie...........
        onLogin: () => set({isOpen : true}),
        onOpen: () => set({isLogin: true}),
        onClose: () => set({isOpen: false}),
        onSign: () => set({isLogin: false}),
    })
)
export default useAuthModal

interface UploadModalStore  {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useUploadModal = create<UploadModalStore>(
    (set) => ({
        isOpen: false,
        onOpen: () => set({isOpen: true}),
        onClose: () => set({isOpen: false}),
    })
)