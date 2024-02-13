import { SetStateAction, createContext, useEffect, useState } from "react";
import { UserDetails } from "../../types/typesBD";
import axios from "axios";
import React from "react";
import { useSessionContext } from "../hooks/useSession";
import HandleExpiredTokens from "../methods/refreshToken";
import { server } from "../conf";

type UserContextType = {
    userDetails: UserDetails | null;
    isLoading: boolean;
    setUserDetails: React.Dispatch<SetStateAction<UserDetails | null>>;
    setIsLoadingData: React.Dispatch<SetStateAction<boolean>>;
}
export interface Props {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export default function MyUserContextProvider({children}: Props){
    const sessionContext = useSessionContext()
    const [user, setUser] = useState<UserDetails | null>(null)
    const [isLoadingData, setLoadingData] = useState(false)
    const isLoadingSession = sessionContext?.session?.isLoadingSession
    const accessToken = sessionContext?.session?.accessToken ?? null;
    //const sub

    const GetUserDetails = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            };
            const response = await axios.get(server +'/user/data', { headers });
            return response.data;
        } catch (error) {
            return HandleExpiredTokens(sessionContext, error)
        }
    }
    useEffect(() => {
        if (sessionContext.session?.isLoadingSession && !isLoadingData && !user) {
            setLoadingData(true)
            const promises = []
            const userData = JSON.parse(localStorage.getItem("userData") as string);
            console.log(userData)
            if (userData == null) {
                promises.push(GetUserDetails())
            } else {
                setUser(userData)
            }

            if (promises.length != 0) {
            Promise.allSettled<string>(promises)
            .then((results) => {
                const UserDetailsPromise = results[0]
                if (UserDetailsPromise.status == "fulfilled") {
                    const data = {
                        uid: UserDetailsPromise.value["uid"],
                        username: UserDetailsPromise.value["username"],
                        image: UserDetailsPromise.value["image"],
                    }
                    setUser(data)
                    localStorage.setItem("userData", JSON.stringify(data))
                }
                setLoadingData(false)
            })
            .catch((error) => {
                console.error(error);
                setLoadingData(false)
            })}
        } else if (!isLoadingSession && !isLoadingData && !sessionContext.session?.accessToken) {
            setUser(null)
            setLoadingData(false)
        }
    }, [sessionContext?.session?.isLoadingSession]);
    
    return (<UserContext.Provider value={{userDetails: user, 
        isLoading: isLoadingData,
        setUserDetails: setUser, 
        setIsLoadingData: setLoadingData}}>
        {children}
        </UserContext.Provider>)
    
}
