import {ISection, ISpecs} from "@/types/product";
import styles from "./FooterProductSection.module.css"
import Spec from "@/components/product/ProductSections/FooterProductSection/Spec/Spec";
import Image from "next/image";


type SectionProps = ISection & {
    specs: ISpecs[]
}

export default  function FooterProductSection(section: SectionProps) {
    const {image} = section;
    let imageUrl:string = "";
    if(image){
        imageUrl = image
    }
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h2>
                    {section.title}
                </h2>
                <p>
                    {section.text}
                </p>
            </div>
            <div className={styles.specsContainer}>
                {section.specs.map((spec) => (
                    <Spec key={spec.key} unit={spec.unit} type={spec.type} order={spec.order} value={spec.value} labelUk={spec.labelUk}/>
                    ))}
            </div>
            <Image style={{marginTop: "44px"}} src={imageUrl} alt="image" width={668} height={450} />
        </div>
    )
}