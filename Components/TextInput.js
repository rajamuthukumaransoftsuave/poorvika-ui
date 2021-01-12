import { componentCss } from "../Constants"

/**
  * This component is used to render a text input with error handling and label.
  @returns {*}
  @typedef ClassName(String) this is classname string. 
  @typedef StyleObject(Object) this is a style object of any react component. 
  @typedef Rest(Object) this is a rest props passed to input Component. 
  rest means all left props which input component supports.
  @param {{
    type String,
    name String,
    id String,
    containerStyle StyleObject,
    inputStyle StyleObject,
    inputClassName ClassName,
    containerClassName ClassName,
    error Boolean,
    errorText String,
    value String,
    onChange Function,
    onClick Function,
    capitalize Boolean,
    rest Rest
  }} props
*/

export default function TextInput({
    type,
    name,
    id,
    containerStyle,
    inputStyle,
    inputClassName,
    containerClassName,
    error,
    errorText,
    value,
    onChange,
    onClick,
    capitalize,
    ...rest
}) {
    let defaultInputCss = 'focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none px-2 rounded-md sm:text-sm border-gray-300 outline-none'
    const containerCss = 'flex rounded-md shadow-sm border justify-center items-center'

    if(capitalize){
        defaultInputCss += ' capitalize'
    }

    return (
        <>
        <label className="block text-sm font-medium text-gray-700 mx-2 mb-1">
                {rest.placeholder}
            </label>
        <div 
            className={containerClassName ? containerCss+ ' ' + containerClassName : containerCss}
            style={containerStyle ? containerStyle : { minHeight: '40px'}}
        >
            <input
                className={inputClassName ? defaultInputCss + ' ' + inputClassName : defaultInputCss}
                style={inputStyle ? inputStyle : {}}
                name={name}
                type={type || 'text'}
                value={value}
                id={id}
                onChange={(evt) => {
                    if(onChange){
                        onChange(evt.target.value)
                    }
                }}
                onClick={onClick}
                {...rest}
            />
            {error &&
                <label className={componentCss.errorText}>
                    {errorText || ''}
                </label>
            }
        </div>
        </>
    )
}