import CompactPost from "./CompactPost";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import { useEffect,useState } from 'react';
import { base_API_url } from '../../credentials/credentialsConfig';



export default function Unsolved(){
    const [postArr,setPostArr] = useState([]);
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(false);

    async function fetchData(){
        const token = localStorage.getItem('token');
        try{
            setLoading(true);
            const response = await fetch(`${base_API_url}/home`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                    'type' : 'unsolved'
                }
            })
            setLoading(false);
            if(!response.ok){
                console.log('Error');
            }else{
                const data = await response.json();
                const newData = data.data.filter((ele)=> !ele.solved);
                const tempData = [...postArr, ...newData];
                setPostArr(tempData);

            }

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchData();
    },[load])



    return(
        <div className="w-full h-full flex justify-center overflow-auto">
            <div className='lg:w-4/5 h-fit w-full flex flex-col gap-5 p-5 pb-10'>

                {postArr.map((ele)=>{
                    const {name,profilePic} = ele.askerId;
                    return <CompactPost name={name} profilePic={profilePic} details={ele}/>;
                })}

                <div className=' w-full h-fit flex justify-center p-10'> {/**/}
                    <button onClick={()=>setLoad(!load)}
                        className='bg-reddishLight pl-5 pr-5 p-2 rounded-md text-white'>
                            {!loading && 'Load more...'}
                            {loading && <FontAwesomeIcon icon={faSpinner} spin/>}
                        </button>
                </div>
            </div>
            
        </div>
    )
}