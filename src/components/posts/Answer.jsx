
import default_profile from '../../assets/default_avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCoins,faCaretUp,faCaretDown,faCircleDollarToSlot, faTrophy} from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons'
import { useState,useEffect } from 'react';
import Attachments from './Attachments';
import { base_API_url } from '../../credentials/credentialsConfig';
import { useNavigate } from 'react-router-dom';


async function upDownAdder(answerId,type,preState, stateRefresh,setLoadingSetVote){
    try{
        setLoadingSetVote(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${base_API_url}/home/updownadder`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                'answerid': answerId,
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

async function handlePay(userId,name,questionId, helperId,setRefresh,answerId){
    const agree = window.confirm(`Are you sure to pay coins to ${name}?`);
    if (agree){
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`${base_API_url}/accounts/tokenpay`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                    'questionid': questionId,
                    'helperid': helperId,
                    'answerid': answerId
                }
            }) 
            if(response.ok){
                setRefresh(pre=>!pre);
            }
        }catch(err){
            console.log(err);
        }
    }
}

export default function Answer({details, viewer, askerId,access, solved, setRefresh}){
    const answerId = details._id;
    const helperId = details.helperId._id;
    const questionId = details.questionId;
    const sameUserHelper = askerId === helperId;
    const [showMore,setShowMore] = useState(false)
    const dateObj = new Date(details.postDate);
    const formattPostDate = dateObj.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'});

    const [votes,setVotes] = useState({});
    const [votePath, setVotePath] = useState('');
    const [voteChange, setVoteChange] = useState(false);

    const [voteBtnColor, setVoteBtnColor] = useState({top: 'bg-green-500 text-white',down: ''});
    const [loadingSetVote, setLoadingSetVote] = useState(false);


    const navigate = useNavigate();


    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const token = localStorage.getItem('token');
                const response = await fetch(`${base_API_url}/home/votes`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                        'answerid': answerId,
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
        <div className={`w-full h-fit flex flex-col rounded-md gap-2 border border-gray-500 relative ${showMore ? '' : 'max-h-96 overflow-hidden'}`}>
            <div className={`p-2 lg:p-4 w-full h-fit flex justify-between  rounded-md shadow-sm shadow-gray1 ${details.winner ? 'bg-green-300' : 'bg-gray3'}`}>
                <div className='flex gap-2 items-center ' onClick={()=>navigate('/accounts', {state: {userId : helperId}})}>
                    <img style={{objectFit:'cover'}} src={details.helperId.profilePic ? details.helperId.profilePic : default_profile} className='lg:h-12 lg:w-12 h-10 w-10 rounded-full'/>
                    <div className='flex flex-col justify-center'>
                        <div className='font-bold lg:text-lg'>{details.helperId.name}</div>
                        <div className='text-xs'>{formattPostDate}</div>
                    </div>
                </div>
                <div className='flex items-center gap-2 lg:gap-3'>
                    {(viewer && !sameUserHelper && access && !solved) && <div className='flex items-center gap-2'>
                            <button onClick={()=>{
                                handlePay(details.helperId._id,details.helperId.name,questionId,helperId,setRefresh,details._id);
                            }}
                            className={`w-8 h-8 flex items-center justify-center rounded-full bg-white text-black`}>
                                <FontAwesomeIcon className='text-lg' icon={faCircleDollarToSlot}/>
                            </button>
                    </div>}

                    {(details.winner) && <div className='flex items-center gap-2'>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300 text-red-900`}>
                                <FontAwesomeIcon className='text-lg' icon={faTrophy}/>
                            </div>
                    </div>}

                    <div className='flex items-center gap-2'>
                        <button onClick={()=>{upDownAdder(answerId,'up',votePath,setVoteChange,setLoadingSetVote)}} disabled = {loadingSetVote}
                          className={`w-8 h-8 flex items-center justify-center rounded-full bg-white text-black ${voteBtnColor.top}`}>
                            <FontAwesomeIcon className='text-lg' icon={faCaretUp}/>
                        </button>
                            <div className='font-semibold text-black'>{votes.totalUpVotes}</div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <button onClick={()=>{upDownAdder(answerId,'down',votePath,setVoteChange,setLoadingSetVote)}} disabled = {loadingSetVote}
                         className={`w-8 h-8 flex items-center justify-center rounded-full bg-white  text-black ${voteBtnColor.down}`}>
                            <FontAwesomeIcon className='text-lg' icon={faCaretDown}/>
                        </button>
                            <div className='font-semibold text-black'>{votes.totalDownVotes}</div>
                    </div>
                </div>
            </div>

            <div className='w-full h-fit p-2'>
                {details.answer}
            </div>

            <div className='pb-12'>
                <Attachments picArr={details.imageList}/>
            </div>

            <button 
                onClick={()=>setShowMore(!showMore)} 
                style={{backgroundImage:'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))'}}
                className='p-1 text-black text-right font-bold absolute bottom-0 left-0 right-0'>{showMore ? 'Show less...' : 'Show more...'}</button>
        </div>
    )
}