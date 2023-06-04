import ModalSkleton from "./ModalSkleton";
import default_profile from '../../assets/default_avatar.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEarthAmericas,faImages,faPhotoFilm,faCoins} from '@fortawesome/free-solid-svg-icons'
import AutosizeTextarea from 'react-textarea-autosize';
import { useState } from "react";

export default function AddPost({open,setOpen}){
    const [coinValue,setCoinValue] = useState(0);

    return(
        <ModalSkleton open={open} onClose={()=>setOpen(false)}>
            <div className="text-center pt-5 md:pt-8 text-xl md:text-3xl font-semibold">Ask a question</div>
            <div className="flex justify-center pt-3"><hr className=" border-gray-600 w-11/12"/></div>

            <div className="flex justify-between pl-5 pr-5 lg:pr-7 items-center">
                <div className="flex gap-4 pt-4 ">
                    <img className="h-12 w-12 md:h-16 md:w-16 rounded-full" src={default_profile}/>
                    <div className="md:text-lg flex flex-col justify-center" >
                        <div className="font-semibold">Sohel Ashik</div>
                        <div className="flex gap-2 items-center text-gray-500">
                            <FontAwesomeIcon icon={faEarthAmericas}/>
                            <div >Public</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-end gap-2">
                    <div className="flex items-center gap-2 text-reddish text-lg lg:text-3xl font-bold ">
                        <FontAwesomeIcon className="lg:text-2xl text-md" icon={faCoins}/>
                        <div className="text-center rounded-xl">{coinValue}</div>
                    </div>
                    <input 
                        type='range'  
                        min={0}
                        max={100}
                        value={coinValue}
                        onChange={(e)=>setCoinValue(e.target.value)}
                        disabled={false} />
                </div>
            </div>

            <div  className="w-full flex flex-col justify-center items-center gap-3 pt-5">
                <div className="w-11/12 h-auto flex flex-col  bg-white p-1 rounded-md">
                    <div className="pl-1 font-semibold">Add question title</div>
                    <AutosizeTextarea 
                        placeholder="make it short"
                        className="resize-none focus:outline-none p-3 bg-gray3 mt-2 rounded-md"
                        onChange={(e)=>{e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`}}
                    />
                </div>

                <div className="w-11/12 h-auto flex flex-col  bg-white p-1 rounded-md">
                    <div className="pl-1 font-semibold">Question details</div>
                    <AutosizeTextarea 
                        placeholder="write the details"
                        className="resize-none focus:outline-none p-3 bg-gray3 mt-2 rounded-md min-h-[8rem]"
                        onChange={(e)=>{e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`}}
                    />
                </div>

                <div className="w-11/12 h-auto flex justify-evenly  bg-white p-1 rounded-md">
                    <label className="hover:cursor-pointer flex items-center gap-3 h-full w-1/2 justify-center border-r-2 hover:bg-gray1 hover:text-white pt-2 lg:pt-4 pb-2 lg:pb-4 hover:rounded-md">
                        <input type="file" className="hidden" multiple name="image"/>
                        <FontAwesomeIcon icon={faImages}/>
                        <div>Add images</div>
                    </label>
                    <label className="hover:cursor-pointer flex items-center gap-3 h-full w-1/2 justify-center border-l-2 hover:bg-gray1 hover:text-white pt-2 lg:pt-4 pb-2 lg:pb-4 hover:rounded-md">
                        <input type="file" className="hidden" multiple name="video"/>
                        <FontAwesomeIcon icon={faPhotoFilm}/>
                        <div>Add videos</div>
                    </label>
                </div>

                <div className="flex w-11/12 ">
                    <button className="bg-bluishLight text-white w-full lg:pt-3 lg:pb-3 pt-2 pb-2 rounded-md hover:bg-bluish font-bold">Ask the question</button>
                </div>

            </div>
                
        </ModalSkleton>
    )
}