import InputError from "./InputError";
import InputWarning from "./InputWarning";
import { X, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { DEFAULT_COLOUR_SETTINGS } from "../constants/colourSettings";
import InputSuccess from "./InputSuccess";
import InputProcessing from "./InputProcessing";

const SettingsModal = ({ closeModal, handleSubmit, colorSettings }) => {
    const [settings, setSettings] = useState({
        ...DEFAULT_COLOUR_SETTINGS,
        ...colorSettings
    });

    const [status, setStatus] = useState("idle");
    const [isClosing, setIsClosing] = useState(false);

    const handleModalClose = () => {
        setIsClosing(true);
        
        setTimeout(() => {
            closeModal();
        }, 200);
    }

     const updateField = (field) => (e) => {
        setSettings(s => ({ ...s, [field]: e.target.value }));
    };

    const onSubmit = (e) => {
        e?.preventDefault();
        handleSubmit(settings);
        setStatus("processing");

        setTimeout(() => {
            setStatus("success");
        }, 1000);
    };

    const resetColorValues = () => {
        setSettings(DEFAULT_COLOUR_SETTINGS);
        handleSubmit(DEFAULT_COLOUR_SETTINGS);
        setStatus("processing");

        setTimeout(() => {
            setStatus("success");
        }, 1000);
    };

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
                onSubmit();
            }
        }

        window.addEventListener('keydown', handleEnterKeyPress);

        return () => {
            window.removeEventListener('keydown', handleEnterKeyPress);
        };
    }, [settings]);

    return (
        <>
            <div className={`bg-black/60 fixed inset-0 z-10 opacity-900 ${isClosing ? 'animate-[fade-out_0.2s_ease-out]' : 'animate-[fade-in_0.2s_ease-out]'}`} onClick={handleModalClose}></div>

            <div className={`text-center md:text-left bg-white fixed inset-[3em] flex flex-col z-20 self-center m-[2em] rounded-xl p-10 lg:w-1/2 ml-auto mr-auto ${isClosing ? 'animate-[fade-out_0.2s_ease-out]' : 'animate-[fade-in_0.2s_ease-out]'}`}>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-600">Settings</h2>
                    <button className="cursor-pointer absolute top-1 right-0 size-10 hover:text-white text-slate-500 rounded-full hover:bg-red-600 mx-1 my-0.5 duration-300 text-center ease-in-out flex items-center justify-center" onClick={handleModalClose}><X size={20}/></button>
                </div>

                <hr className="mb-5 border-none bg-slate-400 w-full h-[2px]" />

                <form onSubmit={onSubmit} className="flex flex-col gap-5 h-90">
                    <div className="overflow-y-scroll flex flex-col gap-3 h-fit text-wrap">
                        <div>
                            <h3>Heading Colours</h3>
                            <hr className="border-none bg-slate-400 w-full h-[1px]" />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="heading-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Heading background</label>
                            <input
                                id="heading-bg-color"
                                type="color" 
                                value={settings.headingBgColour}
                                onChange={updateField("headingBgColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="font-heading-color" className='text-sm text-slate-600 whitespace-nowrap'>Heading font</label>
                            <input
                                id="font-heading-color"
                                type="color" 
                                value={settings.fontHeadingColour}
                                onChange={updateField("fontHeadingColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div>
                            <h3>Background Colours</h3>
                            <hr className="border-none bg-slate-400 w-full h-[1px]" />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Page background</label>
                            <input
                                id="bg-color"
                                type="color" 
                                value={settings.bgColour}
                                onChange={updateField("bgColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="card-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Card background</label>
                            <input 
                                id="card-bg-color"
                                type="color" 
                                value={settings.cardBgColour}
                                onChange={updateField("cardBgColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="heading-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Card heading</label>
                            <input
                                id="heading-bg-color"
                                type="color" 
                                value={settings.cardHeadingColour}
                                onChange={updateField("cardHeadingColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div>
                            <h3>Button Colours</h3>
                            <hr className="border-none bg-slate-400 w-full h-[1px]" />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="add-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Add button background</label>
                            <input 
                                id="add-bg-color"
                                type="color" 
                                value={settings.addButtonColour}
                                onChange={updateField("addButtonColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="remove-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Remove button background</label>
                            <input
                                id="remove-bg-color"
                                type="color" 
                                value={settings.removeButtonColour}
                                onChange={updateField("removeButtonColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div>
                            <h3>Todo Colours</h3>
                            <hr className="border-none bg-slate-400 w-full h-[1px]" />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="completed-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Completed todo background</label>
                            <input 
                                id="completed-bg-color"
                                type="color" 
                                value={settings.completedTodoColour}
                                onChange={updateField("completedTodoColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="completedfont-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Completed font heading</label>
                            <input 
                                id="completedfont-bg-color"
                                type="color" 
                                value={settings.completedTodoFontHeadingColor}
                                onChange={updateField("completedTodoFontHeadingColor")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="completedfont-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Completed font text</label>
                            <input 
                                id="completedfont-bg-color"
                                type="color" 
                                value={settings.completedTodoFontTextColor}
                                onChange={updateField("completedTodoFontTextColor")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="auto-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Automatic todo background</label>
                            <input 
                                id="auto-bg-color"
                                type="color" 
                                value={settings.automaticTodoColour}
                                onChange={updateField("automaticTodoColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="autofont-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Automatic todo font</label>
                            <input 
                                id="autofont-bg-color"
                                type="color" 
                                value={settings.automaticTodoFontColor}
                                onChange={updateField("automaticTodoFontColor")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div>
                            <h3>Info Colours</h3>
                            <hr className="border-none bg-slate-400 w-full h-[1px]" />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="info-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Info icon</label>
                            <input
                                id="info-bg-color"
                                type="color" 
                                value={settings.infoColour}
                                onChange={updateField("infoColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="info-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Info background</label>
                            <input
                                id="info-bg-color"
                                type="color" 
                                value={settings.infoBgColour}
                                onChange={updateField("infoBgColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="info-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Info font</label>
                            <input
                                id="info-bg-color"
                                type="color" 
                                value={settings.infoFontColor}
                                onChange={updateField("infoFontColor")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>
                    </div>

                    <hr className="mb-5 border-none bg-slate-400 w-full h-[2px]" />

                    <div className="flex flex-row md:flex-row gap-5 justify-center sm:flex-row">
                        <input type="button" value="Reset" onClick={resetColorValues} className="cursor-pointer bg-none text-slate-500 border border-slate-200 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white active:scale-95 transition" />
                        <input type="submit" value="Save" className='cursor-pointer w-1/2 md:w-1/4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition' />
                    </div>
                </form>

                <div className='fixed inset-x-3 bottom-1 sm:left-auto sm:right-10 sm:w-md'>
                    {status === "processing" && <InputProcessing />}
                    
                    {status === "success" && (
                        <InputSuccess 
                            closeSuccess={() => setStatus("idle")} 
                            textContent="Your changes have been saved" 
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default SettingsModal;