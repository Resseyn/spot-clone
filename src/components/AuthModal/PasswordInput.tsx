import { useState } from "react";
import { BsEye, BsEyeFill, BsEyeSlash } from "react-icons/bs";
import useModal from "../../hooks/useModal";

export default function PasswordInput(){
    const [isShown, setShown] = useState(false)
    return (
        <fieldset className="mb-[15px] flex 
        flex-col items-center mx-6">
          <label className="text-violet11 w-full pb-2 text-left text-[15px]" htmlFor="password">
            Password 
          </label>
          <div className="size-full flex items-center justify-end">
            <input
              className="text-violet-300 shadow-violet7 focus:shadow-violet8 
              inline-flex min-h-[35px] w-full flex-1 items-center 
              justify-center rounded-[4px] px-[10px] text-[15px]
              leading-none shadow-[0_0_0_1px] outline-none 
              focus:shadow-[0_0_0_2px]"
              type={isShown ? "" : "password"}
              placeholder="Enter your password..."
              name="password"
            />
            <div className="absolute size-10 flex items-center justify-center"
            onClick={() => setShown((shown) => !shown)}>
              {isShown ? <BsEye className="text-violet-100 size-6"/> :<BsEyeSlash className="text-violet-100 size-6"/>}
            </div>
          </div>
        </fieldset>
    )
}