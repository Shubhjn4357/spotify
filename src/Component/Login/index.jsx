import {loginUrl} from "../../Utils/Spotify";
import {useEffect} from "react";
import {useHistory} from 'react-router-dom';
import useApi from "../../Utils/useApi";
import "./login.scss";
const Login=()=>{
const history=useHistory();
const {loading,response,error}=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  useEffect(()=>{
    if(!loading && !error && response){
      history.push("/");
    }
  },[error,loading,response,history])

    return (
        <div className="login" style={{height:window.screen.height}}>
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="Spotify-Logo"/>
            <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}
export default Login