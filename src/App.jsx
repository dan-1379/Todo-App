
import { useState, useEffect, useReducer } from 'react';

import ActiveTodosPanel from './components/ActiveTodosPanel';
import CompletedTodosPanel from './components/CompletedTodosPanel';
import ConfirmationDialog from './components/ConfirmationDialog';
import Header from './components/Header';
import InputError from './components/InputError';
import InputSuccess from './components/InputSuccess';
import InputWarning from './components/InputWarning';
import SettingsModal from './components/SettingsModal';
import TodoModal from './components/TodoModal';

import TodosReducer from './hooks/TodosReducer';
import useLocalStorageState from './hooks/useLocalStorageState';

import { getCurrentDate } from './utils/dateFormat';
import { exportTodosAsJSON, importTodosFromJSON } from './utils/exportData';

import { DEFAULT_COLOUR_SETTINGS } from './constants/colourSettings';

import './App.css';

function App() {
  const [state, dispatch] = useReducer(TodosReducer, null, () => {
    const todoItems = localStorage.getItem("Todo-Items");
    const completedItems = localStorage.getItem("Completed-Items");

    return {
      todos: todoItems ? JSON.parse(todoItems) : [],
      completed: completedItems ? JSON.parse(completedItems) : []
    }
  });

  const { todos, completed } = state;

  useEffect(() => {
    localStorage.setItem('Todo-Items', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("Completed-Items", JSON.stringify(completed));
  }, [completed]);

  const [colourSettings, setColourSettings] = useLocalStorageState("Color-Settings", DEFAULT_COLOUR_SETTINGS);

  const [activeModal, setActiveModal] = useState(null);

  const openEditModal = (id) => setActiveModal({ mode: 'edit', id });
  const openAddModal = () => setActiveModal({ mode: 'add' });
  const openViewModal = (id) => setActiveModal({ mode: 'view', id });
  const openSettingsModal = () => setActiveModal({ mode: 'settings' });
  const closeModal = () => setActiveModal(null);

  const [pendingDelete, setPendingDelete] = useState(null);
  const [isPendingFullErase, setIsPendingFullErase] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [inputError, setInputError] = useState(null);
  const [inputWarning, setInputWarning] = useState(false);

  const [filterOption, setFilterOption] = useState(null);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handleUpdate = (id, newValue, newNotes, newColor, newTextColor, newPriority, newIcon, newIconBg, newIconColor) => {
    dispatch({
    type: 'UPDATE',
    id,
    payload: {
      text: newValue,
      color: newColor,
      textColor: newTextColor,
      priority: newPriority,
      icon: newIcon,
      notes: newNotes,
      iconBg: newIconBg,
      iconColor: newIconColor,
    },
  });
    
    closeModal();
    setSuccessMessage("Todo updated successfully!");
  }

  function handleInput(newValue, newNotes, newColor, newTextColor, newPriority, newIcon, newIconBg, newIconColor) {  
    dispatch({
    type: 'ADD',
    payload: {
      id: crypto.randomUUID(),
      text: newValue.trim(),
      color: newColor,
      textColor: newTextColor,
      priority: newPriority,
      icon: newIcon,
      notes: newNotes,
      iconBg: newIconBg,
      iconColor: newIconColor,
      dateAdded: getCurrentDate(),
      timeStamp: Date.now(),
    },
    });

    closeModal();
    setSuccessMessage("New todo added successfully!");
  }

  const deleteTodoItem = (id) => {
    dispatch({ type: 'DELETE', id });
    setPendingDelete(null);
    setSuccessMessage("Todo item deleted successfully");
  }

  function handleComplete(id) {
    dispatch({ type: 'COMPLETE', id, completedAt: getCurrentDate() });
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
    dispatch({ type: 'RESET_COMPLETED' });
  }

  const handleResetData = () => {
    setIsPendingFullErase(true);
  }

  const resetAllData = () => {
    dispatch({ type: "RESET_ALL" });
    setIsPendingFullErase(false);
    setSuccessMessage("Data erased successfully");
  }

  const handleFilterModal = () => {
    setIsOpenFilter(!isOpenFilter);
  }

  const handleFilterOption = (option) => {
    setFilterOption(option);
  }

  const handleExport = () => {
    try {
      exportTodosAsJSON(todos, completed);
      setSuccessMessage("Todos exported successfully");
    } catch (err) {
      setInputError("Error in exporting todos");
    }
  }

  const handleImport = (e) => {
    const file = event.target.files[0];
    if (!file) return;

    importTodosFromJSON(
      file,
      (data) => {
        dispatch({ type: 'IMPORT', payload: data });
        setSuccessMessage('Todos imported successfully!');
      },
      () => {
        setInputError("Error in importing todos");
      }
    );

    event.target.value = '';
  }

  const filteredTodos = filterOption
    ? todos.filter(todo => todo.priority === filterOption)
    : todos;

  const editingTodo = activeModal?.mode === 'edit'
    ? todos.find(t => t.id === activeModal.id)
    : null;

  const viewingTodo = activeModal?.mode === 'view'
    ? todos.find(t => t.id === activeModal.id)
    : null;
  
  const todoPendingDelete = pendingDelete?.type === 'todo'
    ? todos.find(t => t.id === pendingDelete.id)
    : null;

  return (
    <div>
      <Header 
        openSettings={openSettingsModal}
        colorModes={colourSettings}
      />

      <div className='min-h-screen flex flex-col md:flex-row gap-8 p-5' style={{ backgroundColor: colourSettings.bgColour }}>
        <ActiveTodosPanel
          todos={filteredTodos}
          hasCompleted={completed.length > 0}
          colourSettings={colourSettings}
          filterOption={filterOption}
          isOpenFilter={isOpenFilter}
          onToggleFilter={handleFilterModal}
          onSelectFilter={handleFilterOption}
          onAdd={openAddModal}
          onView={openEditModal}
          onViewDetails={openViewModal}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />

        <CompletedTodosPanel
          completed={completed}
          activeCount={todos.length}
          colourSettings={colourSettings}
          onReset={handleResetItems}
        />

        {activeModal?.mode === 'edit' && 
          <TodoModal
            action="Edit"
            icon={editingTodo?.icon}
            item={editingTodo?.text}
            notes={editingTodo?.notes}
            background={editingTodo?.color}
            textColor={editingTodo?.textColor}
            priority={editingTodo?.priority}
            iconBgColor={editingTodo?.iconBg}
            iconColor={editingTodo?.iconColor}
            onSave={(newValue, newNotes, newColor, newTextColor, newPriority, newIcon, newIconBg, newIconColor) => 
                    handleUpdate(activeModal.id, newValue, newNotes, newColor, newTextColor, newPriority, newIcon, newIconBg, newIconColor)} 
            closeModal={closeModal}
            colourModes={colourSettings}
          />
        }

        {activeModal?.mode === 'add' && 
          <TodoModal 
            action="Add"
            onSave={handleInput} 
            closeModal={closeModal}
            colourModes={colourSettings}
          />
        }

        {activeModal?.mode === 'view' && 
          <TodoModal 
            action="View"
            icon={viewingTodo?.icon}
            item={viewingTodo?.text}
            notes={viewingTodo?.notes}
            background={viewingTodo?.color}
            textColor={viewingTodo?.textColor}
            priority={viewingTodo?.priority}
            iconBgColor={viewingTodo?.iconBg}
            iconColor={viewingTodo?.iconColor}
            onSave={() => {}} 
            closeModal={closeModal}
            colourModes={colourSettings}
          />
        }

        {activeModal?.mode === 'settings' &&
          <SettingsModal 
            closeModal={closeModal}
            handleSubmit={(newSettings) => setColourSettings(newSettings)}
            colorSettings={colourSettings}
            exportData={handleExport}
            importData={handleImport}
            eraseData={handleResetData}
          />
        }

        {pendingDelete &&
          <ConfirmationDialog 
            headerText={pendingDelete.type === 'todo' ? "Delete this todo?" : "Remove all completed todos?"}
            confirmationText={pendingDelete.type === 'todo'
                  ? "Are you sure you wish to delete this todo item?"
                  : "This will clear your entire completed list. Are you sure you want to continue?"}
            itemForDeletion={todoPendingDelete?.text ?? null}
            onCancel={() => setPendingDelete(null)}
            onConfirm={confirmPendingDelete}
          />
        }

        {isPendingFullErase &&
          <ConfirmationDialog 
            headerText="Erase all todo data?"
            confirmationText= "This will clear your entire todo data. Are you sure you want to continue?"
            onCancel={() => setIsPendingFullErase(false)}
            onConfirm={resetAllData}
          />
        }
      </div>

      <div className='fixed inset-x-3 bottom-1 sm:left-auto sm:right-10 sm:w-md z-30'>
          {inputError && <InputError closeError={() => setInputError(false)} textContent={inputError} />} 
          {inputWarning && <InputWarning closeError={() => setInputWarning(false)} />}
          {successMessage && <InputSuccess closeSuccess={() => setSuccessMessage("")} textContent={successMessage} />}
      </div>
    </div>
  )
};

export default App;