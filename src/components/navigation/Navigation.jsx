import styles from './navigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse,faCircleQuestion, faCoins, faMagnifyingGlass, faCirclePlus, faTableList,faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import default_avatar from '../../assets/default_avatar.png';
import {useNavigate} from 'react-router-dom';
import AddPost from '../modals/AddPost';
import BuyCoin from '../modals/BuyCoin';
import AuthContext from '../../contexts/AuthContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { base_API_url } from '../../credentials/credentialsConfig';

function BigNav({allState}){
    const {search,setSearch,
        homeColor,
        questionColor,
        handleItemClick,
        coins,profilePic,
        setAskOpen} = allState;

    const [buyCoinOpen, setBuyCoinOpen] = useState(false);
    const contextValues = useContext(AuthContext);
    const navigate = useNavigate();

    return(
        <nav className={styles.nav}>
            <div className='flex items-center '>
                <p className={styles.app_name} onClick={()=>handleItemClick('refresh')}>Enquire Space</p>
            </div>

            <div className={`flex items-center gap-3 pr-5 text-white`}>
                <div className='flex items-center'>
                    
                    <div className={`${styles.icon_holder} ${homeColor}`} onClick={()=>handleItemClick('home')}>
                        <FontAwesomeIcon className={styles.icon} icon={faHouse}/>   
                    </div>
                    
                    <div className={`${styles.icon_holder} ${questionColor}`} onClick={()=>handleItemClick('questions')}>
                        <FontAwesomeIcon className={styles.icon} icon={faCircleQuestion}/>
                    </div>

                    <div className={`${styles.icon_holder}`} onClick={()=>{
                        localStorage.setItem('token','');
                        contextValues.setAuth(false);
                        navigate('/');
                    }}>
                        <FontAwesomeIcon className={styles.icon} icon={faArrowRightFromBracket}/>
                    </div>
                </div>
                <div className='flex items-center bg-white  text-black pl-2 pr-2 p-1 gap-2 rounded-md w-72'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    <input 
                        className='focus:border-none focus:outline-none w-full' 
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        placeholder='Search'/>
                </div>
                <div 
                    onClick={()=>setAskOpen(true)}
                    className='hover:scale-105 hover:cursor-pointer transition-all duration-500 w-32 bg-reddish h-8 flex justify-between items-center  pl-3 pr-2 rounded-2xl'>

                    <p className='text-white text-xs font-bold'>Ask anything</p>
                    <FontAwesomeIcon className='text-xl' icon={faCirclePlus}/>
                </div>


                <div onClick={()=>setBuyCoinOpen(true)}
                    className='flex hover:cursor-pointer text-md items-center gap-2  p-1 bg-yellow-300 text-bluishLight pt-2 pb-2 pl-4 pr-4 rounded-3xl'>
                        <FontAwesomeIcon className='' icon={faCoins}/>
                        <p className='font-bold text-xs'>{coins}</p>
                </div>
                <BuyCoin open={buyCoinOpen} setOpen={setBuyCoinOpen} coins ={coins}/>

                <img className='bg-white h-10 w-10 rounded-full hover:cursor-pointer' style={{objectFit:'cover'}} src={profilePic ? profilePic : default_avatar} onClick={()=>handleItemClick('profile')}/>

            </div>
        </nav>
    )
}

function SmallNav({allState}){
    const {
        search,setSearch,
        handleItemClick,
        homeColor,
        questionColor,
        addQuestionColor,
        listColor,
        profileColor,
        coins,profilePic,
        setAskOpen} = allState;

    const contextValues = useContext(AuthContext);
    const navigate = useNavigate();
    

    return(
        <nav className={styles.small_nav}>
            <div className='h-14 w-full flex justify-evenly items-center text-white bg-reddish'>
                
                <div className='font-bold text-xl' onClick={()=>handleItemClick('refresh')}>
                    Enquire Space
                </div>
                <div className='w-2/4 gap-2 flex justify-center items-center bg-white text-black pl-2 pr-2 p-1  rounded-md'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='text-md'/>
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} style={{fontSize:'17px'}} placeholder='Search' className='w-full focus:outline-none focus:border-none'/>
                </div>
                
            </div>
            <div className='h-14 w-full bg-bluishLight flex justify-evenly items-center '>
                
                <div className={` text-3xl h-full flex items-center ${homeColor}`} onClick={()=>{handleItemClick('home')}}>
                    <FontAwesomeIcon icon={faHouse}/>
                </div>
                
                <div className={` text-3xl h-full flex items-center ${questionColor}`} onClick={()=>handleItemClick('questions')}>
                    <FontAwesomeIcon icon={faCircleQuestion}/>
                </div>
                
                <div className={` text-3xl h-full flex items-center ${listColor}`} onClick={()=>{handleItemClick('list')}}>
                    <FontAwesomeIcon icon={faTableList}/>
                </div>
                
                <div className={` text-3xl h-full flex items-center ${addQuestionColor}`} onClick={()=>{handleItemClick('add'); setAskOpen(true)}}>
                    <FontAwesomeIcon icon={faCirclePlus}/>
                </div>
                <div className={` text-3xl h-full flex  items-center ${profileColor}`} onClick={()=>handleItemClick('profile')}>
                    <img className={`bg-white h-9 w-9 rounded-full`} style={{objectFit: 'cover'}} src={profilePic ? profilePic : default_avatar}/>
                </div>
                <div className={`text-3xl h-full flex  items-center text-yellow-300`} onClick={()=>{
                        localStorage.setItem('token','');
                        contextValues.setAuth(false);
                        navigate('/');
                    }}>
                    <FontAwesomeIcon  icon={faArrowRightFromBracket}/>
                </div>
            </div>

        </nav>

    )
}

export default function Navigation(){
    const [search,setSearch] = useState('');
    const [homeColor,setHomeColor] = useState('text-white');
    const [questionColor, setQuestionColor] = useState('text-white');
    const [addQuestionColor, setAddQuestionColor] = useState('text-white');
    const [listColor, setListColor] = useState('text-white');
    const [profileColor, setProfileColor] = useState('text-white');

    const [askOpen, setAskOpen] = useState(false);

    const [name, setName] = useState('');
    const [coins,setCoins] = useState(0);
    const [profilePic, setProfilePic] = useState('');

    const contextValues = useContext(AuthContext);

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
                    setName(name);
                    setCoins(totalCoins);
                    setProfilePic(profilePic);
                }

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    },[contextValues.hitRefresh,askOpen])


    // use for navigation
    const navigate = useNavigate();

    const handleItemClick = (item)=>{
        if(item == 'home'){
            setHomeColor('border-b-4 border-white text-reddishLight transition-all duration-500');
            setQuestionColor('text-white');
            setAddQuestionColor('text-white');
            setListColor('text-white');
            setProfileColor('text-white');

            navigate('/home');

        }else if(item == 'questions'){
            setQuestionColor('border-b-4 border-white text-reddishLight transition-all duration-500');
            setHomeColor('text-white');
            setAddQuestionColor('text-white');
            setListColor('text-white');
            setProfileColor('text-white');

            navigate('/unsolved')

        }else if(item == 'refresh'){
            setHomeColor('text-white');
            setQuestionColor('text-white');
            setAddQuestionColor('text-white');
            setListColor('text-white');
            setProfileColor('text-white');

            navigate('/home');

        }else if(item == 'list'){
            setListColor('border-b-4 border-white text-reddishLight transition-all duration-500');
            setHomeColor('text-white');
            setQuestionColor('text-white');
            setAddQuestionColor('text-white');
            setProfileColor('text-white');

            navigate('list');

        } else if(item == 'add'){

            setAddQuestionColor('border-b-4 border-white text-reddishLight transition-all duration-500')
            setHomeColor('text-white');
            setQuestionColor('text-white');
            setListColor('text-white');
            setProfileColor('text-white');
        } else if(item == 'profile'){

            setProfileColor('border-b-4 border-white text-reddishLight transition-all duration-500')
            setHomeColor('text-white');
            setQuestionColor('text-white');
            setAddQuestionColor('text-white');
            setListColor('text-white');

            navigate('/accounts')
        }
    }

    return(
        <>
            <BigNav allState={{search,setSearch,homeColor,questionColor,handleItemClick,askOpen,setAskOpen,coins,profilePic}}/>
            <SmallNav allState={{search,setSearch,handleItemClick,homeColor,questionColor,addQuestionColor,listColor,profileColor,askOpen,setAskOpen,coins,profilePic}}/>
            <AddPost open={askOpen} setOpen={setAskOpen} setHitRefresh = {contextValues.setHitRefresh} details = {{name,profilePic,coins}}/>
        </>
        
    )
}