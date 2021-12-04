import {Avatar} from 'primereact/avatar';
const About=()=>{
  const skill=[
    'javscript','Css3','Scss','Typescript',
    'NodeJs','React','Basic Python','Mern Stack',
    
    ]
  return (<>
  <div className="container">
    <div className="grid">
      <div className="col-12 md:col-6 p-2 my-2">
        <Avatar image="https://picsum.photos/200/200" 
                altText='Anomyous'
                shape="circle"
                style={{width:"10rem",height:'10rem'}}/>
        <div className="my-2">
          <div className="p-2 text-500">Shubh Jain</div>
          <div className="p-2 text-xs text-300">React Devloper</div>
        </div>         
      </div>
      <div className="col-12 md:col-6 p-2 d-center">

        <div className="container">
        <div className="text-center text-green-500 p-2"> Skills </div>
          <ul className="bg-black-alpha-70">
          {skill.map((i,v)=>{
            return <li key={v} className="text-400 no-underline p-1 px-3 text-center">{i}</li>
          })}
          </ul>
        </div>
      </div>
      <div className="text-200 text-wrap">Sorry for Bad presentation i have limited resources and I design & code on my smartphone,so Hope u like it☺️</div>
    </div>
  </div>
  </>)
}
export default About;