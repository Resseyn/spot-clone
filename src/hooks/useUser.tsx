import { useContext } from "react"
import { UserContext } from "../providers/userProvider"


export default function useUser(){
    const usCon = useContext(UserContext)
    return usCon
}