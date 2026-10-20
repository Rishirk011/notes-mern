import { create } from "zustand";
import API_BASE_URL from "../utils/api";

const useAppStore = create((set)=>({
    note:[] || null,
    loading:false,
    error:null,
    token: localStorage.getItem('token') || null,

    getNotes:async () => {
        
        set({loading:true, error:null});
        const token = localStorage.getItem('token');
        
        try{
            
            const response = await fetch(`${API_BASE_URL}notes`,{
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });

            if(!response.ok){ throw new Error("failled to fetch the data");
            }

            const data = await response.json();

            set({note:data, loading:false});

        }
        catch(err){
            set({error:err.message, loading:false});
        }
    },

    addNotes: async (title,body,category,image,isPinned) => {

        set({loading:true, error:null});

        try{

            const response = await fetch(`${API_BASE_URL}notes`,{ 
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title,body,category,image,isPinned})
            });

            if(!response.ok) throw new Error("failed to add a new note");

            const data = await response.json();

            set((state)=>({note:[...state.note,data],loading:false}));

        }   

        catch(err){
            set({error:err.message, loading:false});
        }

    },

    putNotes:async (id,title,body,category,image,isPinned) => {
        
        const token = localStorage.getItem('token');
        set({loading: true, error:null});
        try{

            const response = await fetch(`${API_BASE_URL}notes/${id}`,{
                method:'PUT',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({id,title,body,category,image,isPinned})
            })

            if(!response.json) throw new Error("Failed to make the changes");
            
            const data = await response.json();

            set((state)=>({
                loading:false, 
                note:state.note.map((item)=>item.id === id ? data :item)
                }
            ));
            
        }
        catch(err){
            set({loading:false, error: err.message});
        }
        
    },
    deleteNotes:async (id) => {
        
        const token = localStorage.getItem('token');
        set({loading:true,error:null});

        try{
            
            const response = await fetch(`${API_BASE_URL}notes/${id}`,{
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${token}`
                },

            });

            if(!response) throw new Error("failed to delete");
            
            const data = await response.json();

            set((state)=>({
                note:state.note.filter((note)=> note.id != id),
                loading:false
            }));


        }
        catch(err){
            set({loading:false, error:err.message});
        }
    }

}));

export default useAppStore;