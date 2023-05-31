import './App.css'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import Login from './components/entry/Login'
import Signup from './components/entry/Signup'
import LandingPage from './components/landing/LandingPage'


function App() {

  return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/login'/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/home' element={<LandingPage/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default App;
