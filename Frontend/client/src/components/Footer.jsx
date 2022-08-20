import React from 'react'
import { AiOutlineCopyright } from "react-icons/ai"
import ContactMe from './ContactMe'
import "./Footer.css"

const Footer = () => {
  return (
    <div className='foot'>
        <p>Videogames <span className='app'>App</span></p>
        <ContactMe />
        <div className='copyR'>
            <p><AiOutlineCopyright /> Copyright</p>  
        </div>
    </div>
  )
}

export default Footer