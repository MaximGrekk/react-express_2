import React, {useState, useEffect} from 'react';
// import ReactDOM from 'react-dom';
import ToDoForm from './components/ToDoForm'

const styles = {
  title: {
    textAlign: "center",
    paddingTop: "1.5em",

  }
}

function App() {

  const [todos, setTodos] = useState([])
  // D
  const remove = (id) => {
    fetch('http://localhost:8000', {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({id})
    })
    .then(res => res.json())
    setTodos((prev) => prev.filter(t => t.id !== id))
  }
  // C
  const addTask = (input) => {
    if(input) {
      const newItem = {
        // id: parseInt(Math.random().toString(10).substr(0, 7)*1000000000),
        id: todos.length,
        body: input,
        // complete: false
      }
      fetch("http://localhost:8000", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newItem)
      })
      .then(res => res.json())
      .then(prev => setTodos(prev))
      // setTodos([...todos, newItem])
    }
  }
  // R
  useEffect(() => {
    fetch('http://localhost:8000', {method: "GET"})
    .then((res) => res.json())
    .then((data) => {
      setTodos(data.todos)
      // console.log(data)
    })
  }, [])

  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetch('/api')
  //   .then(res => res.json())
  //   .then(res => setData(res.todos[2].title))
  // }, [])
  // console.log(todos)

  return (
    <>
      <h1 style={styles.title}>To Do List</h1>
      <ToDoForm name="Artem" todos={todos} remove={remove} addTask={addTask}/>
      <p className="text-center py-2">
      </p>
    </>
  );
}



export default App;
