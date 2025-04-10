import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss'

function Navbar() {
  return (
   <nav>
    <ul className={styles.ul}>
        <li><Link  to="/">Lista</Link></li>
        <li><Link  to="/Details">Detalles</Link></li>
    </ul>
   </nav>
  )
}

export default Navbar
