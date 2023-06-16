import { useState } from 'react';
import styles from './signup_login.module.css';
import Common from './Login_Signup_common';
import loginPost from '../../helpers/loginPost';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import LoadingModal from '../modals/LoadingModals';

export default function Login(){
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    const [emailFocus,setEmailFocus] = useState('tranborder-gray-300');
    const [passFocus, setPassFocus] = useState('border-gray-300');

    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passErrorMsg,setPassErrorMsg] = useState('');

    const [loading, setLoading] = useState(false);
    const contextValue = useContext(AuthContext);
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();

        setLoading(true);
        const clearence = await loginPost(email,pass);
        setLoading(false);

        if(clearence){
            localStorage.setItem('token',clearence.token);
            console.log(clearence);
            contextValue.setAuth(true);

            //navigate directly home page
            navigate('/home')
        }else{
            alert('Login faild');
        }
    }

    return(
        <div className={styles.parent}>
            <div className={styles.main_container}>
                <Common.Header header_name='Sign in'/>

                <div className={styles.form_parent}>
                    
                    <Common.Direct_Login />

                    <form className={styles.login_form} onSubmit={(e)=>submitHandler(e)}>

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

                    <Common.Bottom msg="Don't have an account?" link='Sign up' path='/signup'/>
                </div>

                <LoadingModal open={loading}>
                    <div className="p-5 text-3xl text-white rounded-lg bg-bluish">
                        <FontAwesomeIcon icon={faSpinner} spin/>
                    </div>
                </LoadingModal>
                
            </div>
        </div>
    )
}