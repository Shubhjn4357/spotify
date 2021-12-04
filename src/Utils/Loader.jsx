import UseAnimations from "react-useanimations"
import Loading from "react-useanimations/lib/loading3"
const Loader=(props)=>{
  return (
    <div style={{width:props.width?props.width:'100%',height:props.height?props.height:'100%'}} className={`d-center ${props.className?props.className:""}`}>
    <UseAnimations animation={Loading} size={props.size?props.size:'inherit'} strokeColor={props.color?props.color:"#ffb600"}/>
    </div>
    )
}
export default Loader;