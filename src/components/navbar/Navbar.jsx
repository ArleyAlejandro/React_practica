import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.ul}>
        <li>
          <Link to="/">Lista desde API</Link> {/* Ruta para la lista desde la API */}
        </li>
        <li>
          <Link to="/Details">Detalles</Link> {/* Ruta para los detalles */}
        </li>
        <li>
          <Link to="/xml">Lista desde XML</Link> {/* Nueva ruta para la lista desde XML */}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
