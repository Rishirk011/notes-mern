import {Routes, Route, Outlet, Navigate} from 'react-router-dom';
import AppLayout from './layouts/appLayout/AppLayout';
import AuthLayout from './layouts/authLayout/AuthLayout';
import SignUp from './pages/auth/signup/SignUp';
import Login from './pages/auth/login/Login';
import Home from './pages/dashboard/home/Home';
import Notes from './pages/dashboard/Notes';
import useAuthStore from './store/AuthStore';


function IsLoggedIn(){

  const token = useAuthStore();

  return token ? <Outlet/> :<Navigate to={'/Login'} replace/>;

}

const App = () => {  

  return <> 
    
    <Routes>
      
      <Route  element={<AuthLayout/>}>
          
        <Route path='/Login' element={<Login/>}/>
        
        <Route path='/Signup' element={<SignUp/>}/>

      </Route>  

      <Route element={<IsLoggedIn/>}>

          <Route element={<AppLayout/>}>
            
            <Route index element={<Home/>}/>
            <Route path='/notes' element={<Notes/>}/>

          </Route>

      </Route>
    
    </Routes>  
  
  </>

}



export default App;