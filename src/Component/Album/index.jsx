import {useEffect,useState,useContext} from "react";
import {useParams,useHistory} from "react-router-dom"
import useApi from "../../Utils/useApi";
import ListItem from "../../Utils/ListItem";
import {Skeleton} from "primereact/skeleton"
import {Button} from "primereact/button"
import DetailPanel from "../../FuncList/DetailPanel"
import {Context} from "../../App";
const Album=()=>{
  const history=useHistory();
  const {State,Dispatch} =useContext(Context)
  
  const {id}=useParams();
  const [Toggle,setToggle] =useState(false);
  const [isShrunk, setShrunk] = useState(false);
  const {loading,response,error}=useApi(`${process.env.REACT_APP_SPOTIFY_URL}albums/${id}`,{
    
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
const Saved=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/albums/contains?ids=${response?response.id:''}`,{
    'method':'GET', 
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });

  const Like=async(e)=>{
  try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/albums?ids=${e.id}`,{
    'method':Saved.response[0]?'DELETE':'PUT', 
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
    }
  })
  if(res.status===200){
    window.alert(Saved.response[0]?'Removed from library':'saved to Your library');
    window.location.reload();
  }
  
  }
  catch(err){
    console.log(err)
}
}
  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 150 ||
            document.documentElement.scrollTop > 150)
        ) {
          return true;
        }

        if (
          isShrunk &&
          document.body.scrollTop < 150 &&
          document.documentElement.scrollTop < 150
        ) {
          return false;
        }

        return isShrunk;
      });
    };

    // Previous logic.
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  
  const HandleToggle=(e)=>{
  setToggle(!Toggle)
  return Dispatch({type:'User',payload:e})
}
  useEffect(()=>{
    if(!loading && !response && error){
      history.push("/login");
    }
  },[error,loading,response,history])

  return(
    <>
  {response?
  <div className="grid grid-nogutter">
      <div className="col-12 d-center my-2">
    <DetailPanel data={State} overlay={Toggle} on={setToggle}/>
        {loading?<Skeleton className="" width="9rem" height="9rem" borderRadius="1rem" />
        :
        response.images?<div className={`screen-block ${isShrunk?'shrink':''}`}>
          <img src={response.images[0].url} alt={response.name}/>
        </div>
        :
        <div className={`screen-block ${isShrunk?'shrink':''}`}>
          error
        </div>
        }
      </div>
      <div className="col-12 my-2">
        {loading?<Skeleton className="" width="100%" height="4rem" borderRadius="1rem" />
        :
        <div className="head-name text-500">{response.name}</div>
        }
      </div>
      <div className="col-12 my-2">
        {loading?<Skeleton className="" width="100%" height="4rem" borderRadius="1rem" />
        :
        response.artists?
        <div className="artists d-center text-200">
        Artists-by:
          {response.artists.map((v)=>{
            return <div key={v.id} className="text-500 fs-sm">{v.name},</div>
          })}
        </div>:<div></div>
        }
      </div>
      <div className="col-12 my-2">
        {loading?<Skeleton className="" width="100%" height="4rem" borderRadius="1rem" />
        :
        response.copyrights?
        <div className="artists text-200">
        copyright:
        <div className="text-500 text-sm">{response.copyrights[0].text}</div>
         
        </div>:<div></div>
        }
      </div>
<div className="col-12 my-2">
        {loading?<Skeleton className="" width="10rem" height="4rem" borderRadius="1rem" />
        :
        <div className="options flex text-200">
          {!Saved.response?<div></div>:<Button className="p-button-danger p-button-text p-2" onClick={()=>Like(response)}icon={`${Saved.response[0]?"fas":'far'} fa-heart`}/>}
          <Button className="p-button-warning p-button-text p-2" onClick={()=>HandleToggle(response)} icon="pi pi-ellipsis-v "/>
        </div>
        }
      </div>
<div className="col-12 my">
        {loading?<Skeleton className="" width="10rem" height="4rem" borderRadius="1rem" />
        :
        response.tracks?
        <div className="songslist block text-200">
         <ListItem data={response.tracks} options={HandleToggle}/>
        </div>:<div>error</div>
        }
      </div>   
   
   
   
    </div>
      :
      <div>error</div>
    }
    
    </>
    )
}
export default Album;