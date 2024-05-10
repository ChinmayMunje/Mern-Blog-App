import React, { useContext, useEffect, useState } from 'react'
import Chip from '../components/Chip'
import { Link } from 'react-router-dom';
// import { BASE_URL } from '../config/helper';
// import { getCurrentUserDetails, isLoggedIn } from '../auth';
import { UserContext } from '../context/userContext';

const BlogItems = ({ blog }) => {

    const [user, setUser] = useState(undefined);
    const [login, setLogin] = useState(null);

    const { currentUser } = useContext(UserContext);
    const [categories, setCategories] = useState([])

    useEffect(() => {

    }, [])

    useEffect(() => {
        setUser(currentUser);
        // setLogin(isLoggedIn());
    }, [])

    // console.log(currentUser?.data?.data);

    const printDate = (number) => {
        return new Date(number).toDateString();
    }

    const printUserName = (name) => {
        // return name.split('@')[0];
        let username = name.charAt(0).toUpperCase() + name.slice(1)
        let fullName = username.split('@')[0]
        return fullName;
    }


    const { _id, title, content, creator, category, thumbnail, image, postDate } = blog;
    return (
        <>
            <div className='flex flex-col h-auto md:h-[485px] rounded-lg shadow-lg shadow-gray-400'>
                <img src={`https://mern-blog-app-wv1b.onrender.com/uploads/images/${thumbnail}`} alt='cover' className='w-full h-[250px] md:h-[200px] object-cover rounded-t-lg mb-2 md:mb-0' />

                <Chip label={category} />

                <h3 className='mt-2 mb-1 text-start p-2 font-medium text-lg md:text-xl'>{title}</h3>

                <p className='line-clamp-2 text-gray-600 text-start p-2 text-sm md:text-base' dangerouslySetInnerHTML={{ __html: content.substring(20) + "..." }}></p>

                <div className='flex items-center mt-2 justify-between p-2'>
                    <div className='flex items-center'>
                        <img src={"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} alt="avatarIcon" className='w-10 h-10 md:w-[40px] md:h-[40px] rounded-full mr-2 object-cover' />
                        <div>
                            <h6 className='text-start font-bold text-sm md:text-base'>{creator === user?.data?.data?._id ? user?.data?.data?.username : ""}</h6>
                            <p className='font-semibold text-xs md:text-sm text-black text-start'>Posted on {printDate(postDate)}</p>
                        </div>
                    </div>
                    <Link to={`/posts/${_id}`} className='no-underline text-inherit grad'>Read More ➜</Link>
                </div>
            </div>

        </>
    )
}

export default BlogItems