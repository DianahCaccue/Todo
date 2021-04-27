import React, { useState,useEffect } from "react";
import "./App.css";

import Form from "./components/Form";
import Todolist from "./components/TodoList";

function App() {
  //state
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const[filteredTodos,setFilteredTodos]=useState([])
//run once
useEffect(()=>{
  getLocalTodos();
},[])

  //use effect
  useEffect(()=>{
    filterHandler();
  },[todos,status])
  //function
  const filterHandler=()=>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter
          (todo=> todo.completed===true));
          break;
      case 'uncompleted':
        setFilteredTodos(todos.filter
          (todo=> todo.completed===false));
          break;
      default:
        setFilteredTodos(todos);
        break;

    }
  }
  //save to local
  const saveLocalTodos=()=>{
      localStorage.setItem("todos",JSON.stringify(todos))
  }

  const getLocalTodos=()=>{
    if (localStorage.getItem("todos")===null){
      localStorage.setItem("todos",JSON.stringify([]));
    }else{
      let todoLocal=JSON.parse(localStorage.getItem("todos",JSON.stringify(todos)));
      setTodos(todoLocal)
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        todos={todos}
        inputText={inputText}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
       
      />
      <Todolist setTodos={setTodos}  filteredTodos={filteredTodos} todos={todos} />
    </div>
  );
}

export default App;
