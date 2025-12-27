import { useState, useEffect } from 'react';
import { validInput } from './regex';
import ListItem from './components/ListItem';
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

  useEffect(() => {
    localStorage.setItem('Todo-Items', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("Completed-Items", JSON.stringify(completed));
  }, [completed]);

  function handleInput() {
    if (todo.trim() === "") return;

    if (!validInput.test(todo)) {
      setInputError(true);
      setTodo("");
      return;
    }

    setInputError(false);
    setTodos(t => [...t, todo]);
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

    return `${hours}:${minutes}`;
  }

  return (
    <div className='min-h-screen bg-slate-100 flex flex-col md:flex-row gap-8 p-8'>
      <div className='flex-1 bg-white rounded-2xl shadow-lg p-6'>
        <div>
          <h1 className='text-3xl font-bold mb-4 text-slate-800'>Todo List</h1>
          {inputError && (
            <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
              <p className="font-semibold">Invalid input</p>
              <p className="text-sm mt-1">
                Please use only letters, numbers, and spaces.
              </p>
            </div>
          )} 
          <div className='flex items-center gap-3'>
          <input 
            type='text' 
            placeholder='Enter a todo...'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className='flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline'
          />
          <button onClick={handleInput} className='whitespace-nowrap bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition'>Add Todo</button>
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
        <h2 className='text-3xl font-bold mb-4 text-slate-800'>Completed Todos</h2>
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
