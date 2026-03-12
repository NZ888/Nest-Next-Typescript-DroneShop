import {API} from "@/config/api";
import {ICategory, IFetchedProducts, IProduct} from "@/types/product";
import {handleResponse} from "@/lib/helpers";
import styles from "../ReletedProductSection/RelatedProductSection.module.css"
import CatalogItem from "@/components/home/CatalogSection/item/CatalogItem";
import Link from "next/link";
import {PAGES} from "@/config/pages.config";
import SolidButton from "@/components/ui/SolidBtn/SolidButton";
type RelatedProductSectionProps = {
    categories: ICategory[]
};

async function getData(slug: string) {
    const res = await fetch(API.routes.products.getProductsByCategorySlug(slug, 1, 4), {
        method: "GET",
        next: {revalidate: 60}
    });
    const info: IFetchedProducts = await handleResponse(res)
    const products: IProduct | IProduct[]  = info.data.products
    return products as IProduct[];
}

export async function RelatedProductSection( categories : RelatedProductSectionProps){
    const cSlug = categories.categories[0].slug
    const products: IProduct[] = await getData(cSlug);
    console.log(products);
    return(
        <div className={styles.container}>
            <div className={styles.article}>
                <h2>Схожі товари</h2>
            </div>
            <div className={styles.items}>
                {products.map((p) => (
                    <CatalogItem title={p.name} price={p.price} slug={p.slug} imageUrl={p.mainImage} key={p.slug} oldPrice={p.oldPrice} imageWidth={294} imageHeight={223}/>
                ))}
            </div>
            <div>
                <Link href={PAGES.STORE()}>
                    <SolidButton className={styles.btn}>
                        <p>ДИВИТИСЬ УСІ</p>
                    </SolidButton>
                </Link>
            </div>
        </div>
    )
}