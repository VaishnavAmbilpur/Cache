import NavBar from '../Componets/NavBar'
import NavBarMobile from '../Componets/NavBarMobile'
import { useState, useEffect, useContext, useRef } from 'react'
import Topbar from '../Componets/Topbar'
import UserContext from "../Global"
import Button from '../Ui-Componets/Button'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import ContentCard from '../Ui-Componets/Card'

interface input {
  title: string,
}

const MainPages = (props: input) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const { login} = useContext(UserContext) as { login: boolean; setlogin: React.Dispatch<React.SetStateAction<boolean>> };
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);
  const topbarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize();
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

 useEffect(() => {
  if (navRef.current) {
    gsap.fromTo(
      navRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }
  if (topbarRef.current) {
    gsap.fromTo(
      topbarRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );
  }
  if (contentRef.current) {
    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power2.out" }
    );
  }
}, []);


return (
   <div
    className="
      bg-black
      min-w-[425px] min-h-[940px] overflow-hidden
      md:min-h-screen md:min-w-screen flex text-white flex-row
      animate-gradient-move
    "
    style={{ backgroundSize: '200% 200%' }}
  >
    <div ref={navRef} className="fixed left-0 top-0 h-full z-40">
      <NavBar hidden={!isMobile} />
      <NavBarMobile hidden={isMobile} />
    </div>
     <div ref={topbarRef} className="ml-1 fixed top-0 right-2 z-40">
        <Topbar title={props.title} />
      </div>
    <div ref={contentRef} className="flex-1 flex flex-col ml-16 md:ml-56">
     
      {!login && (
        <div className="flex justify-center items-center ml-4 mt-20 text-sm">
          <div className="bg-gray-800 rounded-2xl text-xs shadow-xl md:text-md w-80  p-5 md:p-10 flex flex-col items-center md:w-96  text-center border-2 border-gray-600 font-roboto">
            <h2 className="md:text-3xl text-xl font-extrabold font-Static text-white mb-4 tracking-tight">
              Welcome to Cache!
            </h2>
            <p className="mb-6 text-gray-300 md:text-sm">
              Please <span className="font-bold text-white">log in</span> to add and manage your notes, videos, and more.
            </p>
            <div className='flex flex-col items-center gap-4'>
              <Button varient='secondary' text="Login" onClick={() => navigate("/login")} size="responsive" />
              <p className="text-gray-400 text-sm">Don't have an account? <span className="text-blue-400 cursor-pointer" onClick={() => navigate("/signup")}>Sign up</span></p>
            </div>
          </div>
        </div>
      )}
      {login && (
        <div className="flex justify-center items-center p-4 overflow-hidden">
          <ContentCard titleFilter={props.title} />
        </div>
      )}
    </div>
  </div>
)
}

export default MainPages