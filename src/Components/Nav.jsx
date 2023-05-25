import React, { useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { BsBook } from 'react-icons/bs'
import { RiServiceLine } from 'react-icons/ri'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { FiMessageCircle } from 'react-icons/fi'
import me from '../Assets/me.jpg'
import '../App.css'
import Scrollspy from 'react-scrollspy'
const Nav = () => {
    const [activeNav, setactiveNav] = useState('#')

    return (
        <nav>
        <Scrollspy
            items={['home', 'about', 'education','skills','projects','contact']}
            currentClassName="active" >
             
            <a href="#home" className={activeNav === '#home' ? 'active' : ''} me={me} onClick={() => setactiveNav('#home')}><AiOutlineHome /></a>
            <a href="#about" className={activeNav === '#about' ? 'active' : ''} onClick={() => setactiveNav('#about')}><AiOutlineUser /></a>
            <a href="#education" className={activeNav === '#education' ? 'active' : ''} onClick={() => setactiveNav('#education')}><BsBook /></a>
            <a href="#skills" className={activeNav === '#skills' ? 'active' : ''} onClick={() => setactiveNav('#skills')} ><RiServiceLine /></a>
            <a href="#projects" className={activeNav === '#projects' ? 'active' : ''} onClick={() => setactiveNav('#projects')} ><AiOutlineFundProjectionScreen /></a>
            <a href="#contact" className={activeNav === '#contact' ? 'active' : ''} onClick={() => setactiveNav('#contact')} ><FiMessageCircle /></a>
        </Scrollspy>
            </nav>
    )
}

export default Nav