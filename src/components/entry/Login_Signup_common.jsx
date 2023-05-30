import styles from './signup_login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookF, faGoogle} from '@fortawesome/free-brands-svg-icons';

function Header({header_name}){
    return(
        <div className={styles.sign_in_text}>
            {header_name}
        </div>
    )
}

function Direct_Login(){
    return(
        <div className={styles.direct_login}>
            {/* sign in with direct email or password */}
            <button className={`${styles.direct_login_btn} text-white`} style={{backgroundColor:'#001253'}}>
                <FontAwesomeIcon icon={faFacebookF} size="2x"/>
                <p>acebook</p></button>
            <button className={`${styles.direct_login_btn} text-white`} style={{backgroundColor:'#E14D2A'}}>
                <FontAwesomeIcon icon={faGoogle} size="2x"/>
                <p>oogle</p></button>
        </div>
    )

}

function Bottom({msg,link}){
    return(
        <div className='text-center mt-3 flex justify-center items-center gap-2'>
            {msg} 
            <p className='text-blue-600 hover:cursor-pointer'>{link}</p>
        </div>
    )
}

function LoginOrSignupError({msg}){
    return(
        <p className='text-sm text-center  text-red-600' style={{fontWeight:'bold',fontSize:'13px'}}>{msg}</p>
    )
}

const Obj = {
    Header,
    Direct_Login,
    Bottom,
    LoginOrSignupError
}

export default Obj;