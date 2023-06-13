import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons'


export default function ModalSkleton({open, onClose, children, }){

    const confirmClose = () =>{
        const confirm = window.confirm('Confirm to discard?');
        if(confirm) onClose();
    }

    return(
        <div 
            className={`fixed inset-0 flex justify-center items-center backdrop-blur-sm transition-opacity duration-700  ${open ? "visible opacity-100 bg-black/60": "invisible opacity-0"}`}>
            <div onClick={(e)=>e.stopPropagation()}>

                <div className='w-screen flex justify-center h-screen items-center ' onClick={onClose}>
                    <div style={{maxHeight:'80%'}} onClick={(e)=>e.stopPropagation()} className=" lg:w-6/12 md:w-7/12 w-11/12 h-fit  pb-12  bg-gray-200 shadow-md shadow-gray-500 rounded-lg overflow-auto">
                        <div className='flex justify-start absolute'>
                            <div onClick={confirmClose} className='w-fit pl-2 pr-2 lg:pl-4 lg:pr-4 rounded-md bg-reddish hover:bg-reddishLight hover:cursor-pointer'>
                            <FontAwesomeIcon 
                                className='text-xl lg:text-2xl text-white' icon={faXmark}/>
                        </div></div>

                        {children}
                    </div>
                </div>
                
            </div>
        </div>
    )

}