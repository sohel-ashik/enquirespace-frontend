import default_profile from '../../assets/default_avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCoins,faCaretUp,faCaretDown,faCheckDouble} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom'

export default function CompactPost({name,profilePic, details={},viewer}){
    const dateObj = new Date(details.postDate);
    const postDate = dateObj.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'});
    
    const navigate = useNavigate();

    return(
        <div className="w-full h-fit bg-gray2 rounded-md flex flex-col items-center shadow-lg shadow-gray-400 ">
            <div className="p-2 lg:p-4 w-full h-fit flex justify-between">
                <div className='flex gap-2 items-center'>
                    <img src={profilePic ? profilePic : default_profile} className='lg:h-12 lg:w-12 h-10 w-10 rounded-full'/>
                    <div className='flex flex-col justify-center'>
                        <div className='font-bold lg:text-lg'>{name}</div>
                        <div className='text-xs'>{postDate}</div>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faCoins}/>
                    <div className='font-bold lg:pr-6 pr-4'>{details.coins ? details.coins : 0}</div>
                </div>
            </div>

            <hr className='border-gray-600 my-2 w-11/12 '/>

            <div onClick={()=>navigate('/questions', {state : {name,profilePic,details}})}
             className='flex flex-col w-full p-2 lg:p-4 gap-3 lg:gap-5 pb-4 hover:cursor-pointer'>
                <div className='text-bluish font-bold text-lg lg:text-2xl'>
                    {details.title}
                </div>
                <div className='flex flex-col'>
                    {details.details}
                    <div className='font-semibold text-blue-600 hover:cursor-pointer'>[Tap to view details]</div>
                </div>
            </div>

            <div className='w-full p-2 lg:p-4 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon className='text-3xl lg:4xl text-green-600 pt-2' icon={faCaretUp}/>
                        <div>{details.totalUpVotes}</div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon className='text-3xl lg:4xl text-red-600' icon={faCaretDown}/>
                        <div>{details.totalDownVotes}</div>
                    </div>
                    <div className='flex items-center gap-1'>
                        <FontAwesomeIcon className='text-lg' icon={faCheckDouble}/>
                        <div className='flex gap-1'><div className='font-bold'>{details.views}</div> answers</div>
                    </div>
                </div>
                {/* bg-reddishLight */}
                <div className='flex gap-5'>
                    {!viewer && <div className='bg-bluishLight pl-5 pr-5 pt-1 pb-1 rounded-xl text-white font-semibold shadow-sm shadow-black hidden lg:block'>
                            <div>Answer</div>
                        </div>}
                    {details.solved && <div className='bg-green-600 pl-2 pr-2 pt-1 pb-1 rounded-xl text-white font-semibold shadow-sm shadow-black'>
                        <div>Solved</div>
                    </div>}
                    {!details.solved && <div className='bg-reddishLight pl-2 pr-2 pt-1 pb-1 rounded-xl text-white font-semibold shadow-sm shadow-black'>
                        <div>Unsolved</div>
                    </div>}
                </div>
                
            </div>

            {!viewer && <div className='w-full h-10 bg-bluishLight text-white rounded-lg flex justify-center items-center text-lg font-semibold lg:hidden'>
               <div>Answer this question</div>
            </div>}
        </div>
    )
}