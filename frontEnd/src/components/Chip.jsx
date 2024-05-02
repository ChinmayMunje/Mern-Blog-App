import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GET_ALL_CATEGORY_API } from '../services/api'

const Chip = ({label}) => {
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    axios.get(GET_ALL_CATEGORY_API).then((res)=>{
      console.log(res.data.data);
      setCategories(res?.data?.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <>
            <p className='sm:text-xs bg-gradient-to-r from-blue-900 to-blue-400 text-white p-2 m-2 rounded-[5px] w-fit transform: capitalize'>{
              categories.map((cat)=>{
                return cat._id === label ? cat.categoryName: ""
              })
            }</p>

    {/* {categories.map((cat)=>{
      return (
        <p className='sm:text-xs bg-gradient-to-r from-blue-900 to-blue-400 text-white p-2 m-2 rounded-[5px] w-fit transform: capitalize'>{label === cat._id?cat.categoryName:""}</p>
      )
    })} */}
    </>
    
  )
}

export default Chip