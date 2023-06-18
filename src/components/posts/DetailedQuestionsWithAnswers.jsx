import default_profile from '../../assets/default_avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCoins,faCaretUp,faCaretDown,faCheckDouble} from '@fortawesome/free-solid-svg-icons';
import str from '../../assets/helperText.js';
import AddAnswer from './AddAnswer';
import { useState } from 'react';
import Answer from './Answer';
import Attachments from './Attachments';
import {useLocation} from 'react-router-dom';



function UserDetails({name,coins,profilePic,postDate}){
    const dateObj = new Date(postDate);
    const formattPostDate = dateObj.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'});
    
    return(
        <div>
            <div className="p-2 lg:p-4 w-full h-fit flex justify-between bg-gray3 rounded-md shadow-sm shadow-gray1">
                <div className='flex gap-2 items-center'>
                    <img src={profilePic ? profilePic : default_profile} className='lg:h-12 lg:w-12 h-10 w-10 rounded-full'/>
                    <div className='flex flex-col justify-center'>
                        <div className='font-bold lg:text-lg'>{name}</div>
                        <div className='text-xs'> {formattPostDate}</div>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faCoins}/>
                    <div className='font-bold lg:pr-6 pr-4'>{coins}</div>
                </div>
            </div>
        </div>
    )
}

function Question({title, details}){
    return(
        <div>
            <div className='flex flex-col p-3 lg:p-4 gap-3 lg:gap-5 pb-4 border-l border-b border-r border-gray-500'>
                <div className='text-bluish font-bold text-lg lg:text-2xl'>
                    {title}
                </div>
                <div className='flex flex-col'>
                    {details}
                </div>
            </div>
        </div>
    )
}



function BottomLegend({setAnswerOpne,views,totalUp,totalDown}){
    return(
        <div className='w-full h-fit p-2 rounded-md bg-gray-500 flex justify-between'>
            <div className='flex gap-4 items-center'>
                <button onClick={()=>setAnswerOpne((pre)=>!pre)}
                    className='bg-white text-black pl-4 pr-4 lg:pl-6 lg:pr-6 p-2 rounded-md lg:rounded-lg hover:bg-black hover:text-white'>Answer</button>
                <div className='text-white'>{views} views</div>
            </div>
            <div className='flex gap-3 items-center pr-4'>
                <div className='flex items-center gap-2'>
                    <div className='w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-green-500 hover:text-white text-gray1'>
                        <FontAwesomeIcon className='text-xl' icon={faCaretUp}/>
                    </div>
                        <div className='font-semibold text-white'>{totalUp}</div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className=' w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-reddish hover:text-white text-gray1'>
                        <FontAwesomeIcon className='text-xl' icon={faCaretDown}/>
                    </div>
                        <div className='font-semibold text-white'>{totalDown}</div>
                </div>

            </div>
        </div>
    )
}

const DropdownSelect = () => {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleSelect = (event) => {
      setSelectedOption(event.target.value);
    };
  
    return (
        <div className="relative inline-block text-left">
            <select
            value={selectedOption}
            onChange={handleSelect}
            className="appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
                <option value="">None</option>
                <option value="option1">Top pay</option>
                <option value="option2">Newest first</option>
                <option value="option3">Top upvoted</option>
            </select>
            
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FontAwesomeIcon icon={faCaretDown}/>
            </div>
        </div>
    );
  };





export default function DetailedQuestionsWithAnswers(){
    const [answerOpen, setAnswerOpne] = useState(false);
    const {state} = useLocation();
    const {name,profilePic,details} = state;

    return(
        <div className="w-full h-full overflow-auto flex flex-col items-center">
            <div className="w-full h-fit md:w-7/12 p-2 pt-4 flex flex-col gap-2">
                <div className='w-full h-fit flex flex-col gap-2'>
                    <UserDetails name={name} coins={details.coins} profilePic={profilePic} postDate={details.postDate}/>
                    <Question title={details.title} details={details.details}/>
                    <Attachments picArr={details.imageList} vidArr={details.videoList}/>
                    <BottomLegend setAnswerOpne={setAnswerOpne} views={details.views} totalUp={details.totalUpVotes} totalDown={details.totalDownVotes}/>
                    <div className={`w-full h-fit border border-gray-700 rounded-xl pb-4 ${!answerOpen ? 'hidden' : ''}`}>
                        <AddAnswer open={answerOpen} setOpen={setAnswerOpne}/>
                    </div>
                </div>

                <div className='w-full h-fit flex flex-col pb-10 pt-10 gap-3'>
                    <div className='flex justify-between'>
                        <div className='font-semibold lg:text-3xl text-2xl pb-3'>
                            {details.totalAnswers} Answers
                        </div>
                        <div>
                            <DropdownSelect/>
                        </div>
                    </div>
                    <Answer/>
                    <Answer/>
                    <Answer/>
                    <Answer/>

                </div>
                
            </div>
        </div>
    )
}