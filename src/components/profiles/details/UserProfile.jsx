
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCoins,faPhone, faCaretUp, faCaretDown,faBriefcase, faCartShopping} from'@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

export default function UserProfile(){
    return(
        <div className='w-full h-fit flex lg:pl-8 lg:justify-start justify-center pt-8'>
            <div className='flex flex-col gap-4  w-9/12'>
                <div className='lg:text-4xl font-bold text-3xl pb-2 font-mono'>Sohel Ashik</div>
                <div className='flex items-center gap-4 text-xl'>
                    <FontAwesomeIcon className='text-2xl lg:text-3xl' icon={faEnvelope} />
                    <div>ashik@gmail.com</div>
                </div>
                <div className='flex items-center gap-4 text-xl '>
                    <FontAwesomeIcon className='text-2xl lg:text-3xl' icon={faPhone} />
                    <div>01772998823</div>
                </div>
                <div className='flex items-center gap-4 text-xl '>
                    <FontAwesomeIcon className='text-2xl lg:text-3xl' icon={faBriefcase} />
                    <div>Software Engineer</div>
                </div>
                <div className='flex items-center gap-4 text-xl '>
                    <FontAwesomeIcon className='text-4xl text-green-500 lg:text-3xl' icon={faCaretUp} />
                    <div>Total up votes: {220}</div>
                </div>
                <div className='flex items-center gap-4 text-xl '>
                    <FontAwesomeIcon className='text-4xl text-red-500 lg:text-3xl' icon={faCaretDown} />
                    <div>Total down votes: {32}</div>
                </div>

                <div className='flex items-center gap-4 text-xl'>
                    <FontAwesomeIcon className='text-2xl text-yellow-500 lg:text-3xl' icon={faCoins} />
                    <div>Total coins: {14712} </div>
                </div>
                
                
            </div>
        </div>
    )
}