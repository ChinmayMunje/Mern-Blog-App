import React from 'react'
import { useNavigate } from 'react-router-dom'

const Modal = ({ open, onClose, children }) => {
    if (!open) return null
    const navigate = useNavigate()

    const handleModal = (e) => {
        if (e.target.id === "wrapper") onClose()
    }
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center top-0 left-0 w-full h-full' id="wrapper" onClick={handleModal}>
            <div className='w-full md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] flex flex-col'>
                <div className='text-black text-xl place-self-end cursor-pointer' onClick={onClose}>X</div>
                <div className='bg-white px-5 md:px-10 py-5 md:py-10 rounded-2xl border-2 border-gray-100'>
                    {children}
                </div>
            </div>
        </div>

    )
}

export default Modal