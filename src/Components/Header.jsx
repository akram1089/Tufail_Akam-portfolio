import React, { useEffect, useState } from 'react'
import '../App.css'
import Fortfolio from '../Assets/Fortfolio.pdf'
import me from '../Assets/me.jpg'
import Nav from './Nav'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { BsLinkedin, BsGithub } from 'react-icons/bs'
import { TypeAnimation } from 'react-type-animation'
import { Blurhash } from 'react-blurhash'
import { LazyLoadImage } from 'react-lazy-load-image-component';
const Header = () => {

    const [imageLoaded, setImageLoaded] = useState(false)
    useEffect(() => {
        AOS.init()
        const img = new Image()
        img.onload = () => {
            setImageLoaded(true)
        }
        img.src = me
    }, [])

    return (
        <>
            <section id="home">
                <div className="container header  text-center mt-5">
                    <h5 className='mt-5' data-aos="fade-down">Hello i'm</h5>
                    <h1 data-aos="fade-right" >Tufail Akram</h1>
                    <h5 className='text-light ' data-aos="fade-up"> <TypeAnimation
                        sequence={[
                            'Full-stack Developer', // Types 'One'
                            1000, // Waits 1s
                            'Front-End Developer', // Deletes 'One' and types 'Two'
                            2000, // Waits 2s
                            'Back-End Developer', // Types 'Three' without deleting 'Two'
                            () => {
                                // Place optional callbacks anywhere in the array
                            }
                        ]}
                        wrapper="div"
                        cursor={true}
                        repeat={Infinity}
                        style={{ fontSize: '1em' }}
                    />
                    </h5>
                    <div className="cta align-center">
                        <a href={Fortfolio} data-aos="fade-right" download className='button btn btn-outline-success'> Download CV</a>
                        <a href="#contact" data-aos="fade-left" id='contact_me' className='button btn btn-success'>Contact Us</a>
                    </div>
                    <div className="me mt-5 ">
                        {
                            !imageLoaded && (
                                <Blurhash
                                    hash="L+L4?Kae?bt7~UWV%MofIVWVRPjZ"
                                    width=" 294 "
                                    height= " 403 "
                                    resolutionX={32}
                                    resolutionY={32}
                                    punch={1}
                                    id='me'
                                    style={{  borderRadius: "14px"}}

                                />
                            )
                        }
                        { imageLoaded &&
                             <LazyLoadImage src={me} alt="" id='me' data-aos="flip-left"     effect="blur" className='' />
                        }
                    </div>
                    <div className="social_me">
                        <div className="up_bar"></div>
                        <a href="https://www.linkedin.com/in/tufail-akram-a2719b123/"><BsLinkedin /></a>
                        <a href="https://github.com/akram1089"><BsGithub /></a>
                        <div className="down_bar"></div>

                    </div>
                </div>
            </section>
            <Nav />

        </>
    )
}

export default Header