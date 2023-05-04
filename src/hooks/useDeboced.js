import { useState,useEffect } from "react";


function useDeboced(value,delay){
    const [deboced,setDeboced]=useState(value)
    useEffect(()=>{
       const handle= setTimeout(()=>{
             setDeboced(value)   
        },delay)
        return ()=> clearTimeout(handle)
        
    },[value])
    return deboced;
}


export default useDeboced;