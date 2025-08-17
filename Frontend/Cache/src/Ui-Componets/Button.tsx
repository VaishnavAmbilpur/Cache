import type { ReactElement } from "react";

export interface ButtonProps{
    varient : "primary" | "secondary";
    size : "sm" | "md" | "lg" | "responsive";
    text : string,
    startIcon? : ReactElement,
    endIcon? : ReactElement,
    onClick : ()=> void,
}

const variantStyle = {
    "primary": "bg-flush-orange-200 text-flush-orange-900 hover:bg-flush-orange-950 hover:text-flush-orange-50 transition delay-150 duration-300 ease-in-out hover:translate-y-0.5 tracking-widest",
    "secondary": "bg-flush-orange-950 text-flush-orange-100 hover:bg-flush-orange-200 hover:text-flush-orange-900 transition delay-150 duration-300 ease-in-out hover:translate-y-0.5 tracking-widest "
};

// Responsive size: sm on mobile, md on tablet, lg on desktop
const sizeStyle = {
    "sm": "px-3 py-1 text-sm font-extralight rounded-lg",
    "md": "px-5 py-2 text-base font-extralight rounded-lg",
    "lg": "px-6 py-3 text-lg font-extralight rounded-lg",
    "responsive": "px-3 py-1 text-sm md:px-2 md:py-1 md:text-base lg:px-6 lg:py-2 lg:text-md font-extralight rounded-lg"
};

const Button = (props: ButtonProps) => {
  const sizeClass = props.size === "responsive" ? sizeStyle["responsive"] : sizeStyle[props.size];
  return (
    <>
      <button
        className={`${variantStyle[props.varient]} ${sizeClass} flex flex-row items-center`}
        onClick={props.onClick}
      >
        {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
        {props.text}
        {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
      </button>
    </>
  )
}

export default Button