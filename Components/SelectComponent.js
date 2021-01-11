import { useState } from "react"
import { componentCss } from "../Constants"


export default function SelectComponent({
    label,
    data,
    selected,
    onSelect,
    error,
    errorText,
    onBlur
}) {
    const [showPopup, setShowPopup] = useState(false)

    return (
        <div onBlur={onBlur}>
            <label id="listbox-label" className="block text-sm font-medium text-gray-700 mx-2 mb-1">
                {label || ''}
            </label>
            <div className="mt-1 relative">
                <button onClick={() => setShowPopup(!showPopup)} type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-1 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="flex items-center">
                        <span className="ml-1 block truncate">
                        {selected || ''}
                        </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                       {error ?
                            <label className={componentCss.errorText}>
                                {errorText}
                            </label> :
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                       }
                    </span>
                </button>
                <div className={"absolute mt-1 w-full rounded-md bg-white shadow-lg z-10" + (showPopup ? " " : " hidden")}>
                    <ul tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {data?.length &&
                            data.map((option, index) => {
                                
                                return (
                                <li onClick={() => {
                                    setShowPopup(false)
                                    if(onSelect){
                                        onSelect(option)
                                    }
                                }} key={index} id="listbox-item-0" role="option" className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                                    <div className="flex items-center">
                                        <span className="ml-3 block font-normal truncate">
                                            {option}
                                        </span>
                                    </div>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                       {Boolean(selected === option) &&
                                             <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                             </svg>
                                       }
                                    </span>
                                </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}