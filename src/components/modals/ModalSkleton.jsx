import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'

export default function ModalSkleton({open, onClose, children}){

    const confirmClose = () =>{
        const confirm = window.confirm('Confirm to discard?');
        if(confirm) onClose();
    }

    return(
        <div 
            onClick={onClose} 
            className={`fixed inset-0 flex justify-center items-center backdrop-blur-xl transition-opacity duration-700  ${open ? "visible opacity-100": "invisible opacity-0"}`}>
            <div onClick={(e)=>e.stopPropagation()}>

                <div className='w-screen flex justify-center h-screen items-center ' onClick={onClose}>
                    <div style={{maxHeight:'80%'}} onClick={(e)=>e.stopPropagation()} className="lg:w-6/12 md:w-7/12 w-11/12 h-fit  pb-12  bg-gray-200 shadow-md shadow-gray-500 rounded-lg overflow-auto">
                        <div className='flex justify-start absolute'>
                            <FontAwesomeIcon 
                                onClick={confirmClose}
                                className='text-2xl lg:4xl text-reddish hover:text-reddishLight hover:cursor-pointer' icon={faCircleXmark}/>
                        </div>

                        {children}
                    </div>
                </div>
                
            </div>
        </div>
    )

}