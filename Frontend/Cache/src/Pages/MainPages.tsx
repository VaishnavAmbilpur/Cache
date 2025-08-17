import NavBar from '../Componets/NavBar'
import NavBarMobile from '../Componets/NavBarMobile'
import { useState, useEffect, useContext, useRef } from 'react'
import Topbar from '../Componets/Topbar'
import Form from '../Componets/Singup'
import UserContext from "../Global"
import Button from '../Ui-Componets/Button'
import Login from '../Componets/Login'
import gsap from 'gsap'
import ContentCard from '../Ui-Componets/Card'

interface input {
  title: string,
}

const MainPages = (props: input) => {
  const [showLogin, setShowLogin] = useState(localStorage.getItem("token")); 
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const { login, setlogin } = useContext(UserContext) as { login: boolean; setlogin: React.Dispatch<React.SetStateAction<boolean>> };
  const [showauth,setshowauth] = useState(true)

  // Refs for animation
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

  // GSAP Animations
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
      bg-gradient-to-br from-flush-orange-100 via-flush-orange-200 to-flush-orange-300
      min-w-[425px] min-h-[940px] overflow-hidden
      md:min-h-screen md:min-w-screen flex text-flush-orange-950 flex-row
      animate-gradient-move
      bg-[length:200%_200%]
    "
    style={{ backgroundSize: '200% 200%' }}
  >
    <div ref={navRef} className="fixed left-0 top-0 h-full z-40">
      <NavBar hidden={!isMobile} />
      <NavBarMobile hidden={isMobile} />
    </div>
     <div ref={topbarRef} className="fixed top-0 right-0 z-40">
        <Topbar title={props.title} />
      </div>
    <div ref={contentRef} className="flex-1 flex flex-col ml-16 md:ml-56">
     
      {!login && (
        <div className="flex justify-center items-center ml-4 mt-10 text-sm">
          <div className="bg-flush-orange-50 rounded-2xl text-xs shadow-xl md:text-md w-80  p-5 md:p-10 flex flex-col items-center md:w-96  text-center border-2 border-flush-orange-200 font-roboto">
            <h2 className="md:text-3xl text-xl font-extrabold font-Static text-flush-orange-900 mb-4 tracking-tight">
              Welcome to Cache!
            </h2>
            <p className="mb-6 text-flush-orange-800 md:text-sm">
              Please <span className="font-bold text-flush-orange-800">log in</span> to add and manage your notes, videos, and more.
            </p>
            <div className='flex items-center'><Button varient='secondary' text="Login" onClick={() => {setshowauth(null)}} size="responsive"></Button></div>
          </div>
        </div>
      )}
      {login && (
        <div className="p-4 overflow-hidden">
          <ContentCard titleFilter={props.title} />
        </div>
      )}
    </div>
    {showLogin==null && (
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black bg-opacity-40 z-50">
        <div className="bg-flush-orange-50 rounded-lg p-6 shadow-lg relative">
          <button
            className="absolute top-2 right-2 p-4 font-extrabold text-flush-orange-950 hover:text-flush-orange-800 text-xl"
            onClick={() =>{ setShowLogin(!null)}}
          >
            X
          </button>
          <Form/>
        </div>
      </div>
    )}
    {!login && !showauth && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-flush-orange-50 rounded-lg p-6 shadow-lg relative">
          <button
            className="absolute top-2 right-2 p-4 font-extrabold text-flush-orange-950 hover:text-flush-orange-800 text-xl"
            onClick={() => setshowauth(c=>!c)}
          >
            X
          </button>
          <Login/>
        </div>
      </div>
    )}
  </div>
)
}

export default MainPages