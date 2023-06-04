import ModalSkleton from "./ModalSkleton";
import default_profile from '../../assets/default_avatar.png';
import { useEffect, useState } from "react";


const CustomFieldSet = ({name,type,value,setValue,placeholder,disabled=false,bg=''})=>{
    return(
        <fieldset className={` border rounded-lg pl-4 border-black ${bg} `}>
            <legend className={`text-sm text-black`}>{name}</legend>
            <input 
                className='focus:outline-none focus:border-none pt-1 pb-3  pr-2 rounded-md w-11/12 bg-transparent'
                type={type} 
                disabled = {disabled}
                placeholder={placeholder}/>
        </fieldset>
    )
}


export default function EditProfile({open,setOpen}){

    const [selectedPic , setSelectedPic] = useState(null);
    const [picURL, setPicURL] = useState(null);

    useEffect(()=>{
        setPicURL(null);
    },[])

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        setSelectedPic(file);
        setPicURL(URL.createObjectURL(file));
    }

    return(
        <ModalSkleton open={open} onClose={()=>setOpen(false)}>
            <div className="w-full h-fit lg:pt-8 pt-6">
                <div className="flex justify-center">
                    <label className="rounded-full lg:h-24 lg:w-24 h-20 w-20 relative overflow-hidden shadow-sm shadow-black hover:cursor-pointer">
                        <img className="rounded-full lg:h-24 lg:w-24 h-20 w-20 object-cover" src={picURL ? picURL :  default_profile}/>
                        <div className="w-full text-white text-center pt-1 font-semibold lg:pt-2 text-xs lg:h-10 h-7 bg-gray2 absolute bottom-0 ">
                            update
                        </div>
                        <input type='file' accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                </div>

                <div className="flex justify-center">
                    <div className="w-11/12 pt-6 gap-4 flex flex-col items-center h-fit ">
                        <CustomFieldSet name='Name' type='text' placeholder='Sohel Ashik' />
                        <CustomFieldSet name='Email' type='email' placeholder='ashik@gmail.com' disabled={true} bg=' bg-gray-300' />
                        <CustomFieldSet name='Phone' type='tel' placeholder='01772998823' />
                        <CustomFieldSet name='Designation' type='text' placeholder='Software Engineer' />

                        <CustomFieldSet name='Old-Password' type='password' placeholder='Old password' />
                        <CustomFieldSet name='New-Password' type='password' placeholder='New password' />
                        <button className="md:w-5/12 w-8/12 p-3 rounded-xl text-white bg-bluishLight hover:bg-reddishLight">Submit</button>
                    </div>
                </div>

            </div>

        </ModalSkleton>
    )
}