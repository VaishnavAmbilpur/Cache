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
    "primary": "bg-white/20 text-white border border-white backdrop-blur-md hover:bg-white/30 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl",
    "secondary": "bg-white/10 text-white border border-white/50 backdrop-blur-md hover:bg-white/20 hover:border-white transition-all duration-300 ease-in-out shadow-lg"
};

const sizeStyle = {
    "sm": "px-4 py-2 text-sm font-extralight rounded-lg",
    "md": "px-6 py-3 text-base font-extralight rounded-lg",
    "lg": "px-8 py-4 text-lg font-extralight rounded-lg",
    "responsive": "px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base lg:px-6 lg:py-3 lg:text-md font-extralight rounded-lg"
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