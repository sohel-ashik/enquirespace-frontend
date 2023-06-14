import {imgBB_API} from '../credentials/credentialsConfig.js';

async function imageUploader(singleImage){
    const formData = new FormData();
    formData.append(`image`,singleImage);

    try{
            const response =  await fetch(`https://api.imgbb.com/1/upload?key=${imgBB_API}`, {
                method: 'POST',
                body: formData
            })

            if(!response.ok){
                return false;
            }
            else{
                const data = await response.json();
                return data;
            }

    }catch(err){
        return false;
    }
    
}

export default imageUploader;