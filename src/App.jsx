import { useState, useEffect } from 'react';
import { validInput } from './regex';
import ListItem from './components/ListItem';
import InputError from './components/InputError';
import InputWarning from './components/InputWarning';
import "./App.css"


function App() {
  const [todos, setTodos] = useState(() => {
    const todoItems = localStorage.getItem("Todo-Items");
    return todoItems ? JSON.parse(todoItems) : [];
  });

  const [todo, setTodo] = useState("");

  const [completed, setCompleted] = useState(() => {
    const completedItems = localStorage.getItem("Completed-Items");
    return completedItems ? JSON.parse(completedItems) : [];
  });

  const [inputError, setInputError] = useState(false);
  const [inputWarning, setInputWarning] = useState(false);

  useEffect(() => {
    localStorage.setItem('Todo-Items', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("Completed-Items", JSON.stringify(completed));
  }, [completed]);

  function handleInput() {
    setInputError(false);
    setInputWarning(false);

    if (todo.trim() === ""){
      setInputWarning(true);
      return;
    }

    if (!validInput.test(todo)) {
      setInputError(true);
      return;
    }
    
    setTodos(t => [...t, todo.trim()]);
    setTodo("");
  }

  function handleDelete(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  function handleComplete(index) {
    const completed = {
      item: todos[index],
      timeCompleted: getTime() 
    };

    setTodos(todos.filter((_, i) => i !== index));
    setCompleted(c => [...c, completed]);
  }

  function resetTodos() {
    setCompleted([]);
  }

  function getTime() {
    const d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();

    return `${hours}:${minutes > 10 ? minutes : "0" + minutes}`;
  }

  return (
    <div className='min-h-screen bg-slate-100 flex flex-col md:flex-row gap-8 p-8'>
      <div className='flex-1 bg-white rounded-2xl shadow-lg p-6'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold mb-4 text-slate-800'>Todo List</h1>
          {inputError && <InputError />} 
          {inputWarning && <InputWarning />} 
          <div className='flex flex-col items-center gap-3  sm:flex-row'>
          <input 
            type='text' 
            placeholder='Enter a todo...'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className='w-full sm:flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-blue-400 sm:w-full'
          />
          <button onClick={handleInput} 
          className='w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition'>Add Todo</button>
        </div>
      </div>

        <div>
          <ul className='my-2'>
            {todos.map((element, index) => 
              <ListItem 
                name={element} 
                key={index}
                onComplete={() => handleComplete(index)}
                onDelete={() => handleDelete(index)}/>
            )}
          </ul>
        </div>
      </div>

      <div className='flex-1 bg-white rounded-2xl shadow-lg p-6'>
        <h2 className='text-2xl md:text-3xl font-bold mb-4 text-slate-800'>Completed Todos</h2>
        <button onClick={resetTodos} className='mb-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition'>Remove All</button>
        <ul className='space-y-2 text-slate-600'>
          {completed.sort().map((element, index) => 
            <li key={index}
                className='bg-slate-100 rounded-lg px-4 py-3 my-5 text-slate-800 flex justify-between'>
                  <span>{element.item}</span>
                  <span className='flex items-center text-sm text-slate-500'>{element.timeCompleted}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App