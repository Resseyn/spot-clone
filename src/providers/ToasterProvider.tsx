import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
    return <Toaster
    toastOptions={{
        className:`t.visible ? 'animate-enter' : 'animate-leave 
        max-w-md w-full bg-neutral-900 shadow-lg 
        rounded-lg pointer-events-auto 
        flex ring-1 ring-black 
        ring-opacity-5
        text-violet-200`
    }}>
    </Toaster>
}