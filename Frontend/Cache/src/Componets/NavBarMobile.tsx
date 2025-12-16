import Logo from "../assets/Logo.png"
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { IoLinkSharp } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "../index.css"
import { Link } from "react-router-dom";
interface NavBarProps {
  hidden: boolean;
}
const NavBarMobile = (props: NavBarProps) => {

  return (
    <>
        {props.hidden && (
          <div className='min-h-[950px] max-w-fit flex flex-col p-3 border-2 items-center text-white'>
            <div className="w-10 flex gap-2  flex-wrap items-center font-Static font-extrabold text-2xl md:w-60">
              <img className="ml-1 h-8 w-8 font-extrabold" src={Logo} alt="Logo" />
              <span className="text-white">Cache</span>
            </div>
            <div className="flex flex-col mt-6 font-extralight">
    <div className="flex flex-row items-center gap-3 m-3">
      <Link
        to="/"
        className="hover:bg-gray-700 hover:text-white rounded-lg p-2 transition-all duration-300 delay-75 hover:translate-y-1 hover:scale-100"
      >
        <FaHouse size={21} />
      </Link>
    </div>
    <div className="flex flex-row items-center gap-3 m-3">
      <Link
        to="/twitter"
        className="hover:bg-gray-700 hover:text-white rounded-lg p-2 transition-all duration-300 delay-75 hover:translate-y-1 hover:scale-100"
      >
        <FaXTwitter size={21} />
      </Link>
    </div>
    <div className="flex flex-row items-center gap-3 m-3">
      <Link
        to="/Videos"
        className="hover:bg-gray-700 hover:text-white rounded-lg p-2 transition-all duration-300 delay-75 hover:translate-y-1 hover:scale-100"
      >
        <FiYoutube size={21} />
      </Link>
    </div>
 
    <div className="flex flex-row items-center gap-3 m-3">
      <Link
        to="/Links"
        className="hover:bg-gray-700 hover:text-white rounded-lg p-2 transition-all duration-300 delay-75 hover:translate-y-1 hover:scale-100"
      >
        <IoLinkSharp size={21} />
      </Link>
    </div>
    
  
  </div>
          </div>
        )}

    </>
  );
};

export default NavBarMobile;