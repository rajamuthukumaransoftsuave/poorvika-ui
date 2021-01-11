import { componentCss } from "../Constants";


export default function YesNoAlert({
    onClose,
    onOkClick,
    data
}) {

    return (
    <div className="w-full gap-4 flex flex-col">
        <div className="grid h-10 flex justify-center">
           <label className={componentCss.headingLg}>
               {data.heading}
           </label>
        </div>
        <div className="grid">
            <label className={componentCss.noteLg}>
                {data.message}
            </label>
        </div>
        <div className="flex gap-4 py-4 justify-end items-center">
            <button className={componentCss.button}
                onClick={() => {
                    if(onOkClick){
                        onOkClick()
                    } else {
                        onClose()
                    }
                }}
            >
                {data.okText ? data.okText : 'Ok'}
            </button>
            <button className={componentCss.disableButton} onClick={onClose} >
                {
                    data.cancelText ? data.cancelText : 'Cancel'
                }
            </button>
        </div>
    </div>
    )
}