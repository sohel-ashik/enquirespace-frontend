
async function imageUploader(singleImage){
    const formData = new FormData();
    formData.append(`image`,singleImage);

    try{
            const response =  await fetch('https://api.imgbb.com/1/upload?key=d7a56e9690026307ee66aa27dea4269c', {
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
        const api = 'http://localhost:3000/home/ask';
        const data = {
            coins: Number(coins),
            title,
            details,
            type,
            imgSrcArr
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