import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
const Footer = ()=>{
    return (
      
      <footer  className='w-full  bg-black text-white h-auto p-2 '>
        <Link target="_blank" to='https://github.com/nuttawat25243' className='flex justify-end text-gray-400 text-center gap-2  font-light  '>
         Powered by React.js and TailwindCSS  <FontAwesomeIcon className=' p-1 text-white' icon={faGithub} />
        </Link>
      </footer>
      
    );
  }


export default Footer;