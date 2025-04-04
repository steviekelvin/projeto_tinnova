import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.scss";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Projeto Tinnova</Link>
      </div>

      {/* Ícone hamburger (visível no mobile) */}
      <div
        className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links de navegação */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/create" onClick={closeMenu}>
            Cadastro
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
