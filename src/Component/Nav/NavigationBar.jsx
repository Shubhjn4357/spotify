
import {useHistory} from "react-router-dom";
import Player from "../../Utils/Player";
//import {Button} from "primereact/button"
import {Dock} from "primereact/dock"
import {Context} from "../../App"
import {useContext} from "react"; 
import "./nav.css";
const NavBar=()=>{
  const history=useHistory();
  const {response} =useContext(Context);
 // window.location.reload(false)
  const ItemList=[
        {
            label: 'Home',
            icon: () => <i className="pi pi-home"/>,
            command:()=>{
              history.push("/")
            }
        },
        {
            label: 'Search',
            icon: () =><i className="pi pi-search"/>,
            command:()=>{
              history.push("/search")
            }
        },
        {
            label: 'Your Library',
            icon: () =><i className="pi pi-book"/>,
            command:()=>{
              history.push("/library")
            }
        },
        {
            label: 'Setting',
            icon: () => <i className="pi pi-briefcase"/>,
            command:()=>{
              history.push("/setting")
            }
        }
   
    ]
  return(
    <>
    {response?
    <>
    <Player/>
    <Dock model={ItemList} className="block" position='bottom'/>
   </>
    :
    <div></div>}
    </>
    )
}
export default NavBar;