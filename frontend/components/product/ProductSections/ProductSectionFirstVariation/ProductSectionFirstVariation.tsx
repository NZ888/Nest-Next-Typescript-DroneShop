import styles from "./ProductSectionFirstVariation.module.css"
import {ISection} from "@/types/product";
import Image from "next/image";

export default async function ProductSectionFirstVariation(section : ISection){
    const {image} = section;
    let imageUrl:string = "";
    if(image){
        imageUrl = image
    }
    return (
        <>
            <div className={styles.container}>
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