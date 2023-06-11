
import default_profile from '../../assets/default_avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCoins,faCaretUp,faCaretDown} from '@fortawesome/free-solid-svg-icons';
import str from '../../assets/helperText.js';
import { useState } from 'react';
import Attachments from './Attachments';

export default function Answer(){
    const [showMore,setShowMore] = useState(false)

    return(
        <div className={`w-full h-fit flex flex-col rounded-md gap-2 border border-gray-500 relative ${showMore ? '' : 'max-h-96 overflow-hidden'}`}>
            <div className="p-2 lg:p-4 w-full h-fit flex justify-between bg-gray3 rounded-md shadow-sm shadow-gray1">
                <div className='flex gap-2 items-center'>
                    <img src={default_profile} className='lg:h-12 lg:w-12 h-10 w-10 rounded-full'/>
                    <div className='flex flex-col justify-center'>
                        <div className='font-bold lg:text-lg'>Jhon Doe</div>
                        <div className='text-xs'> May, 17</div>
                    </div>
                </div>
                <div className='flex items-center gap-2 lg:gap-3'>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-green-500 hover:text-white text-black'>
                            <FontAwesomeIcon className='text-lg' icon={faCaretUp}/>
                        </div>
                            <div className='font-semibold text-black'>52</div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className=' w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-reddish hover:text-white text-black'>
                            <FontAwesomeIcon className='text-lg' icon={faCaretDown}/>
                        </div>
                            <div className='font-semibold text-black'>5</div>
                    </div>
                </div>
            </div>

            <div className='w-full h-fit p-2'>
                {str}
            </div>

            <div className='pb-12'>
                <Attachments/>
            </div>

            <button 
                onClick={()=>setShowMore(!showMore)} 
                style={{backgroundImage:'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))'}}
                className='p-1 text-black text-right font-bold absolute bottom-0 left-0 right-0'>{showMore ? 'Show less...' : 'Show more...'}</button>
        </div>
    )
}