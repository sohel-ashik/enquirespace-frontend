import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'



export default function LoadingModal({open, children, }){
    return(
        <div 
            className={`fixed z-50 inset-0 flex justify-center items-center backdrop-blur-sm transition-opacity duration-700  ${open ? "visible opacity-100 bg-black/60": "invisible opacity-0"}`}>
                <div className="p-5 text-3xl text-white rounded-lg bg-bluish">
                    <FontAwesomeIcon icon={faSpinner} spin/>
                </div>
        </div>
    )

}