import {useState,useEffect,useContext} from "react"
//import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import {TabView,TabPanel } from 'primereact/tabview';
import {AlbumList,ArtistList,TrackList,PlayList} from "../../Utils/ListItem";
import DetailPanel from "../../FuncList/DetailPanel"
import {Context} from "../../App";
const NavSearch=()=>{
  const [query,setQuery] =useState("");
  const [active,setActive]=useState(0);
  const [activeIndex,setActiveIndex]=useState(0);
  const [Data,setData]=useState({})
  const [Toggle,setToggle] =useState(false);
  const {Dispatch} =useContext(Context)

  useEffect(()=>{
    const GetQ=async()=>{
      try{
        const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}search?q=${query}&type=track,album,artist,playlist`,{
          'method':'GET',
          'headers':{
          'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type':'application/json',
         }
        })
        const result=await res.json();
        setData(result);
      }
      catch(err){
        console.log(err);
      }
    }
    GetQ();
    return ()=>{
     setData({}) 
    }
  },[query])
  const Like=async(e,type)=>{
  try{
    const res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/${type}?ids=${e.id}`,{
    'method':'PUT',
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
    }
  })
   if(res.status===200){
     window.alert('liked');
   }
  }
  catch(err){
    console.log(err)
  }
}

 const HandleToggle=(e)=>{
  setToggle(!Toggle)
  return Dispatch({type:'User',payload:e})
}
 const Template=(item)=>{
  if(!item){
       return <div className="text-700">no data available</div>
   }
  if(item.type==='artist'){
    return  <ArtistList data={item} like={Like} options={HandleToggle}/>
  }
  else if(item.type==='album'){
    return <AlbumList data={item} like={Like} options={HandleToggle}/>
  }
  else if(item.type==='track'){
     return  <TrackList data={item} like={Like} options={HandleToggle}/>
   }
 else if(item.type==='playlist'){
     return  <PlayList data={item} like={Like} options={HandleToggle}/>
   }
 }
 
 return(
   <>
<form onSubmit={(e)=>{e.stopPropagation();e.preventDefault(); setQuery('');}} className="p-3 py-4 searchBar w-full d-center fadeoutup fadeinup z-5">
  <div className="field icon-right">
     <i className="pi pi-search"></i>
    <input id="in" type="text" placeholder="Find Your tune" className={`Entry w-full ${query?'valid':'invalid'}`} onChange={(e)=>{setQuery((e.target.value)?e.target.value:"")}} value={query} required/>
    <label className="entry-label" htmlFor="in">Search...</label>
  </div>
</form>
<DetailPanel overlay={Toggle} on={setToggle}/>
<div className="w-full overflow-scroll">
<TabView activeIndex={active} onTabChange={(e) => setActive(e.index)} renderActiveOnly>
   {Object.keys(Data).map((v,k)=>{
   if(v==='error'){
     return <TabPanel key={k} header={'no data available'}/>
   }
     return (
  <TabPanel key={k} header={v}>
   <DataView value={Data[v].items}
             itemTemplate={Template} 
             paginator 
             first={activeIndex}
             onPage={(e)=>setActiveIndex(e.first)} 
             rows={10}/>
   </TabPanel>
 )
   
   })}
</TabView>
</div>
  </>)
}
export default NavSearch;