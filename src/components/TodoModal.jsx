import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { validInput } from "../regex";
import InputError from "./InputError";
import InputWarning from './InputWarning';

const TodoModal = ({ action, item, background, textColor, priority, closeModal, onSave, colourModes }) => {
    const [todo, setTodo] = useState(item);
    const [todoColor, setTodoColor] = useState(background);
    const [todoTextColor, setTodoTextColor] = useState(textColor);
    const [todoPriority, setTodoPriority] = useState(priority);

    const [inputError, setInputError] = useState(false);
    const [inputWarning, setInputWarning] = useState(false);

    const handleSubmit = (e) => {
        e?.preventDefault();
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

        onSave(todo, todoColor, todoTextColor, todoPriority);
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };
        
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        const handleEnterKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        }

        window.addEventListener('keydown', handleEnterKeyPress);

        return () => {
            window.removeEventListener('keydown', handleEnterKeyPress);
        };
    }, [todo, todoColor, todoTextColor]);

    return (
        <>
            <div className="bg-black/70 fixed inset-0 z-10 opacity-900" onClick={closeModal}></div>

            <div className="bg-white fixed inset-[2em] flex flex-col z-20 self-center m-[2em] rounded-xl md:w-90 lg:w-[40%] p-10 ml-auto mr-auto">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-600">{action} Todo Item</h2>
                    <button className="cursor-pointer absolute top-1 right-0 size-10 hover:text-white text-slate-500 rounded-full hover:bg-red-600 mx-1 my-0.5 duration-300 text-center ease-in-out flex items-center justify-center" onClick={closeModal}><X size={20}/></button>
                </div> 

                <hr className="mb-5 text-slate-300 w-full h-[1px]" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="todoItem" className="text-sm text-slate-600 whitespace-nowrap">Todo</label>
                        <input 
                            autoFocus
                            type="text" 
                            id="todoItem" 
                            value={todo} 
                            onChange={(e) => setTodo(e.target.value)} 
                            placeholder="Enter todo" 
                            className="w-full sm:flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-blue-400 sm:w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="todoPriority" className="text-sm text-slate-600 whitespace-nowrap">Priority</label>
                
                        <select 
                            name="todoPriority" 
                            id="todoPriority" 
                            value={todoPriority}
                            onChange={(e) => setTodoPriority(e.target.value)}
                            className="w-full sm:flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-blue-400 sm:w-full">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="todoItem" className="text-sm text-slate-600 whitespace-nowrap">Color Options</label>
                        <div className='flex flex-row sm:flex-row items-center gap-4 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2'>
                            <div className='flex items-center gap-2'>
                                <label htmlFor="bg-color" className='text-sm text-slate-500 whitespace-nowrap'>Background</label>
                                <input 
                                    id="bg-color"
                                    type="color" 
                                    value={todoColor}
                                    onChange={(e) => setTodoColor(e.target.value)}
                                    className='size-8 rounded border border-slate-300 cursor-pointer'
                                />
                            </div>

                            <div className='flex items-center gap-2'>
                                <label htmlFor="text-color" className='text-sm text-slate-500 whitespace-nowrap'>Text</label>
                                <input 
                                    id="text-color"
                                    type="color" 
                                    value={todoTextColor}
                                    onChange={(e) => setTodoTextColor(e.target.value)}
                                    className='size-8 rounded border border-slate-300 cursor-pointer'
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center sm:justify-end gap-2 w-full">
                        <button type="button" onClick={closeModal} className="w-30 cursor-pointer bg-slate-100 text-black px-4 py-2 rounded-lg hover:bg-slate-200 active:scale-95 transition">Cancel</button>
                        <input type="submit" value="Save" className="w-40 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg active:scale-95 transition"
                                style={{ backgroundColor: colourModes.addButtonColour, color: colourModes.cardBgColour }} />
                    </div>
                </form>
            </div>

            <div className="fixed inset-x-3 bottom-1 sm:left-auto sm:right-10 sm:w-md z-30">
                {inputError && <InputError closeError={() => setInputError(false)} />}
                {inputWarning && <InputWarning closeError={() => setInputWarning(false)} />}
            </div>
        </>
    )
}

export default TodoModal;