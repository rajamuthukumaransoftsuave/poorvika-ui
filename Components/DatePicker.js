import ReactDatePicker from "react-datepicker"
import { componentCss } from "../Constants"

/**
  * This component is used to show the date picker.
  * you can set the initial date also you can change date of the form.
  @returns {*}
  @typedef Selected(Date) this have the currently selcted date. 
  @typedef Rest(Object) this is a rest props passed to ReactDatePicker Component. 
  rest means all left props which ReactDatePricker supports.
  @param {{
    label String,
    dateContainerCss String
    error Boolean
    errorText String
    onBlur Function
    disabled Boolean
    selected Selected
    onChange Function
    rest Rest
  }} props
*/

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