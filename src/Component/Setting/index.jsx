import {useContext} from "react";
import {NavLink,useHistory} from 'react-router-dom';
import {Context} from "../../App";
import {Skeleton} from "primereact/skeleton";
import {Button} from "primereact/button";

import './set.scss';
const Setting=()=>{
  const history=useHistory();
  const {response,loading,error} =useContext(Context);
  const listItem=[
    {
      label:'Account',
      des:response?response.email:'email',
      icon:'pi pi-slack',
      link:'#',
    },
    {
      label:'PlayList',
      icon:'pi pi-book',
      link:'/me/playlist',
    },
    {
      label:'Saved',
      icon:'pi pi-heart',
      link:'/saved',
    },
    {
      seprater:true
    },
    {
      label:'About',
      icon:'pi pi-info-circle',
      link:'/about',
    },
    {
      label:'Log out',
      icon:'pi pi-power-off',
      link:'#',
      command:()=>{
        localStorage.clear();
        document.cookies="";
        history.push('/');
        window.location.reload();
      }
    },
    ]
  return (
    <>
    {loading?<Skeleton className=" mx-2" width="100%" height="100%" borderRadius="16px"/>:
    response?<div className="container">
      <Button className='img-container bg-transparent'>
        <NavLink to='/me'><img src={response.images[0]?response.images[0].url:'https://picsum.photos/200/200'} alt='Dp'/>
          <span>
            <div>{response.display_name}</div>
            <div className="border-1 border-round text-200 text-xs" >
              view profile
            </div>
          </span>
        </NavLink>
       </Button>
      <ul className="list-item">
        {listItem.map((i,id)=>{
        if(i.seprater){
          return <li key={id}><hr className="text-300"/></li>
        }
        return <li key={id} onClick={i.command}>
          <NavLink to={i.link}>
            <i className={i.icon}/>
            <span>
              <div className="p-2">{i.label}</div>
              <div className="text-sm text-200 p-1">{i.des}</div>
            </span>
          </NavLink>
        </li>
        })}
      </ul>
    </div>:<div></div>
    }
    {error?<div className="text-300">error</div>:<div></div>}

    </>
    )
}
export default Setting;