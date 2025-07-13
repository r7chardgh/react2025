import { FaCoffee, FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"
const Nav = () => {
    return (
        <nav className=' absolute top-0 left-0 flex gap-4 m-auto w-full justify-center z-30 my-4'>
            <Link className='flex justify-center items-center gap-1 py-2 px-4 capitalize font-semibold' to='/'><FaHome/>home</Link>
            <Link className='flex justify-center items-center gap-1 py-2 px-4 capitalize font-semibold' to='/about'><FaCoffee/>about</Link>
        </nav>
    )
}

export default Nav