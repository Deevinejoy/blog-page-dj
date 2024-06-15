import { useState, useEffect } from "react";
const useWindowSize = () =>{
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });
    useEffect(()=>{
        const hanldeResize=()=>{
     
        
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight

        })
    }
    hanldeResize()
   
    window.addEventListener('resize', hanldeResize)
        
    
   
    const cleanUp=()=>{
        //to avoid memeory leak by removing the event listener
        window.removeEventListener('resize', hanldeResize)
    }
    return cleanUp
    }, [])
   return windowSize   
}

export default useWindowSize;