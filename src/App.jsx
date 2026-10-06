import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Cocktails from './components/Cocktails.jsx'
import About from './components/About.jsx'
import Art from './components/Art.jsx'
import Menu from './components/Menu.jsx'
import Contact from './components/Contact.jsx'

gsap.registerPlugin(ScrollTrigger, SplitText);

// iOS Stability Configuration
if (typeof window !== 'undefined') {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if ('ontouchstart' in window) {
    ScrollTrigger.normalizeScroll(true);
  }
}

const App = () => {
 return (
	<main>
	 <Navbar />
	 <Hero />
	 <Cocktails />
	 <About />
	 <Art />
	 <Menu />
	 <Contact />
	</main>
 )
}

export default App
