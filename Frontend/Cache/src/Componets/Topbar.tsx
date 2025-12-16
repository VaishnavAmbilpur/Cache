import Button from "../Ui-Componets/Button"
import { useState, useEffect } from "react"
import { IoCreate } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

interface input {
  title: String
}

const Topbar = (props: input) => {
  const [, setIsDesktop] = useState(window.innerWidth >= 412);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 412);
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className='backdrop-blur-2xl ml-4 flex justify-between p-4 w-[348px] md:w-[500px] max-h-16 items-center text-xl font-roboto lg:w-[1290px] '>
        <div className="text-md font-extralight  md:text-2xl">
            {props.title}
        </div>
        <div className="flex justify-between gap-2 font-roboto">
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