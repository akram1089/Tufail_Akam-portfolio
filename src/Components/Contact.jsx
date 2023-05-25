
import { AiOutlineMail } from 'react-icons/ai'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import React, { useRef, useState ,useEffect } from 'react';
import emailjs from 'emailjs-com';
import 'aos/dist/aos.css'
import AOS from 'aos'
const Contact = () => {
  const [success, setsuccess] = useState(false)
  const [warning, setwarning] = useState(false)
  useEffect(() => {
    AOS.init()
  
   
  }, [])

  const form = useRef()
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_amcley6', 'template_26d7qyr', form.current, 'ALb9iCXF21YQKlvbK')

    setsuccess(true)
  

    e.target.reset()
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
        setwarning(true)
      });
  };
  const dismiss=()=>{
    setsuccess(false)
  }
  return (
    <section id='contact'>
      {success ? <div class="alert alert-succes bg-success alert-dismissible fade show " id='alert' role="alert">
        <strong>Your message has been sent</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={dismiss}></button>
      </div> : ""}
      {warning ? <div class="alert alert-warning bg-warning alert-dismissible fade show " id='alert' role="alert">
        <strong>Your message has not been sent</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={dismiss}></button>
      </div> : ""}
      <div className="container mb-5 " id='Contact_title'>
        <h1 className='text-center mb-5 mt-5' data-aos="fade-down" >Contact me</h1>
        <div className="row mb-5" id='contact_row'>
          <div className="col-5" id='contact_ways'>

            <div className="Email text-center" data-aos="fade-right">
              <div className="icon_contact fs-3"><AiOutlineMail /></div>
              <div className="title_contact">Email</div>
              <div className="email_address"> tufailakram81@gmail.com</div>
              <div > <a href="mailto:tufailakram81@gmail.com" target='_blank'  rel="noreferrer" className="send_message">send a message</a> </div>
            </div>

            <div className="Email text-center" data-aos="fade-right">
              <div className="icon_contact fs-3"><AiOutlineLinkedin /></div>
              <div className="title_contact">Linked in</div>
              <div className="email_address"> Tufail Akram</div>
              <div > <a href="https://www.linkedin.com/in/tufail-akram-a2719b123/" target='_blank'  rel="noreferrer" className="send_message">send a message</a> </div>
            </div>

            <div className="Email text-center" data-aos="fade-right">
              <div className="icon_contact fs-3"><AiOutlineWhatsApp /></div>
              <div className="title_contact">WhatsApp</div>
              <div className="email_address"> +917008566127</div>
              <div > <a href="https://api.whatsapp.com/send?phone=7008566127" target='_blank'  rel="noreferrer" className="send_message">send a message</a> </div>
            </div>

          </div>
          <div className="col-7" id='contact_ways' data-aos="fade-down">

            <form ref={form} onSubmit={sendEmail} >
              <input type="text" className='form-control' name='name' placeholder='Your Full Name' required /> <br />
              <input type="text" className='form-control' name='email' placeholder=' Full Email' required /> <br />
              <textarea className='form-control' name='message' cols="30" rows="8" placeholder='Your message'></textarea> <br />
              <button className='button btn btn-success text-dark'>Send Message</button>
            </form>
          </div>
        </div>
      </div>



    </section>
  )
}

export default Contact