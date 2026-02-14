import CatalogItem from "@/components/home/CatalogSection/item/CatalogItem";
import {IProduct} from "@/types/product";
import styles from "./MainCatalogComponent.module.css"
type Props = {
    products: IProduct[]
}
export function MainCatalogComponent({products}: Props) {
    return(
        <>
            <h2 className={styles.info}>каталог</h2>
            <div className={styles.productGrid}>
                {products.map((p) => (
                    <CatalogItem key={p.id} title={p.name} price={p.price} slug={p.slug} imageUrl={p.mainImage} oldPrice={p.oldPrice} imageHeight={261} imageWidth={261} mainCatalog={true}/>
                ))}
                {products.map((p) => (
                    <CatalogItem key={p.id} title={p.name} price={p.price} slug={p.slug} imageUrl={p.mainImage} oldPrice={p.oldPrice} imageHeight={261} imageWidth={261} mainCatalog={true}/>
                ))}
                {products.map((p) => (
                    <CatalogItem key={p.id} title={p.name} price={p.price} slug={p.slug} imageUrl={p.mainImage} oldPrice={p.oldPrice} imageHeight={261} imageWidth={261} mainCatalog={true}/>
                ))}
                {products.map((p) => (
                    <CatalogItem key={p.id} title={p.name} price={p.price} slug={p.slug} imageUrl={p.mainImage} oldPrice={p.oldPrice} imageHeight={261} imageWidth={261} mainCatalog={true}/>
                ))}
            </div>
        </>
    )
}