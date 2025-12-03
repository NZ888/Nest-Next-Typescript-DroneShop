import React from 'react';
import styles from './IntroSection.module.css';
import Image from "next/image";
import mainDroneImage from "@/public/images/MainDrone/mainDrone.png"
import SolidButton from "@/components/ui/SolidBtn/SolidButton";
import Link from "next/link";
import {PAGES} from "@/config/pages.config";

type AboutProps = object

const IntroSection: React.FC<AboutProps> = ({  }) => {
  return (
    <div className={styles.container}>
        <h1>
            технології <br/> які змінюють реальність
        </h1>
        <div className={styles.imageWrapper}>
            <Image src={mainDroneImage} width={955} height={955} alt={"drone"} draggable={false} />
        </div>
        <div className={styles.promo}>
            <p>
                Передові технології в одному місці. <br/>
                Обирай найкраще для <br/> найважливішого.
            </p>
            <div style={{width:'70%'}} >
                <SolidButton>
                    <Link style={{textDecoration: "none", color:"white"}} href={PAGES.STORE()}>ДО КАТАЛОГУ</Link>
                </SolidButton>
            </div>
        </div>
        <div className={styles.bgCurve}></div>
    </div>
  );
};

export default IntroSection;
