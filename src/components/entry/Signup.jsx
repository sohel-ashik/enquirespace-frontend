import { useState } from 'react';
import styles from './signup_login.module.css';
import Common from './Login_Signup_common';

function MailAuthCode({mail}){
    const [code,setCode] = useState('');
    const [nameFocus,setNameFocus] = useState('tranborder-gray-300');

    return(
        <form className={styles.login_form}>
            <div className='pt-10 flex gap-2 justify-center' style={{fontWeight:'bold',fontSize:'14px'}}>A code has been Send to <p className='text-red-600'>{`${mail}.`}</p></div>
            <fieldset className={`transition-all duration-1000 border-2 rounded-lg pl-4 ${nameFocus}`}>
                <legend className={`text-sm text-black`}>Code</legend>
                <input 
                    className={styles.inputs}
                    type="text" 
                    value={code}
                    onChange={(e)=>setCode(e.target.value)}
                    onFocus={()=>setNameFocus('border-black  text-black')}
                    onBlur={()=>setNameFocus('border-gray-300')}
                    required 
                    placeholder='Confirmation code'/>
            </fieldset>
            <button
                className='text-white rounded-md h-12 mt-4 bg-blue-950 hover:bg-black' 
                value='submit'
                >Submit</button>
        </form>
    )
}

function SignUpForm({setConfirmed,setConfirmedMail}){

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    
    const [nameFocus,setNameFocus] = useState('tranborder-gray-300');
    const [emailFocus,setEmailFocus] = useState('tranborder-gray-300');
    const [passFocus, setPassFocus] = useState('border-gray-300');

    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passErrorMsg,setPassErrorMsg] = useState('');

    return(
        <form className={styles.login_form} onSubmit={()=>{
            setConfirmed(true);
            setConfirmedMail(email);
        }}>
            <fieldset className={`transition-all duration-1000 border-2 rounded-lg pl-4 ${nameFocus}`}>
                <legend className={`text-sm text-black`}>Name</legend>
                <input 
                    className={styles.inputs}
                    type="text" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    onFocus={()=>setNameFocus('border-black  text-black')}
                    onBlur={()=>setNameFocus('border-gray-300')}
                    required 
                    placeholder='Ashik'/>
            </fieldset>

            <fieldset className={`transition-all duration-1000 border-2 rounded-lg pl-4 ${emailFocus}`}>
                <legend className={`text-sm text-black`}>Email</legend>
                <input 
                    className={styles.inputs}
                    type="email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    onFocus={()=>setEmailFocus('border-black  text-black')}
                    onBlur={()=>setEmailFocus('border-gray-300')}
                    onInvalid={(e)=>setEmailErrorMsg('Invalid email')}
                    onInput={()=>setEmailErrorMsg('')}
                    required 
                    placeholder='something@gmail.com'/>
            </fieldset>
            <p className={`${styles.error_text}`}>{emailErrorMsg}</p>

            <fieldset className={`transition-all duration-1000 border-2 rounded-lg pl-4 ${passFocus}`}>
                <legend className={`text-sm text-black`}>Password</legend>
                <input 
                    className={styles.inputs}
                    type="password" 
                    value={pass}
                    onChange={(e)=>setPass(e.target.value)}
                    required 
                    minLength='8'
                    onFocus={()=>setPassFocus('border-black text-black')}
                    onBlur={()=>setPassFocus('border-gray-300')}
                    onInvalid={()=>setPassErrorMsg('Invalid password')}
                    onInput={()=>setPassErrorMsg('')}
                    placeholder='minimum length 8'/>
            </fieldset>
            <p className={`${styles.error_text}`}>{passErrorMsg}</p>

            <button
                className='text-white rounded-md h-12 mt-4 bg-blue-950 hover:bg-black' 
                value='submit'
                >Sign up</button>
        </form>
    )
}


export default function Signup(){
    const [confirmed,setConfirmed] = useState(false);
    const [confirmedMail, setConfirmedMail] = useState('');

    return(
        <div className={styles.parent}>
            <div className={`${styles.main_container}`}>
                <Common.Header header_name='Sign up'/>

                <div className={styles.form_parent}>
                    <Common.Direct_Login/>

                    {confirmed && <MailAuthCode mail={confirmedMail}/>}
                    {!confirmed && <SignUpForm setConfirmed={setConfirmed} setConfirmedMail={setConfirmedMail}/>}

                    <Common.LoginOrSignupError msg=''/>

                    <Common.Bottom msg='Already registered?' link='Log in' path='/login'/>
                </div>
            </div>
        </div>
    )
}