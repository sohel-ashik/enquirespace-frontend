import default_profile from '../../assets/default_avatar.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEarthAmericas,faImages,faPhotoFilm,faCoins,faSpinner} from '@fortawesome/free-solid-svg-icons'
import AutosizeTextarea from 'react-textarea-autosize';
import { useEffect, useState } from "react";
import answerPostHandler from '../../helpers/answerPost';
import LoadingModal from '../modals/LoadingModals';
import { base_API_url } from '../../credentials/credentialsConfig';

export default function AddAnswer({open,setOpen,questionId}){
    const [answer, setAnswer] = useState('');
    
    const [imageFiles, setImageFiles] = useState([]);
    const [imageFilesURL, setImageFilesURL] = useState([]);

    const [videoFiles, setVideoFiles] = useState([]);
    const [videoFilesURL, setVideoFilesURL] = useState([]);

    const [submitLoding,setSubmitLoding] = useState(false);
    const [profilePic,setProfilePic] = useState('');

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
                    const {name,profilePic} = data;
                    setProfilePic(profilePic);
                }

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    },[])

    const postHandler = async () =>{
        if(answer){
            setSubmitLoding(true);
            const clearence = await answerPostHandler(imageFiles,answer,questionId);

            clearence ? console.log('Answer added successfully') : alert('Something is wrong!');
            // clearence && window.location.reload();
            clearence && setAnswer('');
            clearence && setImageFiles([]);
            clearence && setImageFilesURL([]);
            clearence && setOpen(false);

            setSubmitLoding(false);

        } else {
            alert('Fill the answer box !');
        }
    }

    const imageFileHandler = (e) =>{
        const files = e.target.files;
        const tempURL = [];

        for (let i = 0; i<files.length; i++){
            const file = files[i];
            const url = URL.createObjectURL(file);
            tempURL.push(url);
        }

        setImageFiles(files);
        setImageFilesURL(tempURL);
    } 

    const videoFileHandler = (e) =>{
        const files = e.target.files;
        const tempURL = [];

        for(let i = 0; i<files.length; i++){
            const file = files[i];
            const url = URL.createObjectURL(file);
            tempURL.push(url);
        }
        setVideoFiles(files);
        setVideoFilesURL(tempURL);

    }


    return(
        <div>
            <div className="text-center pt-5 md:pt-8 text-xl md:text-2xl font-semibold pb-3">Make an answer</div>

            <div className="flex justify-center items-center">
                    <img className="h-10 w-10 md:h-12 md:w-12 rounded-full" style={{objectFit:'cover'}} src={profilePic ? profilePic : default_profile}/>
            </div>

            <div  className="w-full flex flex-col justify-center items-center gap-3 pt-5">
                
                <div className="w-11/12 h-auto flex flex-col  bg-white p-1 rounded-md">
                    <div className="pl-1 font-semibold">Detailed answer</div>
                    <AutosizeTextarea 
                        placeholder="write the answer details"
                        value={answer}
                        className="resize-none focus:outline-none p-3 bg-gray3 mt-2 rounded-md min-h-[8rem]"
                        onChange={(e)=>{e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`;setAnswer(e.target.value)}}
                    />
                </div>

                {/* the image and video previewer */}
                <div className={`w-11/12 h-fit bg-white p-1 lg:p-3  gap-6 pb-5 ${(imageFilesURL.length || videoFilesURL.length) ? 'flex' : 'hidden'} flex-col`}>
                    <div className="text-center text-xl font-semibold bg-gray1 rounded-md text-white">Images</div>
                    <div className="w-full h-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {imageFilesURL.map((item)=><img className="shadow-lg shadow-black" src={item}/>)}
                    </div>
                    <div className="text-center text-xl font-semibold bg-gray1 rounded-md text-white">Videos</div>
                    <div className="w-full h-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {videoFilesURL.map((item)=><video className="shadow-lg shadow-black" src={item}/>)}
                    </div>
                </div>

                <div className="w-11/12 h-auto flex justify-evenly  bg-white p-1 rounded-md">
                    <label className="hover:cursor-pointer flex items-center gap-3 h-full w-1/2 justify-center border-r-2 hover:bg-gray1 hover:text-white pt-2 lg:pt-4 pb-2 lg:pb-4 hover:rounded-md">
                        <input  type="file" accept="image/*" className="hidden" multiple name="image" onChange={imageFileHandler}/>
                        <FontAwesomeIcon icon={faImages}/>
                        <div>Add images</div>
                    </label>
                    <label className="hover:cursor-pointer flex items-center gap-3 h-full w-1/2 justify-center border-l-2 hover:bg-gray1 hover:text-white pt-2 lg:pt-4 pb-2 lg:pb-4 hover:rounded-md">
                        <input disabled type="file" className="hidden" accept="video/*" multiple name="video" onChange={videoFileHandler}/>
                        <FontAwesomeIcon icon={faPhotoFilm}/>
                        <div>Add videos</div>
                    </label>
                </div>

                <div className="flex w-11/12 ">
                    <button onClick={postHandler} 
                        className="bg-bluishLight text-white w-full lg:pt-3 lg:pb-3 pt-2 pb-2 rounded-md hover:bg-bluish font-bold">Post the answer</button>
                </div>

                {/* loading modals */}
                <LoadingModal open={submitLoding && open}>
                    <div className="p-5 text-3xl text-white rounded-lg bg-bluish">
                        <FontAwesomeIcon icon={faSpinner} spin/>
                    </div>
                </LoadingModal>

            </div>
        </div>
    )
}