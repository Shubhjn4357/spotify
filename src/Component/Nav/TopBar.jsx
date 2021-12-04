import { TabMenu } from 'primereact/tabmenu';
//import { Button} from 'primereact/button';
import {useState,useContext} from "react"; 
import {useHistory} from "react-router-dom";
import {Context} from "../../App"
const TopBar=(props)=>{
  const history=useHistory();
  const [activeIndex,setActiveIndex]=useState(0);
  const {response} =useContext(Context);
  const ItemList=[
    {
      label:`welcome ${props.data?props.data.display_name:''}`,
      icon:"pi pi-slack",
      command:()=>{
        history.push("/");
      }
    },
    {
      label:"",
      icon:"pi pi-user",
      items:[
        {
          label:"",
          icon:"pi pi-search",
          command:(e)=>{
            history.push('/search');
          }
        },
        {
          label:"",
          icon:"pi pi-user",
          command:(e)=>{
            history.push('/me');
          }
        },
        ],
      command:(e)=>{
        history.push('/me');
      }
    },
    ]
 const footer=()=>{
   return(
     <i className="pi pi-search" onClick={()=>{history.push('/search')}}/>
     )
 }
  return (
    <>
   {response?
    <TabMenu className="justify-content-between" footer={footer} model={ItemList} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}/>
    :<div></div>}
    </>
    )
}
export default TopBar;