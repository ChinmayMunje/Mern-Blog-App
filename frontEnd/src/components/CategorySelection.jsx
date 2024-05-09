import React, { useEffect, useState } from 'react'
import { GET_ALL_CATEGORY_API } from '../services/api';
import axios from 'axios'

const CategorySelection = ({ onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState([]);

    useEffect(() => {
        fetchCategoryData()
    }, [])

    const fetchCategoryData = async () => {
        try {
            axios.get(GET_ALL_CATEGORY_API).then((res)=>{
                setSelectedCategory(res.data);
                console.log(res.data);
            }).catch((err)=>{
                console.log(err);
            })
            // const response = await fetch(GET_ALL_CATEGORY_API,{
            //     method: "GET"
            // });

            // const result = await response.json();
            // setSelectedCategory(result);
            // console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='flex flex-wrap justify-center gap-2 md:gap-4'>
                <button className='bg-blue-950 rounded-lg p-2 md:p-3' defaultChecked onClick={() => onSelectCategory('All')}>All</button>
                {console.log(selectedCategory)}
                {selectedCategory && selectedCategory?.data?.map((item, index) => {
                    return (
                        <button key={index} className={`bg-blue-950 rounded-lg p-2 md:p-3`} onClick={() => onSelectCategory(item._id)}>{item.categoryName}</button>
                    )
                })}
            </div>

        </>
    )
}

export default CategorySelection

