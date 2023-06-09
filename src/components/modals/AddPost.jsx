import ModalSkleton from "./ModalSkleton";
import default_profile from '../../assets/default_avatar.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEarthAmericas,faImages,faPhotoFilm,faCoins,faSpinner} from '@fortawesome/free-solid-svg-icons'
import AutosizeTextarea from 'react-textarea-autosize';
import { useEffect, useState } from "react";
import questionPostHandler from "../../helpers/questionPost";
import LoadingModal from "./LoadingModals";
import { base_API_url } from "../../credentials/credentialsConfig";


const typeArr = [
    'Science',
    'Engineering',
    'Environment',
    'Technology',
    'Mathematics',
    'Health',
    'Art',
    'History',
    'Sports',
    'Music',
    'Business',
    'Politics',
    'Literature',
    'Food',
    'Travel',
    'Film',
    'Fashion',
    'Gaming',
    'Education',
    'Design',
    'Others'
];


export default function AddPost({open,setOpen,setHitRefresh,details = {}}){
    const [coinValue,setCoinValue] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [typeSelection, setTypeSelection] = useState('Others');
    
    const [imageFiles, setImageFiles] = useState([]);
    const [imageFilesURL, setImageFilesURL] = useState([]);

    const [videoFiles, setVideoFiles] = useState([]);
    const [videoFilesURL, setVideoFilesURL] = useState([]);

    const [submitLoding, setSubmitLoding] = useState(false);

    useEffect(()=>{
        setImageFiles([]);
        setVideoFiles([]);
        setImageFilesURL([]);
        setVideoFilesURL([]);
        setCoinValue(0);
        setDescription('');
        setTitle('');
        setTypeSelection('Others');
    },[open])

    const submitHandler = async () =>{

        if(title && description && typeSelection){
            setSubmitLoding(true);

            const clearence = await questionPostHandler(imageFiles,coinValue,title,description,typeSelection);
            clearence ? alert("Uploaded successfully") : alert("Something is wrong");
            clearence && setOpen(false);
            clearence && setHitRefresh((pre)=>!pre);

            setSubmitLoding(false);

        } else{
            alert('Fill the form perfectly !')
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
        <ModalSkleton open={open} onClose={()=>setOpen(false)}>
            <div className="text-center pt-5 md:pt-8 text-xl md:text-3xl font-semibold">Ask a question</div>
            <div className="flex justify-center pt-3"><hr className=" border-gray-600 w-11/12"/></div>

            <div className="flex justify-between pl-5 pr-5 lg:pr-7 items-center">
                <div className="flex gap-4 pt-4 ">
                    <img className="h-12 w-12 md:h-16 md:w-16 rounded-full" style={{objectFit:'cover'}} src={details.profilePic ? details.profilePic : default_profile}/>
                    <div className="md:text-lg flex flex-col justify-center" >
                        <div className="font-semibold">{details.name}</div>
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
                        max={details.coins}
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
                        value={title}
                        className="resize-none focus:outline-none p-3 bg-gray3 mt-2 rounded-md"
                        onChange={(e)=>{e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`; setTitle(e.target.value)}}
                    />
                </div>

                <div className="w-11/12 h-auto flex flex-col  bg-white p-1 rounded-md">
                    <div className="pl-1 font-semibold">Question details</div>
                    <AutosizeTextarea 
                        placeholder="write the details"
                        value={description}
                        className="resize-none focus:outline-none p-3 bg-gray3 mt-2 rounded-md min-h-[8rem]"
                        onChange={(e)=>{e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`; setDescription(e.target.value)}}
                    />
                </div>

                <div className="w-11/12 h-auto flex justify-between items-center pl-5 pr-5 bg-white p-1 rounded-md">
                    <div>
                        Select Type
                    </div>
                    <div className="w-1/2">
                        <select value={typeSelection} onChange={(e)=>setTypeSelection(e.target.value)}
                            className="block w-full bg-white border  border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500">
                                {typeArr.map((item)=><option value={item}>{item}</option>)}
                        </select>
                    </div>
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
                        <input type="file" accept="image/*" className="hidden" multiple name="image" onChange={imageFileHandler}/>
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
                    <button onClick={submitHandler}
                        className="bg-bluishLight text-white w-full lg:pt-3 lg:pb-3 pt-2 pb-2 rounded-md hover:bg-bluish font-bold">Ask the question</button>
                </div>

                {/* loading modals */}
                <LoadingModal open={submitLoding}>
                    
                </LoadingModal>

            </div>
                
        </ModalSkleton>
    )
}