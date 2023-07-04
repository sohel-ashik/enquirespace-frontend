import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {base_API_url} from '../../../credentials/credentialsConfig';

function AnswerLink({name, profilePic,upVotes,answer,questionId}){
    const navigate = useNavigate();

    return(
        <div className="flex gap-3 items-center border-b-2 pb-3 p-1 pl-2">
            <div className="border border-gray-500 h-fit p-2 pt-1 pb-1 rounded-md">
                {upVotes}
            </div>
            <div onClick={()=>{
                navigate('/questions',{state: {name,profilePic,questionId}})
            }}
             className="font-semibold text-bluishLight hover:cursor-pointer">
                {answer}
            </div>
        </div>
    )
}



export default function UserAnswers(){
    const [answerList,setAnswerList] = useState([]);
    const [name,setName] = useState('');
    const [profilePic,setProfilePic] = useState('');

    const context = useOutletContext();


    useEffect(()=>{
        const token = localStorage.getItem('token');
        async function fetchData(){
            try{
                const response = await fetch(`${base_API_url}/accounts/answers`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                        'profileId': context.profileId
                    }
                })
                if(!response.ok){
                    console.log('Error');
                }else{
                    const data = await response.json();
                    setAnswerList(data.answersArr);
                    setName(data.name);
                    setProfilePic(data.profilePic);
                }

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    },[])


    return(
        <div className='w-full h-fit pt-3 flex flex-col gap-4 border border-gray-500 rounded-md'>
            {answerList.map((ele)=><AnswerLink name={name} profilePic={profilePic} upVotes={ele.totalUpVotes} answer={ele.questionId.title} questionId={ele.questionId._id}/>)}
        </div>
    )
}