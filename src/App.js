
import './App.css';
import About from './Components/About';
import Contact from './Components/Contact';
import Educations from './Components/Educations';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Projects from './Components/Projects';

import Skills from './Components/Skills';

function App() {
  return (
    <div className="App">
     <Header/>
     
     <About/>
     <Educations/>
     <Skills/>
     <Projects/>
     <Contact/>  
     <Footer/>  
    </div>
  );
}

export default App;
