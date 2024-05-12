
import './App.css';
import React, { useEffect, useState } from 'react'

function App() {

  const [newtitle,setnewtitle] = useState('')
  const [newdescription,setnewdescription] = useState('')
  const [alltodos,setalltodos] = useState([])
  const [isCompleteScreen,setisCompleteScreen] = useState(false)
  const [completedtodos,setcompletedtodos] = useState([])
  

  const handlecompletedtask =(index) =>{
           let now = new Date();
           
           let mm = now.getMonth()+1;
           let yyyy = now.getFullYear();
           let h = now.getHours();
           let m = now.getMinutes();
           let s = now.getSeconds();
           let completedOn = ""+now+"/"+mm+"/"+yyyy+" at "+h+":"+m+":"+s;

          
           let filterditem = {
              ...alltodos[index],
              completedOn:completedOn,

           }
           let updatedcompltedarray = [...completedtodos];
           updatedcompltedarray.push(filterditem)
           setcompletedtodos(updatedcompltedarray)
           alltodos.splice(index,1)
           setalltodos(alltodos)


  }

  const DeletecompltedTask = (index) =>{
       const updatedCompletedTodos = [...completedtodos];
       updatedCompletedTodos.splice(index, 1);
       setcompletedtodos(updatedCompletedTodos);
       
  }

 
  const handletodoitem =()=>{
     if (newtitle.trim()!=='' && newdescription.trim()!==''){
       let newtodoitem = {
        title:newtitle,
        description:newdescription
     }
       let updatedtodolist = [...alltodos]
       updatedtodolist.push(newtodoitem)
       setalltodos(updatedtodolist)
       localStorage.setItem('todo-list',JSON.stringify(updatedtodolist))
       setnewtitle('')
       setnewdescription('')
       
  }
     else{
     window.alert('please fill the title and description')
     }
  }


  const handleDeleteTask = (index) => {
       const updatedList = alltodos.filter((_, i) => i !== index);
       setalltodos(updatedList);
       localStorage.setItem('todo-list', JSON.stringify(updatedList));
  }

  

   useEffect(()=>{
       let savetodo  = JSON.parse(localStorage.getItem('todo-list'))
       if(savetodo){
        setalltodos(savetodo)
     }
   },[])


  return (
    <div className='Home'>
    <h1>My TO DO List</h1>
    <div className='todo-wrapper'>
       <div className='todo-input'>
        <div className='todo-input-item'>
          <label>Title</label>
          <input type='text' placeholder='Enter the title' value={newtitle} onChange={(e) => setnewtitle(e.target.value)} />
        </div>
        <div className='todo-input-item'>
          <label>Description</label>
          <input type='text' placeholder='Enter the Description' value={newdescription} onChange={(e)=> setnewdescription(e.target.value)}  />
       </div>
       <div className='todo-input-item'>
          <button className='primary-btn'onClick={handletodoitem}>Add</button>
        </div>
       </div>
    

    <div className='btn-area'>
        <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={()=> setisCompleteScreen(false)}>To Do Tasks</button>
        <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={()=> setisCompleteScreen(true)}>Completed Tasks</button>
    </div>

    <div className='todo-list'>
       
       {isCompleteScreen===false && (alltodos.length === 0 ? <h4>No Tasks to show</h4> : alltodos.map((item,index)=>{
          
          return(
             <div className='todo-list-item' key={index}>

                <div>
                   <h3>{item.title}</h3>
                   <p>{item.description}</p>  
                </div>

                <div>
                   <button onClick={() => handleDeleteTask(index)}>Delete</button>
                   <button onClick={() => handlecompletedtask(index)}>Done</button>                       
               </div>

             </div>
             
          )
     }))}
      
       {isCompleteScreen===true && (completedtodos.length ===0?<h4>No completed tasks to show</h4> : completedtodos.map((item,index)=>{
          return(
             <div className='todo-list-item' key={index}>
                <div>
                   <h3>{item.title}</h3>
                   <p>{item.description}</p>  
                   <h6>Completed on : {item.completedOn}</h6>
                </div>

                <div>
                   <button onClick={()=> DeletecompltedTask(index)}>Delete</button>                
               </div>

             </div>
          )
     }))}
    </div>
 </div>
 </div>


  );
}

export default App;
