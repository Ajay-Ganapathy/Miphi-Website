import React from 'react'
import Home from './Home'
import { Routes , Route } from 'react-router-dom'

const Base = () => {
  return (
    <Routes>
      

    <Route path = "/home" element = {<Home />} />

   

    
  </Routes>
  )
}

export default Base