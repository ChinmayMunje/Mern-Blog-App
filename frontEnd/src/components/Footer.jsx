import React from 'react'
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";



const Footer = () => {
  return (
    <>
      <div className="bg-gray-800 text-white absolute left-0 right-0 p-4 mt-4 w-full">
        <div className='px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4'>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='flex items-start flex-col'>
              <p className='font-medium tracking-wide text-gray-300'>Category</p>
              <ul className='mt-2 space-y-2 text-start'>
                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-blue-700'>Android Development</a></li>
                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-blue-700'>Web Development</a></li>
                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-blue-700'>Front End Development</a></li>
                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-blue-700'>Cloud Computing</a></li>
                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-blue-700'>DevOps</a></li>
              </ul>
            </div>
            <div className='flex items-start flex-col'>
              <p className='font-medium tracking-wide text-gray-300'>Resources</p>
              <ul className='mt-2 space-y-2 text-start'>
                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-blue-700'>Forum</a></li>
                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-blue-700'>Open Source</a></li>
                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-blue-700'>Projects</a></li>
                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-blue-700'>Support</a></li>
                <li><a href="" className='text-gray-500 transition-colors duration-300 hover:text-blue-700'>Careers</a></li>
              </ul>
            </div>
            <div className='md:max-w-md lg:col-span-2 lg:mt-0 mt-5 text-start'>
              <p className='font-medium tracking-wide text-gray-300'>Subscribe for Updates</p>
              <form className='mt-4 flex flex-col sm:flex-row'>
                <input type="email" name='email' id='email' className='flex-grow w-full h-12 px-4 mb-3 sm:mr-2 sm:mb-0 transition duration-200 bg-white border border-gray-300 rounded shadow-sm focus:border-blue-400 focus:outline-none' />
                <button type='submit' className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-blue-700 focus:outline-none border'>Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row'>
          <p className='text-sm text-gray-500'>Copyright 2023 | All right reserved.</p>
          <div className='flex items-center mt-4 space-x-4 sm:mt-0'>
            <a href="" className='text-gray-500 transition-all duration-300 hover:text-blue-400'><FaTwitter className='h-6 w-6' /></a>
            <a href="" className='text-gray-500 transition-all duration-300 hover:text-blue-400'><FaInstagram className='h-6 w-6' /></a>
            <a href="" className='text-gray-500 transition-all duration-300 hover:text-blue-400'><FaFacebookF className='h-6 w-6' /></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer