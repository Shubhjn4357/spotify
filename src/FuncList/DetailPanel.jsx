import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../App";
const DetailPanel=(props)=>{
  const {State} =useContext(Context);
  const Like=async(e)=>{
    console.log(State)
  try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/${State.type?State.type:State.track?State.track.type:State.album.type}s?ids=${State.id?State.id:State.track?State.track.id:State.album.id}`,{
    'method':'PUT',
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
    }
  })
   if(res.ok){
     window.alert('Added to Your library');
     window.location.reload();
   }
  }
  catch(err){
    console.log(err)
  }
}
const Rem=async(e)=>{
  try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/${State.type?State.type:State.track?State.track.type:State.album.type}s?ids=${State.id?State.id:State.track?State.track.id:State.album.id}`,{
    'method':'DELETE',
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
    }
  })
   if(res.ok){
     window.alert('Removed from Your library');
     window.location.reload();
   }
  }
  catch(err){
    console.log(err)
  }
}
  const itemList=[
    {
      to:"#",
      clName:"pi pi-heart text-pink-600",
      name:"Like",
      func:(e)=>{
        Like(e);
      }
    },
    {
      to:"#",
      clName:"pi pi-minus-circle text-orange-600",
      name:"Remove from Library",
      func:(e)=>{
        Rem(e);
      }
    },
    {
      to:State?`/detail/${State.type?State.type:State.track?State.track.type:State.album.type}/${State.id?State.id:State.track?State.track.id:State.album.id}`:'#',
      clName:"pi pi-file-o text-pink-900",
      name:State?`View ${State.type?State.type:State.track?State.track.type:State.album.type} `:'',
      func:(e)=>{
        console.log(State)
      }
    },
    {
      to:"#",
      clName:"pi pi-share-alt text-purple-600",
      name:"Share",
      func:async(e)=>{
        try{
          const Link=window.location.href;
          await navigator.share({url:Link})
        }
        catch(error){
          console.log(error)
        }

      }
    },
    ]
   return(
    <Dialog maximized  dismissableMask maximizable visible={props.overlay} onHide={()=>props.on(!props.overlay)} className=""> 
     {State?
     <div>
     <div className="grid">
      <div id="scrollContainer" className="col">
      <div className="d-center flex-column">
      {State.images?
          <div className="screen-block">
            <img src={State.images[0]?State.images[0].url:''} alt={State.name}/>
          </div>
      :
      <div></div>}
      {State.track?
          <div className="screen-block">
            <img src={State.track.album.images[0]?State.track.album.images[0].url:''} alt={State.name}/>
          </div>
      :
      <div></div>}
      {State.album?
          <div className="screen-block">
            <img src={State.album.images[0]?State.album.images[0].url:''} alt={State.name}/>
          </div>
      :
      <div></div>}
          <div className="text-500 text-4xl p-2">{State.name}</div>
      </div>
     
      <div className="py-2 block">
        <ul className="options">
        {itemList.map((v,i)=>{
          return <NavLink key={i} to={v.to} className="no-underline">
          <li className="item text-400" onClick={(e)=>v.func(e)}>
            <Button className="w-full bg-transparent text-300" icon={`p-2 ${v.clName}`} label={v.name} onClick={()=>props.on(!props.overlay)}/>
          </li>
          </NavLink>
        })}
        </ul>
      </div>
     </div>
     </div>

     
     
     </div>:<div>No Data Available</div>}
    </Dialog>
     ) 
  }
export default DetailPanel;