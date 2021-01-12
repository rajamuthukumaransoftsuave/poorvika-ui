import { componentCss } from "../Constants"

/**
  * This component is used to show a modal with the passed component and styles.
  @returns {*}
  @typedef ModalComponent(React.Component) this the component which will be rendered when modal is open. 
  @typedef ModalData(Object) this data object will be directly passed to ModalComponent. 
  @typedef ContainerStyle(Style.Object) this style object it will be passed to the modal container div. 
  @typedef Rest(Object) this is a rest props passed to Modal Component. 
  rest means all left props which Modal Component supports.
  @param {{
    component ModalComponent,
    data ModalData,
    open Boolean
    onClose Function
    containerStyle ContainerStyle,
    rest Rest
  }} props
*/

export default function Modal({
    component: Component,
    data,
    open,
    onClose,
    containerStyle,
    ...rest
}) {
    const containerCss = 'bg-black bg-opacity-60 absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'

    if(!open){
        return null
    }

    return (
        <div 
            className={containerCss}
        >
           <div className={componentCss.paper} style={containerStyle ? containerStyle : {}} >
                {Boolean(Component) &&
                    <Component data={data} {...rest} onClose={onClose} />
                }
           </div>
        </div>
    )
}