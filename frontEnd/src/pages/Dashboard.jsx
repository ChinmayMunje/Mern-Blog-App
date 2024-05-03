import React, { useEffect, useState, useContext } from 'react'
import BlogPostForm from '../components/BlogPostForm'
// import { getCurrentUserDetails } from '../auth';
// import { BASE_URL } from '../config/helper';
import BlogItems from '../components/BlogItems';
import { UserContext } from '../context/userContext';
const Dashboard = () => {

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    setUser(currentUser);
    // fetchData()
  }, [])

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(BASE_URL + `/user/${getCurrentUserDetails().id}/posts`)

  //       const result = await response.json();
  //       setPosts([...result])
  //       console.log(result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-3">
        <BlogPostForm />
      </div>
      {/* <h1 className='my-3 flex text-2xl text-start font-semibold'>Post Count :({posts.length})</h1>
      <div className='pt-4 grid grid-cols-3 gap-6'>
        {posts.map((blog, index) => {
          return (
            <BlogItems blog={blog} key={blog.id} />
          )
        })}
      </div> */}
    </>
  )
}

export default Dashboard