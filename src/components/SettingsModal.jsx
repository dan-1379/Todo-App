import InputError from "./InputError";
import InputWarning from "./InputWarning";
import { X, Info } from "lucide-react";

const SettingsModal = ({ closeModal, handleSubmit, colorSettings }) => {
    return (
        <>
            <div className="bg-black/60 fixed inset-0 z-10 opacity-900" onClick={closeModal}></div>

            <div className="bg-black/50 fixed inset-0 z-30 text-white p-5 mt-auto mb-auto min-h-screen flex justify-center items-center">
                <div className="text-3xl flex gap-2 items-center bg-red-400 px-3 py-6 rounded-lg relative">
                    <h2 className="flex gap-2 items-center"><Info />Personalisation coming soon...</h2>
                    <button className="cursor-pointer absolute top-2 right-2 hover:bg-white hover:text-red-400 rounded-xl" onClick={closeModal}><X /></button>
                </div>
            </div>

            <div className="bg-white fixed inset-[3em] flex flex-col z-20 self-center m-[2em] rounded-xl p-10 lg:w-1/2 ml-auto mr-auto">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-slate-800">Settings</h2>
                    <button className="cursor-pointer absolute top-1 right-0 size-10 hover:text-white text-slate-500 rounded-full hover:bg-red-600 mx-1 my-0.5 duration-300 text-center ease-in-out flex items-center justify-center" onClick={closeModal}><X size={20}/></button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <h3>Heading Colours</h3>
                        <hr />
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Heading background colour</label>
                        <input
                            disabled
                            id="bg-color"
                            type="color" 
                            value={colorSettings.headingBgColour}
                            // onChange={(e) => setTodoColor(e.target.value)}
                            className='size-8 rounded border border-slate-300 cursor-pointer'
                        />
                    </div>

                     <div className='flex justify-between items-center gap-2'>
                        <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Font heading colour</label>
                        <input
                            disabled
                            id="bg-color"
                            type="color" 
                            // value={todoColor}
                            // onChange={(e) => setTodoColor(e.target.value)}
                            className='size-8 rounded border border-slate-300 cursor-pointer'
                        />
                    </div>

                    <div>
                        <h3>Background Colours</h3>
                        <hr />
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Background colour</label>
                        <input
                            disabled
                            id="bg-color"
                            type="color" 
                            // value={todoColor}
                            // onChange={(e) => setTodoColor(e.target.value)}
                            className='size-8 rounded border border-slate-300 cursor-pointer'
                        />
                    </div>

                    <div className='flex justify-between items-center gap-2'>
                        <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Card background colour</label>
                        <input 
                            disabled
                            id="bg-color"
                            type="color" 
                            // value={todoColor}
                            // onChange={(e) => setTodoColor(e.target.value)}
                            className='size-8 rounded border border-slate-300 cursor-pointer'
                        />
                    </div>

                    <div>
                        <h3>Button Colours</h3>
                        <hr />
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Add button colour</label>
                        <input
                            disabled 
                            id="bg-color"
                            type="color" 
                            // value={todoColor}
                            // onChange={(e) => setTodoColor(e.target.value)}
                            className='size-8 rounded border border-slate-300 cursor-pointer'
                        />
                    </div>

                    <div className='flex justify-between items-center gap-2'>
                        <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Remove button colour</label>
                        <input
                            disabled
                            id="bg-color"
                            type="color" 
                            // value={todoColor}
                            // onChange={(e) => setTodoColor(e.target.value)}
                            className='size-8 rounded border border-slate-300 cursor-pointer'
                        />
                    </div>

                    <div>
                        <h3>Todo Colours</h3>
                        <hr />
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Completed todo colour</label>
                        <input 
                            disabled
                            id="bg-color"
                            type="color" 
                            // value={todoColor}
                            // onChange={(e) => setTodoColor(e.target.value)}
                            className='size-8 rounded border border-slate-300 cursor-pointer'
                        />
                    </div>

                    <div className='flex justify-between items-center gap-2'>
                        <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Automatic todo colour</label>
                        <input 
                            disabled
                            id="bg-color"
                            type="color" 
                            // value={todoColor}
                            // onChange={(e) => setTodoColor(e.target.value)}
                            className='size-8 rounded border border-slate-300 cursor-pointer'
                        />
                    </div>

                    <div>
                        <h3>Info Colours</h3>
                        <hr />
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <label htmlFor="bg-color" className='text-sm text-slate-600 whitespace-nowrap'>Info colour</label>
                        <input
                            disabled
                            id="bg-color"
                            type="color" 
                            // value={todoColor}
                            // onChange={(e) => setTodoColor(e.target.value)}
                            className='size-8 rounded border border-slate-300 cursor-pointer'
                        />
                    </div>

                    <input disabled type="submit" value="Save your changes" className='cursor-pointer w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition' />
                </form> 
            </div>
        </>
    )
}

export default SettingsModal;