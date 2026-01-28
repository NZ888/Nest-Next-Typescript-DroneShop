import {API} from "@/config/api";
import type {INewProduct} from "@/types/product";
import {env} from "@/config/env";
import styles from "./CatalogSection.module.css"
import CatalogItem from "@/components/home/CatalogSection/item/CatalogItem";
import SolidButton from "@/components/ui/SolidBtn/SolidButton";
import Link from "next/link";
import {PAGES} from "@/config/pages.config";
async function getData(quantity: number) {
    const res = await fetch(
        API.routes.products.getSomeNewProducts(quantity),
        {
            next: { revalidate: 3600 },
        }
    );

    if (!res.ok) {
        console.error("Fetch error", await res.text());
        throw new Error("Failed to fetch");
    }
    const data = await res.json();
    console.log(data);
    return data;

}


export default async function CatalogSection(){
    const products: INewProduct[] = await getData(env.NEXT_PUBLIC_RENDER_NEW_PRODUCT_QUANTITY);
    return (
        <div className={styles.container}>
            <div className={styles.article}>
                <h2>Каталог</h2>
            </div>
            <div className={styles.items}>
                {products.map((p) => (
                    <CatalogItem title={p.name} price={p.price} slug={p.slug} imageUrl={p.mainImage} key={p.slug} oldPrice={30000} />
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