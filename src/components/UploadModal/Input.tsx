import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    disabled,
    ...props
}, ref) => {
    return (
        <fieldset className="mb-[15px] flex 
          flex-col items-center mx-6">
            <label className="text-violet11 w-full pb-2 text-left text-[15px]" htmlFor="title">
              {props.title}
            </label>
            <input
            type={type}
              className={twMerge(`text-violet-300 shadow-violet7 focus:shadow-violet8 
              inline-flex min-h-[35px] w-full flex-1 items-center 
              justify-center p-2 rounded-[4px] px-[10px] text-[15px]
              leading-none shadow-[0_0_0_1px] outline-none 
              focus:shadow-[0_0_0_2px]
              file:border-0
              file:bg-transparent
              file:text-sm
              file:font-medium`, className)}
              name="username"
              disabled={disabled}
              ref={ref}
              {...props}
            />
          </fieldset>
    )
})
export default Input