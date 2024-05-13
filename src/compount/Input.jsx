import React,{useId} from "react";



const Input  =React.forwardRef(function Input({
    label,
    type = 'text',
    className ='',
    ...props 
}, ref){


    const id =  useId()
return(
    <div className="w-full">
        {
            label && <Label
            className='inline-block mb-1 pl-1'
            htmlFor={id}
            >{label}</Label>
        }
        <input type={type}
        className={`${className}
        px-3 py-2 rounded-md bg-shite text-black outline-none focus:bg-gray-50 duration-200
         border-gray-400 w-full
        `}
        ref={ref}
        {...props}
        id={id}
         />
    </div>
)

})

export default Input;