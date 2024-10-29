import React, { useState } from 'react'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { NAV_LINKS } from '../../helpers/utils';


const Navbar = () => {

  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const handletoggleMenu = () => {
    setIsDropdownActive((prev) => !prev)
  }

  return (
    <header className={styles.header}>
      <Link to={'/'} className={styles.logo}>Activity Friend Finder</Link>
      <nav role='navigation' className={`${styles.nav} ${isDropdownActive ? styles.active : ''}`}>
        {NAV_LINKS?.map(({ id, label, path }) => {
          return (
            <Link key={id} onClick={()=>setIsDropdownActive(false)} to={path}>{label}</Link>
          )
        })}
      </nav>

      {/* hamburger icon*/}
      <GiHamburgerMenu data-testid="hamburgerIcon" onClick={handletoggleMenu} className={styles.hamburgermenu} role='button' aria-expanded={handletoggleMenu} />

    </header>
  )
}

export default Navbar
