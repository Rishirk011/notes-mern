import {create} from 'zustand';
import API_BASE_URL from '../utils/api';
const useAuthStore = create((set)=>({

    token:localStorage.getItem('token') || null,
    loading:false,
    error:null,
    user:JSON.parse(localStorage.getItem('user')) || null,

    signUp:async (name,email,password) => {

        set({loading:true,error:null});

        try{
            
            const response = await fetch(`${API_BASE_URL}users/register`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name,email,password})
            });
            
            if(!response.ok) throw new Error("failed to login");
            
            const data = await response.json();

            localStorage.setItem('token',data.token);
            localStorage.setItem('user',JSON.stringify(data));
            set({user:data, loading:false, error:null, token: data.token});
            return true;

        }
        catch(err){
            set({error:err.message,loading:false});
            return false;
        }
    },

    loginUser:async(email,password)=>{
        
        set({loading:true,error:null});

        try{
            
            const response = await fetch(`${API_BASE_URL}users/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,password})
            });
            
            if(!response.ok) throw new Error("failed to login");
            
            const data = await response.json();
            
            localStorage.setItem('token',data.token);
            localStorage.setItem('user',JSON.stringify(data));
            set({loading:false, error:null, user:data, token:data.token});
            return true;

        }
        
        catch(err){
            set({loading:false, error:err.message});
            return false;
        }

    },
    logOut:() => {
        console.log('b4r', useAuthStore.getState());
        set({user:null,token:null,loading:false});
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('after', useAuthStore.getState());
    }



}));

export default useAuthStore;