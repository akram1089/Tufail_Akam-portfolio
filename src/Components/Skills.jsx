import React,{useEffect} from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'
import 'aos/dist/aos.css'
import AOS from 'aos'
const Skills = () => {
  useEffect(() => {
    AOS.init()
  
   
  }, [])
  return (
    <section id='skills'>
      <div className="container">
        <h1 className='text-center mt-5' id='Skills_head' data-aos="fade-down">My Skills</h1>
        <div className="row mt-5"id='Skills_mobile'>
          <div className="col-6" id='width_mobile'>

            <div className="frontent_dev mt-5" data-aos="fade-up">
              <h3 className='text-center mb-3 ' id='frontend_head' >Frontend Development</h3>
              <div className="skills_content">
                <div className="row" id='Skills_mobile' >

                  <div className="col-6 d-flex mb-3 " id='skills_gap'>
                    <div className="skills_icons"><BsPatchCheckFill /></div>
                    <h4>HTML</h4>

                  </div>

                  <div className="col-6 d-flex mb-3" id='skills_gap'>
                    <div className="skills_icons"><BsPatchCheckFill /></div>
                    <h4>CSS</h4>
                  </div>

                  <div className="col-6 d-flex mb-3 " id='skills_gap'>
                    <div className="skills_icons"><BsPatchCheckFill /></div>
                    <h4>JAVASCRIPT</h4>

                  </div>

                  <div className="col-6 d-flex mb-3" id='skills_gap'>
                    <div className="skills_icons"><BsPatchCheckFill /></div>
                    <h4>BOOTSTRAP</h4>
                  </div>

                  <div className="col-6 d-flex mb-3 " id='skills_gap'>
                    <div className="skills_icons"><BsPatchCheckFill /></div>
                    <h4>REACT</h4>

                  </div>

                  <div className="col-6 d-flex mb-3" id='skills_gap'>
                    <div className="skills_icons"><BsPatchCheckFill /></div>
                    <h4>JQUERY</h4>
                  </div>

                </div>
              </div>
            </div>

          </div>

          <div className="col-6"id='width_mobile'>

            <div className="frontent_dev mt-5" data-aos="fade-down">
              <h3 className='text-center mb-3 ' id='frontend_head'>Backend Development</h3>
              <div className="skills_content">
                <div className="row"id='Skills_mobile'>

                  <div className="col-6 d-flex mb-3 " id='skills_gap'>
                    <div className="skills_icons"><BsPatchCheckFill /></div>
                    <h4>PYTHON(Django)</h4>

                  </div>

                  <div className="col-6 d-flex mb-3" id='skills_gap'>
                    <div className="skills_icons"><BsPatchCheckFill /></div>
                    <h4>MYSQL</h4>
                  </div>

                  <div className="col-6 d-flex mb-3 " id='skills_gap'>
                    <div className="skills_icons"><BsPatchCheckFill /></div>
                    <h4>SQ-LITE</h4>

                  </div>



                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills