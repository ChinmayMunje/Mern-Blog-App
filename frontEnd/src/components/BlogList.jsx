import React, { useContext, useState } from 'react'
import BlogItems from './BlogItems';
import { useEffect } from 'react';
import { GET_ALL_POST_API, GET_POST_BY_USER, GET_ALL_CATEGORY_API } from '../services/api';
import ReactPaginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import CategorySelection from '../components/CategorySelection';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Search from './Search';

const BlogList = ({ searchQuery }) => {

    const [postContent, setPostContent] = useState(
        {
            content: [],
            totalPages: '',
            totalElements: '',
            pageSize: '',
            lastPage: false,
            pageNumber: ''
        }
    );

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [pageNumber, setPageNumber] = useState(0);
    const postPerPage = 12;
    const pagesVisited = pageNumber * postPerPage;



    const { currentUser } = useContext(UserContext);


    useEffect(() => {

        axios.get(GET_POST_BY_USER + `/${currentUser?.data?.data?._id}`, {
            headers: {
                Authorization: `Bearer ${currentUser?.data?.token}`, // Assuming your token is a Bearer token
                'Content-Type': 'application/json' // You may need to adjust content type as per your API requirement
            }
        }).then((res) => {
            setPostContent({ content: res.data.data })
        }).catch((err) => {
            console.log(err);
        });

        axios.get(GET_ALL_CATEGORY_API).then((res) => {
            setSelectedCategory(res?.data?.data)
        }).catch((err) => {
            console.log(err);
        })

    }, [])

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setPageNumber(0);
    }


    console.log(postContent?.content);

    const filteredBlogs = selectedCategory === 'All' ? postContent.content : postContent?.content?.filter(blog => blog.category === selectedCategory);

    const searchResult = searchQuery.trim();
    
    const matchTitlePost = searchResult ? postContent?.content?.filter(blog => blog.title.toLowerCase().includes(searchResult.toLowerCase())) : null;

    const finalFilteredBlogs = searchResult ? matchTitlePost : filteredBlogs


    const pageCount = Math.ceil(finalFilteredBlogs?.length / postPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    return (
        <>
            {/* <Search/> */}
            <div className='flex flex-col justify-center items-center gap-6'>
                <div className='flex justify-center gap-10 text-white'>
                    <CategorySelection onSelectCategory={handleCategoryChange} />
                </div>

                <h1 className='text-2xl md:text-3xl text-center'>Blogs Count ({finalFilteredBlogs?.length})</h1>

                <div className='pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {finalFilteredBlogs?.sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
                        .slice(pagesVisited, pagesVisited + postPerPage)
                        .map(blog => <BlogItems blog={blog} key={blog.id} />)}
                </div>

                <ReactPaginate
                    breakLabel={<span className='mr-4'>...</span>}
                    nextLabel={
                        <span className='w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md'>
                            <BsChevronRight onClick={() => changePage} />
                        </span>
                    }
                    onPageChange={changePage}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel={
                        <span className='w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md mr-4'>
                            <BsChevronLeft onClick={() => changePage} />
                        </span>
                    }
                    containerClassName="flex items-center justify-content-center mt-8 mb-4"
                    pageClassName="block border- border-solid border-gray-200 hover:bg-gray-300 w-10 h-10 p-1 flex items-center justify-center rounded-md mr-4"
                    pageLinkClassName=''
                    activeClassName="bg-blue-950 text-white"
                />
            </div>

        </>
    )
}

export default BlogList