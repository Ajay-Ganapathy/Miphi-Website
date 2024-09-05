
import React from 'react'

import { useState , useEffect } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

import Modal2 from './Modal2';
import styles from "./card.modules.css"
const truncateContent = (content, length = 100) => {
  if (content.length <= length) return content;
  return content.slice(0, length) + '...';
};


const Card = (props) => {
    const revertedBlogs = []
  return (
    <div>
              

<main class="">
          
          <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400 w-100 h-100">
          <div class="grid grid-cols-12 gap-6">
                        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                          
                            <div class="col-span-12 mt-8">
                             
                                 <div>
      {/* <Blogs user = {props.user}/> */}

      <section class="text-black mt-12">
        <div class="max-w-screen-xl px-4 py-15 mx-auto sm:px-6 lg:px-8">
       { 
        props.revertedBlogs.length > 0 &&
        <div class="max-w-lg mx-auto text-center">
          
          <h1 className={styles.mainHeading+" mb-16 pb-2 font-bold sm:text-xl text-2xl md:text-3xl text-center"}>
            Reverted 
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              Blogs
            </span>
            <div className={styles.bottomLine}></div>
          </h1>
        </div>}

          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">        
          {
             props.revertedBlogs.length > 0 &&
             revertedBlogs.map((blog) => {
              return(

            
                <div className={`${styles.boxBorder} block p-8 transition-shadow shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10`}>
                <img src={`${process.env.REACT_APP_API_URL}/${blog.image_url}`} alt="Blog Image" className="w-full h-auto rounded-t-xl" />
              
                
                <h3 className="mt-4 text-xl font-bold text-center text-indigo-600">
                {blog.blog_title}
                </h3>
                
                <div className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 120) }}></div>
                
                <div className="mt-4 flex justify-between items-center">
                  <Link to={`/author/blogs/${blog.id}`} state={{ blog }} className="btn bg-teal-500 text-white hover:bg-teal-600 py-2 px-4 rounded">
                    Read More
                  </Link>
                  
                  <Link to={`/author/blogs/${blog.id}/edit`} state={{ blog }} className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded">
                    Edit
                  </Link>


                  <Modal2 title = "Remarks" remarks = {blog.remarks}  />
                </div>
              </div>
            
  
              
  
             
                )
             })
             
          }

      </div>    
         
        

        </div>
      </section>

     
    </div>
    </div>
                                <div class="flex items-center h-10 intro-y">
                                    
                                </div>
                            </div>
                        </div>
            </div>
      </main>
          
    </div>
  )
}

export default Card