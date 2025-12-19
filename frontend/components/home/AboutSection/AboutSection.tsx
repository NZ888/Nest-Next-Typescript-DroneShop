import React from 'react';
import styles from './AboutSection.module.css';
import GhostButton from "@/components/ui/GhostBtn/GhostButton";
import Link from "next/link";
import {PAGES} from "@/config/pages.config";

type AboutSectionProps = object

export const AboutSection: React.FC<AboutSectionProps> = ({  }) => {
  return (
    <div className={styles.container}>
        <div className={styles.promo}>
            <h2>
                ПРО НАС
            </h2>
            <p>
                Ми — команда, що об&#39;єднує технології та надійність. <br/>
                Пропонуємо дрони й тепловізори, перевірені у найскладніших умовах. <br/>
                Обираємо тільки те, чому довіряємо самі.
            </p>
            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <GhostButton>
                    <Link style={{textDecoration: "none", color:"black"}} href={PAGES.ABOUT()}>ЧИТАТИ БІЛЬШЕ</Link>
                </GhostButton>
            </div>
        </div>
    </div>
  );
};