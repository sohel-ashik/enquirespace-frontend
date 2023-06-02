import default_profile from '../../assets/default_avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCoins,faCaretUp,faCaretDown,faCheckDouble} from '@fortawesome/free-solid-svg-icons';

export default function CompactPost(){

    return(
        <div className="w-full h-fit bg-gray2 rounded-md flex flex-col items-center shadow-lg shadow-gray-400">
            <div className="p-2 lg:p-4 w-full h-fit flex justify-between">
                <div className='flex gap-2 items-center'>
                    <img src={default_profile} className='lg:h-12 lg:w-12 h-10 w-10 rounded-full'/>
                    <div className='flex flex-col justify-center'>
                        <div className='font-bold lg:text-lg'>Jhon Doe</div>
                        <div className='text-xs'> May, 17</div>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faCoins}/>
                    <div className='font-bold lg:pr-6 pr-4'>12</div>
                </div>
            </div>

            <hr className='border-gray-600 my-2 w-11/12 '/>

            <div className='flex flex-col p-2 lg:p-4 gap-3 lg:gap-5 pb-4'>
                <div className='text-bluish font-bold text-lg lg:text-2xl'>
                    Can animals trauma bond?
                </div>
                <div className='flex flex-col'>
                    The man spoke with the previous owner of the cow and found out that the leopard's mother had died when it was only twenty days old and since then the cow had fed the leopard with her milk. Therefore, the leopard thinks that the cow is her mother and comes every night to see her.
                    <div className='font-semibold text-blue-600 hover:cursor-pointer'>[Tap to view details]</div>
                </div>
            </div>

            <div className='w-full p-2 lg:p-4 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon className='text-3xl lg:4xl text-green-600 pt-2' icon={faCaretUp}/>
                        <div>33</div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon className='text-3xl lg:4xl text-red-600' icon={faCaretDown}/>
                        <div>45</div>
                    </div>
                    <div className='flex items-center gap-1'>
                        <FontAwesomeIcon className='text-lg' icon={faCheckDouble}/>
                        <div className='flex gap-1'><div className='font-bold'>10</div> answers</div>
                    </div>
                </div>
                {/* bg-reddishLight */}
                <div className='flex gap-5'>
                    <div className='bg-bluishLight pl-5 pr-5 pt-1 pb-1 rounded-xl text-white font-semibold shadow-sm shadow-black hidden lg:block'>
                            <div>Answer</div>
                        </div>
                    <div className='bg-green-600 pl-2 pr-2 pt-1 pb-1 rounded-xl text-white font-semibold shadow-sm shadow-black'>
                        <div>Solved</div>
                    </div>
                </div>
                
            </div>

            <div className='w-full h-10 bg-bluishLight text-white rounded-lg flex justify-center items-center text-lg font-semibold lg:hidden'>
               <div>Answer this question</div>
            </div>
        </div>
    )
}