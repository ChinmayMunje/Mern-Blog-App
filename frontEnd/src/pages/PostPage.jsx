import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ADD_COMMENT_BY_POST_ID, GET_ALL_COMMENTS_API, GET_POST_BY_ID_API, GET_ALL_CATEGORY_API } from '../services/api';
// import { BASE_URL } from '../config/helper';
// import { addComments } from '../services/post_Service';
import { isLoggedIn } from '../auth';
import { toast } from 'react-toastify';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const PostPage = () => {

    const { postId } = useParams();
    const [post, setPost] = useState('');
    const { currentUser } = useContext(UserContext);

    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const [categories, setCategories] = useState([])



    // const [comment, setComment] = useState([]);

    useEffect(() => {
        fetchData()

        axios.get(GET_ALL_COMMENTS_API + postId).then((res) => {
            setComments(res.data.data);
            console.log(res.data.data);

        }).catch((err) => {
            console.log(err);
        })

        axios.get(GET_ALL_CATEGORY_API).then((res) => {
            console.log(res?.data?.data);
            setCategories(res?.data?.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch(GET_POST_BY_ID_API + `${postId}`)

            const result = await response.json();
            setPost(result.data);
            console.log(result);

            console.log(result);
        } catch (err) {
            console.log("Error Data Not Found" + err);

        }
    }

    const printDate = (number) => {
        return new Date(number).toDateString();
    }

    const printUserName = (name) => {
        // return name.split('@')[0];
        let username = name.charAt(0).toUpperCase() + name.slice(1)
        let fullName = username.split('@')[0]

        return fullName;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post(ADD_COMMENT_BY_POST_ID + postId, { comment: commentText }, {
            headers: {
                Authorization: `Bearer ${currentUser?.data?.token}`, // Assuming your token is a Bearer token
                'Content-Type': 'application/json' // You may need to adjust content type as per your API requirement
            }
        }).then((res) => {
            console.log(res.data);
            setComments(prevComments => [...prevComments, res.data]);
            window.location.reload();
            setCommentText('');

        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <>
            <div className='px-6 md:px-20 lg:px-56 mt-10 flex flex-col items-start justify-start text-start py-10 md:py-20'>
                <p className='text-xs md:text-sm bg-gradient-to-r from-blue-900 to-blue-400 text-white p-2 m-2 rounded-[5px] capitalize'>
                    {categories.map((cat) => {
                        return cat._id === post.category ? cat.categoryName : ""
                    })}
                </p>

                <h3 className='text-2xl md:text-3xl font-bold'>{post.title}</h3>
                <div>
                    {post && (
                        <h3 className='text-sm md:text-base'>
                            Posted by <b>{post.creator === currentUser?.data?.data?._id ? currentUser?.data?.data?.username : ""}</b> on <b>{printDate(post.postDate)}</b>
                        </h3>
                    )}
                </div>
                <img src={`http://localhost:5000/uploads/images/${post.thumbnail}`} alt='post_Image' className='rounded-lg mt-5 mb-5 w-full' />
                <div dangerouslySetInnerHTML={{ __html: post.content }} />

                <div className='mt-10'>
                    <h3 className='text-lg md:text-xl font-bold'>Add Comment</h3>
                    <form onSubmit={submitHandler} className='mt-3 w-full'>
                        <div className='flex flex-col md:flex-row items-end border border-blue-900 rounded-lg p-4'>
                            <textarea rows="5" className='w-full md:w-2/3 focus:outline-none' placeholder='Enter your Comment here...' onChange={(e) => setCommentText(e.target.value)} value={commentText} />
                            <button type='submit' className='px-6 py-2.5 rounded-lg bg-blue-950 text-white font-semibold mt-2 md:ml-3'>Send</button>
                        </div>
                    </form>
                </div>

                <div className='mt-10'>
                    <h3 className='text-lg md:text-xl font-bold'>Comments ({comments && comments.length})</h3>
                    {comments && comments.map && comments.map((c, index) => (
                        <div key={index} className='flex items-start bg-[#F2F4F5] p-2 rounded-lg my-1'>
                            {c.comment}
                        </div>
                    ))}
                </div>
            </div>


        </>

    )
}

export default PostPage