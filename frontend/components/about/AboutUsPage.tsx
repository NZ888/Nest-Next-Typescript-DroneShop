import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./AboutUsPage.module.css"
import Image from "next/image";
import image1 from "@/public/images/AboutUs/unsplash_GrgKfmm-aCM.png"
import image2 from "@/public/images/AboutUs/unsplash_GrgKfmm-aCM (2).png"
import image3 from "@/public/images/AboutUs/unsplash_GrgKfmm-aCM (3).png"
export default function AboutUsPage() {
    return (
        <>
        <Header/>
        <main className={styles.mainContainer}>
            <div className={styles.aboutUs}>
                <div className={styles.aboutUsInfo}>
                    <h2>ПРО НАС</h2>
                    <p>
                        Ми — команда, яка об&#39;єднана спільною метою: зробити передові технології <br/> доступними для кожного, хто потребує точності, безпеки та інновацій. <br/> З 2022 року ми спеціалізуємось на постачанні дронів і тепловізорів для <br/> професійного, цивільного та волонтерського використання.
                    </p>
                </div>
                <div className={styles.imageWrapper}>
                    <Image src={image1} alt={"image"} width={1014} height={565} draggable={false}/>
                </div>
            </div>
            <div className={styles.ourMissionContainer}>
                <div className={styles.ourMissionInfo}>
                    <h2>ПРО НАС</h2>
                    <p>
                        Ми — команда, яка об&#39;єднана спільною метою: зробити передові технології <br/> доступними для кожного, хто потребує точності, безпеки та інновацій. <br/> З 2022 року ми спеціалізуємось на постачанні дронів і тепловізорів для <br/> професійного, цивільного та волонтерського використання.
                    </p>
                </div>
                <div className={styles.imageWrapper2}>
                    <Image src={image2} alt={"image2"} width={668} height={437} draggable={false}/>
                </div>
            </div>
            <div className={styles.commandContainer}>
                <div className={styles.imageWrapper3}>
                    <Image src={image3} alt={"image2"} width={668} height={437} draggable={false}/>
                </div>
                <div className={styles.ourMissionInfo}>
                    <h2>Команда, якій можна довіряти</h2>
                    <p>
                        Ми — не просто магазин. Ми — фахівці, які самі працюють із цією технікою й <br/> консультують з досвіду. Засновники проєкту — волонтери, військові та IT- <br/> спеціалісти, які об&#39;єднали зусилля задля важливої справи.
                    </p>
                </div>
            </div>
        </main>
        <Footer/>
        </>
    )
}