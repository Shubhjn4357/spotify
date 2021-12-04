import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import useApi from "../../Utils/useApi";
import {Skeleton} from "primereact/skeleton";
import {NavLink,useParams} from 'react-router-dom';
const Artist=()=>{
  const {id}=useParams();
  const {response,loading}=useApi(`${process.env.REACT_APP_SPOTIFY_URL}artists/${id}`,{
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  const followed=useApi(`${process.env.REACT_APP_SPOTIFY_URL}me/following/contains?type=artist&ids=${id}`,{
    'method':'GET',
    'headers':{
    'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
    'Content-Type':'application/json',
   }
  });
  const HandleFollow=async(i,follow)=>{
        const Res=await fetch(`${process.env.REACT_APP_SPOTIFY_URL}me/following?ids=${i}&type=artist`,{
        'method':follow?'DELETE':'PUT',
        'headers':{
        'Authorization':`Bearer ${localStorage.getItem("access_token")}`,
        'Content-Type':'application/json',
       }
        })
      if(Res.ok){
         window.alert(follow?'Item Removed':'followed')
         window.location.reload()
         
       }  
  }
  const Items=[
    {
      id:1,
      label:'Popularity',
      data:response?`${response.popularity} 🌟`:'',
      icon:'pi pi-book',
      link:'#'
    },
    {
      id:2,
      label:'followers',
      data:response?response.followers.total:'',
      icon:'pi pi-users',
      link:'#'
    },
    {
      id:3,
      label:'Type',
      data:response?response.type:'',
      icon:'pi pi-user-plus',
      link:'#'
    },
    
    ]
   
  return (
    <>
      {loading?<Skeleton className=" mx-2" width="100%" height="100%" borderRadius="16px"/>:
      !response?<div className="text-300">error</div>:
      <div className="container">
        <div className="p-3 grid">
          <div className="col-12 md:col-6 d-center">
            {response.images?<Avatar image={response.images[0]?response.images[0].url:'https://picsum.photos/200/200'} 
                                     imageAlt={response.name[0].toUpperCase()} 
                                     shape="circle"
                                     style={{width:"12rem",height:'12rem'}}/>:
              <div></div>
            }
          </div>
          <div className="col-12 md:col-6 d-center flex-column">
            <div className="name text-600 p-2">{response.name[0].toUpperCase()+response.name.slice(1)}</div>
            {followed.response?<Button className="bg-transparent text-200 border-green-500 border-1" label={followed.response[0]?'Unfollow':'Follow'} onClick={()=>HandleFollow(id,followed.response[0])}/>:<div></div>}
            <div className="flex justify-content-around align-items-center border-bottom-2 border-white my-2 my-2">
              {Items.map((i)=>{
                return <Button className="bg-transparent flex-column" key={i.id}>
                <NavLink className="text-500" style={{textDecoration:'none'}} to={i.link}>
                <div className="d-center">
                  <i className={`${i.icon} mx-1`}/>
                  <div className="">{i.label}</div>
                </div>
                <span className="p-1">{i.data}</span>
                </NavLink>
                </Button>
              })}
            </div>
          </div>
        </div>
      </div>
      }
    </>
    )
}
export default Artist;