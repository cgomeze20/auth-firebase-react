import { NavLink } from 'react-router-dom'
import styles from '../Styles/Navbar.module.css'

export const Navbar = () => {

  const { Navbar } = styles

  return (
    <nav className={Navbar}>
      <NavLink to='/signup'>SigUp</NavLink>
      <NavLink to='/login'>SigIn</NavLink>
      <NavLink to='/tasks'>Tasks</NavLink>
      <NavLink to='/settings'>Settings</NavLink>
    </nav>
  )
}
