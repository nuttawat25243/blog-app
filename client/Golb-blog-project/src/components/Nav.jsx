import React, { Component, useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { IoIosArrowDown,IoMdPerson } from "react-icons/io";
import 'tailwindcss/tailwind.css';
import { AuthContext } from "../context/authcontext.jsx";
const Nav = () => {
  const { currentUser,logout } = useContext(AuthContext);
  const [showUl,setShowUl] = useState(false);

    return (
      <>
        <div className='shadow '>
          <div className='mx-8  flex justify-between text-black p-4'>
          <div className='flex'>
            <Link to="/ " className='p-4 text-4xl flex mr-8 '><div className='font-bold'>GLO</div>Blog</Link>
            <div className="flex items-center " onMouseEnter={() => setShowUl(true)} onMouseLeave={() => setShowUl(false)}>
              <div className=' flex  hover:cursor-default xl:hidden '>Categories <IoIosArrowDown className='m-1 mt-2'/></div>
              <div className='absolute  top-20 xl:relative xl:items-center    xl:top-0 '>
              <ul className={`p-2 xl:flex gap-8  flex flex-col xl:flex-row  bg-white shadow xl:shadow-none   ${showUl ? 'flex  ' : 'hidden xl:block '}`}>
                <Link className='px-1 text-[14px] hover:text-blue-500 p-0.5 font-semibold uppercase '   to="/categories/?cat=art">art and culture</Link>
                <Link className='px-1 text-[14px] hover:text-blue-500 p-0.5 font-semibold u  uppercase' to="/categories/?cat=business">business</Link>
                <Link className='px-1 text-[14px] hover:text-blue-500 p-0.5 font-semibold u uppercase'  to="/categories/?cat=cinema">movie review</Link>
                <Link className='px-1 text-[14px] hover:text-blue-500 p-0.5 font-semibold u uppercase'  to="/categories/?cat=food">food and health</Link>
                <Link className='px-1 text-[14px] hover:text-blue-500 p-0.5 font-semibold u uppercase'  to="/categories/?cat=technology">technology</Link>
             
              </ul>
              </div>
              </div>
            </div>
            <div className='flex items-center gap-4'>
       
              {currentUser ? (
              <div className='flex gap-4'>
                    <div className='flex gap-2  p-2 px-4 rounded-full'><span ><IoMdPerson  size={'24'}/></span>{currentUser?.username}</div>
                    <span className="border-[1px] border-black rounded-full p-2 px-4 hover:bg-black cursor-pointer hover:text-white ease-in duration-100 " onClick={logout}>Log out</span>
              </div>
              ) : (
                <Link className="border-[1px] border-black rounded-full p-2 px-4 hover:bg-black hover:text-white ease-in duration-100" to="/login">
                  Login
                </Link>
              )}
              <Link to='/write' className="bg-blue-500 text-white border border-blue-500  rounded-full p-2 px-4 hover:bg-blue-400 hover:text-white ease-in duration-100 " >Create Your Blog</Link>
            </div>
          </div>
        </div>
      </>
      
    );
  }

export default Nav;