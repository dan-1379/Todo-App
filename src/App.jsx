import { useState, useEffect } from 'react';
import { validInput } from './regex';
import ListItem from './components/ListItem';
import InputError from './components/InputError';
import InputWarning from './components/InputWarning';
import "./App.css"
import TodoModal from './components/TodoModal';
import { Info } from 'lucide-react';


function App() {
  const [todos, setTodos] = useState(() => {
    const todoItems = localStorage.getItem("Todo-Items");
    return todoItems ? JSON.parse(todoItems) : [];
  });

  const [todo, setTodo] = useState("");
  const [todoColor, setTodoColor] = useState("#CBD5E1");
  const [todoTextColor, setTodoTextColor] = useState("#000");
  const [openModal, setOpenModal] = useState(null);

  const openModalView = (item) => {
    setOpenModal(item);
  }

  const closeModalView = () => {
    setOpenModal(null);
  }

  const handleUpdate = (index, newValue) => {
    setTodos(todos.map((t, i) => (i === index ? { ...t, text: newValue } : t)));
    closeModalView();
  }

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
    
    setTodos(t => [...t, { text: todo.trim(), color: todoColor, textColor: todoTextColor }]);
    setTodo("");
    setTodoColor("#CBD5E1");
    setTodoTextColor("#fff");
  }

  function handleDelete(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  function handleComplete(index) {
    const completed = {
      item: todos[index].text,
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
    <div>
      <div className='min-h-screen bg-slate-100 flex flex-col md:flex-row gap-8 p-5'>
        <div className='flex-1 bg-white rounded-2xl shadow-lg p-6'>
          <div>
            <h1 className='text-2xl md:text-3xl font-bold mb-4 text-slate-800'>Todo List</h1>

            {todos.length == 0 &&
              <div className='flex gap-2 mt-5 mb-5 border-l-2 border-blue-400 w-fit p-2'>
                <Info className='text-blue-500' />
                <p>Enter a todo item to begin</p>
              </div>
            }

            <div className='flex flex-col gap-3 md:flex-row md:items-center'>
              <input 
                type='text' 
                placeholder='Enter a todo...'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className='w-full md:flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-blue-400'
              />

              <div className='flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2'>
                <div className='flex items-center gap-2'>
                  <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Background</label>
                  <input 
                    id="bg-color"
                    type="color" 
                    value={todoColor}
                    onChange={(e) => setTodoColor(e.target.value)}
                    className='size-8 rounded border border-slate-300 cursor-pointer'
                  />
                </div>

                <div className='flex items-center gap-2'>
                  <label htmlFor="text-color" className='text-sm text-slate-600 whitespace-nowrap'>Text</label>
                  <input 
                    id="text-color"
                    type="color" 
                    value={todoTextColor}
                    onChange={(e) => setTodoTextColor(e.target.value)}
                    className='size-8 rounded border border-slate-300 cursor-pointer'
                  />
                </div>
              </div>

              <button 
                onClick={handleInput} 
                className='w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition'>
                Add Todo
              </button>
            </div>
        </div>

          <div>
            <ul className='my-2'>
              {todos.map((element, index) => 
                <ListItem 
                  name={element.text} 
                  color={element.color}
                  textColor={element.textColor}
                  key={index}
                  onView={() => openModalView(index)}
                  onComplete={() => handleComplete(index)}
                  onDelete={() => handleDelete(index)}/>
              )}
            </ul>
          </div>
        </div>

        <div className='flex-1 bg-white rounded-2xl shadow-lg p-6'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-slate-800'>Completed Todos</h2>
          
          {completed.length == 0 &&
              <div className='flex gap-2 mt-5 mb-5 border-l-2 border-blue-400 w-fit p-2'>
                <Info className='text-blue-500'/>
                <p>Your completed todos will appear here</p>
              </div>
            }

          {completed.length > 0 && 
            <button 
              onClick={resetTodos} 
              className='mb-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition'>Remove All</button>
          }
          
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

        {openModal !== null && 
          <TodoModal 
            item={todos[openModal].text} 
            onSave={(newValue) => handleUpdate(openModal, newValue)} 
            closeModal={closeModalView} 
          />
        }
      </div>

      <div className='w-md absolute bottom-3 right-3'>
          {inputError && <InputError closeError={() => setInputError(false)} />} 
          {inputWarning && <InputWarning closeError={() => setInputWarning(false)} />} 
      </div>
    </div>
  )
};

export default App;