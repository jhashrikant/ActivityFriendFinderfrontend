import React from 'react'
import styles from "./Navbar.module.css"
import { Link} from 'react-router-dom'

const NAV_LINKS = [
  {
    id: 1,
    label: "Home",
    path: "/"
  },
  {
    id: 2,
    label: "Recommendations",
    path: "/Recommendations"
  },
  {
    id: 3,
    label: "Login",
    path: "/Login"
  },
  {
    id: 4,
    label: "Signup",
    path: "/Signup"
  }
]


const Navbar = () => {
  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.logo}>Activity Friend Finder</Link>
      <nav className={styles.nav}>
        {NAV_LINKS?.map(({ id, label, path }) => {
          return (
            <Link key={id} to={path}>{label}</Link>
          )
        })}
      </nav>
    </header>
  )
}

export default Navbar
