import { componentCss } from "../Constants";

/**
  * This component is used to show confirm alert.
  * you can reject or continue with the operations.
  @returns {*}
  @typedef CloseFunction this function is used to close the modal. 
  @typedef OkClick(Function) this function is used to continue with the operation. 
  @typedef ConfirmDialogData(Object) this Object have the message to show and labels for both accept and reject button 
  it will have all the initial data of the employee. 
  @param {{
    onClose CloseFunction,
    onOkClick OkClick
    data ConfirmDialogData
  }} props
*/

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