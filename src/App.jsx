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
import ConfirmationDialog from './components/ConfirmationDialog';
import InputSuccess from './components/InputSuccess';
import FilterButton from './components/FilterButton';
import FilterModal from './components/FilterModal';


function App() {
  const [todos, setTodos] = useState(() => {
    const todoItems = localStorage.getItem("Todo-Items");
    return todoItems ? JSON.parse(todoItems) : [];
  });

  const [todo, setTodo] = useState("");
  const [todoColor, setTodoColor] = useState(DEFAULT_COLOUR_SETTINGS.automaticTodoColour);
  const [todoTextColor, setTodoTextColor] = useState(DEFAULT_COLOUR_SETTINGS.automaticTodoFontColor);
  const [todoPriority, setTodoPriority] = useState("low");
  const [todoNotes, setTodoNotes] = useState("");

  const [openModal, setOpenModal] = useState(null);
  const [openSettings, setOpenSettings] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleUpdate = (id, newValue, newNotes, newColor, newTextColor, newPriority, newIcon) => {
    setTodos(todos.map((t) => 
      (t.id === id 
        ? { ...t, text: newValue, color: newColor, textColor: newTextColor, priority: newPriority, icon: newIcon, notes: newNotes } 
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

  function handleInput(newValue, newNotes, newColor, newTextColor, newPriority, newIcon) {  
    setTodos(t => [...t, { 
      id: crypto.randomUUID(),
      text: newValue.trim(), 
      color: newColor, 
      textColor: newTextColor, 
      priority: newPriority,
      icon: newIcon,
      notes: newNotes,
      dateAdded: getCurrentDate(), 
      timeStamp: Date.now() 
    }]);

    closeAddModal();
  }

  const getCurrentDate = () => {
    const date = new Date();
    
    const options = { timeZone: 'Europe/Dublin', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('ire', options).format(date);
    return formattedDate;
  }

  const deleteTodoItem = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
    setPendingDelete(null);
    setSuccessMessage("Todo item deleted successfully");
  }

  function handleComplete(id) {
    const todo = todos.find(t => t.id === id);

    const completedItem = {
      item: todo.text,
      timeStarted: todo.dateAdded,
      timeCompleted: getCurrentDate(),
      timeStampStarted: todo.timeStamp,
      timeStampCompleted: Date.now()
    };

    setTodos(todos.filter((t) => t.id !== id));
    setCompleted(c => [...c, completedItem]);
  }

  const handleDelete = (id) => {
    setPendingDelete({ type: 'todo', id });
  }

  const handleResetItems = () => {
    setPendingDelete({ type: 'resetCompleted' });
  }

  const confirmPendingDelete = () => {
    if (pendingDelete.type === 'todo') {
        deleteTodoItem(pendingDelete.id);
    } else if (pendingDelete.type === 'resetCompleted') {
        resetTodos();
        setPendingDelete(null);
        setSuccessMessage("Completed todos cleared successfully");
    }
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

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenViewModal, setIsOpenViewModal] = useState(null);

  const openAddModal = () => {
    setIsOpenAddModal(true);
  }

  const closeAddModal = () => {
    setIsOpenAddModal(false);
  }

  const openViewModal = (item) => {
    setIsOpenViewModal(item);
  }

  const closeViewModal = () => {
    setIsOpenViewModal(null);
  }

  const [filterOption, setFilterOption] = useState(null);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handleFilterModal = () => {
    setIsOpenFilter(!isOpenFilter);
  }

  const handleFilterOption = (option) => {
    setFilterOption(option);
  }

  const filteredTodos = filterOption
    ? todos.filter(todo => todo.priority === filterOption)
    : todos;

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

            {todos.length == 0 && completed.length == 0 ?
              <InfoCard 
                textContent="Enter a todo item to begin" 
                colourModes={colourSettings}
              />
              :
              <InfoCard 
                textContent={`Todo items for completion: ${todos.length}`}
                colourModes={colourSettings}
              />
            }

            <div className='flex gap-2 justify-end items-end'>
              <div className='relative'>
                {todos.length > 0 && <FilterButton handleInput={() => handleFilterModal()}/>}

                {isOpenFilter && <FilterModal handleInput={handleFilterOption}/>}
              </div>

              <AddButton 
                handleInput={openAddModal}
                textContent="Add new todo"
                colourModes={colourSettings}
                className=""
              />
            </div>
        </div>

          <div>
            <ul className='my-2'>
              {filteredTodos.map((element) => 
                <ListItem 
                  key={element.id}
                  icon={element.icon}
                  name={element.text} 
                  notes={element.notes}
                  color={element.color}
                  textColor={element.textColor}
                  dateAdded={element.dateAdded}
                  priority={element.priority}
                  onView={() => openModalView(element.id)}
                  onViewDetails={() => openViewModal(element.id)}
                  onComplete={() => handleComplete(element.id)}
                  onDelete={() => handleDelete(element.id)}
                />
              )}
            </ul>

            {filteredTodos.length == 0 && filterOption && 
              <div className='bg-slate-200 p-2 rounded-sm text-left my-5'>
              <p>No <span className='font-bold'>{filterOption}</span> priority todos</p>
              </div>
            }
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
            <div className='flex justify-end'>
              <ResetButton 
                resetTodos={handleResetItems} 
                textContent="Remove All"
                colourModes={colourSettings}
              />
            </div>
          }
          
          <ul className='space-y-2 text-slate-600'>
            {completed.map((element, index) => 
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
            action="Edit"
            icon={todos.find(t => t.id === openModal)?.icon}
            item={todos.find(t => t.id === openModal)?.text}
            notes={todos.find(t => t.id === openModal)?.notes}
            background={todos.find(t => t.id === openModal)?.color}
            textColor={todos.find(t => t.id === openModal)?.textColor}
            priority={todos.find(t => t.id === openModal)?.priority}
            onSave={(newValue, newNotes, newColor, newTextColor, newPriority, newIcon) => handleUpdate(openModal, newValue, newNotes, newColor, newTextColor, newPriority, newIcon)} 
            closeModal={closeModalView}
            colourModes={colourSettings}
          />
        }

        {isOpenAddModal && 
          <TodoModal 
            action="Add"
            icon="circle"
            item=""
            notes={todoNotes}
            background={todoColor}
            textColor={todoTextColor}
            priority={todoPriority}
            onSave={handleInput} 
            closeModal={closeAddModal}
            colourModes={colourSettings}
          />
        }

        {isOpenViewModal !== null && 
          <TodoModal 
            action="View"
            icon={todos.find(t => t.id === isOpenViewModal)?.icon}
            item={todos.find(t => t.id === isOpenViewModal)?.text}
            notes={todos.find(t => t.id === isOpenViewModal)?.notes}
            background={todos.find(t => t.id === isOpenViewModal)?.color}
            textColor={todos.find(t => t.id === isOpenViewModal)?.textColor}
            priority={todos.find(t => t.id === isOpenViewModal)?.priority}
            onSave={() => {}} 
            closeModal={() => closeViewModal()}
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

        {pendingDelete &&
          <ConfirmationDialog 
            headerText={pendingDelete.type === 'todo' ? "Delete this todo?" : "Remove all completed todos?"}
            confirmationText={pendingDelete.type === 'todo'
                  ? "Are you sure you wish to delete this todo item?"
                  : "This will clear your entire completed list. Are you sure you want to continue?"}
            itemForDeletion={pendingDelete.type === 'todo' ? todos.find(t => t.id === pendingDelete.id)?.text : null}
            onCancel={() => setPendingDelete(null)}
            onConfirm={confirmPendingDelete}
          />
}
      </div>

      <div className='fixed inset-x-3 bottom-1 sm:left-auto sm:right-10 sm:w-md z-30'>
          {inputError && <InputError closeError={() => setInputError(false)} />} 
          {inputWarning && <InputWarning closeError={() => setInputWarning(false)} />}
          {successMessage && <InputSuccess closeSuccess={() => setSuccessMessage("")} textContent={successMessage} />}
      </div>
    </div>
  )
};

export default App;