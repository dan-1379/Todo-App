import InputError from "./InputError";
import InputWarning from "./InputWarning";
import { X, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { DEFAULT_COLOUR_SETTINGS } from "../constants/colourSettings";
import InputSuccess from "./InputSuccess";

const SettingsModal = ({ closeModal, handleSubmit, colorSettings }) => {
    const [settings, setSettings] = useState({
        ...DEFAULT_COLOUR_SETTINGS,
        ...colorSettings
    });

    const [isInputSuccess, setIsInputSuccess] = useState(false);

     const updateField = (field) => (e) => {
        setSettings(s => ({ ...s, [field]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(settings);
        setIsInputSuccess(true);
        // closeModal();
    };

    const resetColorValues = () => {
        setSettings(DEFAULT_COLOUR_SETTINGS);
        handleSubmit(DEFAULT_COLOUR_SETTINGS);
        setIsInputSuccess(true);
    };

   useEffect(() => {
        if (!isInputSuccess) return;

        const timer = setTimeout(() => {
            setIsInputSuccess(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, [isInputSuccess]);

    return (
        <>
            <div className="bg-black/60 fixed inset-0 z-10 opacity-900" onClick={closeModal}></div>

            {/* <div className="bg-black/50 fixed inset-0 z-30 text-white p-5 mt-auto mb-auto min-h-screen flex justify-center items-center">
                <div className="text-3xl flex gap-2 items-center bg-red-400 px-3 py-6 rounded-lg relative">
                    <h2 className="flex gap-2 items-center"><Info />Personalisation coming soon...</h2>
                    <button className="cursor-pointer absolute top-2 right-2 hover:bg-white hover:text-red-400 rounded-xl" onClick={closeModal}><X /></button>
                </div>
            </div> */}

            <div className="text-center md:text-left bg-white fixed inset-[3em] flex flex-col z-20 self-center m-[2em] rounded-xl p-10 lg:w-1/2 ml-auto mr-auto">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-slate-800">Settings</h2>
                    <button className="cursor-pointer absolute top-1 right-0 size-10 hover:text-white text-slate-500 rounded-full hover:bg-red-600 mx-1 my-0.5 duration-300 text-center ease-in-out flex items-center justify-center" onClick={closeModal}><X size={20}/></button>
                </div>

                <hr className="mb-5 text-slate-300 w-full h-[1px]" />

                <form onSubmit={onSubmit} className="flex flex-col gap-5 h-90">
                    <div className="overflow-y-scroll flex flex-col gap-3">
                        <div>
                            <h3>Heading Colours</h3>
                            <hr />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="heading-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Heading background colour</label>
                            <input
                                id="heading-bg-color"
                                type="color" 
                                value={settings.headingBgColour}
                                onChange={updateField("headingBgColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="font-heading-color" className='text-sm text-slate-600 whitespace-nowrap'>Font heading colour</label>
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
                            <hr />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Background colour</label>
                            <input
                                id="bg-color"
                                type="color" 
                                value={settings.bgColour}
                                onChange={updateField("bgColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="card-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Card background colour</label>
                            <input 
                                id="card-bg-color"
                                type="color" 
                                value={settings.cardBgColour}
                                onChange={updateField("cardBgColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="heading-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Card heading colour</label>
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
                            <hr />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="add-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Add button colour</label>
                            <input 
                                id="add-bg-color"
                                type="color" 
                                value={settings.addButtonColour}
                                onChange={updateField("addButtonColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="remove-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Remove button colour</label>
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
                            <hr />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="completed-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Completed todo colour</label>
                            <input 
                                id="completed-bg-color"
                                type="color" 
                                value={settings.completedTodoColour}
                                onChange={updateField("completedTodoColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="completedfont-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Completed font heading colour</label>
                            <input 
                                id="completedfont-bg-color"
                                type="color" 
                                value={settings.completedTodoFontHeadingColor}
                                onChange={updateField("completedTodoFontHeadingColor")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="completedfont-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Completed font text colour</label>
                            <input 
                                id="completedfont-bg-color"
                                type="color" 
                                value={settings.completedTodoFontTextColor}
                                onChange={updateField("completedTodoFontTextColor")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="auto-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Automatic todo colour</label>
                            <input 
                                id="auto-bg-color"
                                type="color" 
                                value={settings.automaticTodoColour}
                                onChange={updateField("automaticTodoColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="autofont-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Automatic todo font colour</label>
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
                            <hr />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                            <label htmlFor="info-bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Info colour</label>
                            <input
                                id="info-bg-color"
                                type="color" 
                                value={settings.infoColour}
                                onChange={updateField("infoColour")}
                                className='size-8 rounded border border-slate-300 cursor-pointer'
                            />
                        </div>
                    </div>

                    <hr className="mb-5 text-slate-300 w-full h-[1px]" />

                    <div className="flex flex-row md:flex-row gap-5 justify-center sm:flex-row">
                        <input type="submit" value="Save" className='cursor-pointer w-1/2 md:w-1/4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition' />
                        <input type="button" value="Reset" onClick={resetColorValues} className="cursor-pointer bg-none text-slate-500 border border-slate-200 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white active:scale-95 transition" />
                    </div>
                </form>

                <div className='fixed inset-x-3 bottom-10 sm:left-auto sm:right-10 sm:w-md'>
                    {isInputSuccess && <InputSuccess closeSuccess={() => setIsInputSuccess(false)} textContent="Your changes have been saved successfully" />}
                </div>
            </div>
        </>
    )
}

export default SettingsModal;