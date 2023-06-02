import './App.css';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
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

function App() {
    const auth = true;

    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={auth ? <Navigate to='/home'/> : <Navigate to='/login'/>}/>

                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>

                    <Route path='/*' element={<LandingPage/>}>
                        <Route path="home" element={<Home/>}/>
                        <Route path="list" element={<SideBar small={true} />}/>
                        <Route path="unsolved" element={null}/>

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
    )
}

export default App;
