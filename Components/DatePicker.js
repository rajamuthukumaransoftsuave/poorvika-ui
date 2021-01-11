import ReactDatePicker from "react-datepicker"
import { componentCss } from "../Constants"

export default function DatePicker({
    label,
    dateContainerCss,
    error,
    errorText,
    onBlur,
    disabled,
    selected,
    onChange,
...rest
}){


    return (
        <>
        <div className="w-full gap-6 items-center flex">
            <label className="flex whil text-sm font-medium text-gray-700 mx-2">
                {label}
            </label>
         <div className={dateContainerCss ? dateContainerCss : ''}>   
            <ReactDatePicker
                selected={selected}
                onChange={onChange}
                disabled={disabled}
                onBlur={onBlur}
                {...rest}
            />
         </div>   
        </div>
        {error &&
            <label className={componentCss.errorText+' ml-2'}>
                {errorText}
            </label>
        }
        </>
    )
}