import {ISection} from "@/types/product";
import HeaderProductSection from "@/components/product/ProductSections/HeaderProductSection";
import ProductSectionFirstVariation
    from "@/components/product/ProductSections/ProductSectionFirstVariation/ProductSectionFirstVariation";

type Section = ISection & {
    iteration: number;
    arrayLength: number;
}

export default async function RenderProductSection(section : Section) {
    if(section.order === 1){
        return <HeaderProductSection id={section.id} title={section.title} text={section.text} order={section.order} image={section.image} video={section.video} />
    }
    if(section.iteration === section.arrayLength){
        return <h2>order end</h2>
    }

    if(section.order !== 1 && section.iteration !== section.arrayLength && section.order % 2 === 0){
        return <ProductSectionFirstVariation id={section.id} title={section.title} text={section.text} order={section.order} image={section.image} video={section.video} />
    }
    else {
        return <h2>suborder2</h2>
    }

}