import * as Dialog from "@radix-ui/react-dialog";
import { CgCross } from "react-icons/cg";
import { FormEvent, useState } from "react";
import { GrGoogle } from "react-icons/gr";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useSessionContext } from "../../hooks/useSession";
import UpdateSessionTokens from "../../methods/updateSession";
import { useUploadModal } from "../../hooks/useModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import useUser from "../../hooks/useUser";
import HandleExpiredTokens from "../../methods/refreshToken";



export default function UploadModalComponent(){
    const [isLoading, setLoading] = useState(false)
    const {register,handleSubmit, reset} = useForm<FieldValues>({
      defaultValues: {
        author: "",
        title: "",
        song: null,
        image: null,
      }
    })
    const userContext = useUser()
    const modalContext = useUploadModal()
    const sessionContext = useSessionContext()
    const Submit: SubmitHandler<FieldValues> = async (values) => {
        const headers = {
          "Authorization": "Bearer " + sessionContext.session?.accessToken,
          "Content-Type": "multipart/form-data"
        }

        values.image = values.image[0]
        values.song = values.song[0]

        const req = axios.post("http://localhost:8080/songs/upload", values, {headers}).then(
          (response) => {return response}
        )
        try {
          setLoading(true)

          if (!values.image || !values.song || !userContext) {
            toast.error("Missing fields!")
            return
          }

          const response = await req
          toast.success("Song uploaded!")
          reset()
        } catch (error) {
            console.log(error)
            if (error.response.status == 400){
              toast.error("Invalid requeest!")
            } else {
            const respon = await HandleExpiredTokens(sessionContext, error)
            if (respon.response.status == 200){
              toast.success("Song uploaded!")
              reset()
            }
          }
        } finally {
          setLoading(false)
        }
    }

    
    return (
        <Dialog.Root
        open={modalContext.isOpen}
        defaultOpen={modalContext.isOpen}
        onOpenChange={() => {
          reset()
          modalContext.onClose()
        }}>
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
          Add a song
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 
        mt-[10px] mb-5 text-[15px] leading-normal text-center">
            Upload an MP3 file
        </Dialog.Description>
        <form onSubmit={handleSubmit(Submit)}>
          <Input 
              id="title"
              disabled={isLoading}
              {...register("title", {required: true})}
              placeholder="Song title"></Input>
            <Input 
            id="author"
            disabled={isLoading}
            {...register("author", {required: true})}
            placeholder="Song author"></Input>
            <Input 
            id="song"
            title="Select a song file"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", {required: true})}
            placeholder="Choose file"></Input>
            <Input 
            id="image"
            title="Select an image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", {required: true})}
            placeholder="Choose file"></Input>
          <div className="mt-5 flex justify-center">
            <button className="bg-violet4 text-violet11
              shadow-violet7 focus:shadow-violet8
              inline-flex h-[35px] items-center justify-center 
              rounded-[4px] px-[15px] font-medium leading-none 
              focus:shadow-[0_0_0_2px] focus:outline-none
              disabled:bg-gray-500"
              type="submit"
              disabled={isLoading}>Upload
            </button>
          </div>
        </form>
        <Dialog.Description className="text-mauve11 
        mt-5 text-[15px] leading-normal text-center">
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