import {base_API_url} from '../credentials/credentialsConfig';

export default async function signupPost(name,mail,pass){
    const api = `${base_API_url}/signup/adduser`;
    const data = {
        name,
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
            return true;
        }

    }catch(err){
        return false;
    }
    
}