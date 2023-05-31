import styles from './navigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse,faCircleQuestion, faCoins, faMagnifyingGlass, faCirclePlus, faTableList} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import default_avatar from '../../assets/default_avatar.png';

function BigNav({allState}){
    const {search,setSearch,homeColor,questionColor,handleItemClick} = allState;
    return(
        <nav className={styles.nav}>
            <div className='flex items-center '>
                <p className={styles.app_name} onClick={()=>handleItemClick('refresh')}>Enquery Space</p>
            </div>

            <div className={`flex items-center gap-3 pr-5 text-white`}>
                <div className='flex items-center'>
                    <div className={`${styles.icon_holder} ${homeColor}`} onClick={()=>handleItemClick('home')}>
                        <FontAwesomeIcon className={styles.icon} icon={faHouse}/>   
                    </div>
                    <div className={`${styles.icon_holder} ${questionColor}`} onClick={()=>handleItemClick('questions')}>
                        <FontAwesomeIcon className={styles.icon} icon={faCircleQuestion}/>
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
                <div className='hover:scale-105 hover:cursor-pointer transition-all duration-500 w-32 bg-reddish h-8 flex justify-between items-center  pl-3 pr-2 rounded-2xl'>
                    <p className='text-white text-xs font-bold'>Ask anything</p>
                    <FontAwesomeIcon className='text-xl' icon={faCirclePlus}/>
                </div>

                <div className='flex text-md items-center gap-2  p-1 bg-reddishLight pt-2 pb-2 pl-4 pr-4 rounded-3xl'>
                    <FontAwesomeIcon className={styles.icon} icon={faCoins}/>
                    <p className='font-bold text-xs'>12</p>
                </div>

                <img className='bg-white h-10 w-10 rounded-full ' src={default_avatar}/>

                {/* </div> */}
            </div>
        </nav>
    )
}

function SmallNav({allState}){
    const {search,setSearch,handleItemClick,homeColor,questionColor,addQuestionColor,listColor,profileColor} = allState;

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
            <div className='h-14 w-full bg-gray-200 flex justify-evenly items-center text-bluish'>
                <div className={` text-3xl h-full flex items-center ${homeColor}`} onClick={()=>handleItemClick('home')}>
                    <FontAwesomeIcon icon={faHouse}/>
                </div>
                <div className={` text-3xl h-full flex items-center ${questionColor}`} onClick={()=>handleItemClick('questions')}>
                    <FontAwesomeIcon icon={faCircleQuestion}/>
                </div>
                <div className={` text-3xl h-full flex items-center ${listColor}`} onClick={()=>handleItemClick('list')}>
                    <FontAwesomeIcon icon={faTableList}/>
                </div>
                <div className={` text-3xl h-full flex items-center ${addQuestionColor}`} onClick={()=>handleItemClick('add')}>
                    <FontAwesomeIcon icon={faCirclePlus}/>
                </div>
                <div className={` text-3xl h-full flex items-center ${profileColor}`} onClick={()=>handleItemClick('profile')}>
                    <img className={`bg-white h-9 w-9 rounded-full`} src={default_avatar}/>
                </div>
            </div>

        </nav>

    )
}

export default function Navigation(){
    const [search,setSearch] = useState('');
    const [homeColor,setHomeColor] = useState('text-bluish');
    const [questionColor, setQuestionColor] = useState('text-bluish');
    const [addQuestionColor, setAddQuestionColor] = useState('text-bluish');
    const [listColor, setListColor] = useState('text-bluish');
    const [profileColor, setProfileColor] = useState('text-bluish');

    const handleItemClick = (item)=>{
        if(item == 'home'){
            setHomeColor('border-b-4 border-reddish text-reddish transition-all duration-500');
            setQuestionColor('text-bluish');
            setAddQuestionColor('text-bluish');
            setListColor('text-bluish');
            setProfileColor('text-bluish');

        }else if(item == 'questions'){
            setQuestionColor('border-b-4 border-reddish text-reddish transition-all duration-500');
            setHomeColor('text-bluish');
            setAddQuestionColor('text-bluish');
            setListColor('text-bluish');
            setProfileColor('text-bluish');

        }else if(item == 'refresh'){
            setHomeColor('text-bluish');
            setQuestionColor('text-bluish');
            setAddQuestionColor('text-bluish');
            setListColor('text-bluish');
            setProfileColor('text-bluish');

        }else if(item == 'list'){
            setListColor('border-b-4 border-reddish text-reddish transition-all duration-500');
            setHomeColor('text-bluish');
            setQuestionColor('text-bluish');
            setAddQuestionColor('text-bluish');
            setProfileColor('text-bluish');
        } else if(item == 'add'){

            setAddQuestionColor('border-b-4 border-reddish text-reddish transition-all duration-500')
            setHomeColor('text-bluish');
            setQuestionColor('text-bluish');
            setListColor('text-bluish');
            setProfileColor('text-bluish');
        } else if(item == 'profile'){

            setProfileColor('border-b-4 border-reddish text-reddish transition-all duration-500')
            setHomeColor('text-bluish');
            setQuestionColor('text-bluish');
            setAddQuestionColor('text-bluish');
            setListColor('text-bluish');
        }
    }

    return(
        <>
            <BigNav allState={{search,setSearch,homeColor,questionColor,handleItemClick}}/>
            <SmallNav allState={{search,setSearch,handleItemClick,homeColor,questionColor,addQuestionColor,listColor,profileColor}}/>
        </>
        
    )
}