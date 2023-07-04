import ModalSkleton from "./ModalSkleton";
import default_profile from '../../assets/default_avatar.png';
import { useEffect, useState } from "react";
import { base_API_url } from "../../credentials/credentialsConfig";
import imageUploader from "../../helpers/photoUploader";
import LoadingModal from "./LoadingModals";


const CustomFieldSet = ({name,type,value,setValue,placeholder,disabled=false,bg=''})=>{
    return(
        <fieldset className={` border rounded-lg pl-4 border-black ${bg} `}>
            <legend className={`text-sm text-black`}>{name}</legend>
            <input 
                className='focus:outline-none focus:border-none pt-1 pb-3  pr-2 rounded-md w-11/12 bg-transparent'
                type={type} 
                value = {value}
                onChange = {(e)=>setValue(e.target.value)}
                disabled = {disabled}
                placeholder={placeholder}/>
        </fieldset>
    )
}


export default function EditProfile({open,setOpen}){

    const [selectedPic , setSelectedPic] = useState(null);
    const [picURL, setPicURL] = useState(null);

    const [userName,setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [designation,setDesignation] = useState('');
    const [newPass, setNewPass] = useState('');

    const [submitLoading, setSubmitLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    useEffect(()=>{
        setPicURL(null);
        setUserName('');
        setPhone('');
        setDesignation('');
        setNewPass('');
        setSelectedPic(null);

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
                    const {name,designation,profilePic,phone,mail} = data;
                    setUserDetails({name,designation,profilePic,phone,mail});
                 }

            }catch(err){
                console.log(err);
            }
        }

        fetchData();

    },[open])

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        setSelectedPic(file);
        setPicURL(URL.createObjectURL(file));
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const data = {userName,phone,designation,newPass}
        try{
            setSubmitLoading(true);
            if(selectedPic){
                const img_upload_clearence = await imageUploader(selectedPic);
                data.imgLink = img_upload_clearence.data.display_url;
            }

            const response = await fetch(`${base_API_url}/accounts/edit`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(data)
            })
            setSubmitLoading(false);
            if(!response.ok){
                console.log('Error');
                alert('Something is wrong')
            }else{
                const data = await response.json();
                setOpen(false);
                alert('Profile Updated');
                window.location.reload();
            }

        }catch(err){
            console.log(err);
            alert('Something is wrong');
        }
    }

    return(
        <ModalSkleton open={open} onClose={()=>setOpen(false)}>
            <div className="w-full h-fit lg:pt-8 pt-6">
                <div className="flex justify-center">
                    <label className="rounded-full lg:h-24 lg:w-24 h-20 w-20 relative overflow-hidden shadow-sm shadow-black hover:cursor-pointer">
                        <img className="rounded-full lg:h-24 lg:w-24 h-20 w-20 object-cover" src={picURL ? picURL : userDetails.profilePic ? userDetails.profilePic : default_profile}/>
                        <div className="w-full text-white text-center pt-1 font-semibold lg:pt-2 text-xs lg:h-10 h-7 bg-gray2 absolute bottom-0 ">
                            update
                        </div>
                        <input type='file' accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                </div>

                <div className="flex justify-center">
                    <div className="w-11/12 pt-6 gap-4 flex flex-col items-center h-fit ">
                        <CustomFieldSet name='Name' type='text' value={userName} setValue={setUserName} placeholder={userDetails.name} />
                        <CustomFieldSet name='Email' type='email' placeholder={userDetails.mail} disabled={true} bg=' bg-gray-300' />
                        <CustomFieldSet name='Phone' type='tel' value={phone} setValue={setPhone} placeholder={userDetails.phone} />
                        <CustomFieldSet name='Designation' type='text' value={designation} setValue={setDesignation} placeholder={userDetails.designation} />

                        {/* <CustomFieldSet name='Old-Password' type='password' placeholder='Old password' /> */}
                        <CustomFieldSet name='New-Password' value={newPass} setValue={setNewPass} type='password' placeholder='New password' />
                        <button onClick={handleSubmit}
                            className="md:w-5/12 w-8/12 p-3 rounded-xl text-white bg-bluishLight hover:bg-reddishLight">Submit</button>
                    </div>
                </div>

            </div>
            <LoadingModal open={submitLoading}/>

        </ModalSkleton>
    )
}