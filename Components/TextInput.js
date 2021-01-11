import { componentCss } from "../Constants"


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