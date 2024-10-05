import React, { useState } from 'react'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";

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

  const [hamburgerActive, setHamburgerActive] = useState(false)
  const handleshowNav = () => {
    setHamburgerActive((prev) => !prev)
  }


  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.logo}>Activity Friend Finder</Link>
      <nav className={`${styles.nav} ${hamburgerActive ? styles.active : ''}`}>
        {NAV_LINKS?.map(({ id, label, path }) => {
          return (
            <Link onClick={()=>setHamburgerActive(false)} key={id} to={path}>{label}</Link>
          )
        })}
      </nav>

      {/* mobile mode */}
      <GiHamburgerMenu onClick={handleshowNav} className={styles.hamburgermenu} aria-expanded={hamburgerActive} />

    </header>
  )
}

export default Navbar
