import { forwardRef, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // Add any additional props or customizations here
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({className, 
    children,
    disabled,
    type = "button",
    ...props}, ref) => {

    return (
        <button ref={ref} disabled={disabled} type={type}
        className={twMerge(`
        focus:outline-none
        focus:ring-2
        focus:ring-green-300
        focus:ring-opacity-75
        rounded-full
        bg-green-500
        border
        border-transparent
        px-3
        py-3
        text-black
        font-extrabold
        disabled:cursor-not-allowed
        disabled:opacity-50
        hover:opacity-85
        transition
        `, className)} {...props}>
            {children}
        </button>
    );
});

export default Button;
