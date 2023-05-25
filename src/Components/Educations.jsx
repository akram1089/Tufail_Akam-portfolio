import React ,{useEffect} from 'react'
import { MdSchool } from 'react-icons/md'
import Edu from '../Assets/Edu.png'
import 'aos/dist/aos.css'
import AOS from 'aos'
const Educations = () => {
  useEffect(() => {
    AOS.init()
  
   
  }, [])
  return (
    <section id='education' className='mt-5'>
      <div className="container mt-5">
        <h1 className='text-center fw-bold mt-5' id='Edu_head' data-aos="fade-down" >Education</h1>
        <div className="row align-items-center " id='edu_mobile'>
          <div className="col-8 mt-5 " id='edu_mobile' >

            <div className="dev_course d-flex" data-aos="fade-right">
              <div className="icons fs-1"><MdSchool /></div>
              <div className="dev_course_content">
                <h5>2022-2023</h5>
                <h2>Fullstack Developer Course</h2>
              </div>
            </div>


            <div className="college_course d-flex" data-aos="fade-right">
              <div className="icons fs-1"><MdSchool /></div>
              <div className="college_course_content">
                <h5>2018-2021</h5>
                <h2>Bachelor of Computer Application
                </h2>
                <h3>NIIS Group of Institutions</h3>
              </div>
            </div>

            <div className="inter_course d-flex" data-aos="fade-right">
              <div className="icons fs-1"><MdSchool /></div>
              <div className="inter_course_content">

                <h5>2014-2018</h5>
                <h2> Inter is PCM
                </h2>
                <h3>Chandra_shekar College, Champua</h3>
              </div>
            </div>

          </div>
          <div className="col-4 mt-5" id='edu_png' data-aos="fade-up">
            <img src={Edu} alt="" />
          </div>
        </div>
      </div>


    </section>
  )
}

export default Educations