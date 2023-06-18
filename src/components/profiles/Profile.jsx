import { useState } from 'react';
import default_profile from '../../assets/default_avatar.png';
import {Outlet, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import EditProfile from '../modals/EditProfile';
import BuyCoin from '../modals/BuyCoin';
import { useEffect } from 'react';
import { base_API_url } from '../../credentials/credentialsConfig';

export default function Profile(){
    const [clickProfile,setClickProfile] = useState('bg-reddishLight font-semibold text-white');
    const [clickQuestions,setClickQuestions] = useState('');
    const [clickAnswers, setClickAnswers] = useState('');
    const [clickSetting, setClickSetting] = useState('');

    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [buyCoinOpen, setBuyCoinOpen] = useState(false);

    const [userProfile,setUserProfile] = useState({});

    useEffect(()=>{
        const token = localStorage.getItem('token');
        async function fetchData(){
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
                    const {name,designation,joinedDate,profilePic} = data;
                    const dateObj = new Date(joinedDate);
                    const formattJoinedDate = dateObj.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'});
    
                    setUserProfile({name,designation,formattJoinedDate,profilePic});
                }

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    })

    const navigate = useNavigate();

    const handleClickBtn = (btn)=>{

        const config = 'bg-reddishLight font-semibold text-white';
        
        switch(btn){
            case 'profile':
                setClickProfile(config);
                setClickQuestions('');
                setClickAnswers('');
                setClickSetting('');

                navigate('/accounts/profile');
                break;

            case 'questions':
                setClickQuestions(config);
                setClickProfile('');
                setClickAnswers('');
                setClickSetting('');

                navigate('/accounts/questions');
                break;

            case 'answers':
                setClickAnswers(config);
                setClickProfile('');
                setClickQuestions('');
                setClickSetting('');

                navigate('/accounts/answers');
                break;

            case 'setting':
                setClickSetting(config);
                setClickProfile('');
                setClickQuestions('');
                setClickAnswers('');

                navigate('/accounts/setting');
                break;

            default:
                break;
        }
    }

    return(
        <div className="w-full h-full overflow-auto flex  justify-center p-3 bg-gray3">
            <div className="w-full lg:w-9/12 h-fit pb-10 bg-white rounded-lg">

                <div className="w-full h-fit lg:pt-8 pt-3 p-3 lg:pl-6 lg:pr-6 flex justify-between">
                    <div className='flex gap-3 md:gap-5'>
                        <img
                            className='h-20 w-20 md:h-36 md:w-36 rounded-2xl' 
                            src={userProfile.profilePic ? userProfile.profilePic : default_profile}/>
                        <div className='flex flex-col md:gap-5 gap-2'>
                            <p className='md:text-4xl text-xl font-bold'>{userProfile.name}</p>
                            <div>
                                <p className='md:text-lg'>{userProfile.designation}</p>
                                <p className='md:text-md text-xs text-gray-400'>Joined {userProfile.formattJoinedDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className='sm:flex sm:flex-col sm:items-center sm:gap-2 items-start hidden'>
                        <button onClick={()=>setEditProfileOpen(true)} className='bg-green-600 p-1 pl-3 pr-3 shadow-black shadow-sm rounded-md text-white mt-1'>Edit Profile</button>
                        <button onClick={()=>setBuyCoinOpen(true)}
                         className='bg-reddishLight p-1 pl-3 pr-3 shadow-black shadow-sm rounded-md text-white mt-1'>
                            <FontAwesomeIcon className='text-xl pt-2 text-white lg:text-2xl' icon={faCartShopping} />
                            <div>Buy coins </div>
                        </button>
                    </div>
                </div>

                <div className='flex w-full flex-col items-center sm:hidden'>
                    <button onClick={()=>setEditProfileOpen(true)} className='bg-green-600 p-2 font-semibold pl-3 pr-3 w-11/12 rounded-lg text-white mt-1 '>Edit Profile</button>
                    <button onClick={()=>setBuyCoinOpen(true)} 
                     className='bg-reddishLight p-2 font-semibold pl-3 pr-3 w-11/12 rounded-lg text-white mt-1 flex justify-center items-center gap-4'>
                        <FontAwesomeIcon className='text-xl pt-2 text-white lg:text-2xl' icon={faCartShopping} />
                        <div >Buy coins </div>
                    </button>
                </div>

                <BuyCoin open={buyCoinOpen} setOpen={setBuyCoinOpen}/>


                <div className='w-full h-fit mt-5 rounded-md sm:pl-4 sm:pr-4 pl-2 pr-2'>
                    <div className='w-full h-fit flex gap-3 sm:justify-start justify-between overflow-auto pb-5'>
                        <button className={`p-1 pl-3 pr-3 sm:p-1 sm:pl-5 sm:pr-5  rounded-2xl border border-gray-400 hover:bg-reddishLight hover:font-semibold shadow-sm shadow-gray-500 ${clickProfile}`} onClick={()=>handleClickBtn('profile')}>Profile</button>
                        <button className={`p-1 pl-3 pr-3 sm:p-1 sm:pl-5 sm:pr-5  rounded-2xl border border-gray-400 hover:bg-reddishLight hover:font-semibold shadow-sm shadow-gray-500 ${clickQuestions}`} onClick={()=>handleClickBtn('questions')}>Questions</button>
                        <button className={`p-1 pl-3 pr-3 sm:p-1 sm:pl-5 sm:pr-5  rounded-2xl border border-gray-400 hover:bg-reddishLight hover:font-semibold shadow-sm shadow-gray-500 ${clickAnswers}`} onClick={()=>handleClickBtn('answers')}>Answers</button>
                        <button className={`p-1 pl-3 pr-3 sm:p-1 sm:pl-5 sm:pr-5  rounded-2xl border border-gray-400 hover:bg-reddishLight hover:font-semibold shadow-sm shadow-gray-500 ${clickSetting}`} onClick={()=>handleClickBtn('setting')}>Setting</button>
                    </div>

                    <Outlet/>
                    <EditProfile open={editProfileOpen} setOpen={setEditProfileOpen}/>

                </div>

            </div>
        </div>
    )
}