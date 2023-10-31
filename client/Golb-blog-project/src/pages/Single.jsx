import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link,useLocation,useNavigate} from 'react-router-dom';
import Menu from '../components/Menu';
import { useState,useEffect,useContext } from 'react';
import { AuthContext } from "../context/authcontext.jsx";
import axios from 'axios';
import moment from 'moment';
const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);
  
  const handleDelete = async() =>{
    try{
      await axios.delete(`/api/posts/${postId}`);
      navigate('/');
    }catch(err){

    }
  }

  return (
    <div className='max-w-7xl m-auto'>
      <div className='flex mx-8 mt-4 gap-8'>
        <div className='flex flex-col gap-4 w-3/4'>

          <img src={`../upload/${post?.img}`} alt="" />
          
          <div className=' flex items-center'>
          {post.userImg && <img
            src={post.userImg}   alt=""/>}
          
          <div>
                <h3 className='font-bold'>John</h3>
                <p>Posted {moment(post.date).fromNow()}</p>
              </div>
             {currentUser.username === post.username && ( 
              <div className='flex'>
                <Link to="/write?edit=2 " state={post} className='flex items-center justify-center bg-green-200 rounded-full w-6 h-6 mr-1 ' >
                <FontAwesomeIcon   icon={faPen}  size='xs'/>
                </Link>
                <Link o className='flex items-center justify-center bg-red-300 rounded-full w-6 h-6 '>
                <FontAwesomeIcon onClick={handleDelete} icon={faTrash} size='xs' />
                </Link>
              </div>
               )}    
          
          </div>

          <div className='mb-24'>
            <h1 className='text-xl font-bold my-2'>
               {post.title}
            </h1>
            <p className='mt-2  '>
            {getText(post.desc)}

            </p>
            {post.id >= 1 && post.id <= 10 && (
            <Link to={post.ref} className='bg-white underline  float-right text-black my-12  p-1 '>Reference.</Link>
            )}
          </div>
            
      </div>
        <div className='w-1/4'>
          <Menu cat={post.cat} />
        </div>

    </div>
  
  </div>
  );
};

export default Single;