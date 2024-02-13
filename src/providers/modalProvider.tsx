import { useEffect, useState } from "react"
import React from "react";
import useAuthModal, { useUploadModal } from "../hooks/useModal";
import AuthModalComponent from "../components/AuthModal/Modal";
import UploadModalComponent from "../components/UploadModal/Modal";


export default function ModalProvider () {
    //const sub
    const [isMounted, setIsMounted] = useState(false)
    const AUmodalContext = useAuthModal()
    const UPmodalContext = useUploadModal()
    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null;
    }

    return<><AuthModalComponent/>
            <UploadModalComponent/></>

}