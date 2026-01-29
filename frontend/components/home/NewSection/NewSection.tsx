import styles from './NewSection.module.css';
import {API} from "@/config/api";
import NewItem from "@/components/home/NewSection/item/NewItem";
import {type INewProduct} from "@/types/product";
import { env } from "@/config/env";

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
const cut = (s: string, n = 120) =>
    s.length > n ? s.slice(0, n).trimEnd() + "…" : s;

export default async function NewSection() {
    const products: INewProduct[] = await getData(env.NEXT_PUBLIC_RENDER_NEW_PRODUCT_QUANTITY);

    return (
        <div className={styles.container}>
            <h2>Нове на сайті</h2>

            <div className={styles.itemsContainer}>
                {products.map((product) => (
                    <NewItem
                        key={product.slug}
                        imageUrl={product.mainImage}
                        title={product.name}
                        subtitle={cut(product.shortDesc, 120)}
                        price={product.price}
                        slug={product.slug}
                    />
                ))}
            </div>
        </div>
    );
}
