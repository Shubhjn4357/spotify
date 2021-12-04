import {useState,useEffect} from "react"
const useApi=(url,method)=>{
  const[loading,setloading]=useState(false)
  const[response,setResponse]=useState(null)
  const[error,setError]=useState(null)
  useEffect(()=>{
    setloading(true)
    const getData=async()=>{
     try{
      const res=await fetch(url,method);
      const JSON=await res.json();
      setloading(false)
      if(JSON.error){
        return setError(JSON)
      }
      return setResponse(JSON)
     }
     catch(error){
      setloading(false)
     return  setError(error)
     }
    }
    getData()
    return()=>{
      setloading(false)
    }
  },[url])
  return {loading,response,error}
}
export default useApi;