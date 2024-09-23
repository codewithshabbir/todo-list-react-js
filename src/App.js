import './App.css';
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState } from 'react';

function App() {
  document.title = 'Todo List';
  
  const [todoItem, setTodoItem] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showCompleted, setshowCompleted] = useState(false);

  const todoAddOrUpdate = (event) => {
    event.preventDefault();

    if(editId){
      const updateItems = todoItems.map(item => {
        return item.id === editId ? {...item, todoItem} : item;
      })
      setTodoItems(updateItems);
      setEditId(null);
    }else {
      setTodoItems([...todoItems, {id: Math.random().toString(16).slice(2) ,todoItem, isChecked: false}]);
    }
    setTodoItem("");
  }

  const todoEdit = (id) => {  
    let todoEditItem = todoItems.filter(item => item.id === id);
    setTodoItem(todoEditItem[0].todoItem);
    setEditId(id);
  }

  const todoDelete = (id) => {
    let deleteTodosItem = todoItems.filter(item => {
      return item.id !== id;
    })
    setTodoItems(deleteTodosItem);
  }

  const todoChange = (event) => {
    setTodoItem(event.target.value);
  }

  const todoCheck = (id) => {
    const updatedTodos = todoItems.map(item => 
      item.id === id ? { ...item, isChecked: item.isChecked === true ? false : true } : item
    );
    setTodoItems(updatedTodos);
  }

  const showCompleteTodo = () => {
    setshowCompleted(prev => !prev);
  }

  const deleteAllTodos = () => {
    setTodoItems([]);
  }

  const displayTodos = showCompleted ? todoItems.filter(item => item.isChecked) : todoItems;


  return (
   <div >
      <div className='container'>
        <div className='todo-wrapper'>
          <h1>Get Things Done!</h1>
          <div className='input-fields-wrapper'>
            <input onChange={todoChange} value={todoItem} id='todo-input' type="text" placeholder='Enter your todo here...'/>
            <input type='submit' onClick={todoAddOrUpdate} id='todo-btn' value={editId ? 'Update Todo' : 'Add Todo'}/>
          </div>
          <div className='todo-header'>
            <div>
              <input type="checkbox" onChange={showCompleteTodo} checked={showCompleted} name="" id="showComp" /> <label htmlFor="showComp">Show Completed</label>
            </div>
            <button onClick={deleteAllTodos} disabled={todoItems.length === 0 ? 'disabled': ''}>Delete All</button>
          </div>
          { 
          displayTodos.length === 0 ? 
          (<div className='my-item' style={{ justifyContent: "center" }}>
              <p>No Todos Found</p>
            </div>      
               ):(
            displayTodos.map((item) => {
            return <div key={item.id} className='my-item'>
                    <div>
                      <input id={item.id} type="checkbox" checked={item.isChecked} onChange={() => todoCheck(item.id)} name="" />
                      <label htmlFor={item.id} style={{ textDecoration: item.isChecked === true ? 'line-through' : 'none' }}>{item.todoItem}</label>
                    </div>
                    <div>
                      <FaRegEdit onClick={() => todoEdit(item.id)} className='icon'/>
                      <MdDeleteForever onClick={() => todoDelete(item.id)} className='icon'/>
                    </div>
                  </div>;
            }))
          }
        </div>
      </div>
   </div>
  );
}

export default App;
