import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";


const Search = () => {

    const filterPost = (categoryItem) => {
        const updateItem = selectedCategory.filter((currentCategory) => {
            return currentCategory === categoryItem;
        });
        setSelectedCategory(updateItem);

    }
    return (
        <div className='py-20'>
            <div className='flex justify-center mt-8 flex-col px-5 md:px-20 lg:px-40'>
                <div className='bg-white shadow-lg p-3 rounded-lg mt-[-20px] md:mt-0 mx-auto md:mx-0 max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] flex items-center'>
                    <AiOutlineSearch className='text-2xl md:text-3xl text-gray-400' />
                    <input type="text" placeholder='Search' className='outline-none ml-2 w-full' />
                </div>
            </div>
        </div>

    )
}

export default Search