import React, { useEffect } from 'react'
import Landing from '../Assets/SellO/Landing.png'
import Filtered_data from '../Assets/SellO/Filtered_data.png'
import Upload_data from '../Assets/SellO/Upload_data.png'
import Bulk_data from '../Assets/SellO/Bulk_data.png'
import Alldata from '../Assets/SellO/Alldata.png'
import Crud_Operaion from '../Assets/SellO/Crud_Operaion.png'
import mobile_landing from '../Assets/SellO/mobile_landing.png'
import mobile_nav from '../Assets/SellO/mobile_nav.png'
import Carousel from 'react-bootstrap/Carousel';
import 'aos/dist/aos.css'
import AOS from 'aos'
import Screenshot1 from "./Datas/Destop_img/Screenshot1.png"
import Screenshot2 from "./Datas/Destop_img/Screenshot2.png"
import Screenshot3 from "./Datas/Destop_img/Screenshot3.png"
import Screenshot4 from "./Datas/Destop_img/Screenshot4.png"
import Screenshot5 from "./Datas/Destop_img/Screenshot5.png"
import Screenshot6 from "./Datas/Destop_img/Screenshot6.png"
import Screenshot7 from "./Datas/Destop_img/Screenshot7.png"
import Screenshot8 from "./Datas/Destop_img/Screenshot8.png"
import Screenshot9 from "./Datas/Destop_img/Screenshot9.png"
import Screenshot10 from "./Datas/Destop_img/Screenshot10.png"
import Screenshot11 from "./Datas/Destop_img/Screenshot11.png"
import Screenshot12 from "./Datas/Destop_img/Screenshot12.png"
import Screenshot13 from "./Datas/Destop_img/Screenshot13.png"
import Screenshot from "./Datas/Mobile_img/Screenshot.png"
import Screenshot14 from "./Datas/Mobile_img/Screenshot14.png"
import Screenshot15 from "./Datas/Mobile_img/Screenshot15.png"
import Screenshot16 from "./Datas/Mobile_img/Screenshot16.png"

const Projects = () => {
  useEffect(() => {
    AOS.init()



  }, [])
  return (
    <section id='projects' >
      <div className="container">
        <h1 className='text-center mt-5 mb-2' id='projects' data-aos="fade-down">Projects</h1>





        <div className="row mb-5" id='mobile_project'>
          <div className='d-flex justify-content-center  mt-5 ' data-aos="fade-down"><h2 id='sello_title'>Sell,O</h2></div>
          <div className="col-6" id='project_col_mobile'>
            <div className="project_title">

              <h3 className='text-center mt-2 ' id='desktop_version' data-aos="fade-up">Desktop Version</h3>
            </div>
            <div className="project_imgs">
              <Carousel className='mt-5' data-aos="fade-down">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Landing}
                    alt="First slide"
                  />
                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Filtered_data}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Upload_data}
                    alt="Third slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Bulk_data}
                    alt="Third slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Alldata}
                    alt="Third slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Crud_Operaion}
                    alt="Third slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
              <div className="project_details ">
                <h5><span className='projects_details_title' >Sell,O</span> is mobile selling application , Here a customer can shop new branded phones , used , refurbished and more</h5>
              </div>
            </div>

          </div>
          <div className="col-6" id='project_col_mobile'>

            <h3 className='text-center mt-2 ' id='desktop_version' data-aos="fade-up">Mobile Version</h3>

            <Carousel className='mt-5' data-aos="fade-down">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={mobile_landing}
                  alt="First slide"
                />
                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={mobile_nav}
                  alt="Second slide"
                />

                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>

            </Carousel>
            <div className="demo d-flex mt-4 justify-content-around ">
              <div className="demo_section">
                <button className="btn btn-success "><a href="https://github.com/akram1089/Sell-O" className='text-dark text-decoration-none' rel='noreferrer'  target='_blank'>Live Demo</a></button>
              </div>
              <div className="source_section">
                <button className="btn btn-success text-dark"><a href="https://github.com/akram1089/Sell-O" className='text-dark text-decoration-none' rel='noreferrer'  target='_blank'>Source Code</a></button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5" id='mobile_project'>
          <div className='d-flex justify-content-center  mt-5 ' data-aos="fade-down"><h2 id='sello_title'>Explore Kendujhar</h2></div>
          <div className="col-6" id='project_col_mobile'>
            <div className="project_title">

              <h3 className='text-center mt-2 ' id='desktop_version' data-aos="fade-up">Desktop Version</h3>
            </div>
            <div className="project_imgs">
              <Carousel className='mt-5' data-aos="fade-down">

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot1}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot2}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot3}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot4}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot5}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot6}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot7}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot8}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot9}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot10}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot11}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot12}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={Screenshot13}
                    alt="Second slide"
                  />

                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>


              </Carousel>





              <div className="project_details ">
                <h5><span className='projects_details_title' >Explore Kendujhar</span> is mobile selling application , Here a customer can shop new branded phones , used , refurbished and more</h5>
              </div>
            </div>

          </div>
          <div className="col-6" id='project_col_mobile'>

            <h3 className='text-center mt-2 ' id='desktop_version' data-aos="fade-up">Mobile Version</h3>

            <Carousel className='mt-5' data-aos="fade-down">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={Screenshot}
                  alt="First slide"
                />
                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={Screenshot14}
                  alt="Second slide"
                />

                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={Screenshot15}
                  alt="Second slide"
                />

                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={Screenshot16}
                  alt="Second slide"
                />

                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>

            </Carousel>
            <div className="demo d-flex mt-4 justify-content-around ">
              <div className="demo_section">
                <button className="btn btn-success "><a href="https://explorekendujhar.netlify.app/" className='text-dark text-decoration-none' rel='noreferrer'  target='_blank'>Live Demo</a></button>
              </div>
              <div className="source_section">
                <button className="btn btn-success text-dark"><a href="https://github.com/akram1089/Explore-Kendujhar" className='text-dark text-decoration-none' rel='noreferrer'  target='_blank'>Source Code</a></button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}

export default Projects