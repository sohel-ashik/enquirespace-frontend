import { useState } from 'react';
import AddPost from '../modals/AddPost';
import ModalSkleton from '../modals/ModalSkleton';
import CompactPost from '../posts/CompactPost';
import HeaderAsk from './HeaderAsk';
import styles from './home.module.css';
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { base_API_url } from '../../credentials/credentialsConfig';


export default function(){
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
                    'token': token
                }
            })
            setLoading(false);
            if(!response.ok){
                console.log('Error');
            }else{
                const data = await response.json();
                const tempData = [...postArr, ...data.data];
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
            <div className='h-full w-full bg-gray3 flex flex-row'>
                <div className={`h-full w-1/5   pt-5 overflow-auto hidden lg:block`}>
                    <SideBar/>
                </div>

                <div className='lg:w-4/5 h-full w-full  overflow-auto p-5'>
                    {/* the main browsing pages */}
                    <div className='lg:w-4/5 w-full h-fit flex flex-col gap-5'>
                        {/* <div onClick={()=>setOpen(true)}> */}
                            <HeaderAsk/>
                        {/* </div> */}
                        
                        
                        
                        {/* here goes the all content */}

                        {postArr.map((ele)=>{
                            const {name,profilePic} = ele.askerId;
                            return <CompactPost name={name} profilePic={profilePic} details={ele}/>;
                        })}

                    </div>
                    <div className='lg:w-4/5 w-full h-fit flex justify-center p-10'> {/**/}
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