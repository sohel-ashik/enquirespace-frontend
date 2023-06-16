import {imgBB_API,base_API_url} from '../credentials/credentialsConfig.js';
import imageUploader from './photoUploader.js';


export default  async function questionPostHandler(imageFiles,coins, title, details, type){
    const imgSrcArr = [];
    let imgUploadClearence = true;

    if(imageFiles){
        // creating the imagelink with upload
        for(let i =0; i<imageFiles.length;i++){
            const imgSrcData = await imageUploader(imageFiles[i]);
            if(imgSrcData) {
                const imgLink = imgSrcData.data.display_url;
                imgSrcArr.push(imgLink);
            }
            else{
                imgSrcArr.length = 0;
                imgUploadClearence = false;
                break;
            }
        }
    }

    if(imgUploadClearence){
        const api = `${base_API_url}/home/ask`;
        const token = localStorage.getItem('token');
        const data = {
            coins: Number(coins),
            title,
            details,
            type,
            imgSrcArr,
            token
        }

        try{
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if(!response.ok){
                return false;

            } else{
                const retrivedData = await response.json();
                console.log(retrivedData)
                return true;
            }

        }catch(err){
            return false;
        }
        
    }else{
        return false;
    }
}