
import React from 'react'

import { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import { Link } from 'react-router-dom';
import Form from '../../Components/Form';
import Navbar from '../../Components/Navbar';

const Home = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <div>
      
      
<div className={`flex h-screen bg-gray-800 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>


<Sidebar />

<div class="flex flex-col flex-1 w-full overflow-y-auto">

<Navbar />
<main class="">
          
          <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400 w-100 h-100">
          <div class="grid grid-cols-12 gap-6">
                        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                          
                            <div class="col-span-12 mt-8">
                             
                            <Form />
                                <div class="flex items-center h-10 intro-y">
                                    
                                </div>
                            </div>
                        </div>
            </div>
            </div>
      </main>
          
       
    </div>


     

  
        </div>
      </div>
  )
}

export default Home;