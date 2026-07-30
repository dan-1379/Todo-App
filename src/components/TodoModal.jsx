import { X, Circle, Briefcase, GraduationCap, Code, FileText, Mail, Home, ShoppingCart, Dumbbell, Heart, Utensils, Clock, Star, Bell, Calendar, Flag } from "lucide-react";
import { useState, useEffect } from "react";
import { validInput } from "../regex";
import InputError from "./InputError";
import InputWarning from './InputWarning';

const iconGroups = [
    {
        label: "General / work",
        options: [
            { text: "Briefcase", icon: Briefcase },
            { text: "GraduationCap", icon: GraduationCap },
            { text: "Code", icon: Code },
            { text: "FileText", icon: FileText },
            { text: "Mail", icon: Mail },
        ]
    },
    {
        label: "Personal",
        options: [
            { text: "Home", icon: Home },
            { text: "ShoppingCart", icon: ShoppingCart },
            { text: "Dumbbell", icon: Dumbbell },
            { text: "Heart", icon: Heart },
            { text: "Utensils", icon: Utensils },
        ]
    },
    {
        label: "Time-sensitive / misc",
        options: [
            { text: "Clock", icon: Clock },
            { text: "Star", icon: Star },
            { text: "Bell", icon: Bell },
            { text: "Calendar", icon: Calendar },
            { text: "Flag", icon: Flag },
        ]
    }
];

const fallbackIcon = { text: "Circle", icon: Circle };

export const iconMap = [...iconGroups.flatMap(g => g.options), fallbackIcon]
    .reduce((acc, { text, icon }) => {
        acc[text] = icon;
        return acc;
    }, {});

const TodoModal = ({ action, icon="circle", item, notes, background, textColor, priority, closeModal, onSave, colourModes }) => {
    const [todoIcon, setTodoIcon] = useState(icon);
    const [todo, setTodo] = useState(item);
    const [todoNotes, setTodoNotes] = useState(notes);
    const [todoColor, setTodoColor] = useState(background);
    const [todoTextColor, setTodoTextColor] = useState(textColor);
    const [todoPriority, setTodoPriority] = useState(priority);

    const [inputError, setInputError] = useState(false);
    const [inputWarning, setInputWarning] = useState(false);

    const IconComponent = iconMap[todoIcon] || fallbackIcon.icon;

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

        onSave(todo, todoNotes, todoColor, todoTextColor, todoPriority, todoIcon);
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

    // useEffect(() => {
    //     const handleEnterKeyPress = (event) => {
    //         if (event.key === 'Enter') {
    //             handleSubmit();
    //         }
    //     }

    //     window.addEventListener('keydown', handleEnterKeyPress);

    //     return () => {
    //         window.removeEventListener('keydown', handleEnterKeyPress);
    //     };
    // }, [todo, todoColor, todoTextColor]);

    return (
        <>
            <div className="bg-black/70 fixed inset-0 z-10 opacity-900" onClick={closeModal}></div>

            <div className="bg-white fixed inset-[2em] flex flex-col z-20 self-center m-[2em] rounded-xl md:w-90 lg:w-[40%] p-10 ml-auto mr-auto">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-600">{action} Todo Item</h2>
                    <button className="cursor-pointer absolute top-1 right-0 size-10 hover:text-white text-slate-500 rounded-full hover:bg-red-600 mx-1 my-0.5 duration-300 text-center ease-in-out flex items-center justify-center" onClick={closeModal}><X size={20}/></button>
                </div> 

                <hr className="mb-5 text-slate-300 w-full h-[1px]" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 overflow-y-scroll">
                    <div className="flex flex-row gap-2">
                        <div className="flex-3 flex flex-col">
                            <label htmlFor="todoIcon" className="text-sm text-slate-600 whitespace-nowrap">Icon</label>
                            
                            <select
                                disabled={action === "View"}
                                name="todoIcon" 
                                id="todoIcon" 
                                value={todoIcon}
                                onChange={(e) => setTodoIcon(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-blue-400"
                            >
                                    <option selected value={fallbackIcon.text}>{fallbackIcon.text}</option>

                                    {iconGroups.map((group) => (
                                        <optgroup key={group.label} label={group.label}>
                                            {group.options.map((opt) => (
                                                <option key={opt.text} value={opt.text}>{opt.text}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col">
                            <span className="text-sm text-slate-600 whitespace-nowrap">Preview</span>
                            <div className="w-full h-full flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2">
                                <IconComponent size={20} />
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="todoItem" className="text-sm text-slate-600 whitespace-nowrap">Todo</label>
                        <input
                            disabled={action === "View"}
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
                        <label htmlFor="todoNotes" className="text-sm text-slate-600 whitespace-nowrap">Notes</label>
                        <textarea
                            disabled={action === "View"}
                            name="todoNotes" 
                            id="todoNotes" 
                            cols="10" 
                            rows="3"
                            value={todoNotes}
                            onChange={(e) => setTodoNotes(e.target.value)}
                            className="w-full resize-none sm:flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:outline-blue-400 sm:w-full"
                        >
                        </textarea>
                    </div>

                    <div>
                        <label htmlFor="todoPriority" className="text-sm text-slate-600 whitespace-nowrap">Priority</label>
                
                        <select
                            disabled={action === "View"}
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
                                    disabled={action === "View"} 
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
                                    disabled={action === "View"}
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
                        {action !== "View" ? 
                            <button 
                                type="button" 
                                onClick={closeModal} 
                                className="w-30 cursor-pointer bg-slate-100 text-black px-4 py-2 rounded-lg hover:bg-slate-200 active:scale-95 transition">
                                    Cancel
                            </button> 
                        : 
                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-full cursor-pointer bg-slate-300 text-black px-4 py-2 rounded-lg hover:bg-slate-400 active:scale-95 transition"
                            >
                                Close
                            </button>}

                        {action !== "View" && <input 
                            type="submit" 
                            value="Save" 
                            className="w-40 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg active:scale-95 transition"
                            style={{ backgroundColor: colourModes.addButtonColour, color: colourModes.cardBgColour }} 
                        />}
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