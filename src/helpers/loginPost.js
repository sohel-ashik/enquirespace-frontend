import {base_API_url} from '../credentials/credentialsConfig';

export default async function loginPost(mail,pass){
    const api = `${base_API_url}/login`;
    const data = {
        mail,
        pass
    }

    try{
        const response = await fetch( api , {
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
            return retrivedData;
        }

    }catch(err){
        return false;
    }
    
}