import { useState, useEffect } from 'react';
import { validInput } from './regex';
import ListItem from './components/ListItem';
import InputError from './components/InputError';
import InputWarning from './components/InputWarning';
import "./App.css"
import TodoModal from './components/TodoModal';
import { Info, Settings } from 'lucide-react';
import CompletedTodoItem from './components/CompletedTodoItem';
import SettingsModal from './components/SettingsModal';
import ResetButton from './components/ResetButton';
import InfoCard from './components/InfoCard';
import AddButton from './components/AddButton';
import Header from "./components/Header";
import { DEFAULT_COLOUR_SETTINGS } from './constants/colourSettings';


function App() {
  const [todos, setTodos] = useState(() => {
    const todoItems = localStorage.getItem("Todo-Items");
    return todoItems ? JSON.parse(todoItems) : [];
  });

  const [todo, setTodo] = useState("");
  const [todoColor, setTodoColor] = useState(DEFAULT_COLOUR_SETTINGS.automaticTodoColour);
  const [todoTextColor, setTodoTextColor] = useState(DEFAULT_COLOUR_SETTINGS.automaticTodoFontColor);
  const [openModal, setOpenModal] = useState(null);
  const [openSettings, setOpenSettings] = useState(false);

  const openModalView = (item) => {
    setOpenModal(item);
  }

  const closeModalView = () => {
    setOpenModal(null);
  }

  const openSettingsModal = () => {
    setOpenSettings(true);
  }

  const closeSettingsModal = () => {
    setOpenSettings(false);
  }

  const handleUpdate = (index, newValue, newColor, newTextColor) => {
    setTodos(todos.map((t, i) => 
      (i === index 
        ? { ...t, text: newValue, color: newColor, textColor: newTextColor } 
        : t
      )
    ));
    
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
    
    setTodos(t => [...t, { text: todo.trim(), color: todoColor, textColor: todoTextColor, dateAdded: getCurrentDate(), timeStamp: Date.now() }]);
    
    setTodo("");
    setTodoColor(DEFAULT_COLOUR_SETTINGS.automaticTodoColour);
    setTodoTextColor(DEFAULT_COLOUR_SETTINGS.automaticTodoFontColor);
  }

  const getCurrentDate = () => {
        const date = new Date();
        
        const options = { timeZone: 'Europe/Dublin', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = new Intl.DateTimeFormat('ire', options).format(date);
        return formattedDate;
    }

  function handleDelete(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  function handleComplete(index) {
    const completed = {
      item: todos[index].text,
      timeStarted: todos[index].dateAdded,
      timeCompleted: getCurrentDate(),
      timeStampStarted: todos[index].timeStamp,
      timeStampCompleted: Date.now()
    };

    setTodos(todos.filter((_, i) => i !== index));
    setCompleted(c => [...c, completed]);
  }

  function resetTodos() {
    setCompleted([]);
  }


  const [colourSettings, setColourSettings] = useState(() => {
    const settings = localStorage.getItem("Color-Settings");
    
    if(settings) {
      return JSON.parse(settings);
    }

    localStorage.setItem("Color-Settings", JSON.stringify(DEFAULT_COLOUR_SETTINGS));
    return DEFAULT_COLOUR_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('Color-Settings', JSON.stringify(colourSettings));
  }, [colourSettings]);

  return (
    <div>
      <Header 
        openSettings={() => openSettingsModal()}
        colorModes={colourSettings}
      />

      <div className='min-h-screen flex flex-col md:flex-row gap-8 p-5' style={{ backgroundColor: colourSettings.bgColour }}>
        <div className='flex-1 rounded-2xl shadow-lg p-6' style={{ backgroundColor: colourSettings.cardBgColour }}>
          <div>
            <h1 className='text-2xl md:text-3xl font-bold mb-4' style={{ color: colourSettings.cardHeadingColour }}>Todo List</h1>

            {todos.length == 0 &&
              <InfoCard 
                textContent="Enter a todo item to begin" 
                colourModes={colourSettings}
              />
            }

            <div className='flex flex-col gap-3 md:flex-col lg:flex-row'>
              <input 
                type='text' 
                placeholder='Enter a todo...'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className='w-full md:flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-blue-400'
              />

              <div className='flex items-center gap-5 border border-slate-200 rounded-lg px-3 py-2' 
                   style={{ backgroundColor: colourSettings.bgColour }}>
                <div className='flex items-center gap-2'>
                  <label htmlFor="bg-color" className='text-sm whitespace-nowrap' style={{ color: colourSettings.automaticTodoFontColor }}>Background</label>
                  <input 
                    id="bg-color"
                    type="color" 
                    value={colourSettings.automaticTodoColour}
                    onChange={(e) => setTodoColor(e.target.value)}
                    className='size-8 rounded border border-slate-300 cursor-pointer'
                  />
                </div>

                <div className='flex items-center gap-2'>
                  <label htmlFor="text-color" className='text-sm whitespace-nowrap' style={{ color: colourSettings.automaticTodoFontColor }}>Text</label>
                  <input 
                    id="text-color"
                    type="color" 
                    value={colourSettings.automaticTodoFontColor}
                    onChange={(e) => setTodoTextColor(e.target.value)}
                    className='size-8 rounded border border-slate-300 cursor-pointer'
                  />
                </div>
              </div>

              <AddButton 
                handleInput={handleInput}
                textContent="Add Todo"
                colourModes={colourSettings}
              />
            </div>
        </div>

          <div>
            <ul className='my-2'>
              {todos.map((element, index) => 
                <ListItem 
                  name={element.text} 
                  color={element.color}
                  textColor={element.textColor}
                  dateAdded={element.dateAdded}
                  key={index}
                  onView={() => openModalView(index)}
                  onComplete={() => handleComplete(index)}
                  onDelete={() => handleDelete(index)}/>
              )}
            </ul>
          </div>
        </div>

        <div className='flex-1 bg-white rounded-2xl shadow-lg p-6'>
          <h1 className='text-2xl md:text-3xl font-bold mb-4' style={{ color: colourSettings.cardHeadingColour }}>Completed Todos</h1>

          {completed.length > 0 && 
            <InfoCard 
              textContent={`${Math.round(((completed.length) / (todos.length + completed.length) * 100), 2)}% completed`} 
              colourModes={colourSettings}
            />
          }
          
          {completed.length == 0 &&
              <InfoCard 
                textContent="Your completed todos will appear here"
                colourModes={colourSettings}
              />
          }

          {completed.length > 0 &&
            <ResetButton 
              resetTodos={resetTodos} 
              textContent="Remove All"
              colourModes={colourSettings}
            />
          }
          
          <ul className='space-y-2 text-slate-600'>
            {completed.sort().map((element, index) => 
              <CompletedTodoItem 
                key={index} 
                item={element.item} 
                timeStarted={element.timeStarted} 
                timeCompleted={element.timeCompleted} 
                timeStampStarted={element.timeStampStarted}
                timeStampCompleted={element.timeStampCompleted}
                colourModes={colourSettings}
              />
            )}
          </ul>
        </div>

        {openModal !== null && 
          <TodoModal
            item={todos[openModal].text}
            background={todos[openModal].color}
            textColor={todos[openModal].textColor}
            onSave={(newValue, newColor, newTextColor) => handleUpdate(openModal, newValue, newColor, newTextColor)} 
            closeModal={closeModalView}
            colourModes={colourSettings}
          />
        }

        {openSettings &&
          <SettingsModal 
            closeModal={() => closeSettingsModal()}
            handleSubmit={(newSettings) => setColourSettings(newSettings)}
            colorSettings={colourSettings}
          />
        }
      </div>

      <div className='fixed inset-x-3 bottom-10 sm:left-auto sm:right-10 sm:w-md'>
          {inputError && <InputError closeError={() => setInputError(false)} />} 
          {inputWarning && <InputWarning closeError={() => setInputWarning(false)} />} 
      </div>
    </div>
  )
};

export default App;