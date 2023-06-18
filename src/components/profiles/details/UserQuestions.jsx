import { useEffect } from "react";
import { useState } from "react";
import CompactPost from "../../posts/CompactPost";
import { base_API_url } from '../../../credentials/credentialsConfig';


export default function UserQuestions(){
    const [qArr, setQArr] = useState([]);
    const [name,setName] = useState('Null')
    const [profilePic, setProfilePic] = useState('');

    useEffect(()=>{
        const token = localStorage.getItem('token');
        async function fetchData(){
            try{
                const response = await fetch(`${base_API_url}/accounts/questions`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                })
                if(!response.ok){
                    console.log('Error');
                }else{
                    const data = await response.json();
                    const {name,profilePic,questionsArr} = data;
                    console.log(name,profilePic,questionsArr);
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

            {qArr.map((ele)=><CompactPost name={name} profilePic={profilePic} details={ele} viewer = {'own'}/>)}
        </div>
    )
}