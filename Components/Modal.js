import { componentCss } from "../Constants"


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