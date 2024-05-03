import axios from 'axios';
import React, { useEffect, useMemo, useState, useContext } from 'react'
import { ADD_POST_API, GET_ALL_CATEGORY_API } from '../services/api';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
import { getCurrentUserDetails, getToken } from '../auth';
// import { createPost, uploadImage } from '../services/post_Service';
import { toast } from 'react-toastify';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';


const BlogPostForm = () => {
    const editor = useRef(null);
    const [categories, setCategories] = useState([])
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryName: '',
        thumbnail: null
    })

    const { currentUser } = useContext(UserContext);


    // const [image, setImage] = useState(null);

    useEffect(() => {
        // setUser(currentUser);

        const fetchData = async () => {
            try {
                const response = await fetch(GET_ALL_CATEGORY_API)

                const result = await response.json();
                setCategories(result.data);
                // console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    /////// HANDLE CHANGE FOR REST OF INPUT FIELDS

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((posts) => ({
            ...posts,
            [name]: value
        }))

        // if (name === 'categoryId') {
        //     // Find the category object by its name and set its ID
        //     const category = categories.find(cat => cat.categoryName === value);
        //     if (category) {
        //         setPost((prevState) => ({
        //             ...prevState,
        //             categoryId: category._id // Set the category ID
        //         }));
        //     }
        // } else {
        //     // For other fields, update directly
        //     setPost((prevState) => ({
        //         ...prevState,
        //         [name]: value
        //     }));
        // }
    }

    /// HANDLE IMAGE CHANGE
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setPost({
            ...post,
            thumbnail: file
        });
    };

    ///// HANDLE CHANGE FOR JODIT EDITOR

    const contentHandleChange = (data) => {
        setPost({ ...post, 'content': data })
    }

    // { console.log("Bearer " + currentUser?.data?.token) }




    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(post);

        // Create FormData object to send form data including the image

        // try {
        //     const formData = new FormData();
        //     formData.append('title', post.title);
        //     formData.append('category', post.categoryName);
        //     formData.append('content', post.content);
        //     formData.append('thumbnail', post.thumbnail);

        //     console.log("CATEGORY TYPE "+typeof(post.categoryName));

        //     const response = await fetch(ADD_POST_API, {
        //         method: 'POST',
        //         headers: {
        //             Authorization: `Bearer ${currentUser?.data?.token}`,
        //             // 'Content-Type': 'multipart/form-data'
        //         },
        //         body: formData,
        //     });
        //     const data = await response.json();
        //     console.log(data); // Handle response from server
        //     toast.success("Post Created Successfully !!")

        //     setPost({
        //         title: '',
        //         content: '',
        //         categoryName: '',
        //         thumbnail: ''
        //     })
        // }
        // catch (error) {
        //     console.log(error);
        //     // toast.error("Failed to Create Post !!")

        // }

        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('category', post.categoryName);
        formData.append('content', post.content);
        formData.append('thumbnail', post.thumbnail);

        axios.post(ADD_POST_API, formData, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${currentUser?.data?.token}`,
                // 'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res.data);
            toast.success("Post Created Successfully !!")


            setPost({
                title: '',
                content: '',
                categoryId: '',
                thumbnail: ''
            })
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to Create Post !!")
        })
    }


    return (
        <div className='py-8 md:py-20'>
            <div className="w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto p-4 bg-white rounded-md shadow-md">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-start">Create a Post</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2 text-start">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2 text-start">Category</label>
                        <select
                            name="categoryName"
                            onChange={handleChange}
                            value={post.categoryName}
                            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            required
                        >
                            <option value={0}>---Choose a Category---</option>
                            {categories && categories.map && categories.map((category) => (
                                <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2 text-start">Choose Cover Image</label>
                        <input type="file" id="image" onChange={handleImageChange} className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2 text-start">Content</label>
                        <JoditEditor
                            className='text-left'
                            ref={editor}
                            value={post.content}
                            onChange={newContent => contentHandleChange(newContent)}
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:border-blue-800"
                        >
                            Create Post
                        </button>
                        <button
                            type="reset"
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:bg-red-500"
                        >
                            Reset Content
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default BlogPostForm