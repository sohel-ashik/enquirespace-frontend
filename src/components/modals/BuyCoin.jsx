import ModalSkleton from "./ModalSkleton";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoins,faCartPlus} from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";


export default function BuyCoin({open,setOpen,coins}){
    const [coinCode, setCoinCode] = useState(false);

    return(
        <ModalSkleton open={open} onClose={()=>setOpen(false)}>
            <div className="w-full h-fit lg:pt-8 pt-6">
                <div className="flex justify-center">
                    <div className="flex flex-col gap-8">
                        <div className="flex justify-center gap-4 items-center lg:text-2xl text-xl text-black">
                            <FontAwesomeIcon icon={faCoins}/>
                            <div>{coins}</div>
                        </div>
                        <div className=" flex items-center gap-3">
                            <input placeholder="Enter the code" className="p-2 focus:outline-none lg:w-60 w-48 rounded-md text-black"/>
                            <div className="bg-bluishLight p-2 rounded-lg pl-3 pr-3 text-white hover:cursor-pointer hover:bg-reddishLight">
                                <FontAwesomeIcon icon={faCartPlus}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalSkleton>
    )
}