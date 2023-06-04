import styles from './home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import default_profile from '../../assets/default_avatar.png';
import {faCircleQuestion, faImages } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

export default function(){

    return(
        <div className={`w-full h-fit rounded-md bg-gray2 lg:pl-5 lg:pr-5 pl-2 pr-2 pt-4 pb-4 ${styles.largeScreen}`}>
            <div className='flex gap-3 lg:w-4/6 w-full'>
                <img src={default_profile} className='h-10 w-10 rounded-full'/>
                <input
                    className='pl-5 pr-3 focus:outline-none focus:border-none rounded-3xl w-full' 
                    placeholder='Ask anything'/>
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
        </div>
    )
}