import React,{useEffect} from 'react'
import me from '../Assets/me.jpg'
import 'aos/dist/aos.css'
import AOS from 'aos'
const About = () => {

    useEffect(() => {
        AOS.init()
      
       
      }, [])
    return (
        <section id='about'>
            <div className="container mt-5">
                <div className="row" id='about_me-flex'>
                    <h1 className='text-center mt-5 fw-bold ' data-aos="fade-down" id='About_head_mobile' >About me</h1>

                    <div className="col-6" id='contact_main'>
                        <div className="img_contact mt-5" data-aos="flip-left" >
                            <img src={me} alt="" id='about_me'  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="about_details mt-5 mb-5" >
                            <h5 className='contact_details_head' data-aos="fade-up" >Myself Tufail Akram , I am a fullstack developer</h5>
                            <h5 className='mt-3 mb-5' id='contact_details_child' data-aos="fade-up">I am graduated with bachelor of computer science in 2021.
                                I am potential person and i have worked on several projects while pursuing coaching of
                                Fullstack development in <br /> (HTML,CSS,JAVASCRIPT,<br />PYTHON(Django)). <br />
                                I don't have any work experience yet, however i have good knowledge in following language.
                                I am risk taker and  love to accept take challenges,whatever work assigned in project . I completed in given time period.
                            </h5>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default About