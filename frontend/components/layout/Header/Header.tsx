"use client"
import React from 'react';
import styles from "./Header.module.css"
import Navigation from "@/components/layout/Header/navigation/Navigation";
import Logo from "@/components/layout/Header/logo/Logo";
import CartAndUser from "@/components/layout/Header/cart-and-user/CartAndUser";
import Link from "next/link";
import {PAGES} from "@/config/pages.config";

type HeaderProps = object

const Header: React.FC<HeaderProps> = ({  }) => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const closeMenu = () => {
        setIsClosing(true)
        setTimeout(()=>{
            setMenuOpen(false);
            setIsClosing(false)
        }, 300)
    }
    const openMenu = () =>{
        setMenuOpen(true);
    }

    const toggleMenu = () =>{
        if(menuOpen && !isClosing) closeMenu()
        else openMenu()
    }
    return (
      <header className={styles.header}>
          <div className={styles.headerContainer}>
              <Navigation/>
              <Logo/>
              {menuOpen &&(
                  <div className={`${styles.mobileMenu} ${isClosing ? styles.fadeOut : styles.fadeIn}`} >
                      <Link className={styles.mobileMenuLinks} href={PAGES.STORE()}>Каталог</Link>
                      <Link className={styles.mobileMenuLinks} href={PAGES.ABOUT()}>Про нас</Link>
                      <Link className={styles.mobileMenuLinks} href={PAGES.CONTACTS()}>Контакти</Link>
                  </div>
              )}
              <CartAndUser menuOpen={menuOpen} toggleMenu={toggleMenu}/>
          </div>
      </header>
  );
};

export default Header;
