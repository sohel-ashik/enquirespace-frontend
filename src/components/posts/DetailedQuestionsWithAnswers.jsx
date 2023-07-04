import default_profile from '../../assets/default_avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCoins,faCaretUp,faCaretDown,faCheckDouble} from '@fortawesome/free-solid-svg-icons';
import { base_API_url } from '../../credentials/credentialsConfig';
import AddAnswer from './AddAnswer';
import { useState } from 'react';
import Answer from './Answer';
import Attachments from './Attachments';
import {useLocation, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

async function upDownAdder(questionId,type,preState, stateRefresh,setLoadingSetVote){
    try{
        setLoadingSetVote(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${base_API_url}/home/updownadder`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                'questionid': questionId,
                'type' : type,
                'pre' : preState
            }
        })
        setLoadingSetVote(false);        
        if(response.ok) stateRefresh(pre=>!pre);

    }catch(err){
        console.log(err);
    }
}



function UserDetails({name,coins,profilePic,postDate,userId}){
    const dateObj = new Date(postDate);
    const formattPostDate = dateObj.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'});
    const navigate = useNavigate();
    
    return(
        <div>
            <div className="p-2 lg:p-4 w-full h-fit flex justify-between bg-gray3 rounded-md shadow-sm shadow-gray1">
                <div className='flex gap-2 items-center' onClick={()=>navigate('/accounts',{state: {userId: userId}})}>
                    <img style={{objectFit: 'cover'}} src={profilePic ? profilePic : default_profile} className='lg:h-12 lg:w-12 h-10 w-10 rounded-full'/>
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



function BottomLegend({setAnswerOpne,views,totalUp,totalDown,questionId}){

    const [votes,setVotes] = useState({});
    const [votePath, setVotePath] = useState('');
    const [voteChange, setVoteChange] = useState(false);

    const [voteBtnColor, setVoteBtnColor] = useState({top: 'bg-green-500 text-white',down: ''});
    const [loadingSetVote, setLoadingSetVote] = useState(false);

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const token = localStorage.getItem('token');
                const response = await fetch(`${base_API_url}/home/votes`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                        'questionid': questionId,
                    }
                })
                if(response.ok){
                    const data = await response.json();
                    if(data.votePath == 'up') setVoteBtnColor({top: 'bg-green-500 text-white',down: ''})
                    else if(data.votePath == 'down') setVoteBtnColor({top: '', down: 'bg-red-400 text-white'})
                    else setVoteBtnColor({top: '',down:''});


                    setVotes(data.votes);
                    setVotePath(data.votePath);
                }
        
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[voteChange])

    return(
        <div className='w-full h-fit p-2 rounded-md bg-gray-500 flex justify-between'>
            <div className='flex gap-4 items-center'>
                <button onClick={()=>setAnswerOpne((pre)=>!pre)}
                    className='bg-white text-black pl-4 pr-4 lg:pl-6 lg:pr-6 p-2 rounded-md lg:rounded-lg hover:bg-black hover:text-white'>Answer</button>
                <div className='text-white'>{views} views</div>
            </div>
            <div className='flex gap-3 items-center pr-4'>
                <div className='flex items-center gap-2'> 
                    <button onClick={()=>{upDownAdder(questionId,'up',votePath,setVoteChange,setLoadingSetVote)}} disabled={loadingSetVote}
                     className={`w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray1 ${voteBtnColor.top}`}>
                        <FontAwesomeIcon className='text-xl' icon={faCaretUp}/>
                    </button>
                        <div className='font-semibold text-white'>{votes.totalUpVotes}</div>
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={()=>{upDownAdder(questionId,'down',votePath,setVoteChange,setLoadingSetVote)}} disabled ={loadingSetVote}
                     className={`w-10 h-10 flex items-center justify-center rounded-full bg-white  text-gray1 ${voteBtnColor.down}`}>
                        <FontAwesomeIcon className='text-xl' icon={faCaretDown}/>
                    </button>
                        <div className='font-semibold text-white'>{votes.totalDownVotes}</div>
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
    let {name,profilePic,questionId,viewer,userId,access} = state;
    const [details, setDetails] = useState({});
    const [answerList, setAnswerList] = useState([]);

    const [refresh, setRefresh] = useState(false);
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        async function fetchData(){
            try{
                const response = await fetch(`${base_API_url}/home/individual/question`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                        'questionId': questionId,
                    }
                })
                if(!response.ok){
                    console.log('Error');
                }else{
                    const data = await response.json();
                    data && setDetails(data);
                    data && setAnswerList(data.answerList);
                }

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    },[answerOpen,refresh])

    return(
        <div className="w-full h-full overflow-auto flex flex-col items-center">
            <div className="w-full h-fit md:w-7/12 p-2 pt-4 flex flex-col gap-2">
                <div className='w-full h-fit flex flex-col gap-2'>
                    <UserDetails name={name} coins={details.coins} profilePic={profilePic} postDate={details.postDate} userId = {details.askerId}/>
                    <Question title={details.title} details={details.details}/>
                    <Attachments picArr={details.imageList} vidArr={details.videoList}/>
                    <BottomLegend setAnswerOpne={setAnswerOpne} views={details.views} totalUp={details.totalUpVotes} totalDown={details.totalDownVotes} questionId={questionId}/>
                    <div className={`w-full h-fit border border-gray-700 rounded-xl pb-4 ${!answerOpen ? 'hidden' : ''}`}>
                        <AddAnswer open={answerOpen} setOpen={setAnswerOpne} questionId={details._id}/>
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
                    
                    {answerList.map((ele)=><Answer details={ele} viewer = {viewer} askerId = {userId} access = {access} solved = {details.solved} setRefresh={setRefresh}/>)}

                </div>
            </div>
        </div>
    )
}