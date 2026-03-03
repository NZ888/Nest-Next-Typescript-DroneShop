import styles from "./ProductSection.module.css"
import {ISection} from "@/types/product";
import Image from "next/image";
import {Variation} from "@/components/product/RenderProductSections/RenderProductSection";


type Section = ISection & {
    variation: Variation
}

export default async function ProductSection(section : Section){
    const {image} = section;
    let imageUrl:string = "";
    if(image){
        imageUrl = image
    }
    return (
        <>
            <div className={ section.variation === "FIRST" ? styles.container : styles.containerSecondVariant} >
                <div className={styles.infoContainer}>
                    <h2>{section.title}</h2>
                    <p>{section.text}</p>
                </div>
                <div className={styles.imageContainer}>
                    <Image src={imageUrl} alt="image" width={668} height={450} />
                </div>
            </div>
        </>
    )
}