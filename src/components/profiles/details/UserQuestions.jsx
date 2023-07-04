import { useEffect } from "react";
import { useState } from "react";
import CompactPost from "../../posts/CompactPost";
import { base_API_url } from '../../../credentials/credentialsConfig';
import { useOutletContext } from "react-router-dom";


export default function UserQuestions(){
    const [qArr, setQArr] = useState([]);
    const [name,setName] = useState('Null')
    const [profilePic, setProfilePic] = useState('');

    const context = useOutletContext();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        async function fetchData(){
            try{
                const response = await fetch(`${base_API_url}/accounts/questions`,{
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
                    const {name,profilePic,questionsArr} = data;

                    if(questionsArr){
                       const a= questionsArr.sort((a,b)=>Date.parse(b.postDate) - Date.parse(a.postDate))
                    }
                    questionsArr ? setQArr(questionsArr) : setQArr([])
                    setName(name);
                    setProfilePic(profilePic);
                }

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    },[])


    return(
        <div className='w-full h-fit flex flex-col gap-5'>

            {qArr.map((ele)=><CompactPost name={name} profilePic={profilePic} details={ele} viewer = {'own'} access = {context.profileId ? false : true}/>)}
        </div>
    )
}