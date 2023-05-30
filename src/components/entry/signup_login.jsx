import { useState } from 'react';
import styles from './signup_login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookF, faGoogle} from '@fortawesome/free-brands-svg-icons';

export default function Signup_login(){
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    const [emailFocus,setEmailFocus] = useState('tranborder-gray-300');
    const [passFocus, setPassFocus] = useState('border-gray-300');

    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passErrorMsg,setPassErrorMsg] = useState('');

    return(
        <div className={styles.parent}>
            <div className={styles.main_container}>
                <div className={styles.sign_in_text}>
                    Sign in
                </div>

                <div className={styles.form_parent}>
                    <div className={styles.direct_login}>
                        {/* sign in with direct email or password */}
                        <button className={`${styles.direct_login_btn} text-white`} style={{backgroundColor:'#001253'}}>
                            <FontAwesomeIcon icon={faFacebookF} size="2x"/>
                            <p>acebook</p></button>
                        <button className={`${styles.direct_login_btn} text-white`} style={{backgroundColor:'#E14D2A'}}>
                            <FontAwesomeIcon icon={faGoogle} size="2x"/>
                            <p>oogle</p></button>
                    </div>

                    <form className={styles.login_form}>

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
                            >Sign in</button>
                    </form>

                    <div className='text-center mt-3 flex justify-center items-center gap-2'>
                        Don't have an account? 
                        <p className='text-blue-600 hover:cursor-pointer'>sign up</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}