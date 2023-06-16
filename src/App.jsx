import './App.css';
import { BrowserRouter,Routes,Route, Navigate,useLocation } from 'react-router-dom';
import Login from './components/entry/Login';
import Signup from './components/entry/Signup';
import LandingPage from './components/landing/LandingPage';
import Home from './components/home/Home';
import SideBar from './components/home/SideBar';
import Profile from './components/profiles/Profile';
import UserProfile from './components/profiles/details/UserProfile';
import UserQuestions from './components/profiles/details/UserQuestions';
import UserAnswers from './components/profiles/details/UserAnswers';
import UserSetting from './components/profiles/details/UserSetting';
import DetailedQuestionsWithAnswers from './components/posts/DetailedQuestionsWithAnswers';
import Unsolved from './components/posts/Unsolved';
import { useState } from 'react';
import AuthContext from './contexts/AuthContext';
import { useEffect } from 'react';

function App() {
    const [auth,setAuth] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        console.log(token,auth)
        token ? setAuth(true) : setAuth(false);
    },[])

    return (
            <AuthContext.Provider value={{auth,setAuth}}>
                <BrowserRouter>
                        <Routes>
                            <Route path='/' element={auth ? <Navigate to='/home'/> : <Navigate to='/login'/>}/>

                            <Route path='/login' element={!auth ? <Login/> : <Navigate to='/home'/>}/>
                            <Route path='/signup' element={!auth ? <Signup/> : <Navigate to='/home'/>}/>

                            <Route path='/*' element={auth ? <LandingPage/> : <div>error! please login</div>}>
                                <Route path="home" element={<Home/>}/>
                                <Route path="list" element={<SideBar small={true} />}/>
                                <Route path="unsolved" element={<Unsolved/>}/>
                                <Route path="questions" element={<DetailedQuestionsWithAnswers/>}/>

                                <Route path="accounts/*" element={<Profile/>}>
                                    <Route index element={<Navigate to ='profile' replace/>}/>

                                    <Route path='profile' element={<UserProfile/>}/>
                                    <Route path='questions' element={<UserQuestions/>}/>
                                    <Route path='answers' element={<UserAnswers/>}/>
                                    <Route path='setting' element={<UserSetting/>}/>
                                </Route>

                            </Route>
                        </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
    )
}

export default App;
