import Button from "../Ui-Componets/Button"
import { useState, useEffect, useContext } from "react"
import { IoCreate } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { IoLogOut } from "react-icons/io5"
import { IoSearch } from "react-icons/io5"
import axios from "axios"
import UserContext from "../Global"
interface input {
  title: String
  contracted?: boolean
}

const Topbar = (props: input) => {
  const compact = !!props.contracted
  const [, setIsDesktop] = useState(window.innerWidth >= 412);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { setlogin, setToken, token } = useContext(UserContext)!;
  
  const LogOut = ()=>{
    setlogin(false);
    setToken("");
    navigate("/login");
  }

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      alert("Please enter a search query");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/search`,
        { query: searchValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.Contents) {
        console.log("Search results:", response.data.Contents);
        alert(`Found ${response.data.Contents.length} matching notes`);
        // You can add more logic here to display search results
      }
    } catch (error: any) {
      alert("Error searching: " + (error.response?.data?.error || error.message));
    }
  }

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 412);
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const containerClass = compact
    ? 'backdrop-blur-2xl ml-5 flex justify-between gap-x-6 p-2 w-auto max-h-12 items-center text-sm font-roboto lg:w-[1290px]'
    : 'backdrop-blur-2xl ml-5 flex justify-between gap-x-36 p-4 w-auto max-h-16 items-center text-xl font-roboto lg:w-[1290px]'

  return (
    <div className={containerClass}>
      <div className={compact ? "text-sm font-bold text-white" : "text-md font-bold md:text-2xl text-white"}>
        {props.title}
      </div>

      <div className={compact ? "flex justify-between gap-x-1 font-roboto items-center" : "flex justify-between gap-x-2 font-roboto"}>
        <Button
          varient="primary"
          size="responsive"
          text="Logout"
          startIcon={<IoLogOut />}
          onClick={() => {LogOut()}}
        />
        <Button
          varient="primary"
          size="responsive"
          text="Create"
          startIcon={<IoCreate />}
          onClick={() => navigate("/create")}
        />
      </div>

    </div>
  )
}

export default Topbar