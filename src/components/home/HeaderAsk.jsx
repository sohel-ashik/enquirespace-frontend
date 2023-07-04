import styles from './home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import default_profile from '../../assets/default_avatar.png';
import {faCircleQuestion, faImages } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { base_API_url } from '../../credentials/credentialsConfig';
import AddPost from '../modals/AddPost';

export default function(){
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [totalCoins, setTotalCoins] = useState(0);
    const [open, setOpen] = useState(false);

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
                    const {name,profilePic,totalCoins} = data;
                    console.log(name,profilePic,totalCoins)
                    setName(name);
                    setProfilePic(profilePic);
                    setTotalCoins(totalCoins);
                }

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    },[])

    return(
        <div onClick={()=>setOpen(true)} 
          className={`w-full h-fit rounded-md bg-gray2 lg:pl-5 lg:pr-5 pl-2 pr-2 pt-4 pb-4 ${styles.largeScreen}`}>
            <div className='flex gap-3 lg:w-4/6 w-full'>
                <img src={profilePic ? profilePic : default_profile} style={{objectFit:'cover'}} className='h-10 w-10 rounded-full'/>
                <input
                    className='pl-5 pr-3 focus:outline-none focus:border-none rounded-3xl w-full' 
                    placeholder={`${name}, is asking`}/>
            </div>
            <div className='flex justify-end items-center gap-2 lg:w-2/6 w-full '>
                <div className='flex justify-center items-center gap-2 bg-white pl-3 pr-3 pt-1 pb-1 rounded-xl'>
                    <FontAwesomeIcon className='text-xl' icon={faImages}/>
                    <p>File</p>
                </div>
                <div className='flex justify-center items-center gap-2  bg-white pl-3 pr-3 pt-1 pb-1 rounded-xl'>
                    <FontAwesomeIcon className='text-xl' icon={faCircleQuestion} />
                    <p>Ask</p>
                </div>
            </div>
            <AddPost open={open} setOpen={setOpen} details = {{name,profilePic,coins:totalCoins}}/>
        </div>
    )
}