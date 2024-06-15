import { useEffect, useState } from "react";
import axios from 'axios'

const useAxiosFetch = (dataUrl)=>{
    const [data, setData] = useState([])
    const [fectchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        let isMounted= true; 
        const source = axios.CancelToken.source();
        const fetchData = async (url)=>{
            setIsLoading(true)
            try{
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if(isMounted){
                    setData(response.data);
                    setFetchError(null)
                }
            }catch(err){
                if (isMounted){
                    setFetchError(err.message)
                    setData([]);
                }
            }finally{
                isMounted && setIsLoading(false)
                
            }
            const cleanUp=()=>{
               
               isMounted = false;
               source.cancel();
            }
            return cleanUp

        }
        fetchData(dataUrl)
    }, [dataUrl])



    return{data, fectchError, isLoading}

}
export default useAxiosFetch