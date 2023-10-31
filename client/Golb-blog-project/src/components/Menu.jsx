import React from 'react'
import { Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { AiOutlineArrowRight } from 'react-icons/ai';
const Menu = ({cat}) => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <>
         <h1 className='text-xl mb-4   font-bold'>Other posts you may like</h1>
        {posts.map((post) => (
        <div className=" gap-12  flex flex-col gap-2 mb-12 " key={post.id}>
        <div className="">
            <div className="relative">
            <Link className="link" to={`/post/${post.id}`}>
            <img className="w-full  h-64 z-20 relative" src={`../upload/${post?.img}`} alt="" />
            </Link>
            </div>
        </div>
        <div className="">
            <Link className="link" to={`/post/${post.id}`}>
            <h1 className='text-xl font-semibold hover:underline  mb-4'>{post.title}</h1>
            </Link>
            <Link to={`/post/${post.id}`} className='group mt-4 flex w-max items-center hover:text-blue-500'>
                  <div  className='flex mr-1 font-semibold border-black border-b-2 group-hover:border-blue-700'>
                    Read More
                  </div>
                  <AiOutlineArrowRight className='text-center items-center group-hover:border-blue-700' size={'15'} />
              </Link>
        </div>
        </div>
  ))} 
    </>
  )
}

export default Menu