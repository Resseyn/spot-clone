import { BiSearch, BiUser } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import Button from "./Button";
import useAuthModal from "../hooks/useModal";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import axios from "axios";
import { useSessionContext } from "../hooks/useSession";
import { server } from "../conf";

export default function HomeNavBar(){
    const modalContext = useAuthModal()
    const userContext = useUser()
    const sessionContext = useSessionContext()
    function Logout(){
        toast((t) => (
            <div className="flex">
              <p className="pr-5">Are you sure to log out?</p>
              <button className="pr-5"
              onClick={() => {
                const headers = {
                    "Authorization": "Bearer " + sessionContext.session?.accessToken,
                    "Content-Type": "application/json"
                }
                const body = {
                    "refreshToken": sessionContext.session?.refreshToken
                }
                axios.post(server + "/user/logout", body, {headers})
                .then((response) => {
                    if (response.status == 200) {
                        sessionContext.setSession({
                            accessToken: null,
                            refreshToken: null,
                            isLoadingSession: false,
                        })
                        userContext?.setUserDetails(null)
                        localStorage.clear()
                    }
                }).catch((error) =>{
                    console.log(error)
                }
                )
                toast.dismiss(t.id)}}>
                Yes.
              </button>
              <button
              onClick={() => {
                toast.dismiss(t.id)}}>
                No.
              </button>
            </div>
          ));
    }




    return (
        
            <div className="flex items-center">
                <nav className="hidden
                        md:flex
                        justify-between
                        gap-4
                        h-fit
                        ">
                            <div className="flex gap-x-4">
                                <button
                                onClick={() => window.history.back()}
                                className="
                                bg-neutral-950
                                hover:text-white
                                hover:opacity-100
                                hover:bg-opacity-70
                                opacity-40
                                transition
                                p-1
                                rounded-full"
                                >
                                    <RxCaretLeft
                                    size={30}/>
                                </button>
                                <button
                                onClick={() => window.history.forward()}
                                className="
                                bg-neutral-950
                                hover:text-white
                                hover:opacity-100
                                hover:bg-opacity-70
                                opacity-40
                                transition
                                p-1
                                rounded-full
                                
                                ">
                                    <RxCaretRight
                                    size={30}/>
                                </button>
                            </div>
                        </nav>
                        <div className="flex md:hidden
                        gap-x-2
                        ">
                            <button className="
                            hover:opacity-75
                            p-2
                            bg-neutral-950
                            transition
                            rounded-full
                            ">
                                <HiHome size={20}></HiHome>
                            </button>
                            <button className="
                            hover:opacity-75
                            p-2
                            bg-neutral-950
                            transition
                            rounded-full
                            ">
                                <BiSearch size={20}></BiSearch>
                            </button>
                        </div>
                        {userContext?.userDetails ? 
                         <div className="flex gap-x-3 w-full justify-end items-center">
                            <p>{userContext.userDetails.username}</p>
                            <Button className="
                            bg-transparent
                            text-neutral-300
                            p-0
                            border-4
                            font-medium
                            focus:ring-white
                            max-h-[50px]
                            max-w-[50px]
                            flex
                            items-center
                            "
                            onClick={Logout}>
                               {userContext.userDetails.image == ""
                               ? <BiUser size={40}></BiUser>
                            : <img src={userContext.userDetails.image}
                                className="max-h-[40px]
                                max-w-[40px]
                                rounded-full"
                                ></img>}
                            </Button>
                            </div>
                        :
                        <div className="flex gap-x-2 w-full justify-end">
                        <Button className="
                        bg-transparent
                        px-6
                        text-neutral-300
                        font-medium
                        focus:ring-white
                        "
                        onClick={() => {
                            modalContext.onOpen()
                            modalContext.onLogin()
                            modalContext.onSign()
                        }}>
                            Sign Up
                        </Button>
                        <Button className="
                        bg-white
                        px-6
                        focus:ring-white
                        "
                        onClick={() => {
                            modalContext.onOpen()
                            modalContext.onLogin()
                        }}>
                            Log in
                        </Button>
                    </div>}
            </div>
    )
}
