import {useHistory} from "react-router-dom";
import PrimeReact from 'primereact/api';
import {createContext,useEffect,useState,useReducer} from 'react'
import {Reducer,PlayState} from "./Utils/Reducer"
import wave from "./Assets/Wavenew.svg"
import Loader from "./Utils/Loader";
import Routes from "./Component/Route/Route"
import NavBar from "./Component/Nav/NavigationBar";
import TopBar from "./Component/Nav/TopBar";
import useApi from "./Utils/useApi";
import './App.css';
export const Context=createContext();
const App=()=>{
  const history=useHistory();
  const [Token,setToken] =useState(null);
  const [State,Dispatch] =useReducer(Reducer,null);
  const [Play,setPlay] =useReducer(PlayState,'');
const {loading,response,error}=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me`,{
  'method':'GET',
  'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")?localStorage.getItem("access_token"):Token}`,
    'Content-Type':'application/json',
   }
});
  
useEffect(()=>{
  const  hash = window.location.hash.substr(1);
 const result=hash.split('&').reduce(function (res, item) {
 const parts = item.split('=');
    res[parts[0]] = parts[1];
    return res;
}, {});
 if(result.access_token){
  localStorage.setItem("access_token",result.access_token);
  setToken(result.access_token)
}

},[])
useEffect(()=>{
    if(!loading && !response && error){
      history.push("/login")
    }
    
  },[error,loading,response,history]);
  PrimeReact.ripple = true;
  PrimeReact.zIndex = {
    modal: 1100,    // dialog, sidebar
    overlay: 1000,  // dropdown, overlaypanel
    menu: 1000,     // overlay menus
    tooltip: 1100 , // tooltip
    toast: 1200     // toast
};
PrimeReact.autoZIndex = true;
PrimeReact.appendTo = 'self'; // Default value is null(document.body 
  return (
<>

  <Context.Provider value={{response,loading,error,State,Dispatch,Play,setPlay}}>
    <div className="App" style={{backgroundImage:`url(${wave})`,height:window.screen.height}}>
      {loading?<Loader height={window.screen.height} width={window.screen.width}  size="100" color="#00ff2f"/>:
      <>
      <div>
        <TopBar/>
        <Routes/>
        <NavBar/>
      </div>
      </>
      }
    </div>
 </Context.Provider>
   
    

  </>
  );
}

export default App;
