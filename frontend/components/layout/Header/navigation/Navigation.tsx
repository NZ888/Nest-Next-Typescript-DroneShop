import React from 'react';
import styles from "./Navigation.module.css";
import Link from "next/link";
import {PAGES} from "@/config/pages.config";

type NavigationProps = object

const Navigation: React.FC<NavigationProps> = ({  }) => {
  return (
      <nav className={styles.navigationContainer}>
          <Link href={PAGES.STORE()} className={styles.navigation}>Каталог</Link>
          <Link href={PAGES.ABOUT()} className={styles.navigation}>Про нас</Link>
          <Link href={PAGES.CONTACTS()} className={styles.navigation}>Контакти</Link>
      </nav>
  );
};

export default Navigation;
