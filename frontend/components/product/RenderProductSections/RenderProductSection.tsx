import {ICategory, ISection, ISpecs} from "@/types/product";
import HeaderProductSection from "@/components/product/ProductSections/HeaderProductSection";
import ProductSection from "@/components/product/ProductSections/ProductSectionVariation/ProductSection";
import FooterProductSection from "@/components/product/ProductSections/FooterProductSection/FooterProductSection";
import {
    RelatedProductSection
} from "@/components/product/ProductSections/FooterProductSection/ReletedProductSection/RelatedProductSection";

export type Variation = "FIRST" | "SECOND";

type Section = ISection & {
    iteration: number;
    arrayLength: number;
    specs: ISpecs[];
    categories: ICategory[]
}

export default function RenderProductSection(section : Section) {
    let renderSectionVariation: Variation;
    if(section.order === 1){
        return <HeaderProductSection id={section.id} title={section.title} text={section.text} order={section.order} image={section.image} video={section.video} />
    }
    if(section.iteration === section.arrayLength){
        return (
            <>
                <FooterProductSection image={section.image} video={section.video} key={section.id} id={section.id} title={section.title} text={section.text} order={section.order} specs={section.specs}/>
                <RelatedProductSection categories={section.categories}/>
            </>
        )
    }

    if(section.order !== 1 && section.iteration !== section.arrayLength && section.order % 2 === 0){
        renderSectionVariation = "FIRST";
        return <ProductSection id={section.id} variation={renderSectionVariation} title={section.title} text={section.text} order={section.order} image={section.image} video={section.video} />
    }
    else {
        renderSectionVariation = "SECOND";
        return <ProductSection id={section.id} variation={renderSectionVariation} title={section.title} text={section.text} order={section.order} image={section.image} video={section.video} />
    }

}