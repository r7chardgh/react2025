import { Link } from "react-router-dom"
const Nav = () => {
    return (
        <nav className=' absolute top-0 left-0 flex gap-4 m-auto w-full justify-center z-30 my-4'>
            <Link className='border py-2 px-4 capitalize font-semibold' to='/'>home</Link>
            <Link className='border py-2 px-4 capitalize font-semibold' to='/about'>about</Link>
        </nav>
    )
}

export default Nav