import Logo from "../Componets/Logo.png"
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { IoLinkSharp } from "react-icons/io5";

import { FaHouse } from "react-icons/fa6";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "../index.css"
import { Link} from "react-router";
interface NavBarProps {
  hidden: boolean;
}

const NavBar = (props: NavBarProps) => {

  return (
    <>
      {props.hidden && (
        <div className='min-h-screen max-w-fit flex flex-col p-3 text-white bg-white/10 backdrop-blur-md border border-white rounded-lg m-2 shadow-lg'>
          <div className="w-50 flex gap-4 mt-1 flex-wrap items-center font-Static tracking-tighterfont-extrabold text-2xl md:w-48">
            <img className="h-8 ml-3 w-8 md:h-9 md:w-9 font-extrabold" src={Logo} alt="Logo" />
            <span className="text-white">Cache</span>
          </div>
<div className="flex flex-col mt-6 font-semibold text-white">
  <div className="flex flex-row items-center gap-3 m-3">
    <Link
      to="/"
      className="hover:bg-white/20 hover:text-white rounded-lg p-2 transition-all duration-300 delay-75 hover:translate-y-0.5 hover:scale-100"
    >
      <FaHouse size={21} />
    </Link>
    Home
  </div>
  <div className="flex flex-row items-center gap-3 m-3">
    <Link
      to="/twitter"
      className="hover:bg-white/20 hover:text-white rounded-lg p-2 transition-all duration-300 delay-75 hover:translate-y-0.5 hover:scale-100"
    >
      <FaXTwitter size={21} />
    </Link>
    Tweets
  </div>
  <div className="flex flex-row items-center gap-3 m-3">
    <Link
      to="/Videos"
      className="hover:bg-white/20 hover:text-white rounded-lg p-2 transition-all duration-300 delay-75 hover:translate-y-0.5 hover:scale-100"
    >
      <FiYoutube size={21} />
    </Link>
    Videos
  </div>
 
  <div className="flex flex-row items-center gap-3 m-3">
    <Link
      to="/Links"
      className="hover:bg-white/20 hover:text-white rounded-lg p-2 transition-all duration-300 delay-75 hover:translate-y-0.5 hover:scale-100"
    >
      <IoLinkSharp size={21} />
    </Link>
    Links
  </div>
  
 
</div>
        </div>
      )}
     
    </>
  );
}

export default NavBar