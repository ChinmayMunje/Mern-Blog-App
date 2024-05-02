import React, { useContext, useEffect, useState } from 'react'
import Chip from '../components/Chip'
import { Link } from 'react-router-dom';
// import { BASE_URL } from '../config/helper';
// import { getCurrentUserDetails, isLoggedIn } from '../auth';
import { UserContext } from '../context/userContext';

const BlogItems = ({ blog }) => {

    const [user, setUser] = useState(undefined);
    const [login, setLogin] = useState(null);

    const {currentUser} = useContext(UserContext);
    const [categories, setCategories] = useState([])

  useEffect(() => {
 
  }, [])

    useEffect(()=>{
        setUser(currentUser);
        // setLogin(isLoggedIn());
    },[])

    // console.log(currentUser?.data?.data);

    const printDate = (number) => {
        return new Date(number).toDateString();
    }

    const printUserName = (name)=>{
        // return name.split('@')[0];
        let username = name.charAt(0).toUpperCase() + name.slice(1)
        let fullName = username.split('@')[0]
        return fullName;
    }


    const { _id, title, content,creator, category,thumbnail, image, postDate } = blog;
    return (
        <>
            <div className='flex flex-col h-[485px] rounded-[20px] shadow-lg shadow-gray-400'>
                <img src={`http://localhost:5000/uploads/images/${thumbnail}`} alt='cover' className='w-full h-[250px] object-cover rounded-[20px] mb-[0.5rem]'/>

                <Chip label={category} />
                <h3 className='mt-2 mr-0 mb-1 ml-0 text-start p-2 font-medium'>{title}</h3>
                <p className='line-clamp-2 text-gray-600 text-start p-2' dangerouslySetInnerHTML={{__html: content.substring(20)+"..."}}></p>

                <div className='flex items-center mt-2 justify-between p-2'>
                    <div className='flex items-center'>
                        <img src={"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} alt="avatarIcon" className='w-[40px] h-[40px] rounded-[50%] mr-2 object-cover' />
                        <div>
                    <h6 className='text-start font-bold'>{creator === user?.data?.data?._id ? user?.data?.data?.username: ""}</h6>
                    <p className='font-semibold sm:text-xs text-black text-start'>Posted on {printDate(postDate)}</p>
                </div>
                    </div>
                    <Link to={`/posts/${_id}`} className='no-underline text-inherit grad'>Read More ➜</Link>

                </div>
            </div>
        </>
    )
}

export default BlogItems