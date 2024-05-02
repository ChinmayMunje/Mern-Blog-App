import React, { useEffect, useState } from 'react'
import { GET_ALL_CATEGORY_API } from '../services/api';

const CategorySelection = ({ onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState([]);

    useEffect(() => {
        fetchCategoryData()
    }, [])

    const fetchCategoryData = async () => {
        try {
            const response = await fetch(GET_ALL_CATEGORY_API);

            const result = await response.json();
            setSelectedCategory(result);
            // console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button className='bg-blue-950 rounded-lg p-2' onClick={() => onSelectCategory('All')}>All</button>
            {/* {console.log(selectedCategory)} */}
            {selectedCategory && selectedCategory?.data?.map((item, index) => {
                return (
                    <>
                        <button className={`bg-blue-950 rounded-lg p-2`}
                            onClick={() => onSelectCategory(item._id)}>{item.categoryName}</button>
                    </>
                )
            })}
        </>
    )
}

export default CategorySelection

