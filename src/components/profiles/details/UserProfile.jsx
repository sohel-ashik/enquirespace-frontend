
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCoins,faPhone, faCaretUp, faCaretDown,faBriefcase, faCartShopping} from'@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { useEffect } from 'react';
import { base_API_url } from '../../../credentials/credentialsConfig';
import { useState } from 'react';

export default function UserProfile(){

    const [profileDetails, setProfileDetails] = useState({});
    
    useEffect(()=>{
        const token = localStorage.getItem('token');

        const fetchData = async ()=>{
            try{
                const response = await fetch(`${base_API_url}/accounts/profile`,{
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
                    const {name,mail,phone,designation,totalUpVotes,totalDownVotes,totalCoins} = data;
                    setProfileDetails({name,mail,phone,designation,totalUpVotes,totalDownVotes,totalCoins});
                }

            }catch(err){
                console.log(err);
            }
        }

        fetchData();

    },[])

    return(
        <div className='w-full h-fit flex lg:pl-8 lg:justify-start justify-center pt-8'>
            <div className='flex flex-col gap-4  w-9/12'>
                <div className='lg:text-4xl font-bold text-3xl pb-2 font-mono'>{profileDetails.name}</div>
                <div className='flex items-center gap-4 text-xl'>
                    <FontAwesomeIcon className='text-2xl lg:text-3xl' icon={faEnvelope} />
                    <div>{profileDetails.mail}</div>
                </div>
                <div className='flex items-center gap-4 text-xl '>
                    <FontAwesomeIcon className='text-2xl lg:text-3xl' icon={faPhone} />
                    <div>{profileDetails.phone ? profileDetails.phone : 'N/A'}</div>
                </div>
                <div className='flex items-center gap-4 text-xl '>
                    <FontAwesomeIcon className='text-2xl lg:text-3xl' icon={faBriefcase} />
                    <div>{profileDetails.designation ? profileDetails.designation : 'N/A'}</div>
                </div>
                <div className='flex items-center gap-4 text-xl '>
                    <FontAwesomeIcon className='text-4xl text-green-500 lg:text-3xl' icon={faCaretUp} />
                    <div>Total up votes: {profileDetails.totalUpVotes}</div>
                </div>
                <div className='flex items-center gap-4 text-xl '>
                    <FontAwesomeIcon className='text-4xl text-red-500 lg:text-3xl' icon={faCaretDown} />
                    <div>Total down votes: {profileDetails.totalDownVotes}</div>
                </div>

                <div className='flex items-center gap-4 text-xl'>
                    <FontAwesomeIcon className='text-2xl text-yellow-500 lg:text-3xl' icon={faCoins} />
                    <div>Total coins: {profileDetails.totalCoins} </div>
                </div>
                
                
            </div>
        </div>
    )
}