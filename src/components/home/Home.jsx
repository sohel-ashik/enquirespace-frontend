import { useState } from 'react';
import AddPost from '../modals/AddPost';
import ModalSkleton from '../modals/ModalSkleton';
import CompactPost from '../posts/CompactPost';
import HeaderAsk from './HeaderAsk';
import styles from './home.module.css';
import SideBar from './SideBar';


export default function(){
    const arr = [
        'Science',
        'Engineering',
        'Environment',
        'Technology',
        'Mathematics',
        'Health'
      ];

    const [open, setOpen] = useState(false);

    return(
            <div className='h-full w-full bg-gray3 flex flex-row'>
                <div className={`h-full w-1/5   pt-5 overflow-auto hidden lg:block`}>
                    <SideBar/>
                </div>

                <div className='lg:w-4/5 h-full w-full  overflow-auto p-5'>
                    {/* the main browsing pages */}
                    <div className='lg:w-4/5 w-full h-fit flex flex-col gap-5'>
                        <div onClick={()=>setOpen(true)}>
                            <HeaderAsk/>
                        </div>
                        
                        <AddPost open={open} setOpen={setOpen}/>
                        
                        {/* here goes the all content */}

                        {arr.map((ele)=><CompactPost/>)}

                    </div>
                </div>
                
            </div>
    )
}