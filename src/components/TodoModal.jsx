import { X } from "lucide-react";
import { useState } from "react";
import { validInput } from "../regex";
import InputError from "./InputError";
import InputWarning from './InputWarning';

const TodoModal = ({ item, background, textColor, closeModal, onSave, colourModes }) => {
    const [todo, setTodo] = useState(item);
    const [todoColor, setTodoColor] = useState(background);
    const [todoTextColor, setTodoTextColor] = useState(textColor);

    const [inputError, setInputError] = useState(false);
    const [inputWarning, setInputWarning] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
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

        onSave(todo, todoColor, todoTextColor);
    }

    return (
        <>
            <div className="bg-black/70 fixed inset-0 z-10 opacity-900" onClick={closeModal}></div>

            <div className="bg-white fixed inset-[3em] flex flex-col z-20 self-center m-[2em] rounded-xl p-10 w-90 ml-auto mr-auto">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-600">Edit Todo Item</h2>
                    <button className="cursor-pointer absolute top-1 right-0 size-10 hover:text-white text-slate-500 rounded-full hover:bg-red-600 mx-1 my-0.5 duration-300 text-center ease-in-out flex items-center justify-center" onClick={closeModal}><X size={20}/></button>
                </div> 

                <hr className="mb-5 text-slate-300 w-full h-[1px]" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} name="" id="" placeholder="Enter todo" className="w-full sm:flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-blue-400 sm:w-full"/>

                    <div className='flex flex-col sm:flex-row items-center gap-4 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2'>
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

                    <input type="submit" value="Save" className="cursor-pointer w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg active:scale-95 transition"
                            style={{ backgroundColor: colourModes.addButtonColour, color: colourModes.cardBgColour }} />
                </form>
            </div>

            <div className="absolute bottom-3 right-3 w-md z-20">
                {inputError && <InputError closeError={() => setInputError(false)} />}
                {inputWarning && <InputWarning closeError={() => setInputWarning(false)} />}
            </div>
        </>
    )
}

export default TodoModal;