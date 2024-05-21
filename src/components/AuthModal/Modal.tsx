import * as Dialog from "@radix-ui/react-dialog";
import { CgCross } from "react-icons/cg";
import PasswordInput from "./PasswordInput";
import { FormEvent } from "react";
import { GrGoogle } from "react-icons/gr";
import useModal from "../../hooks/useModal";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useSessionContext } from "../../hooks/useSession";
import UpdateSessionTokens from "../../methods/updateSession";

//НАДО БЫЛО ДЕЛАТЬ ПРОСТО СТЕЙТ У МОДАЛКИ........

export default function AuthModalComponent(){
    const modalContext = useModal()
    const sessionContext = useSessionContext()
    function Submit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      if (modalContext.isLogin) {
        const headers = {
          'Content-Type': 'application/json',
        };
        const body: any = {}
          for (const pair of data.entries()) {
            body[pair[0]] = pair[1]
          }
        axios.post("http://localhost:8080/login", body, { headers }
        ).then(response => {
            UpdateSessionTokens(sessionContext, 
              response.data["accessToken"],
              response.data["refreshToken"])
            modalContext.onClose()
            modalContext.onClose();
            window.location.reload();
          })
          .catch((error : XMLHttpRequest) => {
            if (error.response.status == 401) {
              toast.error("Wrong email or password!")
            }
            if (error.response.status == 500) {
              if (error.response.data == "Email Occupied") {
                toast.error("Something went wrong!")
              }
            }
        })
    } else {
      const headers = {
        'Content-Type': 'application/json',
      };
      const body: any = {}
        for (const pair of data.entries()) {
          body[pair[0]] = pair[1]
        }
      axios.post("http://localhost:8080/register", body, { headers }
      ).then(response => {
        if (response.status == 200) {
          toast.success("Successful registration!")
          axios.post("http://localhost:8080/login", body, { headers }
          ).then(response => {
            UpdateSessionTokens(sessionContext, 
              response.data["accessToken"],
              response.data["refreshToken"])
            modalContext.onClose()
            window.location.reload();
            })
            .catch((error : XMLHttpRequest) => {
              if (error.response.status == 500) {
                if (error.response.data == "Email Occupied") {
                  toast.error("Something went wrong!")
                }
              }
          })
        }
    })
    .catch((error : XMLHttpRequest) => {
        if (error.response.status == 400) {
          if (error.response.data == "Email Occupied") {
            toast.error("Email is occupied!")
          } else{
            toast.error("Invalid request!")
          }
        }
        if (error.response.status == 500) {
          if (error.response.data == "Email Occupied") {
            toast.error("Something went wrong!")
          }
        }
    })
    }
  } 

    
    return (
        <Dialog.Root
        open={modalContext.isOpen}
        defaultOpen={modalContext.isOpen}
        onOpenChange={modalContext.onClose}>
      <Dialog.Portal>
      <Dialog.Overlay className="
      bg-blackA6 
      data-[state=open]:animate-overlayShow 
      fixed 
      backdrop-blur-sm
      inset-0" />
      <Dialog.Content className="
      data-[state=open]:animate-contentShow 
      fixed top-[50%] 
      left-[50%] 
      max-h-[85vh] 
      w-[90vw] 
      max-w-[450px] 
      translate-x-[-50%] 
      translate-y-[-50%] 
      rounded-[10px] 
      bg-neutral-900 
      p-[25px] 
      shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
      focus:outline-none"
      >
        <Dialog.Title className="text-m-0
        text-[17px] font-medium text-center">
          {modalContext.isLogin ? <p>Log in</p> : <p>Sign up</p>}
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 
        mt-[10px] mb-5 text-[15px] leading-normal text-center">
          {modalContext.isLogin ? <p>Enter your account details</p> :
          <p>Create an account</p>}
        </Dialog.Description>
        <form onSubmit={Submit}>
          <fieldset className="mb-[15px] flex 
          flex-col items-center mx-6">
            <label className="text-violet11 w-full pb-2 text-left text-[15px]" htmlFor="username">
              Username
            </label>
            <input
              className="text-violet-300 shadow-violet7 focus:shadow-violet8 
              inline-flex min-h-[35px] w-full flex-1 items-center 
              justify-center rounded-[4px] px-[10px] text-[15px]
              leading-none shadow-[0_0_0_1px] outline-none 
              focus:shadow-[0_0_0_2px]"
              name="username"
              placeholder=
              {modalContext.isLogin ? "Enter your email or username..." : "Enter your username..."}
            />
          </fieldset>
          {!modalContext.isLogin && <fieldset className="mb-[15px] flex 
          flex-col items-center mx-6">
            <label className="text-violet11 w-full pb-2 text-left text-[15px]" htmlFor="email">
              Email
            </label>
            <input
              className="text-violet-300 shadow-violet7 focus:shadow-violet8 
              inline-flex min-h-[35px] w-full flex-1 items-center 
              justify-center rounded-[4px] px-[10px] text-[15px]
              leading-none shadow-[0_0_0_1px] outline-none 
              focus:shadow-[0_0_0_2px]"
              name="email"
              placeholder="Enter your email"
            />
          </fieldset>}
            <PasswordInput/>
        <div className="mt-5 flex justify-center">
          <div className="bg-violet-100 rounded-full
          size-10 flex justify-center items-center
          hover:cursor-pointer
        hover:shadow-violet-700
          hover:shadow-lg">
            <GrGoogle size={20} className="text-violet-500"></GrGoogle>
          </div>
        </div>
          <div className="mt-5 flex justify-center">
            <button className="bg-violet4 text-violet11
              shadow-violet7 focus:shadow-violet8
              inline-flex h-[35px] items-center justify-center 
              rounded-[4px] px-[15px] font-medium leading-none 
              focus:shadow-[0_0_0_2px] focus:outline-none
              disabled:bg-gray-500"
              type="submit">
              {modalContext.isLogin ? <p>Log in</p> : <p>Sign up</p>}
            </button>
          </div>
        </form>
        <Dialog.Description className="text-mauve11 
        mt-5 text-[15px] leading-normal text-center">
          {modalContext.isLogin ? <p>Have no account? Try <a 
          className="
          underline
          hover:cursor-pointer
          hover:text-violet-300"
          onClick={() =>
            {modalContext.onSign()}}
          >signing up</a></p> :
          <p>Have an account? Try <a
          className="
          underline
          hover:cursor-pointer
          hover:text-violet-300"
          onClick={() =>
          {
            modalContext.onOpen()
            modalContext.onLogin()}}>logging in</a></p>}
        </Dialog.Description>
        <Dialog.Close asChild>
          <button
            className="text-violet11 
            hover:bg-violet4 
            focus:shadow-violet7 
            absolute top-[10px] 
            right-[10px] 
            inline-flex h-[25px] w-[25px] 
            appearance-none items-center 
            justify-center rounded-full 
            focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          ><CgCross size={42}/>
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
        </Dialog.Root>
    )
}